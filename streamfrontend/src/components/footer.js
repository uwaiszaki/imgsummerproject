import React, { Component } from 'react';
import { connect } from 'react-redux';
import {playpauseChange ,  timeChange ,  volChange} from '../actions/streamActions.js';
import {  Header, Icon , Grid , Input } from 'semantic-ui-react';
import '../css/stream.css';
class Footer extends Component{


	render()
	{
		return(			
						<div >
                            <Grid columns={3} divided 	>
                              <Grid.Column width={1} floated="left">
                                <Header as="h6" icon textAlign='center'>
                                {this.props.playing==false ?
                                <Icon name="play" onClick={()=>this.props.playpauseChange(true)}/>
                                : <Icon name="pause" onClick={()=>this.props.playpauseChange(false)}/>
                            	}
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={13}>
                              		<Input type="range" min="0" max={this.props.duration} 
                              		value={this.props.currtime} onChange={(e)=>this.props.timeChange(e.target.value)} className='slider'/>
                              </Grid.Column>
                              <Grid.Column width={2} floated="right" >
                              	<Header as="h6" icon>
                                <Icon name="volume up" />
                                </Header> 
                                <Input type="range" min="0" max="100"  style={{width:"6vw"}} value={this.props.volume*100} 
                                	onChange={(e) => this.props.volChange(e.target.value/100) } />
                              </Grid.Column>
                            </Grid>
                        </div>

			);

	}
}


const mapStateToProps = state => ({
  playing:state.streamReducers.playing , 
  currtime:state.streamReducers.currtime ,
  volume:state.streamReducers.volume ,
  duration:state.streamReducers.duration
 }
 );

const mapDispatchToProps = (dispatch) => {
  return {
    playpauseChange: (a) => dispatch(playpauseChange(a)) ,
    timeChange: (e) => dispatch(timeChange(e)) ,
  	volChange: (e) => dispatch(volChange(e))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Footer);