import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import PetsPriceFilter from './';

describe('PetsPriceFilter', () =>{
    const props = {
      min: 10,
      max: 100,
      value: 20,
      onChange: spy()
    };

    it('passes onChange callback', () => {
        const component = shallow(<PetsPriceFilter {...props} />);
        const input = component.find('input');

        input.simulate('change', 50);
        expect(props.onChange.called).toBeTrue();
    });


});
