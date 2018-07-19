import {createStore} from 'redux';
import streamReducer from '../reducers/streamReducer.js';

export default function configureStore(initialState) {
  return createStore(streamReducer);
}