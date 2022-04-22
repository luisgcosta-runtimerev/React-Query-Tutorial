import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:8000/superheroes/${heroId}`);
};

// eslint-disable-next-line import/prefer-default-export
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const myHero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId, 10));
      if (myHero) {
        return {
          data: myHero
        };
      }
      return undefined;
    }
  });
};
