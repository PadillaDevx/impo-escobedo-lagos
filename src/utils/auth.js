import { API_URL } from '../config/constants';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar token en localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Error de conexión con el servidor' };
  }
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem('adminToken');
};

export const getUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const verifyToken = async () => {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/api/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};
