import api from './api';

export const login = async (email, password) => {
  try {
    const { data } = await api.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (email, password) => {
  try {
    const { data } = await api.post('/users/register', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};