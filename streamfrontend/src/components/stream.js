import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../css/stream.css';
import {Header  , Button, Form, Message  , Icon , Grid} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {urlChange} from '../actions/streamActions.js';



class Search extends Component
{ 
  constructor(props)
  {
    super(props);
    this.state = { url:"" };

  }

  handleChange(event)
  {
    this.setState({url:event.target.value});
    
    

  }

  handleSubmit(event)
  {
    event.preventDefault();
    console.log(this.state.url);
    this.props.urlChange(this.state.url); 
    
  }

  componentWillReceiveProps(newProps)
  {
    console.log(newProps.url);
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
                      
                          <Button icon style={{marginLeft:'14vw'}}>
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

const mapStateToProps = state => ({ 
  url:state.streamReducers.url 
 }
 );

const mapDispatchToProps = (dispatch) => {
  return {
    urlChange: (e) => dispatch(urlChange(e)) 
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);



 