import axios, { AxiosResponse } from 'axios';
import { ENDPOINTS } from './api';
import type { 
  LoginCredentials, 
  RegisterData, 
  LoginResponse, 
  User, 
  RatingCreate, 
  Rating 
} from '../types';

// Configuração do axios
const api = axios.create({
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  async register(userData: RegisterData): Promise<User> {
    const response: AxiosResponse<User> = await api.post(ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await api.post(ENDPOINTS.LOGIN, credentials);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },

  async getMe(): Promise<User> {
    const token = localStorage.getItem('token');
    const response: AxiosResponse<User> = await api.get(`${ENDPOINTS.ME}?token=${token}`);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Serviços de avaliações
export const ratingsService = {
  async createRating(ratingData: RatingCreate): Promise<{ message: string; id: string }> {
    const response: AxiosResponse<{ message: string; id: string }> = await api.post(ENDPOINTS.RATINGS, ratingData);
    return response.data;
  },

  async getUserRatings(): Promise<Rating[]> {
    const response: AxiosResponse<Rating[]> = await api.get(ENDPOINTS.RATINGS);
    return response.data;
  },

  async deleteRating(title: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> = await api.delete(ENDPOINTS.DELETE_RATING(title));
    return response.data;
  }
};

