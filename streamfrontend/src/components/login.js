import React , {Component} from 'react';
import {  Link  } from 'react-router-dom';
import history from './historyobj.js';
import '../css/login.css';
import {Form , Input , Button , Grid , Header , Icon } from 'semantic-ui-react';
class Login extends Component {

  constructor(props)
    {
      super(props);

      this.state={ username :""  , password :"" , is_staff:false , error:""};
      this.handleChange=this.handleChange.bind(this);
      //this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handlePasswordchange=this.handlePasswordchange.bind(this);
      this.handleAdminCheck=this.handleAdminCheck.bind(this);
    }
 
    handleSubmit(event)
    { 
      //var myForm =  document.getElementById('myForm')
      //var formData = new FormData(myForm);
      //var dataa = { 'username' : this.state.username }
      //formData.append('username',this.state.username)
   
      const obj = { username : this.state.username  , password : this.state.password};

      fetch('http://127.0.0.1:8000/stream/login/' , { method: 'POST' , body: JSON.stringify(obj) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
      .then(res => { console.log(res.status); 
                      if(!res.ok) 
                        { 
                          if(res.status==400||res.status==404)
                            { 
                              this.setState({error:'Username Or Password incorrect'});
                              return null;
                            }
                          else if(res.status>=500)
                            { this.setState({error:'Server Error'});
                              return null;
                            }
                        }
                       else if(res.ok)
                        return res.json(); })
      .then( response =>  { localStorage.setItem('token', response.token);
                                
                            console.log(localStorage.getItem('token'));
                            console.log(response);
                            if(this.state.is_staff == true)
                            { 
                              this.props.history.push("/admin");  
                            } 
                            else
                            {  
                              this.props.history.push("/search");
                            }

                           })
      .catch(error =>{ this.setState({error:error})
                       console.error('Error:', error) });
      



    }
    handleAdminCheck(event)
    {
      event.preventDefault();
      fetch('http://localhost:8000/stream/detail/'+ this.state.username)
      .then(res => { console.log(res.status); 
                      return res.json(); })
      .then( response =>  {    console.log(response);
                            localStorage.setItem('is_staff', response.is_staff);
                            if(response.is_staff==false){
                                if(response.is_active==false)  
                                this.setState({is_staff:response.is_staff} , this.setState({error:'You Dont Have Permission To LogIn'}));
                                else
                                this.setState({is_staff:response.is_staff} , this.handleSubmit);      
                              }
                            else
                            this.setState({is_staff:response.is_staff} , this.handleSubmit);
                            
                             })
      .catch(error => {  console.error('Error':error);   });

    }
    componentDidMount()
    {

       

    }

  handleChange(event)
    {
      this.setState({username: event.target.value });

    }
  handlePasswordchange(event)
    {
      this.setState({password: event.target.value });

    }
  render() {
    return (
      <div className='container'>
        <div className="loginsignup">            
            <Grid>
              <Grid.Column width={4}>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as='h3' textAlign='center' icon color='true red'><Icon name='music' />Log-in To Your Account</Header>
                <Form method="POST"  onSubmit={this.handleAdminCheck} className='loginform'>          
                <Form.Field>
                <label>Username</label>
                <Form.Input type="text" name="username" value={this.state.username}  onChange={this.handleChange} placeholder='username' fluid icon='user' iconPosition='left'/>  <br />
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <Form.Input name="password"  type="password" value={this.state.password} onChange={this.handlePasswordchange} placeholder='password' fluid icon='lock' iconPosition='left'/> <hr/>
                </Form.Field>
                <Button color='true red' fluid size='large' >Login</Button>
                </Form>
                <Header as='h5' style={{marginLeft:'20vw'}}> new user?  <Link to='/register' >Signup</Link> </Header>
                <Header as='h5' style={{marginLeft:'15vw'}}>{this.state.error}</Header>
              </Grid.Column>
              <Grid.Column width={4}>
              </Grid.Column>
            </Grid>
            
      </div>   
    </div>
    );
  }


}





export default Login;