import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const TextArea = props => {
  const { input, meta, ...custom } = props;
  let name;

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
        helperText={!meta.active && meta.touched ? meta.error : ""}
        error={meta.touched && meta.error && !meta.active}
        multiline={name !== "Recipe Title"}
        rows={name !== "Recipe Title" ? "4" : null}
        margin="dense"
        {...input}
        {...custom}
        fullWidth
      />
    </Fragment>
  );
};

TextArea.propTypes = {
  input: PropTypes.isRequired,
  meta: PropTypes.isRequired
};

export default TextArea;
