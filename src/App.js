import React, { Component } from "react";
import "./App.css";
import RecipeList from "./components/RecipeList";
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <h1 className="title" style={{textAlign: "center"}}>Simple Meal Recipes</h1>
            <RecipeList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
