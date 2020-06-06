import { Friend, User } from '@bottle-share-pickr/api-interface';
import React, { useEffect, useState } from 'react';
import {
  USER_FRIENDS,
  USER_INFO,
  untappdEndpoint
} from '@bottle-share-pickr/api-interface';

import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import useQuery from '../hooks/useQuery';

const Home = () => {
  const requestOptions = { access_token: useQuery().get('access_token') };
  const [userInfo, setUserInfo] = useState<User>(null);
  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        untappdEndpoint(USER_INFO, requestOptions)
      );

      setUserInfo(response.data.response.user);
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const getFriendsList = async () => {
      const response = await axios.get(
        untappdEndpoint(USER_FRIENDS, requestOptions)
      );

      setFriendsList(response.data.response.items);
    };
    getFriendsList();
  }, []);

  return (
    <>
      {requestOptions.access_token ? (
        <>
          <div>ACCESS_TOKEN: {requestOptions.access_token}</div>
          <div>Your profile:</div>
          <UserInfo data={userInfo} />
          <div>Friends list:</div>
          <FriendsList data={friendsList} />
        </>
      ) : (
        <>
          <div>NO TOKEN PROVIDED</div>
          <Link to="/">Go back to Landing page</Link>
        </>
      )}
    </>
  );
};

const UserInfo = props => {
  const { data } = props;

  return data ? <UserProfile data={data} /> : null;
};

const FriendsList = props => {
  const { data } = props;

  return (
    <FriendsListContainer>
      {data &&
        data.map((friend, i: number) => (
          <UserProfile key={`friend_${i}`} data={friend.user} />
        ))}
    </FriendsListContainer>
  );
};

const UserProfile = props => {
  const { data } = props;
  return (
    <UserProfileContainer>
      <Avatar src={data.user_avatar} />
      <div>{`${data.first_name} ${data.last_name}`}</div>
      <div>{`(${data.user_name})`}</div>
    </UserProfileContainer>
  );
};

const FriendsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.img`
  width: 50px;
  height: auto;
`;

export default Home;
