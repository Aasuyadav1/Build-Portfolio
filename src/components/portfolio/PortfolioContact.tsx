import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const PortfolioContact = ({contactData}: {
  contactData: {name: string, email: string, message: string}} ) => {
  return (
    <section className='mt-4 w-full  h-full '>
      <h1 className='text-2xl  font-bold text-portfolioPrimary'>#Contact Me</h1>
       <div className='flex mt-4 w-full h-full  justify-center items-center rounded-sm px-2 py-6 border-2 border-solid border-iconbg'>
       <form className='max-w-[500px] w-full flex flex-col gap-3'>
       <div>
            <Label className='text-portfolioSecondary' htmlFor="name">Name</Label>
            <Input id="name" className='outline-portfolioSecondary focus:outline-portfolioSecondary' type="text" placeholder='Enter your name'/>
        </div> 
        <div>
            <Label className='text-portfolioSecondary' htmlFor="email">Email</Label>
            <Input id="email" placeholder='Enter your email' type="email" />
        </div>
        <div>
            <Label className='text-portfolioSecondary' htmlFor="message">Message</Label>
            <Textarea id="message" placeholder='Enter your message' />
        </div>
        <Button type='submit'>Send Message</Button>
       </form>
       </div>
    </section>
  )
}

export default PortfolioContact