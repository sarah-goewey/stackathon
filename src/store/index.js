import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import stickies from "./stickies";
import users from "./users";

const reducer = combineReducers({
  auth,
  stickies,
  users,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./stickies";
export * from "./users";
