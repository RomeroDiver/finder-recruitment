
import reducer from './pets';
import {
  FETCH_PETS,
  FETCH_PETS_ERROR,
  FILTER_PETS,
  SORT_PETS,

  fetchPetsAction
} from './pets';

describe('Pets reducer', () =>{

  it('returns state by default', () => {
    const state = {
      list: [],
      error: null,
      filter: {},
    };

    expect(reducer(state, { type: '' })).toEqual(state);
  });

  describe(`action ${FETCH_PETS}`, () => {

    it('return a list of fetched pets', () => {
      const payload = [
        { animal: 'Lion' },
        { animal: 'Bird' }
      ]
      const previousState = {
        list: [],
        error: null,
        filter: {},
      };
      const newState = {
        list: [ ...payload ],
        error: null,
        filter: {},
      }


      expect(reducer(previousState, fetchPetsAction(payload))).toEqual(newState);
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



  it('', () => {

  });

  it('', () => {

  });

  it('', () => {

  });

  it('', () => {

  });
});
