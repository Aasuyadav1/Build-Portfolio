"use client";
import React, { useEffect, useState } from 'react';
import SkillCard from '@/components/AdminComponent/SkillCard';
import { SkillField } from '@/components/AdminComponent/SkillField';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

const Page = () => {
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const getSkills = async () => {
    try {
      if (!session?.user?.id) return;

      const response = await fetch('/api/portfolio/skills/allskill/' + session?.user?.id, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setSkills(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const deleteSkill = async (id: any) => {
    try {
      const response = await fetch(`/api/portfolio/skills/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Skill Deleted Successfully');
        getSkills();
      }
    } catch (error) {
      console.log(error);
      toast.error('Skill Deletion Failed');
    }
  };

  useEffect(() => {
    if (skills.length === 0) {
      getSkills();
    }
    console.log("skills", skills);
  }, [status === 'authenticated']);

  if (status === 'loading' || pageLoading) {
    return (
      <main className="flex justify-center items-center w-full h-screen">
        <span className="loader2"></span>
      </main>
    );
  }

  return (
    <div className="md:mt-16 mt-4 px-2">
      <h1 className="text-2xl font-medium">Skill Info</h1>
      <div className="w-full mt-2 border rounded-md p-4">
        <div className='w-full'>
          <SkillField getSkills={getSkills} />
        </div>
        <SkillCard skill={skills} deleteSkill={deleteSkill} getSkills={getSkills} />
      </div>
    </div>
  );
};

export default Page;
