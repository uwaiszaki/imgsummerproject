import React, { Component } from 'react';
import ReactPlayer from 'react-player';

//import { PlayButton, PauseButton } from 'react-player-controls';
import {Header  , Button, Form, Message  , Icon , Grid} from 'semantic-ui-react';
class MainStream extends React.Component{





  render()
  {
    return(
        <div>
          
          <ReactPlayer ref="player" url={this.props.url} playing={this.props.playing} volume={this.props.volume} muted={this.props.muted} 
          onPlay={this.props.handlePlay} onPause={this.props.handlePause} onProgress={this.props.handleProgress} 
          
          />
         
        </div>

      );

  }

}



export default MainStream;