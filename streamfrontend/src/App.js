import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes} from './routes.js';
import {browserHistory} from './historyobj.js';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input ,Form} from 'semantic-ui-react';
import Login from './login.js';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import MainStream from './stream.js';
import {Search} from './stream.js';
import { websocket } from './websocket.js';

class App extends Component{


  constructor(props)
  {
    super(props);
    
    this.state = { url:""  , urll:"", playing:true , muted:false , volume:0.5 , currtime:0 , visible:false };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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



  handleSubmit(event)
  {
    event.preventDefault();

    this.setState({url:this.state.urll});
    console.log(this.state.url);

  }
  handleChange(event)
  {
    this.setState({urll:event.target.value});
    console.log(this.state.url);
  }

   handlepasteChange(event)
  {
    this.setState({url:event.target.value});
    console.log(this.state.url);
  }

  render() {
    return (
 
      <div className="App">
       
        
        <Sidebar.Pushable as={Segment}>
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


            {(localStorage.getItem('token')) ?
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/logout");  }}>
              <Icon name='camera' />
              Log Out
            </Menu.Item>
            :null
            }



            {(browserHistory.location.pathname !== '/') ?
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/");  }}>
              <Icon name='camera' />
              stream
            </Menu.Item>
            :null
            }


            {(browserHistory.location.pathname !== '/search') ? 
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/search");  }}>
              <Icon name='camera' />
              stream
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
                    {(browserHistory.location.pathname==='/search' )?
                      
                    

                    <div className="search">
                      
	                		<Grid columns={3} >
	                  		<Grid.Column>
	                  
	                  		</Grid.Column>
	                  		<Grid.Column>
	                    		<Form  onSubmit={this.handleSubmit} error size="small">  
	                    		<Form.Input  fluid label="Search Url" type="text" name="url" value={this.state.urll}  onInput={this.handleChange}
	                    		  onPaste={this.handlepasteChange.bind(this)}
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
                    : null

                	}
                    <div className="scroll" >
                    		<BrowserRouter >
							<div>
								
								<Route exact path="/"  render={ () => <MainStream  handlePlay={this.handlePlay} handlePause={this.handlePause} handleProgress={this.handleProgress} 
								url={this.state.url} playing={this.state.playing}  volume={this.state.volume} muted={this.state.muted} 
								/>} />
								
							</div>
							</BrowserRouter>


                    </div>
              
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
                            <div className="footer" style={{height:'.2vh'} , {marginDown:"0"}}>
                            <Grid columns={3} divided>
                              <Grid.Column width={1} floated="left">
                                <Icon name="play" />
                              </Grid.Column>
                              <Grid.Column width={13}><Input type="range" min="0" max="100" style={{width:"80vw"}}/>
                              </Grid.Column>
                              <Grid.Column width={2} floated="right" >
                                <Icon name="volume up" /> 
                                <Input type="range" min="0" max="100" style={{width:"5vw"}}/>
                              </Grid.Column>
                            </Grid>      
                            </div>
      
      </div>

      );
  }
}


export default App;
