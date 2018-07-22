import React, { Component } from 'react';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input} from 'semantic-ui-react';
//<Button onClick={this.handleButtonClick} >Toggle visibility</Button>
import MainStream from './stream.js';
import Login from './login.js';
import './App.css';
import {browserHistory} from './historyobj.js';


export default class MainApp extends Component {
  constructor(props)
  {
    super(props);
    this.state= { visible:false };
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })


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


            {(browserHistory.location.pathname === '/stream') ?
            <Menu.Item as='a' onClick={()=>{ this.props.history.push("/logout");  }}>
              <Icon name='camera' />
              Log Out
            </Menu.Item>
            :null
            }
          </Sidebar>

          <Sidebar.Pusher>
                          
                          
              <Segment basic class="mainstream">

                              <Button icon onClick={this.handleButtonClick} className="buttonA">
                              <Icon name='list'/>
                              </Button>
                     <div className="topheader">
                       <Header as='h1' icon textAlign='center'>
                       <Icon name='music' circular />
                       <Header.Content>Stream</Header.Content>
                       </Header>
                      
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