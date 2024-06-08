'use client'
import React, { useState } from 'react'
import PortfolioAbout from '../../../components/portfolio/PortfolioAbout'
import SkillsSection from '@/components/portfolio/PortfolioSkills'
import PortfolioProjectCard from '@/components/portfolio/PortfolioProjectCard'
import PortfolioContact from '@/components/portfolio/PortfolioContact'
import SingleShare from '@/components/portfolio/SingleShare'

const page = ({params}: any) => {
  const [userid, setUserId] = useState('')

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user/'+ params.username)
 
      const data = await response.json();

      if(response.ok){
        console.log("user fetched successfully", data)
        setUserId(data.data._id)
      }else {
        return (
          <div>
            User no found
          </div>
        )
      }
    } catch (error) {
      console.log("error on fetching the user " ,error)
    }
  }

  return (
    <section className='flex flex-col gap-10 py-2 px-2'>
      <PortfolioAbout id={userid}/>
      <SkillsSection id={userid}/>
      <PortfolioProjectCard id={userid}/>
      <PortfolioContact id={userid}/>
      <SingleShare id={userid}/>
    </section>
  )
}

export default page