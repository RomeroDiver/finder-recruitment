import React from 'react';
import PropTypes from 'prop-types';

import {
  Thead,
  StyledHeadTh,
  StyledTable
} from './styled-components';

const Table = ({ columns, children }) => {
  return (
    <StyledTable>
      <Thead>
        <tr>
          {columns.map( (col, index) => <StyledHeadTh key={index}>{col}</StyledHeadTh>)}
        </tr>
      </Thead>
      <tbody>
        {children}
      </tbody>
    </StyledTable>
  );
}

Table.propTypes = {
    children: PropTypes.any.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Table;