"use client"
import React from 'react'
import SkillCard from '@/components/AdminComponent/SkillCard'
import { SkillField } from '@/components/AdminComponent/SkillField'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner';

const page = () => {
  const {data: session, status} = useSession()

  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getSkills = async () => {
    try {
      const response = await fetch('/api/portfolio/skills/allskill/'+ session?.user?.id,
        {
          method: 'GET',
        }
      )

      const data = await response.json();

      if(response.ok){
        setSkills(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSkill = async (id : any) => {
    try {
      const response = await fetch(`/api/portfolio/skills/${id}`, {
        method: 'DELETE',
      })

      if(response.ok){
        toast.success('Skill Deleted Successfully')
        getSkills()
      }
    } catch (error) {
      console.log(error)
      toast.error('Skill Deletion Failed')
    }
  }

  useEffect(() => {
 
      getSkills()
    
  },[status === 'authenticated'])

  if(status === 'loading') return <div className="w-full h-screen flex justify-center items-center">...loading</div>
 
  return (
    <div className="md:mt-16 mt-4 px-2">
        <h1 className="text-2xl font-medium">Skill Info</h1>
      <div className="w-full mt-2 border rounded-md p-4">
        <div className=' w-full'>
        <SkillField getSkills={getSkills}/>
        </div>
        <SkillCard skill={skills} deleteSkill={deleteSkill} getSkills={getSkills}/>
    </div>
    </div>
  )
}

export default page