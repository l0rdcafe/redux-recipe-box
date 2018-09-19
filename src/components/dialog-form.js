import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import TextareaWrapper from "./textarea-wrapper";
import validate from "../utils/validation";

const styles = theme => ({
  xBtn: {
    position: "absolute",
    top: 5,
    right: 5
  }
});

const DialogForm = ({
  nameID,
  ingredientsID,
  directionsID,
  buttonType,
  currRecipe,
  submitRecipe,
  closeID,
  submitID,
  handleSubmit,
  classes,
  invalid
}) => (
  <form onSubmit={handleSubmit(submitRecipe)}>
    <Field name="recipe" component={TextareaWrapper} rows="1" id={nameID} placeholder="Recipe Name" />
    <br />
    <Field
      name="ingredients"
      component={TextareaWrapper}
      id={ingredientsID}
      placeholder={"Separate each ingredient with a '\\': \n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar"}
    />
    <br />
    <Field
      name="directions"
      component={TextareaWrapper}
      id={directionsID}
      placeholder={
        "Separate each step with a '\\': \n\nPreheat over to 350°F \\ \nCombine ingredients in pie crust \\ \nBake until crust is golden brown"
      }
    />
    <br />
    <Link to={`/${currRecipe.recipe.toLowerCase()}`} href={`/${currRecipe.recipe.toLowerCase()}`}>
      <IconButton className={classes.xBtn}>
        <FaTimes />
      </IconButton>
    </Link>
    <DialogActions>
      <Link to={`/${currRecipe.recipe.toLowerCase()}`} href={`/${currRecipe.recipe.toLowerCase()}`}>
        <Button id={closeID}>Cancel</Button>{" "}
      </Link>
      <Link to={`/${currRecipe.recipe.toLowerCase()}`} href={`/${currRecipe.recipe.toLowerCase()}`}>
        <Button id={submitID} type="submit" color="primary" variant="raised" disabled={invalid}>
          {buttonType}
        </Button>
      </Link>
    </DialogActions>
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
  submitID: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    xBtn: PropTypes.string
  }).isRequired,
  invalid: PropTypes.bool.isRequired
};

export default reduxForm({
  form: "recipeModal",
  validate
})(withStyles(styles)(DialogForm));
