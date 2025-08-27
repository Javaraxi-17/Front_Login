// services/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt_token');
    console.log('🚀 Interceptor de request ejecutándose...');
    console.log('🎫 Token encontrado en cookies:', token ? token.substring(0, 20) + '...' : 'NO HAY TOKEN');
    console.log('📡 URL de la petición:', config.url);
    console.log('🔧 Método HTTP:', config.method);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token agregado al header Authorization');
    } else {
      console.log('❌ No se pudo agregar token - no encontrado en cookies');
    }
    
    console.log('📋 Headers finales:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      Cookies.remove('jwt_token');
      Cookies.remove('user_data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      if (response.data.success) {
        // Guardar token y datos del usuario en cookies
        Cookies.set('jwt_token', response.data.token, { expires: 1 }); // 1 día
        Cookies.set('user_data', JSON.stringify(response.data.user), { expires: 1 });
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      if (response.data.success) {
        // Guardar token y datos del usuario en cookies
        Cookies.set('jwt_token', response.data.token, { expires: 1 });
        Cookies.set('user_data', JSON.stringify(response.data.user), { expires: 1 });
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Logout
  logout: () => {
    Cookies.remove('jwt_token');
    Cookies.remove('user_data');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!Cookies.get('jwt_token');
  },

  // Obtener datos del usuario desde cookies
  getUser: () => {
    const userData = Cookies.get('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  // Obtener token desde cookies
  getToken: () => {
    return Cookies.get('jwt_token');
  }
};

// Servicios de usuarios
export const userService = {
  // Obtener perfil del usuario
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Actualizar usuario
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      if (response.data.success) {
        // Actualizar datos del usuario en cookies
        const currentUser = authService.getUser();
        const updatedUser = { ...currentUser, ...response.data.user };
        Cookies.set('user_data', JSON.stringify(updatedUser), { expires: 1 });
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Eliminar usuario
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      if (response.data.success) {
        // Limpiar cookies después de eliminar
        authService.logout();
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  }
};

export default api;
