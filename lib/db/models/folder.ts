import mongoose, { Schema, model } from 'mongoose';
import { Folder } from '@/types/folder';

interface FolderSchemaType extends Omit<Folder, 'user'> {
  user: mongoose.Schema.Types.ObjectId;
}

const FolderSchema = new Schema<FolderSchemaType>(
  {
    name: String,
    articles: [
      {
        title: String,
        url: { type: String },
        id: { type: String },
      },
    ],

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Folder ||
  model<FolderSchemaType>('Folder', FolderSchema);
