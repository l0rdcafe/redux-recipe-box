// @flow

import React from "react";
import { Field, reduxForm } from "redux-form";
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

type DialogFormProps = {
  nameID: string,
  ingredientsID: string,
  directionsID: string,
  buttonType: string,
  currRecipe: { recipe: string, ingredients: string[], directions: string[] },
  handleSubmit: Function => void,
  submitRecipe: Object => void,
  closeID: string,
  submitID: string,
  classes: { xBtn: string },
  invalid: Boolean
};

const DialogForm = (props: DialogFormProps) => (
  <form onSubmit={props.handleSubmit(props.submitRecipe)}>
    <Field name="recipe" component={TextareaWrapper} rows="1" id={props.nameID} placeholder="Recipe Name" />
    <br />
    <Field
      name="ingredients"
      component={TextareaWrapper}
      id={props.ingredientsID}
      placeholder={"Separate each ingredient with a '\\': \n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar"}
    />
    <br />
    <Field
      name="directions"
      component={TextareaWrapper}
      id={props.directionsID}
      placeholder={
        "Separate each step with a '\\': \n\nPreheat over to 350°F \\ Combine ingredients in pie crust \\ Bake until crust is golden brown"
      }
    />
    <br />
    <Link to={`/${props.currRecipe.recipe.toLowerCase()}`} href={`/${props.currRecipe.recipe.toLowerCase()}`}>
      <IconButton className={props.classes.xBtn} id="cancel">
        <FaTimes />
      </IconButton>
    </Link>
    <DialogActions>
      <Link to={`/${props.currRecipe.recipe.toLowerCase()}`} href={`/${props.currRecipe.recipe.toLowerCase()}`}>
        <Button id={props.closeID}>Cancel</Button>{" "}
      </Link>
      <Button
        id={props.submitID}
        type="submit"
        color="primary"
        onClick={props.submitRecipe}
        variant="raised"
        disabled={props.invalid}
      >
        {props.buttonType}
      </Button>
    </DialogActions>
  </form>
);

export default reduxForm({
  form: "recipeModal",
  validate
})(withStyles(styles)(DialogForm));
