import React from 'react';

export default ({ value, onChange, min, max }) => {
  console.log('Range: ', value)
  const inputVal = value || min;
  return (
    <div>
      <p>Select price</p>
      <p>{inputVal}</p>
      <span>
        {min}
      </span>
      <input type="range" min={min} max={max} step={1} value={inputVal} onChange={onChange} />
      <span>{max}</span>
    </div>
  );
};
