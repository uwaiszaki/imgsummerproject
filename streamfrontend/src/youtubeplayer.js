import Youtube from './youtubefetch.js';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes} from './routes.js';
import {browserHistory} from './historyobj.js';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input ,Form} from 'semantic-ui-react';
import Login from './login.js';

const url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-KsE-v70lQ5iDQUtShISxG5NqzGIqUVY&part=snippet,id&q=";
const a = "&videoDuration=any&order=viewCount&maxResults=10";


export default class YPlayer extends Component
{

	constructor(props)
	{
		super(props);
		this.state = {playing:true , volume:.5 , currtime:0 , muted:false , url:"" , duration:100  , visible:false , resultyt :[] , videoname:""  };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event)
  	{ event.preventDefault();
    	const video =  this.state.videoname;

   		 fetch(url + video + a)
    	.then(res => res.json())
    	.then( response =>  {    console.log(video);
                            const resultyt = response.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
                            this.setState({resultyt} ,this.props.handleSubmit(this.state.resultyt) );
                            console.log(this.state.resultyt);
                             })
    	.catch(error => { console.error('Error':error);   });

    
  
  	}


  handleChange(event)
  {
    this.setState({videoname: event.target.value});
  }

	handlePlay = () =>
	{
		this.setState({playing:true});
	}


	handlePause = () =>
	{
		this.setState({playing:false});
	}


	handleEnd = () =>
	{
		this.setState({url:"" , currtime:0});
	}


	handleProgress = (progressinfo) =>
	{
		  this.setState({ currtime:progressinfo['playedSeconds'] });
   	}


	handleDuration = (duration) =>
	{
		  this.setState({ duration:duration });
   	}

   	handleButtonClick = () => this.setState({ visible: !this.state.visible })

  	handleSidebarHide = () => this.setState({ visible: false })
	


	render()
	{
		return(								

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

              this.props.history.push("/profile");  }} >
              <Icon name='address card outline' />
              Profile
            </Menu.Item>
            : null
        	}


            {(localStorage.getItem('token')) ?
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/logout"); window.location.reload(); }}>
              <Icon name='camera' />
              Log Out
            </Menu.Item>
            :null
            }



            {(browserHistory.location.pathname !== '/') ?
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/"); window.location.reload(); }}>
              <Icon name='camera' />
              stream
            </Menu.Item>
            :null
            }


            {(browserHistory.location.pathname === '/search') ? null : (localStorage.getItem('token')) ?  
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/search"); window.location.reload(); }}>
              <Icon name='camera' />
              Search
            </Menu.Item>
            :null
            }

            {(browserHistory.location.pathname === '/youtubesearch') ? null : (browserHistory.location.pathname === '/youtubeplayer') ? null :
            (localStorage.getItem('token')) ?    
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/youtubesearch"); window.location.reload(); }}>
              <Icon name='camera' />
              Youtube Player
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


                     			<Route exact path="/youtubesearch" render={ () => {

						             <div> 
						                <form  onSubmit={this.handleSubmit}>
						                  Search On Youtube<input type="text" name="videoname" value={this.state.videoname}  onChange = {this.handleChange} /><br/>
						                  <input type='submit' /></form>
						              </div> 

                     			 } } />


								<Route exact path="/youtubeplayer"  render={ () => {

									        <div className='player'>
          
          										<YouTubePlayer ref={this.ref} url={this.state.url} playing={this.state.playing} 
          											volume={this.state.volume} muted={this.state.muted} 
 	        										onPlay={this.handlePlay} onPause={this.handlePause} onEnded={this.handleEnd.bind(this)} 
 	        										onProgress={this.handleProgress} onDuration={this.handleDuration} 
 	        										style={{height:'70vh' , width:'70vw'  , marginLeft:'7vw'}}
          
          										/>
         
        									</div>
        								} } />



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