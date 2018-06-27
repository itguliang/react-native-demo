import { combineReducers } from 'redux';
import { INCREASE, DECREASE, RESET} from '../constants/counterActionsTypes';

// 原始默认state
const countDefaultState = {
  count: 5,
  factor: 1
}

export default function counter(state=countDefaultState, action) {
  switch (action.type) {
    case INCREASE:
      return { ...state, count: state.count + state.factor };
    case DECREASE:
      return { ...state, count: state.count - state.factor };
    case RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
}