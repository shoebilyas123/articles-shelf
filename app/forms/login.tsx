'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthState, registerUser } from '@/lib/actions';
import Link from 'next/link';
import React, { useActionState, useState, useEffect } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const [state, formAction, isPending] = useActionState(
  //     authenticate,
  //     undefined
  //   );

  return (
    <form
    // action={formAction}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Let's log you in!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input
              name="email"
              id="user-email"
              type="email"
              placeholder="Enter your email..."
              aria-describedby="email-error"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="user-pass">Password</Label>
            <Input
              name="password"
              id="user-pass"
              type="password"
              placeholder="Enter new password..."
              aria-describedby="pass-error"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <p className="text-sm mb-4">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="font-bold hover:text-slate-600 hover:underline"
            >
              Register Here!
            </Link>
          </p>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}