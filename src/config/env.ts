export const env = {
  NEXT_PUBLIC_BACKEND_URL:
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://ems-school-backend.vercel.app/api/v1'
      : 'http://localhost:5000/api/v1'),

  NEXT_PUBLIC_FRONTEND_URL:
    process.env.NEXT_PUBLIC_FRONTEND_URL || '/',

  NEXT_PUBLIC_SUPPORT_URL:
    process.env.NEXT_PUBLIC_SUPPORT_URL ||
    process.env.NEXT_PUBLIC_Support_URL ||
    '/contact',

  JWT_SECRET: process.env.JWT_SECRET || '23er34',

  admin: {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Admin1234',
  },

  teacher: {
    email: process.env.NEXT_PUBLIC_TEACHER_EMAIL || 'teacher@gmail.com',
    password: process.env.NEXT_PUBLIC_TEACHER_PASSWORD || 'Teacher1234',
  },

  student: {
    email: process.env.NEXT_PUBLIC_STUDENT_EMAIL || 'fatemapg@gmail.com',
    password: process.env.NEXT_PUBLIC_STUDENT_PASSWORD || '123456',
  },
};

export const envConfig = env;
export default env;
