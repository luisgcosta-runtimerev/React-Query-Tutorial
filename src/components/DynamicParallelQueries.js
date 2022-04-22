/* eslint-disable react/prop-types */
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

const fetchSuperHero = (heroId) =>
  axios.get(`http://localhost:8000/superheroes/${heroId}`);

export default function DyanmicParallelQueries({ heroIds }) {
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ['super-hero', id],
      queryFn: () => fetchSuperHero(id)
    }))
  );

  return (
    <Container>
      {queryResults.map((arr) => (
        <Typography key={arr.data?.data.id}>{arr.data?.data.name}</Typography>
      ))}
    </Container>
  );
}
