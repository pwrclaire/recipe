import React, { Component } from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { createRecipe } from '../actions/recipeActions';

class AddIngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: "",
      type: "",
      id: "",
      cook_time: 0
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log(e.target.name, e.target.value);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      name: this.state.name,
      ingredients: (this.state.ingredients).split(','),
      id: Math.floor(Math.random() * 2000),
      type: this.state.type,
      cook_time: this.state.cook_time
    }

    // Field check
    if(recipe.name.trim() === "" || recipe.ingredients === "" || recipe.type.trim() === "") {
      alert("Name or ingredient or type cannot be empty!");
      return;
    }

    // Field check
    if(recipe.name.length < 3 || recipe.ingredients.length < 3 || recipe.type.length < 3) {
      alert('Please make sure each field has a length of > 3');
      return;
    }

    this.refs.name.value = "";
    this.refs.ingredients.value = "";
    this.refs.type.value = "";
    this.refs.cook_time.value = "";
    this.props.createRecipe(recipe);
  }

  render() {
    return (
      <div className="recipe-box" >
        <h4 >Add Recipe</h4>
        <form action="" onSubmit={this.onSubmit}>
          <div>
            <label>Recipe Name</label>
            <br/>
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.onChange}/>
          </div>
          <div>
            <label>Ingredients</label>
            <br/>
            <input type="text" name="ingredients" ref="ingredients" value={this.state.ingredients} onChange={this.onChange}/>
          </div>
          <div>
            <label>Type</label>
            <br/>
            <input type="text" name="type" ref="type" value={this.state.type} onChange={this.onChange}/>
          </div>
          <div>
            <label>Cooking Time (min)</label>
            <br/>
            <input type="text" name="cook_time" ref="cook_time" value={this.state.cook_time} onChange={this.onChange}/>
          </div>
          <br/>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

AddIngredientForm.propType = {
  createRecipe: propTypes.func.isRequired
}

export default connect(null, { createRecipe })(AddIngredientForm);