import { combineReducers } from 'redux';
import { commonDataReducer } from '.';

const rootReducer = combineReducers({
  commonDataStore: commonDataReducer,
});

export default rootReducer;
