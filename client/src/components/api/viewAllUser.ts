// useUsersQuery.ts
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'; // Import QueryKey type
import axios from 'axios';

export const useUsersQuery = () => {
  const options: UseQueryOptions<any, Error, any, QueryKey> = {
    queryKey: ['users'], // Define queryKey as an array with a string identifier
    queryFn: async () => {
      const response = await axios.get('http://localhost:8080/api/user/users');
      return response.data;
    },
  };

  return useQuery(options);
};
