import React, { Fragment } from "react";
import PropTypes from "prop-types";

const TextareaWrapper = props => {
  const { input, meta } = props;
  let inputBorderColor;

  if (meta.valid && meta.touched) {
    inputBorderColor = "green";
  } else if (meta.invalid && meta.touched && !meta.active) {
    inputBorderColor = "red";
  } else {
    inputBorderColor = "";
  }
  return (
    <Fragment>
      <textarea {...props} {...input} value={input.value} style={{ borderColor: inputBorderColor }} />
      {meta.error && meta.touched && !meta.active && <div style={{ color: "red" }}>{meta.error}</div>}
    </Fragment>
  );
};

TextareaWrapper.propTypes = {
  input: PropTypes.isRequired
};

export default TextareaWrapper;
