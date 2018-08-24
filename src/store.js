import { createStore } from "redux";
import recipeIndex from "./recipes";
import rootReducer from "./reducers/index";
import LSM from "./local-storage-manager";

const recipes =
  !LSM.get("recipe-item") || LSM.get("recipe-item").length === 0 ? [...recipeIndex] : LSM.get("recipe-item");

const defaultState = {
  recipes
};

const store = createStore(rootReducer, defaultState);

export default store;
