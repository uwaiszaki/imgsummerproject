import React, { Component } from 'react';
import './App.css';
import './css/stream.css';
import {Routes} from './routes.js';
import history from './components/historyobj.js';
import { Dropdown, Button, Header, Icon, Image, Menu, Segment, Sidebar   , Tab , Grid , Input ,Form} from 'semantic-ui-react';
import Login from './components/login.js';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Search from './components/stream.js';
import Youtube from './components/youtubefetch.js';
import Player from './components/player.js';
import Footer from './components/footer.js';

class App extends Component{


  constructor(props)
  {
    super(props);
    
    this.state = { visible:false };

  }
  

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })



  render() {
  	

    return (
 			

      <div className="container">
       	
        
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
            
            {(history.location.pathname === '/profile')   ?  null : (localStorage.getItem('token')) ? 
            <Menu.Item as='a' onClick={()=>{ 
                      fetch('http://127.0.0.1:8000/stream/getuser/'+localStorage.getItem('token'))
                      .then(res => res.json())
                      .then( response =>  {
                            localStorage.setItem('user', response.user);    
                            console.log(localStorage.getItem('user'));
                            console.log(response); 
                            


                           })
                      .catch(error => console.error('Error:', error));

              history.push("/profile"); 
              
               }} >
              <Icon name='address card outline' className='sidebaricons'/>
              Profile
            </Menu.Item>
            : null
        	}


            {(localStorage.getItem('token')) ?
            <Menu.Item as='a' onClick={()=>{ history.push("/logout");  this.setState({ e: Math.random() }); }}>
              <Icon name='camera' className='sidebaricons'/>
              Log Out
            </Menu.Item>
            :null
            }



            {(history.location.pathname === '/') ? null : (localStorage.getItem('is_staff')==='true') ? 
            <Menu.Item as='a' onClick={()=>{ history.push("/"); this.setState({ d: Math.random() }); }}>
              <Icon name='camera' className='sidebaricons'/>
              stream
            </Menu.Item>
            : null
            }



            {(history.location.pathname === '/search') ? null : (localStorage.getItem('token')) ?  
            <Menu.Item as='a' onClick={()=>{ history.push("/search"); this.setState({ c: Math.random() }); }}>
              <Icon name='search' className='sidebaricons'/>
              Search
            </Menu.Item>
            :null
            }


            {(history.location.pathname === '/youtube') ? null : (localStorage.getItem('token')) ?  
            <Menu.Item as='a' onClick={()=>{ history.push("/youtube");    }}>
              <Icon name='camera' className='sidebaricons'/>
              Search On Youtube
            </Menu.Item>
            :null
            }

            {(history.location.pathname==='/admin') ? null : (localStorage.is_staff==='true') ?
            <Menu.Item as='a' onClick={()=>{ history.push("/admin");    }}>
              <Icon name='camera' className='sidebaricons'/>
              Admin View
            </Menu.Item>
        	: null				}
          </Sidebar>

          <Sidebar.Pusher>
                          
                          
              <Segment basic className="mainstream">
           						
                              <Button icon onClick={this.handleButtonClick} className="buttonA" color='true red'  >
                              <Icon name='list' />
                              </Button>

                     <div className="topheader">
                       <Header as='h1' icon textAlign='center' icon color='true red'>
                       <Icon name='music' />
                       <Header.Content>Stream</Header.Content>
                       </Header>
                     </div>

                    <div className="scroll" >
                    		<BrowserRouter >
            							<div style={{height:'80vh'}}>
            								<Switch>
            								<Route exact path="/search"  render={ () => <Search/> } /> 
            								<Route exact path="/youtube"  render={ () => <Youtube/> } />
            								
                            {(localStorage.getItem('is_staff')==='true') ?
                            <Route exact path="/"  render={() => <Player /> }/>
                            : <Redirect to="/search" />}
            								</Switch>
            							</div>
            						</BrowserRouter>


                    </div>


              
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
                          <div >  
                            <Footer />
                          </div>       
                            
      
      </div>

      );
  }
}




export default App;
