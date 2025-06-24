import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

httpClient.interceptors.request.use((config) => {
  const user = localStorage.getItem('@WMManager:user');
  if (user) {
    const { access_token } = JSON.parse(user);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return config;
});