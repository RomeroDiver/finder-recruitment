import React from 'react';

export default ({ filters, values, onChange }) => {

  return (
    <div>
      {filters.map((animal, index) => {
        const property = animal.toLowerCase();
        return (
          <label key={index}>
            {animal}
            <input type="checkbox" value={property} checked={values[property]} onChange={(e) => onChange(e, property)} />
          </label>
        )
      })}
    </div>
  );
};
