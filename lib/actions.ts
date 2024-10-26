'use server';

import { z } from 'zod';
import User from './db/models/user';
import { redirect } from 'next/navigation';
import { connectMongoDB, Folder as FolderModel } from './db';
import { Article, Folder } from '@/types/folder';
import folder from './db/models/folder';
import { revalidatePath } from 'next/cache';
import * as cheerio from 'cheerio';

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
  // await connectMongoDB();

  const validatedFields = AuthFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  });

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

export interface ActionsActionState {
  errors?: {
    name?: string[];
  };
  message?: string | null;
}

const FolderPayloadSchema = z.object({
  name: z
    .string({
      required_error: 'Folder name is required.',
      invalid_type_error:
        'Folder cannot not be numbers or special characters only.',
    })
    .min(1, { message: 'Name cannot be empty.' }),
});

export async function createNewFolder(
  prevState: ActionsActionState | undefined,
  formData: FormData
) {
  const validatedFields = FolderPayloadSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Cannot create folder.',
    };
  }

  const { name } = validatedFields.data;

  const folderPayload: Partial<Omit<Folder, 'user'> & { user: string }> = {
    name: formData.get('name') as string,
    articles: [],
    user: '671cc61dc03e7c9287ee6f42', // HANDLE WITH AUTH
  };

  try {
    // await connectMongoDB();
    const folder_doc = await folder.findOne({ name: folderPayload.name });

    if (folder_doc && folder_doc._id) {
      return {
        errors: { name: ['Folder already exists.'] },
        message: 'Cannot create folder.',
      };
    }

    await folder.create(folderPayload);
  } catch (error) {
    console.log({ error });
    return {
      errors: {},
      message: 'Something went wrong',
    };
  }

  revalidatePath('/portal');
  redirect('/portal');
}

const AddNewArticleSchema = z.object({
  url: z
    .string({
      required_error: 'Please enter URL',
      message: 'Please enter a URL',
      invalid_type_error: 'Please enter a valid URL',
    })
    .min(8),
});

export async function addNewArticle(
  folderId: string,
  _: any,
  formData: FormData
) {
  const validatedFields = AddNewArticleSchema.safeParse({
    url: formData.get('url'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Cannot add URL.',
    };
  }

  if (!folderId) {
    return {
      error: 'Folder not specified.',
    };
  }

  const { url } = validatedFields.data;

  const $ = await cheerio.fromURL(url);
  const title = $('title').text();

  const article_payload = { url: url, title };

  await connectMongoDB();
  const folder = await FolderModel.findOne({ _id: folderId });

  if (!folder.articles.some((art: Article) => art.url === url)) {
    folder.articles = [...folder.articles, { ...article_payload }];
  }

  await folder.save();

  revalidatePath(`/portal/folder/${folderId}`);
}
