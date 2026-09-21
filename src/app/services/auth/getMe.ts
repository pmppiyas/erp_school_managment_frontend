import { serverFetch } from '@/lib/serverFetch';

export const getMe = async () => {
  try {
    const res = await serverFetch.get('user/me', {
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    return result?.data || result;
  } catch (err) {
    console.error('Error fetching user in getMe:', err);
    return null;
  }
};
