import { useMutation, UseMutationResult } from '@tanstack/react-query';
import login, { LoginResponse, LoginVariables } from '../api/login'; // Adjust the import path as necessary

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginVariables> => {
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: login,
  });
};
