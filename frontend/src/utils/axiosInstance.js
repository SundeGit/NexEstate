import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default axiosInstance;