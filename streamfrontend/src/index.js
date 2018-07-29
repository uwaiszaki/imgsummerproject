import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {Routes } from './routes.js';
import store from './store.js';

import { Provider } from 'react-redux';




ReactDOM.render(
   	<Provider store={store}>
    <Routes/> 
    </Provider>
    ,
  document.getElementById('root')
);
