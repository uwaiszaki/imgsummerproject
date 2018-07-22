import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
//import { PlayButton, PauseButton } from 'react-player-controls';
import {Header  , Button, Form, Message  , Icon , Grid} from 'semantic-ui-react';



export class Search extends Component
{ 
  constructor(props)
  {
    super(props);
    this.state = { url:"" };

  }

  handleChange(event)
  {
    this.setState({url:event.target.value} , this.props.handleSubmit(this.state.url));


  }

  handleSubmit(event)
  {
    
    console.log(this.state.url);
    this.props.handleSubmit(this.state.url); 
    
  }
  render()
  {
    return(           
                        <div className="search">
                      
                      <Grid columns={3} >
                        <Grid.Column>
                    
                        </Grid.Column>
                        <Grid.Column>
                          <Form   onSubmit={this.handleSubmit.bind(this)} error size="small">  
                          <Form.Input  fluid label="Search Url" type="text" name="url" value={this.state.url}  onChange={this.handleChange.bind(this)}  
                                                    
                            
                            placeholder="search" />
                      
                          <Button icon>
                          Search
                          <Icon name='search' />
                          </Button>
                          </Form> <br/>
                          </Grid.Column>
                          <Grid.Column>
                    
                        </Grid.Column>
                      </Grid>
                    

                    </div>

    );
  }
} 



 