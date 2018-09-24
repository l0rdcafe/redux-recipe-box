import React from "react";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import RecipePane from "./recipe-pane";
import IndexView from "./index-view";
import Dialog from "./dialog";

const styles = theme => ({
  navTitle: {
    flex: 1
  },
  "@global": {
    body: {
      margin: 0
    }
  },
  main: {
    margin: 8
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    const currRecipe = this.props.recipes.length > 1 ? this.props.recipes[1] : this.props.recipes[0];

    this.state = { currRecipe };
  }
  setRecipe = rec => {
    const currRecipe = rec;
    this.setState({ currRecipe });
  };
  handleDelete = i => {
    this.props.removeRecipe(i);
    const currRecipe = this.props.recipes.length === i ? this.props.recipes[i - 1] : this.props.recipes[0];
    this.setRecipe(currRecipe);
  };
  handleSubmit = type => {
    const { currRecipe } = this.state;
    const { recipe, ingredients, directions } = this.props.form.recipeModal.values;

    if (type === "Save") {
      const i = this.props.recipes.findIndex(r => r.recipe.toLowerCase() === currRecipe.recipe.toLowerCase());
      this.handleEdit(recipe, ingredients.split("\\ "), directions.split(" \\\n\n"), i);
    } else {
      this.handleAdd(recipe, ingredients.split("\\ "), directions.split("\\ "));
    }
  };
  handleAdd = (name, ingredients, directions) => {
    this.props.addRecipe(name, ingredients, directions);
    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    this.setRecipe(formattedName);
    this.props.history.push(`/${formattedName}`);
  };
  handleEdit = (name, ingredients, directions, i) => {
    this.props.editRecipe(name, ingredients, directions, i);
    console.log(directions);
    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    const currRecipe = this.props.recipes[i];
    this.setRecipe(currRecipe);
    this.props.history.push(`/${formattedName}`);
  };
  render() {
    const { currRecipe } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="display1" color="secondary" className={classes.navTitle}>
              Recipe Box
            </Typography>{" "}
            <Link to="/new" href="/new">
              <Button variant="fab" mini id="add-recipe" title="Add Recipe">
                <FaPlus />
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <IndexView contents={this.props.recipes} handleClick={this.setRecipe} />
          <Route exact path="/" render={() => <Redirect to={currRecipe ? currRecipe.recipe.toLowerCase() : ""} />} />
          {this.props.recipes.map(recipe => (
            <div key={recipe.recipe}>
              <Route
                path={`/${recipe.recipe.toLowerCase().replace(/\s+/g, "-")}`}
                render={() => (
                  <RecipePane
                    displayRecipe={recipe}
                    handleDelete={() =>
                      this.handleDelete(
                        this.props.recipes.findIndex(r => r.recipe.toLowerCase() === currRecipe.recipe.toLowerCase())
                      )
                    }
                  />
                )}
              />
              <Route
                path={`/${recipe.recipe.toLowerCase()}/edit`}
                render={() => (
                  <Dialog
                    dialogType="Edit Recipe"
                    buttonType="Save"
                    nameID="edit-recipe-name"
                    ingredientsID="edit-ingredients"
                    directionsID="edit-directions"
                    submitID="edit-submit"
                    closeID="edit-close"
                    currRecipe={recipe}
                    handleSubmit={() => this.handleSubmit("Save")}
                  />
                )}
              />
            </div>
          ))}
          <Route
            path="/new"
            render={() => (
              <Dialog
                dialogType="Add a Recipe"
                buttonType="Add"
                nameID="add-recipe-name"
                ingredientsID="add-ingredients"
                directionsID="add-directions"
                submitID="add-submit"
                closeID="add-close"
                currRecipe={currRecipe}
                handleSubmit={() => this.handleSubmit("Add")}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      recipe: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    })
  ).isRequired,
  removeRecipe: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  form: PropTypes.shape({
    recipeModal: PropTypes.shape({
      registeredFields: PropTypes.shape({
        recipe: PropTypes.shape({
          name: PropTypes.string,
          count: PropTypes.number,
          type: PropTypes.string
        }),
        ingredients: PropTypes.shape({
          name: PropTypes.string,
          count: PropTypes.number,
          type: PropTypes.string
        }),
        directions: PropTypes.shape({
          name: PropTypes.string,
          count: PropTypes.number,
          type: PropTypes.string
        })
      })
    })
  }).isRequired,
  classes: PropTypes.shape({
    navTitle: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(withRouter(Main));
