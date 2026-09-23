'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from '@/lib/serverFetch';
import { revalidateTag } from 'next/cache';

export const postSchedule = async (classId: string, payload: any) => {
  try {
    const res = await serverFetch.post(`schedule/${classId}`, payload);

    const result = await res.json();

    if (res.ok) {
      revalidateTag('schedule', 'default');
    }

    return result;
  } catch (err) {
    console.error('Post error:', err);
    return {
      success: false,
      message: 'Something went wrong while posting schedule',
    };
  }
};
