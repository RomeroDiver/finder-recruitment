import { petService } from '../service';

export const FETCH_PETS = 'pets/FETCH_PETS';
export const FETCH_PETS_ERROR = 'pets/FETCH_PETS_ERROR';
export const FILTER_PETS = 'pets/FILTER_PETS';
export const SORT_PETS = 'pets/SORT_PETS';
export const FINISHED_REQUEST = 'pets/FINISHED_REQUEST';
export const STARTED_REQUEST = 'pets/STARTED_REQUEST';

export const startRequest = () => ({ type: STARTED_REQUEST });
export const finishRequest = () => ({ type: FINISHED_REQUEST });

export const filterPetsAction = filteredPets => ({
  type: FILTER_PETS,
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
  dispatch(startRequest());
  return petService.fetch().then(
    pets => {
      dispatch(finishRequest());
      dispatch(fetchPetsAction(pets));
    },
    error => {
      dispatch(finishRequest());
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

const filterPrice = (price, filters) => price >= filters.minValue && price <= filters.maxValue;

export const filterPets = filters => dispatch => {
  dispatch(startRequest());
  return petService.fetch().then(
    pets => {
      const filteredPets = pets.filter(pet => {
        const isAnimalFiltered = filters.animals[pet.animal] === true;
        const isPriceFiltered = filters.price && filterPrice(pet.price, filters.price);
        return isAnimalFiltered && isPriceFiltered;
      });
      dispatch(finishRequest());
      dispatch(filterPetsAction(filteredPets));
    },
    error => {
      dispatch(finishRequest());
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

export const sortPetsBy = sortVal => dispatch => {
  dispatch(startRequest());
  return petService.fetch().then(
    pets => {
      const [match, direction, property] = /(\+|\-){1}([a-zA-z]+)/.exec(sortVal);
      const filteredPets = pets.sort((a, b) => {
        if (direction === '-') {
          return b[property] - a[property];
        }
        return a[property] - b[property];
      });
      dispatch(finishRequest());
      dispatch(sortPetsAction(filteredPets));
    },
    error => {
      dispatch(finishRequest());
      dispatch(fetchPetsErrorAction(error));
    }
  );
};

const initialState = {
  list: [],
  error: null,
};
export default function pets(state = initialState, action) {
  switch (action.type) {
    case STARTED_REQUEST:
      return {
        ...state,
        isLoadingList: true,
      };
    case FINISHED_REQUEST:
      return {
        ...state,
        isLoadingList: false,
      };
    case FETCH_PETS:
      return {
        ...state,
        list: [...state.list, ...action.payload],
      };
    case FILTER_PETS:
    case SORT_PETS:
      return {
        ...state,
        list: [...action.payload],
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
