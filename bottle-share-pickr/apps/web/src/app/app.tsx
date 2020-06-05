import { Route, Switch, useLocation } from 'react-router-dom';

import React from 'react';
import styled from '@emotion/styled';

const StyledApp = styled.div``;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const App = () => {
  return (
    <StyledApp>
      <h1>Bottle-share Pickr App</h1>

      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </StyledApp>
  );
};

function LandingPage() {
  return (
    <>
      <a href="/api/redirectToUntappdAuth">Connect to your Untappd account</a>
    </>
  );
}

function AuthPage() {
  let query = useQuery();
  const untappdQueryStringCode = query.get('code');

  return (
    <>
      <h1>Authentication page</h1>
      <p>
        authentication code provided by Untappd:{' '}
        <strong>{untappdQueryStringCode}</strong>
      </p>
    </>
  );
}

export default App;
