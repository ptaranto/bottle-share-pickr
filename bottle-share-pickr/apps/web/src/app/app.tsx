import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { API_URL, DefaultResponse } from '@bottle-share-pickr/api-interface';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link, useLocation } from 'react-router-dom';

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    background-color: #143055;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export const App = () => {
  let query = useQuery();
  const [defaultResponse, setDefaultResponse] = useState<DefaultResponse>({ message: 'Loading...'});
  useEffect(() => {
    fetch(API_URL).then(r => r.json()).then(setDefaultResponse)
  }, []);



  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.@emotion/styled file.
   */
  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to web!</h1>
        <h1>{defaultResponse.message}</h1>
      </header>
      <hr />
        <p>Not logged into Unttapd.</p>
        <p>authentication code provided by Untappd: {query.get('code')}</p>
      <hr />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </StyledApp>
  );
};

export default App;
