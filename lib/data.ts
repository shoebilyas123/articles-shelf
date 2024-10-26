import { connectMongoDB, Folder } from '@/lib/db';
import { Folder as FolderType } from '@/types/folder';

export async function getUserFolders(userId: string, query?: string) {
  await connectMongoDB();

  let folders = await Folder.find({
    user: userId,
    ...(query && { name: new RegExp(`${query}`, 'g') }),
  }).populate('user', 'name email _id');

  let folders_transformed: Array<
    Omit<FolderType, 'articles'> & { articles: number }
  > = folders.map((f) => ({
    ...f._doc,
    articles: f._doc.articles.length as number,
  }));

  return folders_transformed;
}

export async function getFolderData(folderId: string, userId: string) {
  await connectMongoDB();

  let folder = await Folder.findOne({ _id: folderId, user: userId }).populate(
    'user',
    'email name _id'
  );

  return folder.articles;
}
