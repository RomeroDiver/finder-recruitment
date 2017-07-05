import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPets, filterPets, sortPetsBy } from '../../reducers/pets';
import ErrorMessage from '../../components/ErrorMessage';
import Table from '../../components/Table';
import PetsAnimalFilter from '../../components/PetsAnimalFilter';
import PetsPriceFilter from '../../components/PetsPriceFilter';
import { StyledTableCol } from '../../components/Table/styled-components';
import LoadingBar from '../../components/LoadingBar';
import { Container, Sorting, SortingLabel, FilterButton } from './styled-components';

const petsTableColumns = ['Animal', 'Colour', 'Pattern', 'Rating', 'Price'];
const animals = ['Bird', 'Cat', 'Dog', 'Turtle', 'Pig', 'Capybara'];
const minPrice = 10;
const maxPrice = 1000;

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
      price: {
        minValue: minPrice,
        maxValue: maxPrice
      },
      animals: animals.reduce((acc, animal) => {
        acc[animal] = true;
        return acc;
      }, {}),
    },
    sortBy: '',
  };

  componentDidMount() {
    this.props.fetchPets();
  }

  onPriceFilterChange = (e, priceFilterType) => {
    const price = e.target.value;
    this.setState(
      state => {
        return {
          ...state,
          filters: {
            ...state.filters,
            price: {
              ...state.filters.price,
              [priceFilterType]: price
            },
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
    const { pets, error, isLoading } = this.props;
    const { filters } = this.state;
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
            values={filters.animals}
            onChange={this.onAnimalFilterChange}
          />
          <PetsPriceFilter min={minPrice} max={maxPrice}
            minValue={filters.price.minValue}
            maxValue={filters.price.maxValue}
            onChange={this.onPriceFilterChange} />
          <FilterButton onClick={this.filterAnimals}>Filter</FilterButton>

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
        {isLoading ?
          <LoadingBar />
          :
          <Table columns={petsTableColumns}>
            {pets.map(renderPetsRow)}
          </Table>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pets: state.pets.list,
  error: state.pets.error,
  isLoading: state.pets.isLoadingList
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
