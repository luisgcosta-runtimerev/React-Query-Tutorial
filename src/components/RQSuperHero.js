import { Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

export default function RQSuperHero() {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography> {error.message}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4">Hero Detail</Typography>
      <Typography>Name: {data?.data.name}</Typography>
      <Typography>Alter Ego: {data?.data.alterEgo} </Typography>
    </Container>
  );
}
