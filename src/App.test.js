import React from "react";
import { shallow, mount } from "enzyme";
import RecipeList from "./components/RecipeList";
import DisplayIngredients from "./components/DisplayIngredients";

describe("<RecipeList />", () => {
  const wrapper = mount(<RecipeList />);
  const checkbox = "tbody tr td";

  it("is able to render.", () => {
    expect(shallow(<RecipeList />).length).toEqual(1);
  });

  it("displays a table of recipes.", () => {
    const table = "div.react-bs-table-container";
    expect(wrapper.find(table).length).toEqual(1);
  });

  it("can select and deselect a row.", () => {
    // Click once to select, and should be rendered to DOM
    wrapper
      .find(checkbox)
      .first()
      .simulate("click");
    expect(wrapper.find(DisplayIngredients).html()).toContain("Risotto");
    // Click again to deselect, and should be removed from DOM
    wrapper
      .find(checkbox)
      .first()
      .simulate("click");
    expect(wrapper.find(DisplayIngredients).html()).not.toContain("Risotto");
  });

  it("can have multiple ingredients to be selected.", () => {
    wrapper
      .find(checkbox)
      .first()
      .simulate("click");
    wrapper
      .find(checkbox)
      .at(2)
      .simulate("click");
    wrapper
      .find(checkbox)
      .last()
      .simulate("click");
    // Multiple selection returning multiple container
    expect(wrapper.find("div.card-body").length).toBe(3);
  });
});

describe("<DisplayIngredients/>", () => {
  it("is able to render.", () => {
    expect(shallow(<RecipeList />).length).toEqual(1);
  });

  const propOne = {
    recipes: [
      {
        name: "Risotto",
        type: "Italian",
        cook_time: 60,
        ingredients: ["sausage", "Ham", "Egg", "cheese"]
      }
    ]
  };

  const expectedOrder =
    "<div>" +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    "Risotto" +
    "</h5>" +
    '<p class="card-text">' +
    "<i>" +
    "Ingredients:" +
    "</i> " +
    "Egg, Ham, cheese, sausage" +
    "</p>" +
    "</div>" +
    "</div>";

  it("displays the ingredients in alphabetical order.", () => {
    const wrapper = shallow(<DisplayIngredients {...propOne} />);
    expect(wrapper.html()).toEqual(expectedOrder);
  });

  const propTwo = {
    recipes: [
      { ingredients: ["Masa", "Water", "Queso Fresco"] },
      { ingredients: ["Butter", "Onion", "Salt", "Celery"] },
      { ingredients: ["Onion", "Oil", "Rice"] }
    ]
  };

  it("displays the correct number of recipes.", () => {
    const wrapper = shallow(<DisplayIngredients {...propTwo} />);
    expect(wrapper.find("div.card-body").length).toBe(3);
  });

  const propThree = {
    recipes: [
      {
        name: "Enchiladas",
        type: "Mexican",
        cook_time: 50,
        ingredients: [
          "Tomato Sauce",
          "Tomato",
          "Corn Tortillas",
          "Cheddar Cheese",
          "Onion",
          "Olives",
          "Salt",
          "Chicken"
        ]
      }
    ]
  };

  const expectedRecipe =
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    "Enchiladas" +
    "</h5>" +
    '<p class="card-text">' +
    "<i>" +
    "Ingredients:" +
    "</i> " +
    "Cheddar Cheese, Chicken, Corn Tortillas, Olives, Onion, Salt, Tomato, Tomato Sauce" +
    "</p>" +
    "</div>";

  it("displays the correct recipe.", () => {
    const wrapper = shallow(<DisplayIngredients {...propThree} />);
    expect(wrapper.find("div.card-body").html()).toEqual(expectedRecipe);
  });
});
