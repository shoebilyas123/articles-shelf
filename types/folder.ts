import { UserType } from '@/lib/db/models/user';
import { DBDoc } from './db';

export interface Article {
  title: string;
  url: string;
}

export interface Folder extends DBDoc {
  name: string;
  color: {
    hue: number;
    saturation: number;
    lighting: number;
  };

  articles: Article[];
  user: Partial<UserType>;
}
