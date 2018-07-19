import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {Routes } from './routes.js';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import {createStore} from 'redux';
//import streamReducer from '../reducers/streamReducer.js';


//const store = createStore(streamReducer);


ReactDOM.render(
    
    <Routes/>
  	

  ,
  document.getElementById('root')
);
