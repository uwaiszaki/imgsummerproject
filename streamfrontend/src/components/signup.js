import React, { Component } from 'react';
import '../css/login.css';
import {Form , Input , Button , Grid , Header , Icon ,Container} from 'semantic-ui-react';
import {  Link  } from 'react-router-dom';

class Signup extends Component {

  constructor()
    {
      super();

      this.state = { username :""  , password :"" , confirm_password:"", first_name:"" , last_name:""};
      this.handleChange = this.handleChange.bind(this);
      //this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handlePasswordchange = this.handlePasswordchange.bind(this);
    }
 
    handleSubmit(event)
    { 
      //var myForm =  document.getElementById('myForm')
      //var formData = new FormData(myForm);
      //var dataa = { 'username' : this.state.username }
      //formData.append('username',this.state.username)
      event.preventDefault();
      const obj = { username : this.state.username  , password : this.state.password , confirm_password : this.state.confirm_password ,
                    first_name:this.state.first_name , last_name:this.state.last_name , is_active:'True'};
      fetch('http://127.0.0.1:8000/stream/signup/' , { method: 'POST' , body: JSON.stringify(obj) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
      .then(res => { 
                    if(!res.ok) throw new Error(res.status);
                    else if(res.ok)
                    return res.json(); })
      .then( response =>  {                    
                  console.log(response);
                  if(response.ok)
                   {this.props.history.push('/'); }
                    
                     
                })
      .catch(error => console.error('Error:', error));



    }


  handleChange(event)
    {
      this.setState({[event.target.name]: event.target.value });

    }

  render() {
    return (
    <div className='container'>  
      <div className="loginsignup">
        <Grid>
          <Grid.Column width={4}>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h3' textAlign='center' icon color='true red'><Icon name='music' />Register</Header>
            <Form method="POST"  onSubmit={this.handleSubmit} >
            <Form.Field><label>Username</label> 
            <Form.Input type="text" name="username" value={this.state.username}  onChange={this.handleChange} placeholder='username' fluid icon='user' iconPosition='left'/>
            </Form.Field> 
            <Form.Field>  
            <label>First Name</label>
            <Form.Input name="first_name"  type="text" value={this.state.first_name} onChange={this.handleChange} placeholder='name' fluid icon='user' iconPosition='left'/> 
            </Form.Field>
            <Form.Field>  
            <label>Sur name</label>
            <Form.Input name="last_name"  type="text" value={this.state.last_name} onChange={this.handleChange} placeholder='name' fluid icon='user' iconPosition='left'/> 
            </Form.Field>
            <Form.Field>  
            <label>Password</label>
            <Form.Input name="password"  type="password" value={this.state.password} onChange={this.handleChange} placeholder='password' fluid icon='lock' iconPosition='left'/> 
            </Form.Field>
            <Form.Field>
            <label>Confirm Password</label>  
            <Form.Input name="confirm_password"  type="password" value={this.state.confirm_password} onChange={this.handleChange} placeholder='password' fluid icon='lock' iconPosition='left'/> 
            </Form.Field>
            <Button color='true red' fluid size='large'>Submit</Button>         
            </Form>
            <Header as='h5' style={{marginLeft:'20vw'}}> Already Registered?  <Link to='/login' >Login</Link> </Header>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid>

      </div>
    </div>
    );
  }


}

export default Signup;