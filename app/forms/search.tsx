'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar(props: { onChange?: (_: string) => void }) {
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
    <div className="flex flex-row flex-grow items-center space-x-1 border shadow-sm rounded-md px-2">
      <input
        onChange={(e) =>
          props.onChange
            ? props.onChange(e.target.value)
            : handleSearch(e.target.value)
        }
        placeholder="Search folders..."
        className="flex-grow p-2 text-neutral-700 border-none rounded-none shadow-none outline-none"
      />
      <span className="text-neutral-400">⇧⌘Q</span>
    </div>
  );
}
