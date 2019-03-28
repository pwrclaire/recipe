import { FETCH_RECIPES, NEW_RECIPE } from './types';

export const fetchRecipes = () => dispatch => {
    fetch('https://infinite-tundra-69966.herokuapp.com/recipes')
    .then(res => res.json())
    .then(recipes => dispatch({
      type: FETCH_RECIPES,
      payload: recipes
    })
  )
}

export const createRecipe = (recipeData) => dispatch => {
  fetch('https://infinite-tundra-69966.herokuapp.com/recipes', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(recipeData)
  })
  .then(res => res.json())
  .then(recipe => dispatch({
    type: NEW_RECIPE,
    payload: recipe
  }))
}