import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const SkillCard = () => {
  const skill = [
    {
      name: "css",
    },
    {
      name: "html",
    },
  ];
  return (
    <div className="flex flex-wrap mt-10 gap-2">
      {skill && skill.length > 0 ? (
        skill.map((icon) => (
          <div className="flex flex-col justify-center items-center  gap-2 bg-slate-100 px-4 py-2 max-w-[150px] w-full rounded-md relative">
            
                <AiOutlineDelete className="absolute text-md text-red-500 top-3 right-2 cursor-pointer"/>
  
            <img
              style={{ height: 50, width: 50 }}
              key={icon.name}
              src={`https://skillicons.dev/icons?i=${icon.name}`}
            />
  
            <h1 className="font-medium text-md truncate">{icon.name}</h1>
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
