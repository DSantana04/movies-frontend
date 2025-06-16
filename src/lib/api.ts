// Configuração das URLs das APIs
export const API_CONFIG = {
  AUTH_BASE_URL: 'http://localhost:8000/api/auth',
  RATINGS_BASE_URL: 'http://localhost:8001/api/ratings'
} as const;

// Endpoints específicos
export const ENDPOINTS = {
  // Autenticação
  REGISTER: `${API_CONFIG.AUTH_BASE_URL}/register`,
  LOGIN: `${API_CONFIG.AUTH_BASE_URL}/login`,
  ME: `${API_CONFIG.AUTH_BASE_URL}/me`,
  
  // Avaliações
  RATINGS: `${API_CONFIG.RATINGS_BASE_URL}/`,
  DELETE_RATING: (title: string) => `${API_CONFIG.RATINGS_BASE_URL}/${title}`
} as const;

