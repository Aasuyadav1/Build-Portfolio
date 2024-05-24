"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Icon {
  name: string;
  body: string;
}

const SkillsSection: React.FC = () => {
  const [skillIcons, setSkillIcons] = useState<Icon[]>([]);

  const fetchIcons = async () => {
    try {
      // for single icon https://api.iconify.design/skill-icons/aftereffects.svg?height=16
      const response = await axios.get('https://api.iconify.design/collection?prefix=skill-icons&pretty=1');
      if (response.status === 200) {
        console.log(response.data.uncategorized);
        setSkillIcons(response.data.uncategorized);
       
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchIcons();
  }, []);

  return (
    <div className='border-2 mt-4 w-full rounded-sm px-4 py-4 border-solid border-iconbg'>
      <h1 className='text-xl font-bold text-secondary'>#Skills</h1>
      <div className='flex mt-2 flex-wrap gap-2 '>
       {
        ['html', 'css', 'javascript'].map((skil)=>(
          <div className='px-2 transition-colors hover:bg-iconbg cursor-pointer  rounded-md border-2 border-solid border-secondary text-primary'>
          <span className='font-medium'>{skil}</span>
        </div>
        ))
       
       }
      </div>
    </div>
  );
};

export default SkillsSection;
