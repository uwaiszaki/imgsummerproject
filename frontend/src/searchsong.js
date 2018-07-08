import React, { Component } from 'react';
import {LogRoutes} from './routes.js'; 
import MainStream from './stream.js';
import Youtube from './youtubefetch.js';
import { Link  } from 'react-router-dom';
import {browserHistory } from './historyobj.js';
export class Search extends React.Component{
	render()
	{
		return(
			<div>
			{ (localStorage.getItem('token')) ?
			  <Link to={"/logout"} onClick={function(){ return <LogRoutes/>;}}>Log Out </Link> 
			 : (browserHistory.location.pathname !== '/login') ? <Link to={"/login"} >Log In </Link> : null	}
			<Youtube/>
			<MainStream/>
			
			</div>
			);
	}

}