import axios from "axios";

const api = axios.create({
   baseURL: '',
   withCredentials: true,
})

const handleError = (error) => {
  if (error.response?.data) {
    throw error.response.data;
  }
  throw { message: error.message || 'An error occurred' };
};

export const register = async ({username, email, password}) => {
  try {
    const response = await api.post('/api/auth/register',
       {username, email, password})
       console.log(response.data)
    return response.data

  } catch (error) {
    handleError(error);
  }
};

export const login = async ({email, password}) => {
  try {
    const response = await api.post('/api/auth/login', {email, password})
    return response.data
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/api/auth/logout')
    return response.data
  } catch (error) {
    handleError(error);
  }
};

export const getMe = async () => {
  try {
    const response = await api.get('/api/auth/get-me')
    return response.data
  } catch (error) {
    handleError(error);
  }
};


