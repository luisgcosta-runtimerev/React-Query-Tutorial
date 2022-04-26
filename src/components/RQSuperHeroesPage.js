/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, Container, Typography, Input, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  useSuperHeroesData,
  useAddSuperHeroData
} from '../hooks/useSuperHeroesData';

export default function RQSuperHeroesPage() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('success', data);
  };

  const onError = (error) => {
    console.log('error', error);
  };

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    isLoading: addHeroLoading,
    isError: addHeroisError,
    error: addHeroError
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching || addHeroLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }
  if (isError || addHeroisError) {
    return (
      <Container>
        <Typography>{error?.message || addHeroError?.message}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" padding={2}>
        <Input
          type="text"
          value={name}
          placeholder="Hero Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          value={alterEgo}
          placeholder="Hero Alter Ego"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <Button onClick={handleAddHeroClick}>Add Hero</Button>
      </Box>
      <Button onClick={refetch}>Fecth Heroes</Button>
      {data?.data.map((hero) => (
        <Typography key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
        </Typography>
      ))}
    </Container>
  );
}
