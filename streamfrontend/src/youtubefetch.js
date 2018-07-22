import React, { Component } from 'react';
import './App.css';
import {browserHistory} from './historyobj.js';
import {  Button, Header, Icon, Input ,Form , Grid} from 'semantic-ui-react';

//import { BrowserRouter } from 'react-router-dom';
//import { BrowserRouter as Route } from 'react-router-dom';
//import { createBrowserHistory,} from 'history';

//const key = "AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3jdA";
//const oldkey = "AIzaSyA-KsE-v70lQ5iDQUtShISxG5NqzGIqUVY";

const url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-KsE-v70lQ5iDQUtShISxG5NqzGIqUVY&part=snippet,id&q=";
const a = "&videoDuration=any&order=viewCount&maxResults=10";


class Youtube extends Component {
  constructor()
  {
    super();
    this.state = { resultyt :[] , videoname:""  , videoid:"" , visible:false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event)
  { event.preventDefault();
    const video =  this.state.videoname;

    fetch(url + video + a)
    .then(res => res.json())
    .then( response =>  {    console.log(video);
                            const resultyt = response.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
                            this.setState({resultyt});
                            console.log(this.state.resultyt);
                             })
    .catch(error => { console.error('Error':error);   });
  
  }


  handleChange(event)
  {
    this.setState({videoname: event.target.value});
  }

  handleButtonClick = (event) => { browserHistory.push('/'); window.location.reload(); }

 

  selectVideo(event)
  {
    alert("Clicked on video");
  }
  render()
  {
    //const History =  createBrowserHistory();
  return(
          
             <div className='yplayer'> 



                              <Button icon onClick={this.handleButtonClick} className="buttonA">
                              Stream Live  <Icon name='backward'/> 
                              </Button>
                     <div className="topheader">
                       <Header as='h1' icon textAlign='center'>
                       <Icon name='music' circular />
                       <Header.Content>Stream On Youtube</Header.Content>
                       </Header>
                     </div>


                      <Grid columns={3} >
                        <Grid.Column>
                    
                        </Grid.Column>
                        <Grid.Column>

                          <Form   onSubmit={this.handleSubmit} error size="small">  
                          <Header as="h3" textAlign='center'> Search </Header>
                          <Form.Input  fluid  type="text" name="url" value={this.state.videoname}  onChange={this.handleChange}  
                            placeholder="Search" />
                          <Button icon style={{marginLeft:'14vw'}}>
                          Search
                          <Icon name='search' />
                          </Button>  
                          </Form>


                          </Grid.Column>
                          <Grid.Column>
                    
                        </Grid.Column>
                      </Grid>
                     
                  { 
                  this.state.resultyt.map((link , i)=> {  
              
                  return( 
                  <div className='youtube' key={i}  > <iframe width="1000" height="600" src={link} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen  ></iframe> </div>
                  ) ;                                  }
                                    )
                   }


          
         </div>
    );

  }
}




export default Youtube;