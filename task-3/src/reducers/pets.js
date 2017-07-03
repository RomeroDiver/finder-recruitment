import { petService } from '../service';

export const FETCH_PETS = 'pets/FETCH_PETS';
export const FETCH_PETS_ERROR = 'pets/FETCH_PETS_ERROR';
export const FILTER_PETS_BY_PRICE = 'pets/FILTER_PETS_BY_PRICE';
export const FILTER_PETS_BY_ANIMAL = 'pets/FILTER_PETS_BY_ANIMAL';
export const SORT_PETS = 'pets/SORT_PETS';

export const filterPetsByPriceAction = filteredPets => ({
  type: FILTER_PETS_BY_PRICE,
  payload: filteredPets,
});

export const filterPetsByAnimalAction = filteredPets => ({
  type: FILTER_PETS_BY_ANIMAL,
  payload: filteredPets,
});

export const sortPetsAction = sortedPets => ({
  type: SORT_PETS,
  payload: sortedPets,
});

export const fetchPetsErrorAction = error => ({
  type: FETCH_PETS_ERROR,
  payload: error,
});

export const fetchPetsAction = pets => ({
  type: FETCH_PETS,
  payload: pets,
});

export const fetchPets = () => dispatch => {
  return petService.fetch().then(
    pets => {
      dispatch(fetchPetsAction(pets));
    },
    error => {
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

export const filterPetsByPrice = filterVal => dispatch => {
  return petService.fetch().then(
    pets => {
      const filteredPets = pets.filter(pet => pet.price === filterVal);
      dispatch(filterPetsByPriceAction(filteredPets));
    },
    error => {
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

export const filterPetsByAnimal = filterVal => dispatch => {
  return petService.fetch().then(
    pets => {
      const filteredPets = pets.filter(pet => pet.animal === filterVal);
      dispatch(filterPetsByAnimalAction(filteredPets));
    },
    error => {
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

export const sortPetsBy = sortVal => dispatch => {
  return petService.fetch().then(
    pets => {
      const [match, direction, property] = /(\+|\-){1}([a-zA-z]+)/.exec(sortVal);
      const filteredPets = pets.sort((a, b) => {
        if (direction === '-') {
          return b[property] - a[property];
        }
        return a[property] - b[property];
      });
      dispatch(sortPetsAction(filteredPets));
    },
    error => {
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

const initialState = {
  list: [],
  error: null,
  filter: {},
};
export default function pets(state = initialState, action) {
  switch (action.type) {
    case FETCH_PETS:
    case FILTER_PETS_BY_PRICE:
    case FILTER_PETS_BY_ANIMAL:
    case SORT_PETS:
      return {
        ...state,
        list: [...state.list, ...action.payload],
      };
    case FETCH_PETS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
