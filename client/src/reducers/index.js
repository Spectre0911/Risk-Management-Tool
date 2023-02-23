import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

export const allReducers = combineReducers({
  email: loginReducer,
});
