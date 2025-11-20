import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true, // allow cookies
});

// Refresh logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  failedQueue = [];
};

// Attach access token from memory to headers
axiosInstance.interceptors.request.use(config => {
  const token = window.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/auth/refresh`, {}, { withCredentials: true });
        
        // store new access token in memory
        window.accessToken = response.data.accessToken;

        processQueue(null, window.accessToken);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${window.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        window.location.href = '/';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
