'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PlusIcon } from 'lucide-react';
import { useActionState } from 'react';
import { addNewArticle } from '@/lib/actions';

export default function AddArticle(props: { folderId: string }) {
  const addNewArticleFunc = addNewArticle.bind(undefined, props.folderId);
  const [state, formAction, isPending] = useActionState(
    addNewArticleFunc,
    undefined
  );

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'default'} className="outline-none ">
          <PlusIcon /> New Article
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <form action={formAction} className="flex flex-col space-y-2">
          <div>
            <Label htmlFor="article-add-url">URL</Label>
            <Input name="url" id="article-add-url" placeholder="Enter URL..." />
          </div>
          <div className="w-full flex">
            {state?.error && (
              <p className="text-sm text-red-700">{state?.error}</p>
            )}
          </div>
          <Button disabled={isPending} type="submit" variant={'secondary'}>
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
