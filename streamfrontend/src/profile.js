import React, { Component } from 'react';
import {browserHistory} from './historyobj.js';


export default class Profile extends Component
{
	constructor(props)
	{ super(props);
		this.state = { user:"" , userdetail:[]};

	}

	componentDidMount()
	{


		let username = localStorage.getItem('user');
    	fetch('http://localhost:8000/stream/detail/'+ username)
    	.then(res => res.json())
    	.then( response =>  {    console.log(response.first_name);
                            	
                            this.setState({userdetail:response});
                            console.log(this.state.userdetail);
                             })
    	.catch(error => { console.error('Error':error);   });


  
	}

render()
{
	return(<div>{this.state.userdetail.username}</div>);
}

} 