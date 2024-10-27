'use server';

import User from './db/models/user';
import { redirect } from 'next/navigation';
import { connectMongoDB, Folder as FolderModel } from './db';
import { Article, Folder } from '@/types/folder';
import folder from './db/models/folder';
import { revalidatePath } from 'next/cache';
import * as cheerio from 'cheerio';
import {
  AuthState,
  NewArticleState,
  ActionsActionState,
} from '@/types/actions';
import { AddNewArticleSchema, AuthFormSchema } from '@/types/zod';
import { z } from 'zod';

export async function registerUser(prevState: AuthState, formData: FormData) {
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

    await User.create({ email, password, name });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: 'Internal Server Error',
    };
  }
  redirect('/auth/login');

  return prevState;
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
    name: name,
    articles: [],
    user: '671cc61dc03e7c9287ee6f42', // HANDLE WITH AUTH
  };

  try {
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

export async function addNewArticle(
  folderId: string,
  _: NewArticleState | undefined,
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

  const folder = await FolderModel.findOne({ _id: folderId });

  if (!folder.articles.some((art: Article) => art.url === url)) {
    folder.articles = [...folder.articles, { ...article_payload }];
  }

  await folder.save();

  revalidatePath(`/portal/folder/${folderId}`);
}
