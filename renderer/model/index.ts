import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./files";

const reducer = combineReducers({
  files: filesReducer,
});

const store = configureStore({ reducer });

export default store;