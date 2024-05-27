"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const page = () => {
    const session = useSession()
    console.log(session)
  return (
    <div>
        <Button onClick={() => signIn('google')}>Login</Button>
    </div>
  )
}

export default page