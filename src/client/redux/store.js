// import redux essentials
import { createStore, combineReducers, applyMiddleware } from 'redux';

// kill logger for production
//import logger from "redux-logger";

// import reducers
import UserReducer from './reducers/UserReducer';
import ChatReducer from './reducers/ChatReducer';

// create store and list all reducers included in store, as well as new empty object and any middle-ware.
const store = createStore(
	combineReducers({
		UserReducer,
		ChatReducer
	}),
	{},
	applyMiddleware()
);

export default store;