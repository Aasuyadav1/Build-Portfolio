import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  getSkills: () => void,
  deleteSkill: (id: any) => void,
  skill: any[]
}
const SkillCard = ({getSkills, deleteSkill, skill}: Props, {}) => {
  // const skill = [
  //   {
  //     name: "css",
  //   },
  //   {
  //     name: "html",
  //   },
  // ];

  return (
    <div className="flex flex-wrap mt-10 gap-2">
      {skill && skill.length > 0 ? (
        skill.map((icon) => (
          <div className="flex truncate flex-col justify-center items-center  gap-2 bg-slate-100 px-4 py-2 max-w-[150px] w-full rounded-md relative">
            
                <AiOutlineDelete onClick={() => deleteSkill(icon._id)} className="absolute text-md text-red-500 top-3 right-2 cursor-pointer"/>
  
            <img
              style={{ height: 50, width: 50 }}
              key={icon.value}
              className="rounded-lg"
              src={icon.label.startsWith("http") || icon.label.startsWith("https") ? icon.label : `https://skillicons.dev/icons?i=${icon.label}`}
            />
  
            <h1 className="font-medium text-md truncate">{icon.value}</h1>
          </div>
        ))
      ) : (
        <div>No Links Found</div>
      )
    }
    </div>
  );
};

export default SkillCard;
