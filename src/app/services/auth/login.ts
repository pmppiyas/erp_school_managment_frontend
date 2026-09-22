/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { env } from '@/config/env';

export async function loginUser(payload: { email: string; password: string }) {
  try {
    const backendUrl = env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/v1';

    const res = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type');
    let result: any = null;

    if (contentType && contentType.includes('application/json')) {
      result = await res.json();
    } else {
      const text = await res.text();
      console.error('Backend returned non-JSON response:', res.status, text.slice(0, 300));

      if (res.status === 500 || res.status === 502 || res.status === 503 || res.status === 504) {
        return {
          success: false,
          message:
            'ব্যাকএন্ড সার্ভার রেসপন্স করছে না (Server Error 500)। অনুগ্রহ করে ব্যাকএন্ড ডিপ্লয়মেন্ট বা ডাটাবেস সংযোগ পরীক্ষা করুন।',
        };
      }

      return {
        success: false,
        message: 'সার্ভার থেকে অপ্রত্যাশিত রেসপন্স এসেছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।',
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message || 'লগইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড প্রদান করুন।',
      };
    }

    if (!result?.data?.accessToken) {
      return {
        success: false,
        message: result?.message || 'লগইন ব্যর্থ হয়েছে (কোনো টোকেন পাওয়া যায়নি)।',
      };
    }

    const { accessToken, refreshToken } = result.data;
    const cookieStore = await cookies();

    cookieStore.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      success: true,
      message: 'লগইন সফল হয়েছে!',
      data: result.data,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      message:
        error.message ||
        'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। অনুগ্রহ করে আপনার ইন্টারনেট বা ব্যাকএন্ড চেক করুন।',
    };
  }
}
