import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const IndexWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #000;
    flex: 1;
    letter-spacing: 0.5px;
    box-sizing: border-box;
    box-shadow: 0 1px 0 0 #e6e6e6, 0 2px 0 0 white;
    border-bottom: 1px solid #176f8a;
    padding: 1%;
    transition: opacity 0.25s;
  }
  a:hover {
    opacity: 0.6;
  }
`;

const IndexView = ({ contents, handleClick }) => {
  const items = contents.map((recipe, i) => (
    <NavLink
      to={`/${recipe.recipe.toLowerCase()}`}
      onClick={() => handleClick(recipe)}
      key={i}
      activeStyle={{ color: "#176f8a", fontWeight: "700" }}
    >
      <span id={`view-${recipe.recipe.toLowerCase()}`}>{recipe.recipe.replace(/-/g, " ")}</span>
    </NavLink>
  ));

  return <IndexWrapper>{items}</IndexWrapper>;
};

IndexView.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      recipe: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default IndexView;
