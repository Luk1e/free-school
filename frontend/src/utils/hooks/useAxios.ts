import axios from "axios";
import { refresh, logout } from "../../toolkit/auth/authSlice";
import i18n from "../../i18next";
// Implementing a request queue in Axios interceptors
import { AxiosRequestConfig } from "axios";

// Export store injection function,
// Store is injected in index.js
let store: any;
export const injectStore = (_store: any) => {
  store = _store;
};

const BACKEND_URL = "http://localhost:8080";

// Detect language changes
i18n.on("languageChanged", (newLang) => {
  useAxios.defaults.headers["Accept-Language"] = newLang;
  useAuthAxios.defaults.headers["Accept-Language"] = newLang;
  useAuthFileAxios.defaults.headers["Accept-Language"] = newLang;
});

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

// Export axios without authorization for public pages
export const useAxios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,

  headers: {
    "Accept-Language": i18n.language?.toLowerCase(),
    "Content-Type": "application/json",
  },
});

// Export authorized axios with cookies for auth pages
export const useAuthAxios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,

  headers: {
    "Accept-Language": i18n.language?.toLowerCase(),
    "Content-Type": "application/json",
  },
});

// If unauthorized send refresh token request
useAuthAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      if (document.cookie.includes("isUserLogged=")) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            // Refresh the access token
            await store.dispatch(refresh());

            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              useAuthAxios
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            // Retry the original request
            return useAuthAxios(originalRequest);
          } catch (refreshError) {
            // Handle token refresh error
            // You can clear all storage and redirect the user to the login page
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }

        // Add the original request to the queue
        return new Promise<void>((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: originalRequest,
            resolve,
            reject,
          });
        });
      } else {
        store.dispatch(logout());
      }
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

// Export custom axios for files
// cookies included
export const useAuthFileAxios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,

  headers: {
    "Accept-Language": i18n.language?.toLowerCase(),
    "Content-Type": "multipart/form-data",
  },
});

// If unauthorized send refresh token request
useAuthFileAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      if (document.cookie.includes("isUserLogged=")) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            // Refresh the access token
            await store.dispatch(refresh());
            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              useAuthFileAxios
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            // Retry the original request
            return useAuthFileAxios(originalRequest);
          } catch (refreshError) {
            // Handle token refresh error
            // You can clear all storage and redirect the user to the login page
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }

        // Add the original request to the queue
        return new Promise<void>((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: originalRequest,
            resolve,
            reject,
          });
        });
      } else {
        store.dispatch(logout());
      }
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

