import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import TextareaWrapper from "./textarea-wrapper";
import validate from "../utils/validation";

const DialogForm = ({
  nameID,
  ingredientsID,
  directionsID,
  buttonType,
  currRecipe,
  submitRecipe,
  closeID,
  submitID,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit(submitRecipe)}>
    <div className="input-title">Recipe</div>
    <Field name="recipe" component={TextareaWrapper} rows="1" id={nameID} placeholder="Recipe Name" />
    <div className="input-title">Ingredients</div>
    <Field
      name="ingredients"
      component={TextareaWrapper}
      id={ingredientsID}
      placeholder={"Separate each ingredient with a '\\': \n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar"}
    />
    <br />
    <div className="input-title">Directions</div>
    <Field
      name="directions"
      component={TextareaWrapper}
      id={directionsID}
      placeholder={
        "Separate each step with a '\\': \n\nPreheat over to 350°F \\ \nCombine ingredients in pie crust \\ \nBake until crust is golden brown"
      }
    />
    <br />
    <Link to={`/${currRecipe.recipe.toLowerCase()}`}>
      <button className="corner-close">
        <FaTimes />
      </button>
    </Link>
    <button id={submitID} type="submit" className="unstyle-button submit-btn">
      {buttonType}
    </button>
    <Link to={`/${currRecipe.recipe.toLowerCase()}`}>
      <button id={closeID} className="unstyle-button edit-btn">
        Close
      </button>
    </Link>
  </form>
);

DialogForm.propTypes = {
  nameID: PropTypes.string.isRequired,
  ingredientsID: PropTypes.string.isRequired,
  directionsID: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitRecipe: PropTypes.func.isRequired,
  closeID: PropTypes.string.isRequired,
  submitID: PropTypes.string.isRequired
};

export default reduxForm({
  form: "recipeModal",
  validate
})(DialogForm);
