import axios from 'axios';

const API_URL = 'http://localhost:8080/api/adminAuth';

export const loginAdmin = async ({ email, password }: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
