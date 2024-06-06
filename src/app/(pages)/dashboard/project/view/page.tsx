import React from 'react'
import ProjectCard from '@/components/AdminComponent/ProjectCard'

const page = () => {
  return (
    <div className="w-full mt-2 border rounded-md px-4 py-10">
         <h1 className="text-2xl font-medium">Manage Projects</h1>
      <ProjectCard/>
    </div>
  )
}

export default page