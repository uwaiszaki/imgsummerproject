import React, { Component } from 'react';


class Signup extends React.Component {

  constructor()
    {
      super();

      this.state = { username :" "  , password :"" , confirmpassword:"",};
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
      const obj = { username : this.state.username  , password : this.state.password , confirmpassword : this.state.confirmpassword};
      fetch('http://127.0.0.1:8000/stream/signup/' , { method: 'POST' , body: JSON.stringify(obj) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
      .then(res => res.json())
      .then( response =>  { 
      						localStorage.setItem('signedUp', 'True');    
      						   
  							})
      .catch(error => console.error('Error:', error));



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
      Confirm Password  <br/><input name="confirmpassword"  type="password" value={this.state.confirmpassword} onChange={this.handleChange}/> 
      <br/><input type="submit" />
      <hr/>
      </form>
      </div>
    );
  }


}

export default Signup;