export function addRecipe(name, ingredients, directions) {
  return {
    type: "ADD_RECIPE",
    name,
    ingredients,
    directions
  };
}

export function editRecipe(name, ingredients, directions, i) {
  return {
    type: "EDIT_RECIPE",
    name,
    ingredients,
    directions,
    i
  };
}

export function removeRecipe(i) {
  return {
    type: "REMOVE_RECIPE",
    i
  };
}
