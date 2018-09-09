import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DialogForm from "./dialog-form";

const DialogWrapper = styled.div`
  text-align: center;
  position: fixed;
  width: 500px;
  min-width: 300px;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -200px;
  box-shadow: 0 0 2px black;
  border-radius: 4px;
  background: #fff;
  z-index: 1000;

  textarea {
    margin-bottom: 10px;
    background: #ecf0f0;
    min-width: 300px;
    min-height: 60px;
    resize: vertical;
    color: darken(#176f8a, 10%);
    font-weight: bold;
    font-size: 13px;
    overflow: auto;
    border: 1px solid #176f8a;
  }

  textarea:first-of-type {
    resize: none;
    min-height: 15px;
  }

  textarea:nth-of-type(3) {
    min-height: 100px;
  }

  textarea:focus {
    box-shadow: 0 0 5px #176f8a;
    outline: 1px solid #176f8a;
    border: 1px solid #176f8a;
  }

  .input-title {
    margin: 5px;
  }

  .corner-close {
    background: none;
    border: none;
    outline: none;
    color: #176f8a;
    font-size: 20px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    transition: opacity 0.25s;
  }

  .corner-close:hover {
    opacity: 0.6;
  }

  .unstyle-button {
    background: none;
    border: none;
    outline: none;
    color: #176f8a;
    cursor: pointer;
    transition: opacity 0.25s;
  }

  .unstyle-button:hover {
    opacity: 0.6;
  }

  .edit-btn,
  .submit-btn {
    padding: 1% 2%;
    background: #ecf0f0;
    margin: 2%;
    border-radius: 2px;
    font-size: 0.75rem;
    transition: opacity 0.25s;
  }
`;

const Dialog = ({
  dialogType,
  nameID,
  ingredientsID,
  directionsID,
  submitID,
  closeID,
  handleSubmit,
  buttonType,
  currRecipe
}) => (
  <DialogWrapper>
    <h2>{dialogType}</h2>
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
  </DialogWrapper>
);

Dialog.propTypes = {
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
  }).isRequired
};

export default Dialog;
