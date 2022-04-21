import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

export default function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/superheroes')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h5">{error}</Typography>;
  }

  return (
    <Container>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </Container>
  );
}
