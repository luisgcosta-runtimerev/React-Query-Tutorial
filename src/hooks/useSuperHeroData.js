import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:8000/superheroes/${heroId}`);
};

// eslint-disable-next-line import/prefer-default-export
export const useSuperHeroData = (heroId) =>
  useQuery(['super-hero', heroId], fetchSuperHero);
