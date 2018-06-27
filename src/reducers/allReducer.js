import { combineReducers } from 'redux';
import counter from './counterReducer';
import timer from './timerReducer';

const allReducers = combineReducers({
  timer: timer,
  counter: counter,
});

export default allReducers;