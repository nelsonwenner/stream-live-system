import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Broadcast from '../pages/Broadcast/broadcast';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Broadcast } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;