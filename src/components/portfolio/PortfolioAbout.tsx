import React from 'react';
import PortfolioLinks from './PortfolioLinks';


const PortfolioAbout = () => {
  const allSkills = [
    {
      network : 'Github',
      url : 'https://github.com/Aasu-Yadav'
    },
    {
      network : 'linkedin',
      url : 'https://www.linkedin.com/in/aasu-yadav/'
    },
    {
      network : 'twitter',
      url : 'https://twitter.com/aasu_yadav'
    },
    {
      network : 'instagram',
      url : 'https://www.instagram.com/aasu_yadav/'
    },
    {
      network : 'facebook',
      url : 'https://www.facebook.com/aasu.yadav.1'
    },
    {
      network : 'email',
      url : 'mailto:q1z5v@example.com'
    }
  ]
  return (
    <section className=' w-full h-full'>
      <h1 className='text-2xl font-bold rounded-sm text-primary mt-4'>#About</h1>
     <div className='w-full h-full mt-2 py-6 px-2 flex flex-col justify-center items-center border-2 border-solid border-iconbg'>
     <div className='flex justify-center items-center w-full max-w-[200px]  md:max-w-[250px] aspect-square p-1 rounded-full border-solid border-4 border-secondary'>
        <img 
          className='rounded-full object-cover w-full h-full' 
          src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" 
          alt="user's image" 
          title='user image' 
        />
      </div>
      <div className='text-center mt-4 '>
        <h3 className='text-lg md:text-xl lg:text-2xl'><span className='font-semibold'>My Self,</span> <span className='text-secondary text-5xl font-bold'>Aasu</span></h3>
        <h1 className='text-2xl md:text-4xl  font-bold'>Full Stack Developer</h1>
        <p className='text-lg text-center max-w-[500px]'>I’m a Frontend developer, a Web designer And I might have a thing for content creation. looking for freelance Projects</p>
      </div>
      <PortfolioLinks allSkills={allSkills} />
     </div>
    </section>
  );
}

export default PortfolioAbout;
