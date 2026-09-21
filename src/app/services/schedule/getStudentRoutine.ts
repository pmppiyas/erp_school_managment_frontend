import { serverFetch } from '@/lib/serverFetch';

export const getStudentRoutine = async (day: string) => {
  try {
    const res = await serverFetch.get(`schedule/student/${day.toUpperCase()}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.warn(`getStudentRoutine returned status: ${res.status}`);
      return null;
    }

    const result = await res.json();
    return result.data;
  } catch (err) {
    console.error('Error fetching student routine:', err);
    return null;
  }
};
