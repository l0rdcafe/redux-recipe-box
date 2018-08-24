import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
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
            {this.props.recipes.map(
              recipe =>
                console.log(this.props.recipes) || (
                  <div>
                    <Route
                      path={`/${recipe.recipe.toLowerCase()}`}
                      key={recipe.recipe}
                      render={() => (
                        <RecipePane
                          displayRecipe={recipe}
                          handleDelete={() =>
                            this.handleDelete(
                              this.props.recipes.findIndex(
                                r => r.recipe.toLowerCase() === currRecipe.recipe.toLowerCase()
                              )
                            )
                          }
                        />
                      )}
                    />
                    <Route
                      key={`edit-${recipe.recipe.toLowerCase()}`}
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
                          name={ref => (this.nameEdit = ref)}
                          ings={ref => (this.ingsEdit = ref)}
                          dirs={ref => (this.dirsEdit = ref)}
                          handleEdit={() =>
                            this.handleEdit(
                              this.nameEdit.value.split(" ").join("-"),
                              this.ingsEdit.value.split("\\"),
                              this.dirsEdit.value.split("\\"),
                              this.props.recipes.findIndex(
                                r => r.recipe.toLowerCase() === currRecipe.recipe.toLowerCase()
                              )
                            )
                          }
                          recipes={this.props.recipes}
                        />
                      )}
                    />
                  </div>
                )
            )}
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
                  handleAdd={() =>
                    this.handleAdd(this.name.value, this.ings.value.split("\\"), this.dirs.value.split("\\"))
                  }
                  recipes={this.props.recipes}
                  name={ref => (this.name = ref)}
                  ings={ref => (this.ings = ref)}
                  dirs={ref => (this.dirs = ref)}
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

export default Main;
