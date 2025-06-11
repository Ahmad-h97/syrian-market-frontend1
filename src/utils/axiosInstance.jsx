import axios from 'axios';
import {useAuthStore} from '../store/authStore';

// Create a single Axios instance
console.log(1)
const api = axios.create({
  baseURL:  import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // allows sending cookies for refresh
});
console.log(2)

// REQUEST INTERCEPTOR: Add access token to every request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    console.log("the acces token with req:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request headers:', config.headers);
    
    }
    return config;
  },
  (error) => Promise.reject(error)
);
console.log(3)
// RESPONSE INTERCEPTOR: Refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);

    if (
      error.response &&  //The error has a response (network errors won’t have one)
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      
      originalRequest._retry = true;

      try {
        const res = await api.get('auth/refresh', {
          withCredentials: true, // send refresh cookie
          
        });
        const newToken = res.data.accessToken;
        console.log('res.data.accessToken:', newToken);
        useAuthStore.getState().setAccessToken(newToken);
        console.log('new Token from storage:', useAuthStore.getState().accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry with new token
      } catch (err) {
        useAuthStore.getState().clearAccessToken(); // logout user
        return Promise.reject(err);  // Passes through other errors (e.g., 404, 500) unchanged.  Why: Only token-related errors should trigger a refresh.
      }
    }

    return Promise.reject(error);
  }
);

export default api;
