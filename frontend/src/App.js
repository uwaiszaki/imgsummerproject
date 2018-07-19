import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
//import { BrowserRouter } from 'react-router-dom';
import Login from './login.js';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';
import Signup from './signup.js'
import Youtube from './youtubefetch.js'
import Streamm from './stream.js';
import browserhistory from './historyobj.js';
import {Routes} from './routes.js';
class App extends Component {
  constructor()
  {
    super();
    this.state = { isLogin:'False' , a:'' , };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount()
  {
    this.setState({a:"a"});
  }
  render()
  {
  {/*
    { ( localStorage.getItem('loggedIn') ) ? <div> <Link to={"/logout"} > logout </Link> </div> : null 
                }
            
                {   (localStorage.getItem('loggedIn')!=='True') ? <div> <Link to='signup' >Signup </Link> </div> : null  }

  */}
           
      //if(!localStorage.getItem('token'))
      //{
        return(
          <div>
          
               
                <Routes/>
                
                    
          
          </div>
          );
      

  }    
  


}




export default App ;



