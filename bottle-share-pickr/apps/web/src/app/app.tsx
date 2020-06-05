import { Link, Route, Switch, useLocation } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import {
  UNTAPPD_ROOT_URL,
  USER_FRIENDS,
  USER_INFO
} from '@bottle-share-pickr/api-interface';

import axios from 'axios';
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
        <Route path="/home">
          <HomePage />
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

function HomePage() {
  let query = useQuery();
  const accessToken = query.get('access_token');

  return (
    <>
      {accessToken ? (
        <>
          <div>ACCESS_TOKEN: {accessToken}</div>
          <UserInfo accessToken={accessToken} />
          <FriendsList accessToken={accessToken} />
        </>
      ) : (
        <>
          <div>NO TOKEN PROVIDED</div>
          <Link to="/">Go back to Landing page</Link>
        </>
      )}
    </>
  );
}

const UserInfo = props => {
  const { accessToken } = props;
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        `${UNTAPPD_ROOT_URL}${USER_INFO}?access_token=${accessToken}&compact=true`
      );

      setUserInfo(response.data.response.user);
    };

    getUserInfo();
  }, []);

  return (
    <div>
      <img src={userInfo.user_avatar} />
      {`${userInfo.first_name} ${userInfo.last_name} (${userInfo.user_name})`}
    </div>
  );
};

const FriendsList = props => {
  const { accessToken } = props;
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const getFriendsList = async () => {
      const response = await axios.get(
        `${UNTAPPD_ROOT_URL}${USER_FRIENDS}?access_token=${accessToken}&compact=true`
      );

      setFriendsList(response.data.response.items);
    };
    getFriendsList();
  }, []);
  return (
    <>
      {friendsList.map((friend, i) => (
        <div key={`friend_${i}`}>
          <img src={friend.user.user_avatar} />
          {`${friend.user.first_name} ${friend.user.last_name} (${friend.user.user_name})`}
        </div>
      ))}
    </>
  );
};

export default App;
