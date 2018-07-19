import React, { Component } from 'react';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input} from 'semantic-ui-react';
import './App.css';
import {browserHistory} from './historyobj.js';




export default class AdminView extends Component
{
	constructor()
	{
		super();
		this.state = { info:[] }
	}

	componentDidMount()
	{
	
	fetch('http://127.0.0.1:8000/stream/details/')
    .then(res => res.json())
    .then( response =>  {    console.log(response);
                            
                            this.setState({info:response});
                            console.log(this.state.info);
                             })
    .catch(error => { console.error('Error':error);   });
	}

	render()
	{
		return(
			<div></div>
			);
	}

}