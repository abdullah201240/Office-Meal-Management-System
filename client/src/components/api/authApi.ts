import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginParams) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
