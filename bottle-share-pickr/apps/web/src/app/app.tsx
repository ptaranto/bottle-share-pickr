import { API_URL, DefaultResponse } from '@bottle-share-pickr/api-interface';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

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
const REDIRECT_URL = 'http://localhost:4200/auth';
const UNTAPPD_CLIENT_ID = 'PUT_YOUR_UNTAPPD_CLIENT_ID';
const UNTAPPD_AUTHENTICATE_URL = `https://untappd.com/oauth/authenticate/?client_id=${UNTAPPD_CLIENT_ID}&response_type=code&redirect_url=${REDIRECT_URL}`;
function LandingPage() {
  return (
    <>
      <button>
        <a href={UNTAPPD_AUTHENTICATE_URL}>Connect to your Untappd account</a>
      </button>
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
