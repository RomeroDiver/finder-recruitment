import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import './globalStyles';
import configureStore from './configureStore';
import PetsTable from './containers/PetsTable';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PetsTable />
  </Provider>,
  document.getElementById('root')
);
