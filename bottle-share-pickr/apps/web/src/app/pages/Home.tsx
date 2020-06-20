import { Friend, User } from '@bottle-share-pickr/api-interface';
import React, { useEffect, useState } from 'react';
import {
  UNTAPPD_DEFAULT_PAGINATION,
  USER_FRIENDS,
  USER_INFO,
  untappdEndpoint,
} from '@bottle-share-pickr/api-interface';

import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import useLocalStorage from '../hooks/useLocalStorage';
import useQuery from '../hooks/useQuery';

const Home = () => {
  const requestOptions = { access_token: useQuery().get('access_token') };
  const [userInfo, setUserInfo] = useState<User>(null);
  const [friendsList, setFriendsList] = useLocalStorage('FRIENDS_LIST', []);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        untappdEndpoint(USER_INFO, requestOptions)
      );

      const user = response.data.response.user;
      setUserInfo(user);
    };

    getUserInfo();
  }, []);

  // load friends list
  useEffect(() => {
    if (!userInfo) return;
    if (userInfo.stats.total_friends === friendsList.length) return;

    const numFriendsPage = Math.ceil(
      userInfo.stats.total_friends / UNTAPPD_DEFAULT_PAGINATION
    );
    const pages = Array(numFriendsPage).fill(1);

    const getFriendsList = (offset: number) =>
      axios.get(untappdEndpoint(USER_FRIENDS, { ...requestOptions, offset }));

    Promise.all(
      pages.map((page, i) => getFriendsList(i * UNTAPPD_DEFAULT_PAGINATION))
    ).then((responses) => {
      const friends = responses.reduce(
        (acc, cur): Friend[] => [...acc, ...cur.data.response.items],
        []
      );
      friends.sort((friend1: Friend, friend2: Friend) => {
        var nameA = friend1.user.first_name.toUpperCase();
        var nameB = friend2.user.first_name.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setFriendsList(friends);
    });
  }, [userInfo]);

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

const UserInfo = (props) => {
  const { data } = props;

  return data ? <UserProfile data={data} /> : null;
};

const FriendsList = (props) => {
  const { data } = props;

  return (
    <FriendsListContainer>
      {data &&
        data.map((friend: Friend, i: number) => (
          <UserProfile key={`friend_${i}`} data={friend.user} />
        ))}
    </FriendsListContainer>
  );
};

const UserProfile = (props) => {
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
  margin: 5px;
`;
const Avatar = styled.img`
  width: 50px;
  height: auto;
`;

export default Home;
