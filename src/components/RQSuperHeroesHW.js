import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

const reactQueryConfig = {
  refetchOnMount: true,
  enabled: false
};

export default function RQSuperHeroesPage() {
  const onSuccess = (data) => {
    console.log('success', data);
  };

  const onError = (error) => {
    console.log('error', error);
  };

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError, reactQueryConfig);

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
      <Button onClick={refetch}>Fecth Heroes</Button>
      {/* {data?.data.map((hero) => (
        <Typography key={hero.name}>{hero.name}</Typography>
      ))} */}
      {data?.data.map((heroName) => (
        <Typography key={heroName.id}> {heroName.name}</Typography>
      ))}
    </Container>
  );
}
