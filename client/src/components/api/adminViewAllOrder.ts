import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'; 
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const useFoodsQuery = () => {
  const options: UseQueryOptions<any, Error, any, QueryKey> = {
    queryKey: ['foods'], 
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/admin/view-Order`);
      return response.data;
    },
  };

  return useQuery(options);
};
