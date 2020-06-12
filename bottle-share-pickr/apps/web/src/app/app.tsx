import { Footer, Header } from '@bottle-share-pickr/shared-ui';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Index from './pages/Index';
import React from 'react';
import styled from '@emotion/styled';

const StyledApp = styled.div``;

export const App = () => {
  return (
    <StyledApp>
      <Header />

      <Switch>
        <Route path="/home">
          <Home />
        </Route>

        {/* all routes/pages need to be declared before the index page */}
        <Route path="/">
          <Index />
        </Route>
      </Switch>

      <Footer />
    </StyledApp>
  );
};

export default App;
