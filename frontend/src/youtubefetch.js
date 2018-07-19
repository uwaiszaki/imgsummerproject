import React, { Component } from 'react';
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
    this.state = { resultyt :[] , videoname:""  , videoid:""};
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
  selectVideo(event)
  {
    alert("Clicked on video");
  }
  render()
  {
    //const History =  createBrowserHistory();
  return(
          
        <div>
         {  
           (localStorage.getItem('token')) ?
             <div> 
                <form  onSubmit={this.handleSubmit}>
                  Search On Youtube<input type="text" name="videoname" value={this.state.videoname}  onChange = {this.handleChange} /><br/>
                  <input type='submit' /></form>
              </div>  : null
          }     
          { 
              this.state.resultyt.map((link , i)=> {  
              
                return( 
                <div key={i}  > <iframe width="560" height="315" src={link} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen  ></iframe> <hr/></div>
                );                                  }
                                    )
          }
          
          </div>
    );

  }
}




export default Youtube;