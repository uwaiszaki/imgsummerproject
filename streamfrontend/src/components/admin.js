import React, { Component } from 'react';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input , Card} from 'semantic-ui-react';

import history from './historyobj.js';
import '../css/adminview.css';



export default class AdminView extends Component
{
	constructor()
	{
		super();
		this.state = { info:[] , a:0}
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
		<div className='adminview'>	
			<Button basic color='red' onClick={()=>{history.push('/'); }} icon><Icon name='backward'/> Stream </Button>
			<div textAlign='center'  >
				
				
				<Header as='h1' textAlign='center'>Admin View</Header><br/>

				  <Grid columns={2} divided className='admin-grids'>
				    <Grid.Column textAlign='center'>
				    	<Header as='h3'>New or Disapproved Users </Header>
					    {this.state.info.map(info => { 
					    	const res = <div key={info.username}>

				      										<Grid.Row>
																			        										
															  
															    <Card className='admincard' style={{margin:'auto'}}>
															      <Card.Content>
															        
															        <Card.Header>{info.username}</Card.Header>
															        
															        <Card.Description>
															          <Header as='h4'>{info.first_name} {info.last_name}</Header>
															        </Card.Description>

															          <Button basic color='green' onClick={()=>{ 
															          				let user=info.username;	
															          				const updateData = {is_active:'True'};
																			fetch('http://localhost:8000/stream/detail/'+user , { method: 'PATCH' , 
																			body: JSON.stringify(updateData) , headers: { 'Content-Type':'application/json'} })
    																		.then(res => res.json())
    																		.then( response =>  {    console.log(response);
                            																		 window.location.reload();		
                             																	})
    																		.catch(error => { console.error('Error':error);  alert(error); });


															          											}
															          										}
															          >
															            Approve
															          </Button>
															      </Card.Content>
															    </Card>
				      										</Grid.Row>
				      					</div>					



					    	return (info.is_active==false) ?  res : null

					     							} 
					     					)
						}

					   
				   

				  	</Grid.Column>


				    <Grid.Column textAlign='center'>
					    
				    	<Header as='h3'>Approved Users</Header>
					    {this.state.info.map(info => { 
					    	const res = <div key={info.username}>

				      										<Grid.Row>
																			        										
															  
															    <Card className='admincard' style={{margin:'auto'}}>
															      <Card.Content >
															        
															        <Card.Header>{info.username}</Card.Header>
															        
															        <Card.Description>
															          <Header as='h4'>{info.first_name} {info.last_name}</Header>
															        </Card.Description>

															          <Button basic color='red' onClick={()=>{
															          				const user=info.username;	
															          				const updateData = {is_active:'False'};
																			fetch('http://localhost:8000/stream/detail/'+ user , { method: 'PATCH' , 
																			body: JSON.stringify(updateData) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
    																		.then(res => res.json())
    																		.then( response =>  {    console.log(response);
    																								 window.location.reload();
                            	
                             																	})
    																		.catch(error => { console.error('Error':error);  alert(error); });				


															          										 } 
															          									}
															          >
															            Disapprove
															          </Button>
															      </Card.Content>
															    </Card>
				      										</Grid.Row>
				      					</div>					



					    	return (info.is_active==true) ?  res : null

					     							} 
					     					)
						}

					   
				   

				  	</Grid.Column>

				 </Grid>

			</div>
		</div>

			);
	}

}