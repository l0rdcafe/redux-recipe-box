// @flow

export function addRecipe(name: string, ingredients: string[], directions: string[]) {
  return {
    type: "ADD_RECIPE",
    name,
    ingredients,
    directions
  };
}

export function editRecipe(name: string, ingredients: string[], directions: string[], i: number) {
  return {
    type: "EDIT_RECIPE",
    name,
    ingredients,
    directions,
    i
  };
}

export function removeRecipe(i: number) {
  return {
    type: "REMOVE_RECIPE",
    i
  };
}
