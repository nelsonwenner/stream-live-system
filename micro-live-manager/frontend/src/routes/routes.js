import React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
import {history} from './history';

import Dashboard from '../pages/Dashboard';

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