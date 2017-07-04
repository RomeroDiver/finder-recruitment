import React from 'react';

import { FilterCheckboxesContainer, FilterCheckbox, Input, Checkmark } from './styled-components';

export default ({ filters, values, onChange }) => {

  return (
    <div>
      <p>Select animals</p>      
      <FilterCheckboxesContainer>
        {filters.map((animal, index) => {
          const inputId = `filter-${animal}-${index}`;
          const checked = values[animal];
          return (
            <FilterCheckbox key={index}>
              <Checkmark hidden={!checked} />
              <Input type="checkbox" id={inputId} checked={checked} onChange={(e) => onChange(e, animal)} />
              <label htmlFor={inputId}>
                {animal}
              </label>
            </FilterCheckbox>
          )
        })}
      </FilterCheckboxesContainer>
    </div>
  );
};
