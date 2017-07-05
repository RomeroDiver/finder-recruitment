import React from 'react';
import { RangeContainer, RangeLabel } from './styled-components';

export default ({ minValue, maxValue, onChange, min, max }) => {
  return (
    <div>
      <p>Select price</p>
      <RangeContainer>
        <RangeLabel>
          <span>From</span> {minValue}
        </RangeLabel>
        <input type="range" min={min} max={max} step={1} value={minValue} onChange={(e) => onChange(e, 'minValue')} />
      </RangeContainer>
      <RangeContainer>
        <RangeLabel>
          <span>To</span> {maxValue}
        </RangeLabel>
        <input type="range" min={min} max={max} step={1} value={maxValue} onChange={(e) => onChange(e, 'maxValue')} />
      </RangeContainer>
    </div>
  );
};
