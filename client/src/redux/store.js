import { createStore,combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./reducers/userReducer";
import thunk from 'redux-thunk'

const combined = combineReducers({
    userReducer
})

export const store = createStore(combined, composeWithDevTools(applyMiddleware(thunk)))