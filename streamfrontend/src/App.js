import React, { Component } from 'react';
import './App.css';
import {Routes} from './routes.js';
import {browserHistory} from './historyobj.js';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input ,Form} from 'semantic-ui-react';
import Login from './login.js';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import {Search} from './stream.js';
import { websocket } from './websocket.js';
import InputSlider from 'react-input-slider';
import ReactPlayer from 'react-player';
import Youtube from './youtubefetch.js';
import YouTubePlayer from 'react-player/lib/players/YouTube'


class App extends Component{


  constructor(props)
  {
    super(props);
    
    this.state = { url:"https://www.youtube.com/watch?v=H2f7MZaw3Yo", playing:true , muted:false , volume:0.5 , currtime:0 , visible:false , duration:100 , clickedlink:""};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDuration=this.handleDuration.bind(this);
    this.handleTimeChange=this.handleTimeChange.bind(this);

    //this.handleDuration = this.handleDuration.bind(this);
    //this.handleEnd = this.handleEnd.bind(this);
    //this.handleError = this.handleError.bind(this);

  }
  

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })



  componentDidMount()
  {
    
    
    websocket.onmessage = (event) => 
    { 
      let data = JSON.parse(event.data);
      if(data['currtime'] !== this.state.currtime )
      {
        this.player.seekTo(data['currtime']);

      }
      this.setState({
        url : data['url'] , 
        playing : data['playing'] ,
        muted : data['muted'] ,
        volume : data['volume'] ,
        currtime : data['currtime'] , 
        duration : data['duration'] , 

      });
        this.player.volume = this.state.volume;
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
      duration : this.state.duration , 
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
      duration : this.state.duration ,
    };
    websocket.send(JSON.stringify(data));
    console.log("handlePause");
  }
  handleProgress(progressinfo)
  { 
    this.setState({ currtime:progressinfo['playedSeconds'] });
    
    let data = {
      url :this.state.url , 
      playing:this.state.playing ,
      muted:this.state.muted , 
      volume:this.state.volume , 
      currtime : this.state.currtime ,
      duration : this.state.duration ,
    };
    websocket.send(JSON.stringify(data));
    console.log("handleProgress");  
  }

  handleDuration(duration)
  {
  	this.setState({duration:duration});
  	let data = {
      url :this.state.url , 
      playing:this.state.playing ,
      muted:this.state.muted , 
      volume:this.state.volume , 
      currtime : this.state.currtime ,
      duration : this.state.duration ,
    };
    websocket.send(JSON.stringify(data));
    console.log("handleDuration");  
  }

  handleSubmit(url)
  {
    event.preventDefault();

    this.setState({url:url} , console.log(this.state.url));
    

  }

  handleChange(newstate)
  {
    this.setState(newstate);
    console.log(this.state.url);
  }

   handlepasteChange(event)
  {
    this.setState({url:event.target.value});
    console.log(this.state.url);
  }

  handleTimeChange(event)
  {
  	this.setState({currtime:event.target.value} ,
  		() => {
  			this.player.seekTo(this.state.currtime);
	
	
		let data = {
      	url :this.state.url , 
      	playing:this.state.playing ,
      	muted:this.state.muted , 
      	volume:this.state.volume , 
      	currtime : this.state.currtime ,
      	duration : this.state.duration ,
    	};
    	websocket.send(JSON.stringify(data));
    	console.log("Time Of Video Changed");

  		}
  		); 
  	
  }

  ref = (player) => {
    this.player = player;
  }

 

  handleEnd(event)
  {
  	this.setState({url:"" , currtime:0 },
  		() => {
				let data = {
		      	url :this.state.url , 
		      	playing:this.state.playing ,
		      	muted:this.state.muted , 
		      	volume:this.state.volume , 
		      	currtime : this.state.currtime ,
		      	duration : this.state.duration ,
		    	};
		    	websocket.send(JSON.stringify(data));
		    	console.log("Video has Ended");

		  		}

  		);

  }


  render() {
  	var slider = document.getElementById('timeslider');

  	const that = this;
    return (
 
      <div className="App">
       
        
        <Sidebar.Pushable as={Segment} >
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width='thin'
          > 
            {(localStorage.getItem('token')) ? null : 
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/login");  }}>
              
              <Icon name='home'  />
              Login
            </Menu.Item>
            }
            
            {(browserHistory.location.pathname === '/profile')   ?  null : (localStorage.getItem('token')) ? 
            <Menu.Item as='a' onClick={()=>{ 
                      fetch('http://127.0.0.1:8000/stream/getuser/'+localStorage.getItem('token'))
                      .then(res => res.json())
                      .then( response =>  {
                            localStorage.setItem('user', response.user);    
                            console.log(localStorage.getItem('user'));
                            console.log(response); 
                            


                           })
                      .catch(error => console.error('Error:', error));

              browserHistory.push("/profile"); 
              window.location.reload();
               }} >
              <Icon name='address card outline' />
              Profile
            </Menu.Item>
            : null
        	}


            {(localStorage.getItem('token')) ?
            <Menu.Item as='a' onClick={()=>{ browserHistory.push("/logout"); window.location.reload();  }}>
              <Icon name='camera' />
              Log Out
            </Menu.Item>
            :null
            }



            {(browserHistory.location.pathname !== '/') ?
            <Menu.Item as='a' onClick={()=>{ browserHistory.push("/");  window.location.reload(); }}>
              <Icon name='camera' />
              stream
            </Menu.Item>
            :null
            }



            {(browserHistory.location.pathname === '/search') ? null : (localStorage.getItem('token')) ?  
            <Menu.Item as='a' onClick={()=>{ browserHistory.push("/search"); window.location.reload(); }}>
              <Icon name='search' />
              Search
            </Menu.Item>
            :null
            }


            {(browserHistory.location.pathname === '/youtube') ? null : (localStorage.getItem('token')) ?  
            <Menu.Item as='a' onClick={()=>{ browserHistory.push("/youtube"); window.location.reload();   }}>
              <Icon name='camera' />
              Search On Youtube
            </Menu.Item>
            :null
            }

          </Sidebar>

          <Sidebar.Pusher>
                          
                          
              <Segment basic className="mainstream">

                              <Button icon onClick={this.handleButtonClick} className="buttonA">
                              <Icon name='list'/>
                              </Button>
                     <div className="topheader">
                       <Header as='h1' icon textAlign='center'>
                       <Icon name='music' circular />
                       <Header.Content>Stream</Header.Content>
                       </Header>
                     </div>



                    <div className="scroll" >
                    		<BrowserRouter >
							<div style={{height:'80vh'}}>
								<Route exact path="/search"  render={ () => <Search    handleSubmit={this.handleSubmit} /> } /> 
								
								<Route exact path="/"  render={ () => 
									        <div className='player'>
          
          										<ReactPlayer ref={this.ref} url={this.state.url} playing={this.state.playing} 
          											volume={this.state.volume} muted={this.state.muted} 
 	        										onPlay={this.handlePlay} onPause={this.handlePause} onEnded={this.handleEnd.bind(this)} 
 	        										onProgress={this.handleProgress} onDuration={this.handleDuration} 
 	        										style={{height:'70vh' , width:'70vw'  , marginLeft:'7vw'}}
          
          										/>
         
        									</div>



								} />

								
							</div>
							</BrowserRouter>


                    </div>


              
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
                            <div className="footer" >
                            <Grid columns={3} divided className="footer">
                              <Grid.Column width={1} floated="left">
                                <Header as="h6" icon textAlign='center'>
                                {(this.state.playing === false) ?
                                <Icon name="play" onClick={()=>this.setState({playing:true})}/>
                                : <Icon name="pause" onClick={()=>this.setState({playing:false})}/>
                            	}
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={13}>
                              		<Input type="range" min="0" max={this.state.duration} 
                              		value={this.state.currtime} onChange={this.handleTimeChange} style={{width:"80vw"}}/>
                              </Grid.Column>
                              <Grid.Column width={2} floated="right" >
                              	<Header as="h6" icon>
                                <Icon name="volume up" />
                                </Header> 
                                <Input type="range" min="0" max="100" style={{width:"6vw"}} value={this.state.volume} 
                                	onChange={(e)=> { this.setState({volume:e.target.value});  this.player.volume = this.state.volume;} }/>
                              </Grid.Column>
                            </Grid>
                                 
                            </div>
      
      </div>

      );
  }
}


export default App;
