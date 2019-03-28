import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import DisplayIngredients from "./DisplayIngredients";
import AddIngredientForm from "./AddIngredientForm.js";
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';
import propTypes from 'prop-types';

class RecipeList extends Component {
    state = {
      // recipes: [],
      selected: []
    };

  componentWillMount() {
    this.props.fetchRecipes();
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS', nextProps);
    if(nextProps.newRecipe) {
      this.props.recipes.push(nextProps.newRecipe);
    }
  }

  onRowSelect = (row, isSelected) => {
    if (isSelected) {
      // Add newly selected row to state object
      let recipes = [...this.state.selected, row];
      this.setState({
        selected: recipes
      });
    } else {
      // Remove the recipe object that already exists in the state
      const recipes = this.state.selected.filter(r => r.name !== row.name);
      this.setState({
        selected: recipes
      });
    }
  };

  onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      // Adding all recipe objects to state object
      this.setState({
        selected: rows
      });
    }
    if (!isSelected) {
      // Emptys the state object
      this.setState({
        selected: []
      });
    }
  };

  render() {
    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll
    };

    const options = {
      noDataText: 'Loading recipes...'
    };

    return (
      <div className="container-fluid">
      <div className="table row">
        <div className="col-sm">
          <BootstrapTable data={this.props.recipes} selectRow={selectRowProp} striped={true} options={options}>
            <TableHeaderColumn dataField="name" isKey>
              Recipe Name
            </TableHeaderColumn>
          </BootstrapTable>
        </div>

        <div className="col-sm">
          <span className="card">
            <DisplayIngredients
              recipes={this.state.selected}
            />
          </span>
        </div>
        <div className="col-sm">
          <AddIngredientForm/>
        </div>
      </div>
      </div>
    );
  }
}

RecipeList.propTypes = {
  // fetchRecipe function is a property.
  fetchRecipes: propTypes.func.isRequired,
  recipes: propTypes.array.isRequired,
  newRecipe: propTypes.object
}

const mapStateToProps = state => ({
  recipes: state.recipes.items,
  newRecipe: state.recipes.item
})

export default connect(mapStateToProps, { fetchRecipes })(RecipeList);
