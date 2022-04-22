/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Container, Typography } from '@mui/material';

const fetchUserByEmail = (email) =>
  axios.get(`http://localhost:8000/users/${email}`);

const fetchChannelByChannelId = (channel) =>
  axios.get(`http://localhost:8000/channels/${channel}`);

export default function DependentQueries({ email }) {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data.channelId;

  const { data: channel } = useQuery(
    ['courses', channelId],
    () => fetchChannelByChannelId(channelId),
    {
      enabled: !!channelId
    }
  );

  return (
    <Container>
      {channel?.data.courses.map((course) => (
        <Typography key={course}> {course}</Typography>
      ))}
    </Container>
  );
}
