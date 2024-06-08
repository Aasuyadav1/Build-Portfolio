"use client"
import React from 'react'
import SkillCard from '@/components/AdminComponent/SkillCard'
import { SkillField } from '@/components/AdminComponent/SkillField'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const page = () => {
  const {data: session} = useSession()

  const [skills, setSkills] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getSkills = async () => {
    try {
      const response = await fetch('/api/portfolio/allskill/'+ session?.user?.id,
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
        console.log("product is delted  successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // getSkills()
  },[])
 
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