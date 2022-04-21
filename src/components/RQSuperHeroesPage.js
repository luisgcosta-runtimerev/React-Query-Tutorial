import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const fetchSuperHeroes = () => axios.get('http://localhost:8000/superheroes');

export default function RQSuperHeroesPage() {
  const { isLoading, data, isError, error } = useQuery(
    'super-heroes',
    fetchSuperHeroes
  );

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
