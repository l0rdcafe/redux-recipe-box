// @flow

function recipes(
  state: [] = [],
  action: { name?: string, i?: number, ingredients?: string[], directions?: string[], type: string }
) {
  switch (action.type) {
    case "ADD_RECIPE":
      return [...state, { recipe: action.name, ingredients: action.ingredients, directions: action.directions }];
    case "REMOVE_RECIPE":
      return [...state.slice(0, action.i), ...state.slice(action.i + 1)];
    case "EDIT_RECIPE":
      return [
        ...state.slice(0, action.i),
        { recipe: action.name, ingredients: action.ingredients, directions: action.directions },
        ...state.slice(action.i + 1)
      ];
    default:
      return state;
  }
}

export default recipes;
