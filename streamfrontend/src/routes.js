import React from 'react';
import { Router,  Route,  Redirect } from 'react-router-dom';

import Login   from './components/login.js';
import Signup from './components/signup.js';
//import {Search} from './searchsong.js';
import App from './App.js';
import Profile from './components/profile.js';
import AdminView from './components/admin.js';

import history from './components/historyobj.js';


export class Routes extends React.Component
{	
	render()
			{	
				return(
						<Router history={history}>
							<div>
								<Route exact path="/login" component={Login} />
								<Route exact path="/register" component={Signup} />
								<Route exact path="/"  component={App} />
								<Route exact path="/logout" component={function(){ localStorage.removeItem('token'); localStorage.removeItem('user');
																				 localStorage.removeItem('is_staff');    
																				history.index=0; history.push("/"); window.location.reload(); return null;}} />
								<Route exact path="/profile" render={() => ( localStorage.getItem('token') ?  
																			<Profile/> : <Redirect to="/login" />
																)}
								/>

								<Route exact path="/admin"  render={()=> { return (localStorage.getItem('is_staff')==='true') ?  <AdminView/> : <Redirect to='/login'/>  } }/>

								<Route exact path="/search"  render={() => ( localStorage.getItem('token') ?  
																			<App/> : <Redirect to="/login" />
									)}  
								 />
								<Route exact path="/youtube"  render={() => (localStorage.getItem('token') ?  
																			<App/> : <Redirect to="/login" />
																	)}  
								 />

							</div>
						</Router>
					);
			}

}






