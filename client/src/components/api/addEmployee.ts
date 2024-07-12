import {API_BASE_URL} from '../../config'

export interface EmployeeFormData {
    username: string;
    name: string;
    email: string;
    password: string;
  }
  
  export const createEmployee = async (newEmployee: EmployeeFormData): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  
    return response.json();
  };
  