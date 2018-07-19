import React, { Component } from 'react';

class Youtube extends Component {
  constructor()
  {
    super();
    this.state = { resultyt = [] ,  };
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  handleSUbmit(event)
  {	



  }
  render()
  {
      //const browserHistory =  createBrowserHistory()     
      //if(!localStorage.getItem('token'))
      //{
        return(
          <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/tI8ijLpZaHk" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>

          </div>
          );
 

  }    
  


}


export default Youtube;










