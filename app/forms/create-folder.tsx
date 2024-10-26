'use client';
import React, { useActionState } from 'react';

import { ActionsActionState, createNewFolder } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CreateFolderForm() {
  const initialState: ActionsActionState = { errors: {}, message: null };
  const [state, formAction] = useActionState(createNewFolder, initialState);

  return (
    <form className="space-y-6" action={formAction}>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="folder-name">Name</Label>
          <Input
            name="name"
            id="folder-name"
            aria-describedby="name-error"
            placeholder="Enter your folder name..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state?.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
}
