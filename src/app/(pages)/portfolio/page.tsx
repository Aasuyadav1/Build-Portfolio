import React from 'react'
import PortfolioAbout from '@/components/portfolio/PortfolioAbout'
import SkillsSection from '@/components/portfolio/PortfolioSkills'
import PortfolioProjectCard from '@/components/portfolio/PortfolioProjectCard'
import PortfolioContact from '@/components/portfolio/PortfolioContact'
import SingleShare from '@/components/portfolio/SingleShare'

const page = () => {
  return (
    <section className='flex flex-col gap-10 py-2 px-2'>
      <PortfolioAbout />
      <SkillsSection />
      <PortfolioProjectCard />
      <PortfolioContact />
      <SingleShare />
    </section>
  )
}

export default page