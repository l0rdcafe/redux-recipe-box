// @flow

import { createStore } from "redux";
import recipeIndex from "../data/recipes";
import rootReducer from "../reducers/index";
import LSM from "../utils/local-storage-manager";

let recipes = LSM.get();

if (!recipes || recipes.length === 0) {
  recipes = [...recipeIndex];
}

const defaultState = {
  recipes
};

const store = createStore(rootReducer, defaultState);

export default store;
