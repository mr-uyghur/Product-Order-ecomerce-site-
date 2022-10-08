import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://alihalmamat.herokuapp.com',
});

export default axiosInstance;
