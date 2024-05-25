import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const PortfolioContact = () => {
  return (
    <section className=' border-2 mt-4 w-full flex justify-center items-center rounded-sm px-4 py-4 border-solid border-iconbg'>
      
       <form className='max-w-[500px] w-full flex flex-col gap-3'>
        <h1 className='text-xl  font-bold text-primary'>Contact Me</h1>
       <div>
            <Label className='text-secondary' htmlFor="name">Name</Label>
            <Input id="name" className='outline-secondary focus:outline-secondary' type="text" placeholder='Enter your name'/>
        </div> 
        <div>
            <Label className='text-secondary' htmlFor="email">Email</Label>
            <Input id="email" placeholder='Enter your email' type="email" />
        </div>
        <div>
            <Label className='text-secondary' htmlFor="message">Message</Label>
            <Textarea id="message" placeholder='Enter your message' />
        </div>
        <Button type='submit'>Send Message</Button>
       </form>
    </section>
  )
}

export default PortfolioContact