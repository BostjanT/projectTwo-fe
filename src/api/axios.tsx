import axios from 'axios';

const getdata = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default getdata;
