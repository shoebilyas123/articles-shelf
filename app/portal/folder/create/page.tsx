import React from 'react';
import CreateFolderForm from '@/app/forms/create-folder';

export default function ShelfCreate() {
  return (
    <div id="folder-create">
      <h1 className="text-lg font-medium">Create New Folder</h1>
      <hr className="my-3" />
      <CreateFolderForm />
    </div>
  );
}
