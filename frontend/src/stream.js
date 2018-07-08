import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { websocket } from './websocket.js';
import { PlayButton, PauseButton } from 'react-player-controls';
class MainStream extends React.Component{

  constructor(props)
  {
    super(props);
    
    this.state = { url:"" , playing:true , muted:false , volume:0.5 , currtime:0 };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    //this.handleDuration = this.handleDuration.bind(this);
    //this.handleEnd = this.handleEnd.bind(this);
    //this.handleError = this.handleError.bind(this);

  }

  componentDidMount()
  {
    

    
    websocket.onmessage = (event) => 
    { 
      let data = JSON.parse(event.data);
      if(data['currtime'] !== this.state.currtime )
      {
        this.refs.player.seekTo(data['currtime']);

      }
      this.setState({
        url : data['url'] , 
        playing : data['playing'] ,
        muted : data['muted'] ,
        volume : data['volume'] ,
        currtime : data['currtime'] , 

      });
        this.refs.player.volume = this.state.volume;
        console.log(this.state);
        console.log('componentDidMount');
    }

            
      

  } 
  handlePlay()
  {
    this.setState({playing:true});
    let data = {
      url :this.state.url , 
      playing:this.state.playing ,
      muted:this.state.muted , 
      volume:this.state.volume , 
      currtime : this.state.currtime ,
    };
    websocket.send(JSON.stringify(data));
    console.log("handlePlay");
  }

  handlePause()
  {
    this.setState({playing:false});
    let data = {
      url :this.state.url , 
      playing:this.state.playing ,
      muted:this.state.muted , 
      volume:this.state.volume , 
      currtime : this.state.currtime ,
    };
    websocket.send(JSON.stringify(data));
    console.log("handlePause");
  }
  handleProgress(progressinfo)
  { 
    this.setState({ currtime:progressinfo['playedSeconds']});
    
    let data = {
      url :this.state.url , 
      playing:this.state.playing ,
      muted:this.state.muted , 
      volume:this.state.volume , 
      currtime : this.state.currtime ,
    };
    websocket.send(JSON.stringify(data));
    console.log("handleProgress");  
  }

  handleChange(event)
    {
     this.setState({url: event.target.value});
    }
    handleSubmit(event)
    {
      event.preventDefault();     

    }

  render()
  {
    return(
        <div>
          
            
            
            
              { ( localStorage.getItem('token') )?
                <div>
                <form  onSubmit={this.handleSubmit.bind(this)}>
                Search Url<input type="text" name="url" value={this.state.url}  onChange = {this.handleChange.bind(this)} /><br/>
                <input type='submit' />
                </form> <br/>
                </div>
                   : null
                    } 
            
               

                 
          <ReactPlayer ref="player" url={this.state.url} playing={this.state.playing} volume={this.state.volume} muted={this.state.muted} 
          onPlay={this.handlePlay} onPause={this.handlePause} onProgress={this.handleProgress} 
          
          />
         
        </div>

      );

  }

}



export default MainStream;