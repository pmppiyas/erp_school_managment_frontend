export const env = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,

  admin: {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string,
  },

  teacher: {
    email: process.env.NEXT_PUBLIC_TEACHER_EMAIL as string,
    password: process.env.NEXT_PUBLIC_TEACHER_PASSWORD as string,
  },

  student: {
    email: process.env.NEXT_PUBLIC_STUDENT_EMAIL as string,
    password: process.env.NEXT_PUBLIC_STUDENT_PASSWORD as string,
  },
};

export const envConfig = env;
export default env;
