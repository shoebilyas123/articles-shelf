import React from 'react';
import Link from 'next/link';

import { getFolderData } from '@/lib/data';

import AddArticle from '@/app/forms/add-article';
import { Article } from '@/types/folder';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import SearchBar from '@/app/forms/search';

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const articles: Article[] = await getFolderData(
    params.id,
    '671cc61dc03e7c9287ee6f42'
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-1 mb-4">
        <SearchBar />
        <AddArticle folderId={params.id} />
      </div>

      <div className="grid gap-1 grid-cols-1">
        {articles
          .filter(
            (art) =>
              art.title.includes(searchParams.query || '') ||
              art.url.includes(searchParams.query || '')
          )
          .map((article) => (
            <div
              key={article.url}
              className="flex items-center w-full justify-between bg-white hover:bg-neutral-100 rounded-md border p-4"
            >
              <Link
                target="_blank"
                href={article.url}
                className="text-md text-neutral-800 font-medium hover:text-sky-600"
              >
                {article.title}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="text-neutral-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Edit className="text-neutral-500" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2 className="text-neutral-500" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
      </div>
    </div>
  );
}
