import React, { lazy, Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Broadcaster = lazy(() => import('../pages/Broadcaster'));
const Viewer = lazy(() => import('../pages/Viewer'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <Switch>
          <Route exact path="/broadcaster/:slug" component={ Broadcaster } />
          <Route exact path="/viewer/:slug" component={ Viewer } /> 
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;
