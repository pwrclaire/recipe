import React from "react";

const DisplayIngredients = ({ recipes }) => {
  if (recipes.length > 0) {
    return recipes.map(recipe => {
      return (
        <div key={recipe.name}>
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <p className="card-text">
              <i>Ingredients:</i> {Array.isArray(recipe.ingredients) ? recipe.ingredients.sort().join(", ") : recipe.ingredients}
            </p>
            <p>
            <i>Cooking Time (min):</i> {recipe.cook_time}
            </p>
          </div>
        </div>
      );
    });
  } else {
    return <div>Please choose a recipe</div>;
  }
};

export default DisplayIngredients;
