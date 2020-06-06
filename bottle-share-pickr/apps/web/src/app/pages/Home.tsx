import React, { useEffect, useState } from 'react';
import {
  UNTAPPD_ROOT_URL,
  USER_FRIENDS,
  USER_INFO
} from '@bottle-share-pickr/api-interface';

import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import useQuery from '../hooks/useQuery';

const Home = () => {
  let query = useQuery();
  const accessToken = query.get('access_token');

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        `${UNTAPPD_ROOT_URL}${USER_INFO}?access_token=${accessToken}&compact=true`
      );

      setUserInfo(response.data.response.user);
    };

    getUserInfo();
  }, []);

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
      {accessToken ? (
        <>
          <div>ACCESS_TOKEN: {accessToken}</div>
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

  return data ? (
    <div>
      <Avatar src={data.user_avatar} />
      {`${data.first_name} ${data.last_name}
      (${data.user_name})`}
    </div>
  ) : null;
};

const FriendsList = props => {
  const { data } = props;

  return (
    <>
      {data &&
        data.map((friend, i: number) => (
          <div key={`friend_${i}`}>
            <Avatar src={friend.user.user_avatar} />
            {`${friend.user.first_name} ${friend.user.last_name}(${friend.user.user_name})`}
          </div>
        ))}
    </>
  );
};

const Avatar = styled.img`
  width: auto;
  height: 50px;
`;

export default Home;
