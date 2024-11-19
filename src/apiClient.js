import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Backend URL
});

export default apiClient;
