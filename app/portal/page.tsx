import React from 'react';

import Folders from '@/components/custom/folders';
import SearchBar from '../forms/search';
import CreateFolderForm from '../forms/create-folder';

export default async function Page(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;

  return (
    <main>
      <div className="flex flex-col md:flex-row md:items-center space-x-1 mb-4">
        <SearchBar />
        <CreateFolderForm />
      </div>
      <Folders query={query || null} />
    </main>
  );
}
