import { serverFetch } from '@/lib/serverFetch';

export const getTeacherAttendance = async () => {
  try {
    const res = await serverFetch.get('attendance/teacher', {
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) {
      console.warn(`getTeacherAttendance returned status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error('Failed to fetch teachers attendances:', err);
    return [];
  }
};
