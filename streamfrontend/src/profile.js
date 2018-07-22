import React, { Component } from 'react';
import {browserHistory} from './historyobj.js';
import { Button, Icon ,  Grid , Header ,  Modal  , Input} from 'semantic-ui-react';
import './App.css';
export default class Profile extends Component
{
	constructor(props)
	{ super(props);
		this.state = { username:"" , first_name:"" , last_name:"" , userdetail:[]};
		this.handleChange = this.handleChange.bind(this);

	}

	componentDidMount()
	{


		let username = localStorage.getItem('user');
    	fetch('http://localhost:8000/stream/detail/'+ username)
    	.then(res => res.json())
    	.then( response =>  {    console.log(response.first_name);
                            	
                            this.setState({username:response.username , first_name:response.first_name , last_name:response.last_name});
                            
                             })
    	.catch(error => { console.error('Error':error);   });


  
	}

	handleUpdate(event)
	{	let username = this.state.username;
		const updateData = { username:this.state.username  , first_name:this.state.first_name , last_name:this.state.last_name};
		fetch('http://localhost:8000/stream/detail/'+ this.state.username , { method: 'PATCH' , body: JSON.stringify(updateData) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
    	.then(res => res.json())
    	.then( response =>  {    console.log(response.first_name);
                            	
                            this.setState({userdetail:response});
                            console.log(this.state.userdetail);
                             })
    	.catch(error => { console.error('Error':error);   });


	}

	handleChange(event)
	{
		this.setState({[event.target.name] : event.target.value});
	}

render()
{
	return(<div>
		    <Button icon labelPosition='left' onClick={()=> { browserHistory.push('/'); window.location.reload(); } }>
      		<Icon name='arrow left' />
      		GO BACK
    		</Button>
    		<div className="profileinfo" >
				
				  <Grid columns={3} >
				    <Grid.Row>
				      <Grid.Column>
				      	<Header as='h3' style={{textAlign:'center'}}>Username : </Header>
				      </Grid.Column>
				      <Grid.Column>
				        <Header as='h3'> {this.state.userdetail.username}</Header>
				      </Grid.Column>
				      <Grid.Column>
				        

				      </Grid.Column>
				    </Grid.Row>

				    <Grid.Row>
				      <Grid.Column>
				      	<Header as='h3' style={{textAlign:'center'}}>First Name : </Header>
				      </Grid.Column>
				      <Grid.Column>
				        <Header as='h3'> {this.state.userdetail.first_name}</Header>
				      </Grid.Column>
				      <Grid.Column>
				        
				        
				      </Grid.Column>
				    </Grid.Row>


				   	<Grid.Row>
				      <Grid.Column>
				      	<Header as='h3' style={{textAlign:'center'}}>Last Name : </Header>
				      </Grid.Column>
				      <Grid.Column>
				        <Header as='h3'> {this.state.userdetail.last_name}</Header>
				      </Grid.Column>
				      <Grid.Column>
				        
				        
				      </Grid.Column>
				    </Grid.Row>

				  </Grid> 
				  
				<Modal trigger={<Button>Update</Button>}>
    			  	<Modal.Header>Update Info</Modal.Header>
               	  	<Modal.Content>
               	  	<Modal.Description>
        			<Header>Username :</Header>
      			  	<Input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
					
					<Header>First Name:</Header>
      			  	<Input type='text' name='first_name' value={this.state.first_name} onChange={this.handleChange} />

      			  	<Header>Last Name :</Header>
      			  	<Input type='text' name='last_name' value={this.state.last_name} onChange={this.handleChange} />
	
      				</Modal.Description>


    				<Button onClick={this.handleUpdate.bind(this)} ><Header as='h3'>Update</Header> </Button>
    				</Modal.Content>
    			
  				</Modal>

			</div>
		</div>);
}

} 