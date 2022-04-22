import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

export default function RQSuperHeroesPage() {
  const onSuccess = (data) => {
    console.log('success', data);
  };

  const onError = (error) => {
    console.log('error', error);
  };

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

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
      {data?.data.map((hero) => (
        <Typography key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
        </Typography>
      ))}
      {/* {data.map((heroName) => (
        <Typography key={heroName.id}> {heroName.name}</Typography>
      ))} */}
    </Container>
  );
}
