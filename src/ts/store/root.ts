import { createStore, applyMiddleware, combineReducers } from 'redux';
import { rjvReducer, RVJActions } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export type RootAction =  
  | RVJActions;

const rootReducer = combineReducers({
  rjv: rjvReducer,
});

const enhancer = composeWithDevTools(applyMiddleware());


// create store
const store = createStore(rootReducer, undefined, enhancer);

// export store singleton instance
export default store;