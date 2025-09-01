import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  bankName: string;
  role: 'bank' | 'admin';
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificación de sesión existente
    const savedUser = localStorage.getItem('inquest_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('inquest_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuarios de ejemplo para demostración
      const mockUsers: User[] = [
        {
          id: '1',
          username: 'banco1',
          bankName: 'Banco Santander',
          role: 'bank',
          isActive: true
        },
        {
          id: '2',
          username: 'banco2',
          bankName: 'Banco de Chile',
          role: 'bank',
          isActive: true
        },
        {
          id: 'admin',
          username: 'admin',
          bankName: 'Administrador',
          role: 'admin',
          isActive: true
        }
      ];
      
      const foundUser = mockUsers.find(u => 
        u.username === username && 
        (password === '123456' || password === 'admin')
      );
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('inquest_user', JSON.stringify(foundUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inquest_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
