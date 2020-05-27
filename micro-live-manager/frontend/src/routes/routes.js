import React from 'react';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import {history} from './history';

import Dashboard from '../pages/Dashboard/dashboard';

const Routes = () => {
  return (
    <Router history={ history }>
      <Switch>
        <Route exact path="/" component={ Dashboard } />
      </Switch>
    </Router>
  );
}

export default Routes;