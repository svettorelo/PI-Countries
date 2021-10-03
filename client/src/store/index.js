import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";
//https://stackoverflow.com/questions/55027240/connecting-redux-devtools-and-thunk-middleware-to-store

const store = createStore(rootReducer,applyMiddleware(thunk));
export default store;