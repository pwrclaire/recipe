import { FETCH_RECIPES, NEW_RECIPE } from '../actions/types';

const initialState = {
  // List of recipes
  items: [],
  // new recipe coming in
  item: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        items: action.payload
      };
    case NEW_RECIPE:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}