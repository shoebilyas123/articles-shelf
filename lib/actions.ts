'use server';

import { z } from 'zod';
import User from './db/models/user';
import { redirect } from 'next/navigation';
import { connectMongoDB } from './db';

// await connectMongoDB();

export type AuthState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    auth?: string[];
  };
  message?: string | null;
};

const AuthFormSchema = z.object({
  email: z
    .string({
      message: 'Please enter your email.',
    })
    .email({
      message: 'Please enter a valid email.',
    }),
  name: z
    .string({ message: 'Please enter your name' })
    .min(4, { message: 'Name must be 4 characters long' }),
  password: z
    .string({
      message: 'Please create a password',
    })
    .min(6, { message: 'Password must be 6 characters long' }),
});

export async function registerUser(prevState: AuthState, formData: FormData) {
  const validatedFields = AuthFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  });

  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: { ...validatedFields.error.flatten().fieldErrors, auth: [] },
      message: 'Cannot register user.',
    };
  }

  try {
    const { email, password, name } = validatedFields.data;

    if (!!(await User.findOne({ email }))) {
      return {
        errors: { auth: ['Email already exists!'] },
        message: 'Cannot register user',
      };
    }

    const user = await User.create({ email, password, name });
  } catch (error) {
    return {
      errors: {},
      message: 'Internal Server Error',
    };
  }
  redirect('/auth/login');

  return prevState;
}
