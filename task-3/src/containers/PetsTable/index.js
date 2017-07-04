import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPets, filterPets, sortPetsBy } from '../../reducers/pets';
import ErrorMessage from '../../components/ErrorMessage';
import Table from '../../components/Table';
import PetsAnimalFilter from '../../components/PetsAnimalFilter';
import PetsPriceFilter from '../../components/PetsPriceFilter';
import { StyledTableCol } from '../../components/Table/styled-components';
import { Container } from './styled-components';

const petsTableColumns = ['Animal', 'Colour', 'Pattern', 'Rating', 'Price'];

const renderPetsRow = (pet, index) => {
  return (
    <tr key={index}>
      <StyledTableCol>
        {pet.animal}
      </StyledTableCol>
      <StyledTableCol>
        {pet.colour}
      </StyledTableCol>
      <StyledTableCol>
        {pet.pattern}
      </StyledTableCol>
      <StyledTableCol>
        {pet.rating}
      </StyledTableCol>
      <StyledTableCol>
        {pet.price}
      </StyledTableCol>
    </tr>
  );
};

class PetsTable extends Component {
  state = {
    filters: {
      price: undefined,
      animals: {
        bird: false, 
        cat: false,
        dog: false,
        turtle: false,
        pig: false,
        capybara: false
      },
    },
    sortBy: '',
  };

  componentDidMount() {
    this.props.fetchPets();
  }

  onPriceFilterChange = e => {
    const price = e.target.value;
    this.setState(
      state => {
        return {
          ...state,
          filters: {
            ...state.filters,
            price,
          },
        };
      });
  };

  onAnimalFilterChange = (e, property) => {
    const val = e.target.value;
    this.setState(
      state => {
        return {
          ...state,
          filters: {
            ...state.filters,
            animals: {
              ...state.filters.animals,
              [property]: val
            },
          },
        };
      });
  };

  filterAnimals = () => this.props.filterPets(this.state.filters)

  onSortByChange = e => {
    const sortBy = e.target.value;
    this.setState({ sortBy }, () => {
      this.props.sortPetsBy(sortBy);
    });
  };

  render() {
    const { pets, error } = this.props;
    if (error) {
      return (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      );
    }
    return (
      <Container>
        <div>
          <h2>Filters</h2>
          <PetsAnimalFilter
            filters={['Bird', 'Cat', 'Dog', 'Turtle', 'Pig', 'Capybara']}
            values={this.state.filters.animals}
            onChange={this.onAnimalFilterChange}
          />
          <PetsPriceFilter min={10} max={1000} value={this.state.filters.price} onChange={this.onPriceFilterChange} />
          <button onClick={this.filterAnimals}>Filter</button>
        
        </div>
        <div>
          <h2>Sort by</h2>
          <select value={this.state.filters} onChange={this.onSortByChange}>
            <option value="-rating">Rating: from highest</option>
            <option value="+rating">Rating: frow lowest</option>
            <option value="-price">Price: from highest</option>
            <option value="+price">Price: from lowest</option>
          </select>
        </div>
        <Table columns={petsTableColumns}>
          {pets.map(renderPetsRow)}
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pets: state.pets.list,
  error: state.pets.error,
  priceFilterValue: state.pets.filter.price,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPets,
      filterPets,
      sortPetsBy,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PetsTable);
