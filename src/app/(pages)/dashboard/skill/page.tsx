"use client"
import React from 'react'
import SkillCard from '@/components/AdminComponent/SkillCard'
import { SkillField } from '@/components/AdminComponent/SkillField'

const page = () => {
  return (
    <div className="w-full mt-2 border rounded-md p-4">
        <h1 className="text-2xl font-medium">Skills</h1>
        <div className='mt-4 max-w-[200px] w-full'>
        <SkillField/>
        </div>
        <SkillCard/>
    </div>
  )
}

export default page