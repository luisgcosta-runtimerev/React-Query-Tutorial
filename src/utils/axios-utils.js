import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:8000' });

// eslint-disable-next-line import/prefer-default-export
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response) => response;

  // optionally catch errors and add additional logging here
  const onError = (error) => error;

  return client(options).then(onSuccess).catch(onError);
};
