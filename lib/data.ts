import { connectMongoDB } from '@/lib/db';
import Folder from '@/lib/db/models/folder';
import { Folder as FolderType } from '@/types/folder';

export async function getUserFolders(userId: string) {
  await connectMongoDB();

  const folders: FolderType[] = await Folder.find({ user: userId }).populate(
    'user'
  );

  return folders;
}
