import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';

const fetchColors = (page) =>
  axios.get(`http://localhost:8000/colors?_limit=2&_page=${page}`);

export default function PaginatedQueries() {
  const [page, setPage] = useState(1);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ['colors', page],
    () => fetchColors(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Container>
      {data?.data.map((color) => (
        <Typography key={color.id}>{color.label}</Typography>
      ))}
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous Page
      </Button>
      <Button onClick={() => setPage(page + 1)} disabled={page === 4}>
        Next Page
      </Button>
      {isFetching && <Typography>Loading new page...</Typography>}
    </Container>
  );
}
