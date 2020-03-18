import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Contacts from './components/contacts';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Contacts} exact />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Routes;
