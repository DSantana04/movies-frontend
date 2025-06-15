// Configurações da API
export const API_CONFIG = {
  AUTH_BASE_URL: 'http://localhost:8000/api/auth',
  RATINGS_BASE_URL: 'http://localhost:8001/api/ratings'
};

// Funções utilitárias para localStorage
export const tokenStorage = {
  get: () => localStorage.getItem('access_token'),
  set: (token) => localStorage.setItem('access_token', token),
  remove: () => localStorage.removeItem('access_token')
};

// Headers para requisições autenticadas
export const getAuthHeaders = () => {
  const token = tokenStorage.get();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

