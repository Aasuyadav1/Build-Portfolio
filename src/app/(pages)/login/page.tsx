"use client"
import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // Ensure Button component is properly implemented
import { useSession } from 'next-auth/react';


const LoginPage = () => {
  const { data: session } = useSession();
  
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Button onClick={() => signIn('google')}>Login with Google</Button>
      {
        session && <Button onClick={() => signOut()}>Logout</Button>
      }
    </div>
  );
};

export default LoginPage;
