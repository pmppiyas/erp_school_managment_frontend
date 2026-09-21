import { UserContext, defaultUserContext } from '@/context/userContext';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(UserContext);
  return context ?? defaultUserContext;
};
