import { createStore } from "redux";
import recipeIndex from "../data/recipes";
import rootReducer from "../reducers/index";
import LSM from "../utils/local-storage-manager";

const recipes =
  !LSM.get("recipe-item") || LSM.get("recipe-item").length === 0 ? [...recipeIndex] : LSM.get("recipe-item");

const defaultState = {
  recipes
};

const store = createStore(rootReducer, defaultState);

export default store;
