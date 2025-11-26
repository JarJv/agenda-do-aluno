import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

interface Usuario {
  id_usuario: number;
  username: string;
  email?: string;
  nome?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  atualizarUsuario: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarUsuario = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/usuario/me');
      setUsuario(response.data.data);
    } catch (error) {
      localStorage.removeItem('access_token');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem('access_token', token);
    await carregarUsuario();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUsuario(null);
  };

  const atualizarUsuario = async () => {
    await carregarUsuario();
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
