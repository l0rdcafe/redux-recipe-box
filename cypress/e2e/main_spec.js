import recipes from "../../src/data/recipes";

describe("app routing", () => {
  it("redirects '/' path to second recipe path in recipes array", () => {
    cy.visit("https://redux-recipe-box.surge.sh")
      .url()
      .should("include", recipes[1].recipe.toLowerCase());
  });

  it("routes app to recipe page after clicking recipe name", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)].recipe.toLowerCase();
    cy.visit("https://redux-recipe-box.surge.sh")
      .get(`#view-${randomRecipe}`)
      .click()
      .url()
      .should("include", randomRecipe);
  });
});

describe("CRUD functionality", () => {
  it("deletes current recipe when trash button is clicked", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)].recipe.toLowerCase();
    cy.visit(`https://redux-recipe-box.surge.sh/`)
      .get(`#view-${randomRecipe}`)
      .click()
      .get(`#delete-${randomRecipe}`)
      .click()
      .get(`#view-${randomRecipe}`)
      .should("not.exist")
      .url()
      .should("not.include", randomRecipe);
  });

  it("shows a dialog with populated fields when edit button is clicked", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const randomRecipeName = randomRecipe.recipe.toLowerCase();
    const randomRecipeIngs = randomRecipe.ingredients.join(" \\ ");
    const randomRecipeDirs = randomRecipe.directions.join(" \\\n\n");
    cy.visit(`https://redux-recipe-box.surge.sh/`)
      .get(`#view-${randomRecipeName}`)
      .click()
      .get(`#edit-${randomRecipeName}`)
      .click()
      .get("#edit-recipe-name")
      .should("have.value", randomRecipe.recipe.replace(/-/g, " "))
      .get("#edit-ingredients")
      .should("have.value", randomRecipeIngs)
      .get("#edit-directions")
      .should("have.value", randomRecipeDirs);
  });

  it("exits edit dialog form when 'X' is clicked", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const randomRecipeName = randomRecipe.recipe.toLowerCase();
    cy.visit(`https://redux-recipe-box.surge.sh/`)
      .get(`#view-${randomRecipeName}`)
      .click()
      .get(`#edit-${randomRecipeName}`)
      .click()
      .get("#cancel")
      .click()
      .url()
      .should("include", randomRecipeName);
  });

  it("exits edit dialog form when Cancel button is clicked", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const randomRecipeName = randomRecipe.recipe.toLowerCase();
    cy.visit(`https://redux-recipe-box.surge.sh/`)
      .get(`#view-${randomRecipeName}`)
      .click()
      .get(`#edit-${randomRecipeName}`)
      .click()
      .get("#edit-close")
      .click()
      .url()
      .should("include", randomRecipeName);
  });

  it("edits a recipe and routes to updates version", () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const randomRecipeName = randomRecipe.recipe.toLowerCase();
    cy.visit("https://redux-recipe-box.surge.sh")
      .get(`#view-${randomRecipeName}`)
      .click()
      .get(`#edit-${randomRecipeName}`)
      .click()
      .get("#edit-recipe-name")
      .clear()
      .type("Lamb Kabab")
      .get("#edit-submit")
      .click()
      .url()
      .should("include", "lamb-kabab")
      .get("#lamb-kabab")
      .should("exist");
  });

  it("shows a dialog with empty form fields when add button is clicked", () => {
    cy.visit("https://redux-recipe-box.surge.sh")
      .get("#add-recipe")
      .click()
      .get("#add-recipe-name")
      .should("be.empty")
      .get("#add-ingredients")
      .should("be.empty")
      .get("#add-directions")
      .should("be.empty");
  });

  it("button is disabled when at least one form field is empty", () => {
    cy.visit("https://redux-recipe-box.surge.sh/")
      .get("#add-recipe")
      .click()
      .get("#add-submit")
      .should("have.attr", "disabled")
      .get("#add-recipe-name")
      .type("test")
      .get("#add-submit")
      .should("have.attr", "disabled")
      .get("#add-ingredients")
      .type("testing ingredients")
      .get("#add-submit")
      .should("have.attr", "disabled");
  });

  it("button is enabled when all form fields are populated", () => {
    cy.visit("https://redux-recipe-box.surge.sh/")
      .get("#add-recipe")
      .click()
      .get("#add-recipe-name")
      .type("test")
      .get("#add-submit")
      .should("have.attr", "disabled")
      .get("#add-ingredients")
      .type("testing ingredients")
      .get("#add-directions")
      .type("testing directions")
      .get("#add-submit")
      .should("not.have.attr", "disabled");
  });

  it("adds a new recipe and routes to it", () => {
    cy.visit("https://redux-recipe-box.surge.sh/")
      .get("#add-recipe")
      .click()
      .get("#add-recipe-name")
      .type("Test Recipe")
      .get("#add-submit")
      .should("have.attr", "disabled")
      .get("#add-ingredients")
      .type("testing ingredients \\ testing 2 \\ testing 3")
      .get("#add-directions")
      .type("testing directions \\ directions 2 \\ directions 3")
      .get("#add-submit")
      .click()
      .url()
      .should("include", "test-recipe")
      .get("#test-recipe")
      .should("exist");
  });
});
