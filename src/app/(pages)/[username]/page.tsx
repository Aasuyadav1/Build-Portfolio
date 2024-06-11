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
  const [portfolioData, setPortfolioData] = useState()

  const fetchPortfolio = async (id : any) => {
    try {
      const response = await fetch('/api/portfolio/'+ id, {
        method: 'GET'
      });
 
      const data = await response.json();

      if(response.ok){
        setPortfolioData(data.data)
        console.log("portfolio fetched successfully", data.data)
      }
    } catch (error) {
      console.log("error on fetching the user " ,error)
    }
  }

  const isValidDomain = async () => {
    try {
      const response = await fetch('/api/portfolio/domain/'+ params.username, {
        method: 'GET'
      });

      const data = await response.json();

      if(response.ok){
        setUserId(data?.data?.userid)
        fetchPortfolio(data.data.userid);
        console.log("domain fetched successfully", data.data.userid)
        
      }
    } catch (error) {
      console.log("error on fetching the domain " ,error)
    }
  }

  useEffect(() => {
    isValidDomain();
  }, [])
  

  return (
    <>
      {
      portfolioData ? (
        <>
        <section className='flex flex-col gap-10 py-2 px-2'>
        <PortfolioAbout id={userid} aboutDatas={portfolioData?.about}/>
        <SkillsSection id={userid} skillData={portfolioData?.skills}/>
        <PortfolioProjectCard id={userid} projectData={portfolioData?.projects}/>
        <PortfolioContact id={userid} contactData={portfolioData?.links}/>
        <SingleShare id={userid}/>
      </section>
        </>
      ) : null
    }
    </>
  )
}

export default page