import { combineReducers } from 'redux';

import pets from './pets';

const rootReducer = combineReducers({
  pets,
});

export default rootReducer;
