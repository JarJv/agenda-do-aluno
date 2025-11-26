import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const STORAGE_KEY_TOKEN = 'access_token';
const REFRESH_ENDPOINT = '/usuario/refresh';
const LOGIN_PATH = '/login';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

const obterTokenDoStorage = (): string | null => {
  return localStorage.getItem(STORAGE_KEY_TOKEN);
};

const salvarTokenNoStorage = (token: string): void => {
  localStorage.setItem(STORAGE_KEY_TOKEN, token);
};

const removerTokenDoStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY_TOKEN);
};

const redirecionarParaLogin = (): void => {
  if (window.location.pathname !== LOGIN_PATH) {
    window.location.href = LOGIN_PATH;
  }
};

const adicionarAuthorizationHeader = (config: AxiosRequestConfig, token: string): void => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
};

api.interceptors.request.use((config) => {
  const token = obterTokenDoStorage();
  if (token) {
    adicionarAuthorizationHeader(config, token);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const ehErro401 = error.response?.status === 401;
    const naoFoiTentadoAinda = !originalRequest._retry;

    if (ehErro401 && naoFoiTentadoAinda) {
      originalRequest._retry = true;

      try {
        const response = await api.post(REFRESH_ENDPOINT, {});
        const novoToken = response.data.access_token;

        salvarTokenNoStorage(novoToken);
        adicionarAuthorizationHeader(originalRequest, novoToken);

        return api(originalRequest);
      } catch {
        removerTokenDoStorage();
        redirecionarParaLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
