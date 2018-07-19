import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  createBrowserHistory,
 
} from 'history';
import Login from './login.js';
import Signup from './signup.js';
import {Search} from './searchsong.js';

export class Routes extends React.Component
{	
	render()
			{	const browserHistory =  createBrowserHistory();
				return(
						<BrowserRouter >
							<div>
								<Route path="/login" component={Login} />
								<Route path="/register" component={Signup} />
								<Route path="/"  component={Search} />
								<Route path="/logout" component={function(){ localStorage.removeItem('token'); return <Search/>; }} />
								
							</div>
						</BrowserRouter>
					);
			}

}


export class LogRoutes extends React.Component
{
	render()
	{
		return(
			<BrowserRouter >
							<div>
								<Route path="/login" component={Login} />
								<Route path="/logout" component={function(){ localStorage.removeItem('token'); return <Search/>; }} />
								
							</div>
			</BrowserRouter>
			);
	}
}

export class HomeRoutes extends React.Component
{
	render()
	{
		return(
				<BrowserRouter >
							<div>
								<Route path="/" component={Search} />
								
								
							</div>
			</BrowserRouter>
			
			);
	}
}