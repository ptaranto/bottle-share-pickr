import { Route, Switch, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Index from './pages/Index';
import React from 'react';
import styled from '@emotion/styled';

const StyledApp = styled.div``;

export const App = () => {
  return (
    <StyledApp>
      <h1>Bottle-share Pickr App</h1>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>

        {/* all routes/pages need to be declared before the index page */}
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </StyledApp>
  );
};

export default App;
