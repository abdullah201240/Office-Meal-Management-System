import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'; 
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const useFoodsQuery = (userEmail: unknown) => {
  const options: UseQueryOptions<any, Error, any, QueryKey> = {
    queryKey: ['foods', userEmail], 
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/user/viewCart`, {
        params: { userEmail }
      });
      return response.data;
    },
    enabled: !!userEmail, // Ensure query is enabled only if userEmail is available
  };

  return useQuery(options);
};
