import React from 'react';
import { FolderOpen, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { getUserFolders } from '@/lib/data';

import { Card } from '@/components/ui/card';
import { Folder } from '@/types/folder';

export default async function Folders(props: { query: string | null }) {
  const folders: Array<Omit<Folder, 'articles'> & { articles: number }> =
    await getUserFolders('671cc61dc03e7c9287ee6f42', props.query || '');

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
      {folders.map((folder) => (
        <Card
          key={folder._id}
          className="flex rounded-md items-center justify-between p-2 shadow-none hover:shadow-md transition-all"
        >
          <Link
            className="flex items-center space-x-1 flex-grow"
            href={`/portal/folder/${folder._id}`}
          >
            <div>
              <FolderOpen size={36} className="text-white " fill="#334155" />
            </div>
            <div className="flex flex-col items-between">
              <p className="text-sm font-medium">{folder.name}</p>
              <p className="text-xs text-gray-500">
                {folder.articles} articles
              </p>
            </div>
          </Link>

          {/* ADd a dropdowm here */}
          <div>
            <MoreVertical size={18} />
          </div>
        </Card>
      ))}
    </div>
  );
}
