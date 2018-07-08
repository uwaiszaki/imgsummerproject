import React, { Component } from 'react';


class Signup extends React.Component {

  constructor()
    {
      super();

      this.state = { username :""  , password :"" , confirm_password:"",};
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
      const obj = { username : this.state.username  , password : this.state.password , confirm_password : this.state.confirm_password};
      fetch('http://127.0.0.1:8000/stream/signup/' , { method: 'POST' , body: JSON.stringify(obj) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then( response =>  { 
      						
                   
                  console.log(response);  
      						   
  							});



    }


  handleChange(event)
    {
      this.setState({[event.target.name]: event.target.value });

    }

  render() {
    return (
      <div className="App">
        <h1>Signup </h1> <hr />
      <form method="POST"  onSubmit={this.handleSubmit} >
      Username <br/> <input type="text" name="username" value={this.state.username}  onChange={this.handleChange} />  <br />
      Password <br/><input name="password"  type="password" value={this.state.password} onChange={this.handleChange}/> <br />
      Confirm Password  <br/><input name="confirm_password"  type="password" value={this.state.confirm_password} onChange={this.handleChange}/> 
      <br/><input type="submit" />
      <hr/>
      </form>
      </div>
    );
  }


}

export default Signup;