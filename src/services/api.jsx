import axios from 'axios';

const API_URL = 'http://localhost:8080';

const defaultConfig = {
  baseURL: API_URL,  
  withCredentials: false
};

const api = axios.create(defaultConfig);

export default api;