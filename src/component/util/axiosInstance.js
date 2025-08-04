import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true, // ✅ Important: allow cookies to be sent
});

// Refresh logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(axiosInstance(originalRequest)),
            reject: (error) => reject(error),
          });
        });
      }

      isRefreshing = true;

      try {
        await axios.post(`${process.env.REACT_APP_URL}/auth/refresh`, {}, { withCredentials: true });
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr);
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
