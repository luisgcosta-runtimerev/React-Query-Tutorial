import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const fetchSuperHeroes = () => axios.get('http://localhost:8000/superheroes');

const fetchFriends = () => axios.get('http://localhost:8000/friends');

export default function ParallelQueries() {
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);

  console.log('super heroes:', superHeroes);
  return (
    <Container>
      <Typography variant="h4">Heroes</Typography>
      {superHeroes?.data.map((hero) => (
        <Typography key={hero.id}>Name: {hero.name}</Typography>
      ))}
      <Typography variant="h4">Friends</Typography>
      {friends?.data.map((friend) => (
        <Typography key={friend.id}>Name: {friend.name}</Typography>
      ))}
    </Container>
  );
}
