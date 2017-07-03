import React from 'react';
import PropTypes from 'prop-types';
import { petService } from './service';

petService.fetch().then(
  console.log.bind(console, 'SUCCESS:'),
  console.error.bind(console, 'ERROR:')
);

export default ({ data, columns }) => {
  return (
    <table>
      <thead>
        {columns.map( col => <th>{col.title}</th>)}
      </thead>
      <tbody>
      </tbody>
    </table>
  );
}
