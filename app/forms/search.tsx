'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search: string) => {
    if (search) {
      params.set('query', search);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="flex flex-row items-center space-x-1 mb-4 border shadow-sm rounded-md px-2">
      <input
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search folders..."
        className="flex-grow p-2 text-neutral-700 border-none rounded-none shadow-none outline-none"
      />
      <span className="text-neutral-400">⇧⌘Q</span>
    </div>
  );
}
