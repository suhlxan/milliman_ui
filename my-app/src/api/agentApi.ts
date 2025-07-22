import axios from 'axios';

const agentApi = axios.create({
  baseURL: 'http://10.126.192.183:8008',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default agentApi;
