import { combineReducers } from 'redux';
import streamReducers from './streamReducers.js';

export default combineReducers({
  streamReducers: streamReducers,
  // More reducers if there are
  // can go here
});