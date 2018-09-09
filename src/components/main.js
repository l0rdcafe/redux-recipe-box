import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import RecipePane from "./recipe-pane";
import IndexView from "./index-view";
import Dialog from "./dialog";

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
    const currRecipe =
      this.props.recipes.length > 1 ? this.props.recipes[this.props.recipes.length - 1] : this.props.recipes[0];
    this.setRecipe(currRecipe);
  };
  handleSubmit = type => {
    const { currRecipe } = this.state;
    const { recipe, ingredients, directions } = this.props.form.recipeModal.values;
    const i = this.props.recipes.findIndex(r => r.recipe.toLowerCase() === currRecipe.recipe.toLowerCase());

    if (type === "Save") {
      this.handleEdit(recipe, ingredients.split("\\ "), directions.split("\\ "), i);
    } else {
      this.handleAdd(recipe, ingredients.split("\\ "), directions.split("\\ "));
    }
  };
  handleAdd = (name, ingredients, directions) => {
    this.props.addRecipe(name, ingredients, directions);
    const currRecipe = this.props.recipes[this.props.recipes.length - 1];
    this.setRecipe(currRecipe);
  };
  handleEdit = (name, ingredients, directions, i) => {
    this.props.editRecipe(name, ingredients, directions, i);
    const currRecipe = this.props.recipes[i];
    this.setRecipe(currRecipe);
  };
  render() {
    const { currRecipe } = this.state;
    return (
      <Router>
        <Switch>
          <div>
            {" "}
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
            <div className="add-button" style={{ display: "block", margin: "0 auto", textAlign: "center" }}>
              <Link to="/new">
                <button style={{ border: "0", padding: "0.5%", cursor: "pointer" }} id="add-recipe" title="Add Recipe">
                  <FaPlus />
                </button>
              </Link>
            </div>
          </div>
        </Switch>
      </Router>
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
  }).isRequired
};

export default Main;
