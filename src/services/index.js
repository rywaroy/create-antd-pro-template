import axios from 'axios';

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3002/api'
      : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  timeout: 100000,
});

export const downLoadProjectApi = (data) =>
  http.post('/create/project', data, {
    responseType: 'blob',
  });
