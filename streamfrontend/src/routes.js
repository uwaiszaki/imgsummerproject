import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  createBrowserHistory,
 
} from 'history';
import Login   from './login.js';
import Signup from './signup.js';
//import {Search} from './searchsong.js';
import App from './App.js';
import Profile from './profile.js';
import AdminView from './admin.js';
export class Routes extends React.Component
{	
	render()
			{	const browserHistory =  createBrowserHistory();
				return(
						<BrowserRouter >
							<div>
								<Route exact path="/login" component={Login} />
								<Route exact path="/register" component={Signup} />
								<Route exact path="/"  component={App} />
								<Route exact path="/logout" component={function(){ localStorage.removeItem('token');  browserHistory.replace("/");  }} />
								<Route exact path="/profile" render={() => ( localStorage.getItem('token') ?  
																			<Profile/> : <Redirect to="/login" />
																)}
								/>
								<Route exact path="/admin"  component={AdminView} />
								<Route exact path="/search"  render={() => ( localStorage.getItem('token') ?  
																			<App/> : <Redirect to="/login" />
									)}  
								 />
							</div>
						</BrowserRouter>
					);
			}

}


export class MainRoutes extends React.Component
{	
	render()
			{	const browserHistory =  createBrowserHistory();
				return(
						<BrowserRouter >
							<div>
								<Route exact path="/search" component={Login} />
								<Route exact path="/register" component={Signup} />
								<Route exact path="/"  component={App} />
								
							</div>
						</BrowserRouter>
					);
			}

}



