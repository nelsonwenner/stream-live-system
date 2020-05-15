import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Live from '../pages/Live/live';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Live } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;