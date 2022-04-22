import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => axios.get('http://localhost:8000/superheroes');

// eslint-disable-next-line import/prefer-default-export
export const useSuperHeroesData = (onSuccess, onError, config) =>
  useQuery('super-heroes', fetchSuperHeroes, {
    // cacheTime: 50000, // set cache time to 50 seconds
    // staleTime: 30000, // set stale time to 30 seconds
    // refetchOnMount: true, // only fecth data if the data is stale ** if it is set to 'always', data is always fetched
    // refetchOnWindowFocus: true, // refectch data when tab loses focus and gain focus again - only fecth data if the data is stale ** if it is set to 'always', data is always fetched
    // refetchInterval: 3000, // automatically refetch data after 2 seconds - it's paused if window isn't focus
    // refetchIntervalInBackground: true, // refetch if tab isn't focus
    // enabled: false, // data is not fetched without refetch call
    onSuccess, // side effect when data is fetched
    onError, // side effect when data isn't fetched
    config,
    // eslint-disable-next-line no-shadow
    /* select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      } */
    // eslint-disable-next-line no-shadow
    select: (data) => {
      const superHeroNames = data.data.filter((hero) => hero.id % 2 === 0);
      return superHeroNames;
    }
  });
