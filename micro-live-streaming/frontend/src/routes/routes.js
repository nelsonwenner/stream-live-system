import React, { lazy, Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Broadcast = lazy(() => import('../pages/Broadcast/broadcast'));
const Viewer = lazy(() => import('../pages/Viewer/Viewer'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <Switch>
          <Route exact path="/broadcast/:slug" component={ Broadcast } />
          <Route exact path="/viewer/:slug" component={ Viewer } />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routes;