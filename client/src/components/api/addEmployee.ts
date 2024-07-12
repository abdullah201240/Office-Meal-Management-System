export interface EmployeeFormData {
    username: string;
    name: string;
    email: string;
    password: string;
  }
  
  export const createEmployee = async (newEmployee: EmployeeFormData): Promise<any> => {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
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
  