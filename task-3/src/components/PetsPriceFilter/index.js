import React from 'react';

export default ({ value, onChange, min, max }) => {
  return (
    <div>
      <span>
        {value}
      </span>
      <input type="range" min={min} max={max} step={1} value={value} onChange={onChange} />
    </div>
  );
};
