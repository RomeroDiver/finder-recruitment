import React from 'react';

export default ({ filters, values, onChange }) => {

  return (
    <div>
      {filters.map((animal, index) => {
        return (
          <label key={index}>
            {animal}
            <input type="checkbox" value={animal} checked={values[animal]} onChange={(e) => onChange(e, animal)} />
          </label>
        )
      })}
    </div>
  );
};
