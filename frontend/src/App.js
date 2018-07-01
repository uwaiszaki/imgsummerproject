import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './login.js';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';
import Signup from './signup.js';
import Youtube from './youtubefetch.js';

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
      const browserHistory =  createBrowserHistory()     
      //if(!localStorage.getItem('token'))
      //{
        return(
          <div>
          <BrowserRouter>
          <div>

          <HomeLinks/>

        { /*  sinup button */ }
          
          
          <Switch>
          <Route path="/login" component={function(){  <Login history={browserHistory}/> }}  />
          <Route path="/signup" component={() => {   console.log(browserHistory.location.pathname);   return <Signup/>;  } } />
          //<Route path="/path" render={ function(){   console.log(browserHistory.location);  return null; } } />
          <Route path="/logout" render={ function(){   localStorage.removeItem('loggedIn');  return null; } } />
          <Route path="/homepage" render={ function(){      } }   />
          </Switch>
          </div>
          </BrowserRouter>
          <Youtube/>
          </div>
          );
      //}
      //else
      //{
      // return(
      //  <div>
       // HEllo
        //</div>
        //);

      //}

  }    
  


}

class Sign extends React.Component{
  render()
  {
    return( 
    <div>
    <h1> Sign Up </h1>
    </div>
    );
  }

}

class HomeLinks extends React.Component{
  render()
  { const browserHistory =  createBrowserHistory()
    return(
            <div>
            
                { (browserHistory.location.pathname==='/login') ? null  : (localStorage.getItem('loggedIn')) ?  null : ( <div><Link to={"/login"} > Login </Link></div> )  }
            
                
                { ( localStorage.getItem('loggedIn') ) ? null : ( browserHistory.location.pathname=== '/login') ? null : ( browserHistory.location.pathname ==='/signup') ? null 
                  :  ( browserHistory.location.pathname==='/' ) ? null : <div> <Link to={"/logout"} > logout </Link> </div>
                }
            
                {  (browserHistory.location.pathname==='/login')? <div> <Link to='signup' >Signup </Link> </div> : (browserHistory.location.pathname==='/') 
                  ? <div> <Link to='signup' >Signup </Link> </div> : null  }

            </div>
        );
  }
}


export default App;
