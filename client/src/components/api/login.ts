import axios from 'axios';

export interface LoginResponse {
  message: string;
  token: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginVariables): Promise<LoginResponse> => {
  const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
  return response.data;
};

export default login;
