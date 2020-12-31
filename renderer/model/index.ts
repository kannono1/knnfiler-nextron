import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import todoReducer from "./todos";

const reducer = combineReducers({
  user: userReducer,
  todos: todoReducer
});

const store = configureStore({ reducer });

export default store;