// @flow

import React from "react";
import { NavLink } from "react-router-dom";
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

type IndexViewProps = {
  contents: Array<{ recipe: string, ingredients: string[], directions: string[] }>,
  handleClick: ({ recipe: string, ingredients: string[], directions: string[] }) => void,
  classes: { link: string }
};

const IndexView = (props: IndexViewProps) => {
  const items = props.contents.map((recipe, i) => (
    <NavLink
      to={`/${recipe.recipe.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={() => props.handleClick(recipe)}
      key={i}
      activeStyle={{
        color: "#176f8a",
        fontWeight: 700
      }}
      className={props.classes.link}
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

export default withStyles(styles)(IndexView);
