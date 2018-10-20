// @flow

import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: 15
  },
  allCaps: {
    textTransform: "uppercase"
  },
  actionBtn: {
    float: "right"
  }
});

type RecipePaneProps = {
  displayRecipe: { recipe: string, ingredients: string[], directions: string[] },
  handleDelete: (i: number) => void,
  classes: { paper: string, actionBtn: string, allCaps: string }
};

const RecipePane = (props: RecipePaneProps) => {
  const recipe = (
    <Paper className={props.classes.paper} elevation={2}>
      <div id={props.displayRecipe.recipe.toLowerCase().replace(/\s+/g, "-")}>
        <div>
          <Typography variant="headline" align="center" color="primary" className={props.classes.allCaps}>
            {props.displayRecipe.recipe.replace(/-/g, " ")}
          </Typography>
          <div>
            <Link to="/" className={props.classes.actionBtn} href="/">
              <IconButton
                color="primary"
                aria-label="Delete"
                variant="fab"
                id={`delete-${props.displayRecipe.recipe.toLowerCase()}`}
                onClick={props.handleDelete}
                title="Delete Recipe"
                value={props.displayRecipe.recipe}
              >
                <FaTrash size={20} />
              </IconButton>
            </Link>
            <Link
              to={`/${props.displayRecipe.recipe.toLowerCase()}/edit`}
              href={`/${props.displayRecipe.recipe.toLowerCase()}/edit`}
              className={props.classes.actionBtn}
            >
              <IconButton
                color="primary"
                variant="fab"
                aria-label="Edit"
                id={`edit-${props.displayRecipe.recipe.toLowerCase()}`}
                title="Edit Recipe"
                value={props.displayRecipe.recipe}
              >
                <FaEdit size={20} />
              </IconButton>
            </Link>
          </div>
        </div>
        <div className="recipe-body">
          <Typography variant="subheading">Ingredients:</Typography>
          <List>
            {props.displayRecipe.ingredients.map((ing, j) => (
              <ListItem key={j}>
                <ListItemIcon>
                  <FaCircle />
                </ListItemIcon>
                <ListItemText primary={ing} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subheading">Directions:</Typography>
          <List className="directions list">
            {props.displayRecipe.directions.map((step, j) => (
              <ListItem key={j}>
                <ListItemText primary={`${j + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </Paper>
  );

  return <div>{recipe}</div>;
};

export default withStyles(styles)(RecipePane);
