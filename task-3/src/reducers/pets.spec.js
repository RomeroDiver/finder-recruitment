
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { stub } from 'sinon';

import * as services from '../service';
import reducer from './pets';
import {
  FINISHED_REQUEST,
  STARTED_REQUEST,
  FETCH_PETS,
  FETCH_PETS_ERROR,
  FILTER_PETS,
  SORT_PETS,

  fetchPetsAction,
  fetchPets,
  sortPetsBy,
  filterPets,
} from './pets';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
stub(services.petService, 'fetch').callsFake(() => Promise.resolve([]));

describe('Pets reducer', () =>{
  const defaultState = {
    list: [],
    error: null,
    filter: {},
  };

  it('returns state by default', () => {
    expect(reducer(defaultState, { type: '' })).toEqual(defaultState);
  });

  describe(`action ${FETCH_PETS}`, () => {

    it('return a list of fetched pets', () => {
      const payload = [
        { animal: 'Lion' },
        { animal: 'Bird' }
      ]
      const newState = {
        list: [ ...payload ],
        error: null,
        filter: {},
      }


      expect(reducer(defaultState, fetchPetsAction(payload))).toEqual(newState);
    });

    it('return a list of fetched pets with already fetched pets', () => {
      const payload = [
        { animal: 'Lion' },
        { animal: 'Bird' }
      ]
      const previousState = {
        list: payload,
        error: null,
        filter: {},
      };
      const newState = {
        list: [ ...payload, ...payload ],
        error: null,
        filter: {},
      }

      expect(reducer(previousState, fetchPetsAction(payload))).toEqual(newState);
    });

  });

  describe(`async action fetchPets`, () => {
    it('should dispatch 3 actions when fetching was successful', (done) => {
      const store = mockStore({ pets: defaultState });
      const expectedActions = [
        { type: STARTED_REQUEST },
        { type: FINISHED_REQUEST },
        { type: FETCH_PETS, payload: [] }
      ]
      return store.dispatch(fetchPets()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    });
  });

  describe(`async action filterPets`, () => {
    it('should dispatch 3 actions when filtering was successful', () => {
      const store = mockStore({ pets: defaultState });
      const expectedActions = [
        { type: STARTED_REQUEST },
        { type: FINISHED_REQUEST },
        { type: FILTER_PETS, payload: [] }
      ]
      return store.dispatch(filterPets()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });

  describe(`async action sortPetsBy`, () => {
    it.only('should dispatch 3 actions when sorting was successful', () => {
      const store = mockStore({ pets: defaultState });
      const expectedActions = [
        { type: STARTED_REQUEST },
        { type: FINISHED_REQUEST },
        { type: SORT_PETS, payload: [] }
      ]
      return store.dispatch(sortPetsBy('+price')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });
  });
});
