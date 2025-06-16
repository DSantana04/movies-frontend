import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../lib/services';
import type { AuthContextType, LoginCredentials, RegisterData, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.login(credentials);
      const userData = await authService.getMe();
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Erro no login' 
      };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error: any) {
      console.error('Erro no registro:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Erro no registro' 
      };
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

