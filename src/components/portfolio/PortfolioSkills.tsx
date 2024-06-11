"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Icon {
  name: string;
  body: string;
}

const SkillsSection = ({id}:any, {skillData} : any) => {
  const [skillIcons, setSkillIcons] = useState<Icon[]>([]);
  const [allSkills, setAllSkills] = useState([])

  // const fetchIcons = async () => {
  //   try {
  //     // for single icon https://api.iconify.design/skill-icons/aftereffects.svg?height=16
  //     const response = await axios.get('https://api.iconify.design/collection?prefix=skill-icons&pretty=1');
  //     if (response.status === 200) {
  //       console.log(response.data.uncategorized);
  //       setSkillIcons(response.data.uncategorized);
       
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getSkills = async () => {
    try {
      const response = await fetch('/api/portfolio/allskill/'+ id,
        {
          method: 'GET',
        }
      )

      const data = await response.json();

      if(response.ok){
        console.log("skills fetched successfully", data)
        setAllSkills(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    // fetchIcons();
  }, []);

  return (
    <div className=' mt-4 w-full '>
      <h1 className='text-2xl font-bold text-primary'>#Skills</h1>
      <div className='flex mt-4 px-2 py-6 border-2 border-solid border-iconbg rounded-sm w-full h-full flex-wrap gap-2 '>
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
