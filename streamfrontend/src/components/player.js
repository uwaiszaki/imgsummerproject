import React, { Component } from 'react';
import { websocket } from './websocket.js';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import {playpauseChange , urlChange , timeChange , muteChange  , volChange , durChange} from '../actions/streamActions.js';

class Player extends Component{

	constructor(props)
	{
		super(props);

		this.state={ currtime:0 , volume:.5 ,url:"" };
	}

	componentDidMount()
	  {
	    
	   
	    
	    websocket.onmessage = (event) => 
	    { 
	      let data = JSON.parse(event.data);
	      if(data['currtime'] !== this.state.currtime )
	      {
	        this.player.seekTo(data['currtime']);

	      }
	      this.setState({url:data['url']});
	      this.props.playpauseChange(data['playing']);
	      this.props.urlChange(data['url']);
	      this.props.timeChange(data['currtime']);
	      this.props.muteChange(data['muted']);
	      this.props.volChange(data['volume']);
	      this.props.durChange(data['duration']);
	      
	      this.player.volume = this.props.volume;
	      localStorage.setItem('url', data['url']);  
	        console.log('componentDidMount');
	    }

	            
	      

	  } 


	  handlePlay()
	  {
	    this.props.playpauseChange(true);
	    let data = {
	      url :this.props.url , 
	      playing:this.props.playing ,
	      muted:this.props.muted , 
	      volume:this.props.volume , 
	      currtime : this.props.currtime ,
	      duration : this.props.duration , 
	    };
	    websocket.send(JSON.stringify(data));
	    console.log("handlePlay");
	  }

	  handlePause()
	  {

	    this.props.playpauseChange(false);
	    let data = {
	      url :this.props.url , 
	      playing:this.props.playing ,
	      muted:this.props.muted , 
	      volume:this.props.volume , 
	      currtime : this.props.currtime ,
	      duration : this.props.duration , 
	    };
	    websocket.send(JSON.stringify(data));
	    console.log("handlePause");
	  }
	  handleProgress(progressinfo)
	  { 
	    this.setState({currtime:progressinfo['playedSeconds']});
	    
	    this.props.timeChange(progressinfo['playedSeconds']);
	    
	    let data = {
	      url :this.props.url , 
	      playing:this.props.playing ,
	      muted:this.props.muted , 
	      volume:this.props.volume , 
	      currtime : this.props.currtime ,
	      duration : this.props.duration , 
	    };
	    websocket.send(JSON.stringify(data));
	    console.log("handleProgress");  
	  }

	  handleDuration(duration)
	  {
	  	this.props.durChange(duration);
	  	
	    let data = {
	      url :this.props.url , 
	      playing:this.props.playing ,
	      muted:this.props.muted , 
	      volume:this.props.volume , 
	      currtime : this.props.currtime ,
	      duration : this.props.duration , 
	    };
	    websocket.send(JSON.stringify(data));
	    console.log("handleDuration");  
	  
	  }


	  
	  handleEnd(event)
	  { this.props.urlChange('');
	   	this.props.timeChange(0);
	     
			    let data = {
			      url :this.props.url , 
			      playing:this.props.playing ,
			      muted:this.props.muted , 
			      volume:this.props.volume , 
			      currtime : this.props.currtime ,
			      duration : this.props.duration , 
			    };
	          websocket.send(JSON.stringify(data));
	          console.log("Video has Ended");

	          

	     

	  }


	componentWillReceiveProps(newProps){
   	 	
   	 	if(newProps.currtime !== this.state.currtime )
	      {
	        this.player.seekTo(newProps.currtime);

	      }

   	 	console.log(newProps.url);
	}

	  ref = (player) => {
	    this.player = player;
	  }

  	render()
  	{

  					return(

							<ReactPlayer ref={this.ref} url={this.props.url} playing={this.props.playing} 
          											volume={this.props.volume} muted={this.props.muted} 
 	        										onPlay={this.handlePlay.bind(this)} onPause={this.handlePause.bind(this)} onEnded={this.handleEnd.bind(this)} 
 	        										onProgress={this.handleProgress.bind(this)} onDuration={this.handleDuration.bind(this)} 
 	        										style={{height:'75vh' , width:'70vw'  , marginLeft:'7vw'}}
							/>
					);

	}


}




const mapStateToProps = state => ({
  playing:state.streamReducers.playing , 
  url:state.streamReducers.url ,
  muted:state.streamReducers.muted ,
  currtime:state.streamReducers.currtime ,
  volume:state.streamReducers.volume , 
  duration:state.streamReducers.duration
 }
 );

const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    playpauseChange: (a) => dispatch(playpauseChange(a)) ,
    timeChange: (e) => dispatch(timeChange(e)) ,
    urlChange: (e) => dispatch(urlChange(e)) ,
    muteChange: (e) => dispatch(muteChange(e)) ,
  	volChange: (e) => dispatch(volChange(e)) ,
  	durChange: (e) => dispatch(durChange(e))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Player);