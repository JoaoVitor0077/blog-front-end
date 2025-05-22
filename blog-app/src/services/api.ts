import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.60:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;