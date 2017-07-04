import React from 'react';
import styled from 'styled-components';

import CheckmarkSvg from './checkmark';

export const FilterCheckboxesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const FilterCheckbox = styled.div`
    height: 30px;
    width: 100px;
    display: flex;
    align-items: center;
    line-height: 30px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding-right: 10px;
`;

export const Input = styled.input`
    display: none;
`;

export const Checkmark = styled(({hidden, ...props}) => <CheckmarkSvg {...props} />)`
    fill: #313131;
    padding-right: 10px;
    padding-left: 10px;  
    visibility: ${props => (props.hidden ? 'hidden' : 'visible')}
`;