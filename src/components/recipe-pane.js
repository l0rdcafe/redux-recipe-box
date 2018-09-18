import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";
import PropTypes from "prop-types";
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

const RecipePane = ({ displayRecipe, handleDelete, classes }) => {
  const recipe = (
    <Paper className={classes.paper} elevation={2}>
      <div id={displayRecipe.recipe.toLowerCase()}>
        <div>
          <Typography variant="headline" align="center" color="primary" className={classes.allCaps}>
            {displayRecipe.recipe.replace(/-/g, " ")}
          </Typography>
          <div>
            <Link to="/" className={classes.actionBtn} href="/">
              <IconButton
                color="primary"
                aria-label="Delete"
                variant="fab"
                id={`delete-${displayRecipe.recipe.toLowerCase()}`}
                onClick={handleDelete}
                title="Delete Recipe"
                value={displayRecipe.recipe}
              >
                <FaTrash size={20} />
              </IconButton>
            </Link>
            <Link
              to={`/${displayRecipe.recipe.toLowerCase()}/edit`}
              href={`/${displayRecipe.recipe.toLowerCase()}/edit`}
              className={classes.actionBtn}
            >
              <IconButton
                color="primary"
                variant="fab"
                aria-label="Edit"
                id={`edit-${displayRecipe.recipe.toLowerCase()}`}
                title="Edit Recipe"
                value={displayRecipe.recipe}
              >
                <FaEdit size={20} />
              </IconButton>
            </Link>
          </div>
        </div>
        <div className="recipe-body">
          <Typography variant="subheading">Ingredients:</Typography>
          <List>
            {displayRecipe.ingredients.map((ing, j) => (
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
            {displayRecipe.directions.map((step, j) => (
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

RecipePane.propTypes = {
  displayRecipe: PropTypes.shape({
    recipe: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    paper: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(RecipePane);
