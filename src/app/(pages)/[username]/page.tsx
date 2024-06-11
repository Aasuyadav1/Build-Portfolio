'use client'
import React, { useEffect, useState } from 'react'
import PortfolioAbout from '../../../components/portfolio/PortfolioAbout'
import SkillsSection from '@/components/portfolio/PortfolioSkills'
import PortfolioProjectCard from '@/components/portfolio/PortfolioProjectCard'
import PortfolioContact from '@/components/portfolio/PortfolioContact'
import SingleShare from '@/components/portfolio/SingleShare'
import { useSession } from 'next-auth/react'

const page = ({params}: any) => {
  const [userid, setUserId] = useState('')

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio/domain'+ userid);
 
      const data = await response.json();

      if(response.ok){
        console.log("portfolio fetched successfully", data)
      }
    } catch (error) {
      console.log("error on fetching the user " ,error)
    }
  }

  const isValidDomain = async () => {
    try {
      const response = await fetch('/api/portfolio/domain/'+ params.username);

      const data = await response.json();

      if(response.ok){
        fetchPortfolio();
        console.log("domain fetched successfully", data)
        setUserId(data?.data?.userid)
      }
    } catch (error) {
      console.log("error on fetching the domain " ,error)
    }
  }

  useEffect(() => {
    isValidDomain();
  }, [])
  

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