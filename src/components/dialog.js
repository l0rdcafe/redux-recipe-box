import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import DialogForm from "./dialog-form";

const styles = theme => ({
  modal: {
    minWidth: 500
  }
});

const DialogElm = ({
  dialogType,
  nameID,
  ingredientsID,
  directionsID,
  submitID,
  closeID,
  handleSubmit,
  buttonType,
  currRecipe,
  classes
}) => (
  <Dialog open className={classes.modal}>
    <DialogTitle variant="title" align="center">
      {dialogType}
    </DialogTitle>
    <DialogContent className={classes.modal}>
      <DialogForm
        nameID={nameID}
        ingredientsID={ingredientsID}
        directionsID={directionsID}
        buttonType={buttonType}
        currRecipe={currRecipe}
        submitRecipe={handleSubmit}
        submitID={submitID}
        closeID={closeID}
        initialValues={
          buttonType === "Save"
            ? {
                recipe: currRecipe.recipe.replace(/-/g, " "),
                ingredients: currRecipe.ingredients.join(" \\ "),
                directions: currRecipe.directions.join(" \\\n\n")
              }
            : null
        }
      />
    </DialogContent>
  </Dialog>
);

DialogElm.propTypes = {
  dialogType: PropTypes.string.isRequired,
  nameID: PropTypes.string.isRequired,
  ingredientsID: PropTypes.string.isRequired,
  directionsID: PropTypes.string.isRequired,
  submitID: PropTypes.string.isRequired,
  closeID: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currRecipe: PropTypes.shape({
    recipe: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  classes: PropTypes.shape({
    modal: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(DialogElm);
