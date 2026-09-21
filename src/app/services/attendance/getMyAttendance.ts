import { serverFetch } from '@/lib/serverFetch';

export const getMyAttendance = async (month: string, year: string) => {
  try {
    const res = await serverFetch.get(`attendance/my/${month}/${year}`, {
      next: {
        tags: ['attendance'],
        revalidate: 0,
      },
    });

    if (!res.ok) {
      console.warn(`getMyAttendance returned status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error('Failed to fetch own attendances:', err);
    return [];
  }
};
