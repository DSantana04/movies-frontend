import { createContext, useContext, useState, useEffect } from 'react';
import { API_CONFIG, tokenStorage, getAuthHeaders } from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const token = tokenStorage.get();
      const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/me?token=${token}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        tokenStorage.remove();
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      tokenStorage.remove();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        tokenStorage.set(data.access_token);
        await fetchUser();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail };
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_CONFIG.AUTH_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail };
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const logout = () => {
    tokenStorage.remove();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

