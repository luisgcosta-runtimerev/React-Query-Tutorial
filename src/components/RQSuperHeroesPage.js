import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const fetchSuperHeroes = () => axios.get('http://localhost:8000/superheroes');

export default function RQSuperHeroesPage() {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: 50000, // set cache time to 50 seconds
      // staleTime: 30000, // set stale time to 30 seconds
      // refetchOnMount: true, // only fecth data if the data is stale ** if it is set to 'always', data is always fetched
      // refetchOnWindowFocus: true, // refectch data when tab loses focus and gain focus again - only fecth data if the data is stale ** if it is set to 'always', data is always fetched
      refetchInterval: 2000, // automatically refetch data after 2 seconds - it's paused if window isn't focus
      refetchIntervalInBackground: true // refetch if tab isn't focus
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }
  if (isError) {
    return (
      <Container>
        <Typography>{error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      {data?.data.map((hero) => (
        <Typography key={hero.name}>{hero.name}</Typography>
      ))}
    </Container>
  );
}
