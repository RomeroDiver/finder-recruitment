import React from 'react';
import { shallow } from 'enzyme';
import Table from './';
import { StyledHeadTh } from './styled-components';

describe('Table', () => {
  const cols = ['Animal', 'Colour', 'Price'];
  const rows = (
    <tr>
      <td>Lion</td>
      <td>Yellow</td>
      <td>100</td>
    </tr>
  );

  it('renders welcome message', () => {
    const component = shallow(
      <Table columns={cols}>
        {rows}
      </Table>
    );
    const heads = component.find(StyledHeadTh);
    expect(heads.length).toEqual(3);
  });
});
