"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { dbConnect } from '@/lib/dbConnect';

const page = () => {
    useEffect(() => {
     
    },[])
    const session = useSession()
    console.log(session)
  return (
    <div>
        <Button onClick={() => signIn('google')}>Login</Button>
    </div>
  )
}

export default page