import mongoose from 'mongoose';

import Folder from '@/lib/db/models/folder';
import User from '@/lib/db/models/user';

const MONGO_URI =
  process.env?.MONGO_URI || 'mongodb://localhost:27017/articles-shelf';

export const connectMongoDB = async function () {
  try {
    const { connection } = await mongoose.connect(MONGO_URI as string);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log('MONGO CONNECT ERROR:\n', error);
    return Promise.reject(error);
  }
};

export { Folder, User };
