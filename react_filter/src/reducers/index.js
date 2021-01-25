import { combineReducers } from 'redux';
import browse from "./people";

const rootReducer = combineReducers({
  people: browse
});

export default rootReducer;
