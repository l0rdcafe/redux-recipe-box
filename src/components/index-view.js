import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: "#000",
    fontFamily: "Roboto"
  }
});

const IndexView = ({ contents, handleClick, classes }) => {
  const items = contents.map((recipe, i) => (
    <NavLink
      to={`/${recipe.recipe.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={() => handleClick(recipe)}
      key={i}
      activeStyle={{
        color: "#176f8a",
        fontWeight: 700
      }}
      className={classes.link}
    >
      <ListItem button>
        <ListItemText disableTypography id={`view-${recipe.recipe.toLowerCase()}`}>
          {recipe.recipe.replace(/-/g, " ")}
        </ListItemText>
      </ListItem>
      <Divider />
    </NavLink>
  ));

  return <List component="nav">{items}</List>;
};

IndexView.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      recipe: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    link: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(IndexView);
