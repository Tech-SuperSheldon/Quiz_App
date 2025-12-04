import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '',
  withCredentials: true ,
  headers: {
    'Content-Type' : 'application/json' ,
    Accept: 'application/json'
  }
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosClient ;
