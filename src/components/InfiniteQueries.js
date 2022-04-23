import React, { Fragment } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { Container, Typography, Button } from '@mui/material';

const fetchColors = (pageParam) =>
  axios.get(`http://localhost:8000/colors?_limit=2&_page=${pageParam}`);

export default function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(
    'colors',
    ({ pageParam = 1 }) => fetchColors(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        }
        return undefined;
      }
    }
  );

  if (isLoading) {
    <Typography>Loading your data...</Typography>;
  }

  if (isError) {
    <Typography>Error: {error.message}</Typography>;
  }
  return (
    <Container>
      {data?.pages.map((colors, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={i}>
          {colors.data.map((color) => (
            <Typography key={color.id}>{color.label}</Typography>
          ))}
        </Fragment>
      ))}
      <Button onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </Button>
      <Typography>
        {isFetching || isFetchingNextPage ? 'Loading...' : null}
      </Typography>
    </Container>
  );
}
