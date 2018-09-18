import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";

const TextArea = props => {
  const { input, meta } = props;
  let inputBorderColor;
  let name;

  if (meta.valid && meta.touched) {
    inputBorderColor = "green";
  } else if (meta.invalid && meta.touched && !meta.active) {
    inputBorderColor = "red";
  } else {
    inputBorderColor = "";
  }

  if (input.name === "recipe") {
    name = "Recipe Title";
  } else if (input.name === "ingredients") {
    name = "Ingredients";
  } else {
    name = "Directions";
  }

  return (
    <Fragment>
      <TextField
        id={name.toLowerCase().replace(/\s+/g, "-")}
        type="text"
        label={name}
        multiline={name !== "Recipe Title"}
        rows={name !== "Recipe Title" ? "4" : null}
        margin="dense"
        {...props}
        {...input}
        value={input.value}
        style={{ borderColor: inputBorderColor }}
        fullWidth
      >
        {meta.error &&
          meta.touched &&
          !meta.active && <DialogContentText style={{ color: "red" }}>{meta.error}</DialogContentText>}
      </TextField>
    </Fragment>
  );
};

TextArea.propTypes = {
  input: PropTypes.isRequired,
  meta: PropTypes.isRequired
};

export default TextArea;
