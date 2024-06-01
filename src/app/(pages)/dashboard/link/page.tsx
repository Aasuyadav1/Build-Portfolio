"use client"
import React from 'react'
import LinkCard from '@/components/AdminComponent/LinkCard'
import { LinkField } from '@/components/AdminComponent/LinkField'

const page = () => {
  return (
    <div className="w-full mt-2 border rounded-md p-4">
        <h1 className="text-2xl font-medium">Links</h1>
        <div className='mt-4 max-w-[200px] w-full'>
        <LinkField/>
        </div>
        <LinkCard/>
    </div>
  )
}

export default page