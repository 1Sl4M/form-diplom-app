import { combineReducers } from 'redux';
import {userReducer} from './actions';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
