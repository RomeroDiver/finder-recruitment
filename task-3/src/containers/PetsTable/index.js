import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPets, filterPets, sortPetsBy } from '../../reducers/pets';
import ErrorMessage from '../../components/ErrorMessage';
import Table from '../../components/Table';
import PetsAnimalFilter from '../../components/PetsAnimalFilter';
import PetsPriceFilter from '../../components/PetsPriceFilter';
import { StyledTableCol } from '../../components/Table/styled-components';
import { Container, Sorting, SortingLabel } from './styled-components';

const petsTableColumns = ['Animal', 'Colour', 'Pattern', 'Rating', 'Price'];
const animals = ['Bird', 'Cat', 'Dog', 'Turtle', 'Pig', 'Capybara'];
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
      animals: animals.reduce((acc, animal) => {
        acc[animal] = false;
        return acc;
      }, {}),
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

  onAnimalFilterChange = (e, animal) => {
    const isChecked = e.target.checked;
    this.setState(
      state => {
        return {
          ...state,
          filters: {
            ...state.filters,
            animals: {
              ...state.filters.animals,
              [animal]: isChecked
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
            filters={animals}
            values={this.state.filters.animals}
            onChange={this.onAnimalFilterChange}
          />
          <PetsPriceFilter min={10} max={1000} value={this.state.filters.price} onChange={this.onPriceFilterChange} />
          <button onClick={this.filterAnimals}>Filter</button>

        </div>
        <Sorting>
          <SortingLabel>Sort by</SortingLabel>
          <select value={this.state.sortBy} onChange={this.onSortByChange}>
            <option value="-rating">Rating: from highest</option>
            <option value="+rating">Rating: frow lowest</option>
            <option value="-price">Price: from highest</option>
            <option value="+price">Price: from lowest</option>
          </select>
        </Sorting>
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
