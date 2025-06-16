// Tipos para as APIs
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface Rating {
  title: string;
  genre: string;
  rating: number;
  user_id?: string;
}

export interface RatingCreate {
  title: string;
  genre: string;
  rating: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

