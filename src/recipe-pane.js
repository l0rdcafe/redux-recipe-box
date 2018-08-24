import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";

const RecipeWrapper = styled.div`
  .recipe-view {
    padding: 2%;
  }

  .recipe-view-name {
    font-size: 1.5rem;
    color: #000;
    text-transform: uppercase;
    text-align: center;
  }

  .recipe-body {
    width: 100%;
  }

  button[title="Edit Recipe"],
  button[title="Delete Recipe"] {
    float: right;
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
`;

const RecipePane = ({ displayRecipe, handleDelete }) => {
  const recipe = (
    <RecipeWrapper>
      <div id={displayRecipe.recipe.toLowerCase()} className="recipe-view">
        <div className="recipe-title">
          <div className="recipe-view-name title-row">{displayRecipe.recipe.replace(/-/g, " ")}</div>
          <div className="title-row">
            <Link to="/">
              <button
                id={`delete-${displayRecipe.recipe.toLowerCase()}`}
                onClick={handleDelete}
                title="Delete Recipe"
                value={displayRecipe.recipe}
                className="unstyle-button"
              >
                <FaTrash size={20} />
              </button>
            </Link>
            <Link to={`/${displayRecipe.recipe.toLowerCase()}/edit`}>
              <button
                id={`edit-${displayRecipe.recipe.toLowerCase()}`}
                title="Edit Recipe"
                value={displayRecipe.recipe}
                className="unstyle-button"
              >
                <FaEdit size={20} />
              </button>
            </Link>
          </div>
        </div>
        <div className="recipe-body">
          <h4>Ingredients:</h4>
          <ul>{displayRecipe.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}</ul>
          <h4>Directions:</h4>
          <ol className="directions list">{displayRecipe.directions.map((step, j) => <li key={j}>{step}</li>)}</ol>
        </div>
      </div>
    </RecipeWrapper>
  );

  return <div>{recipe}</div>;
};

export default RecipePane;
