// @flow

import React from "react";
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

type DialogElmProps = {
  dialogType: string,
  nameID: string,
  ingredientsID: string,
  directionsID: string,
  submitID: string,
  closeID: string,
  buttonType: string,
  handleSubmit: () => void,
  currRecipe: { recipe: string, ingredients: string[], directions: string[] },
  classes: { modal: string }
};

const DialogElm = (props: DialogElmProps) => (
  <Dialog open className={props.classes.modal}>
    <DialogTitle variant="title" align="center">
      {props.dialogType}
    </DialogTitle>
    <DialogContent className={props.classes.modal}>
      <DialogForm
        nameID={props.nameID}
        ingredientsID={props.ingredientsID}
        directionsID={props.directionsID}
        buttonType={props.buttonType}
        currRecipe={props.currRecipe}
        submitRecipe={props.handleSubmit}
        submitID={props.submitID}
        closeID={props.closeID}
        initialValues={
          props.buttonType === "Save"
            ? {
                recipe: props.currRecipe.recipe.replace(/-/g, " "),
                ingredients: props.currRecipe.ingredients.join(" \\ "),
                directions: props.currRecipe.directions.join(" \\\n\n")
              }
            : null
        }
      />
    </DialogContent>
  </Dialog>
);

export default withStyles(styles)(DialogElm);
