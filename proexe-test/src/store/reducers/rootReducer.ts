import { combineReducers } from "redux";
import userReducer from "./userReducer";

const RootReducer = combineReducers({
    user: userReducer,
    //more reducers
  });
  
  export default RootReducer;