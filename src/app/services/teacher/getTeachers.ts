import { serverFetch } from '@/lib/serverFetch';

export const getTeachers = async () => {
  try {
    const res = await serverFetch.get('teacher', {
      next: {
        tags: ['teacher'],
        revalidate: 0,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server Error:', errorText);
      return { teachers: [] };
    }

    const data = await res.json();
    return data?.data || { teachers: [] };
  } catch (err) {
    console.error('Fetch error in getTeachers:', err);
    return { teachers: [] };
  }
};
