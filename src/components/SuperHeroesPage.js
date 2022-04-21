import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

export default function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/superheroes').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
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
