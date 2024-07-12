import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'; // Import QueryKey type
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const useUsersQuery = () => {
  const options: UseQueryOptions<any, Error, any, QueryKey> = {
    queryKey: ['users'], 
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/user/users`);
      return response.data;
    },
  };

  return useQuery(options);
};
