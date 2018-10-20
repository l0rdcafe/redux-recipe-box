// @flow

const validate = (values: { recipe: string, ingredients: string, directions: string }) => {
  const errors = {};

  if (!values.recipe) {
    errors.recipe = "Recipe name is required";
  }

  if (!values.ingredients) {
    errors.ingredients = "Ingredients are required";
  }

  if (!values.directions) {
    errors.directions = "Directions are required";
  }

  return errors;
};

export default validate;
