import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import recipes from "./recipes";

const rootReducer = combineReducers({
  recipes,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
