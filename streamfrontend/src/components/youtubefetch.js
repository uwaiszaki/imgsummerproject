import React, { Component } from 'react';
import '../css/youtube.css';
import history from './historyobj.js';
import {  Button, Header, Icon, Input ,Form , Grid} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {urlChange} from '../actions/streamActions.js';

//import { BrowserRouter } from 'react-router-dom';
//import { BrowserRouter as Route } from 'react-router-dom';
//import { createBrowserHistory,} from 'history';

//const key = "AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3jdA";
//const oldkey = "AIzaSyA-KsE-v70lQ5iDQUtShISxG5NqzGIqUVY";

const url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-KsE-v70lQ5iDQUtShISxG5NqzGIqUVY&part=snippet,id&q=";
const a = "&videoDuration=any&order=viewCount&maxResults=10";
const b = "let url=https://www.youtube.com/watch?v=+response.items[0].id['videoId']";

class Youtube extends Component {
  constructor(props)
  {
    super(props);
    this.state = { resultyt :[] , videoname:""  , videoids:[]  ,url:"" , videoinfo:[] , title:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event)
  { event.preventDefault();
    const video =  this.state.videoname;

    fetch(url + video + a)
    .then(res => res.json())
    .then( response =>  {    console.log(video);
                            let resultyt=response.items.map(obj=>"https://www.youtube.com/watch?v="+obj.id.videoId);

                            this.setState({resultyt});
                            let videoids=response.items.map(obj=>obj.id.videoId);
                            this.setState({videoids});
                            this.setState({videoinfo:response.items});
                            console.log(this.state.videoids);
                            console.log(this.state.videoinfo);
                            console.log(response.items[0].snippet.title);
                            //this.props.urlChange(url);
                            

                            })
    .catch(error => { console.error('Error':error);   });
  
  }


  handleChange(event)
  {
    this.setState({videoname: event.target.value});
  }


  componentWillReceiveProps(newProps)
  {
    console.log(newProps.url);
  }


  render()
  {
    //const History =  createBrowserHistory();
  return(
          
             <div className='yplayer'> 





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

                        
                        <Header as='h3' style={{position:'fixed' , right:'5vw' , top:'0'}}  className='playing'>
                        <br/>
                        <Header.Content >Currenty Playing >>> <br/> </Header.Content>
                        <div className='play'>
                          {this.state.title==='' ? 'Not Playing Anything' : this.state.title}
                        </div>  
                       </Header>
                     
                     

                          </Grid.Column>
                          
                          <Grid.Column>
                    
                        </Grid.Column>
                      </Grid>

                      <div className='videopics' >
                        {   this.state.videoinfo.map(obj=><div className='videopicsclick' key={obj.id.videoId}> 
                            <img src={"https://img.youtube.com/vi/"+obj.id.videoId+"/0.jpg"} 
                            className='image'
                            onClick={()=> { this.props.urlChange('https://youtube.com/watch?v='+obj.id.videoId); this.setState({title:obj.snippet.title}); }  }/>
                            <br/><Header as='h3'>{obj.snippet.title}</Header>
                            </div>
                                        
                                                    ) 
                        }
                      </div>


          
         </div>
    );

  }
}



const mapStateToProps = state => ({ 
  url:state.streamReducers.url 
 }
 );

const mapDispatchToProps = (dispatch) => {
  return {
    urlChange: (e) => dispatch(urlChange(e)) 
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Youtube);

