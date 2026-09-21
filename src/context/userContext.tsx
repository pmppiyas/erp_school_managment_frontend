/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getMe } from '@/app/services/auth/getMe';
import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export interface UserContextType {
  user: any;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

export const defaultUserContext: UserContextType = {
  user: null,
  isLoading: false,
  refreshUser: async () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const data = await getMe();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser: fetchUser }}>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </NextThemesProvider>
    </UserContext.Provider>
  );
};
