import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const fetchSuperHeroes = () => axios.get('http://localhost:8000/superheroes');

export default function RQSuperHeroesPage() {
  const [refetchInt, setRefetchInt] = useState(4000);

  const onSuccess = (data) => {
    if (data.length === 4) {
      setRefetchInt(0);
    }
    console.log('success', data);
  };

  const onError = (error) => {
    setRefetchInt(0);
    console.log('error', error);
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: 50000, // set cache time to 50 seconds
      // staleTime: 30000, // set stale time to 30 seconds
      // refetchOnMount: true, // only fecth data if the data is stale ** if it is set to 'always', data is always fetched
      // refetchOnWindowFocus: true, // refectch data when tab loses focus and gain focus again - only fecth data if the data is stale ** if it is set to 'always', data is always fetched
      refetchInterval: refetchInt, // automatically refetch data after 2 seconds - it's paused if window isn't focus
      // refetchIntervalInBackground: true, // refetch if tab isn't focus
      // enabled: false, // data is not fetched without refetch call
      onSuccess, // side effect when data is fetched
      onError, // side effect when data isn't fetched
      // eslint-disable-next-line no-shadow
      /* select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      } */
      // eslint-disable-next-line no-shadow
      select: (data) => {
        const superHeroNames = data.data.filter((hero) => hero.id % 2 === 0);
        return superHeroNames;
      }
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
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
      {/* <Button onClick={refetch}>Fecth Heroes</Button> */}
      {/* {data?.data.map((hero) => (
        <Typography key={hero.name}>{hero.name}</Typography>
      ))} */}
      {data.map((heroName) => (
        <Typography key={heroName.id}> {heroName.name}</Typography>
      ))}
    </Container>
  );
}
