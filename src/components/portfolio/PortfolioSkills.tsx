import React from "react";

interface Icon {
  name: string;
  body: string;
}

const SkillsSection = ({skillData }: {
  skillData: Icon[]
}) => {
  return (
    <section id="skill" className=" mt-4 w-full ">
      <h1 className="text-2xl font-bold text-portfolioPrimary">#Skills</h1>
      <div className=" px-2 py-6 rounded-sm w-full h-full sm:flex sm:flex-wrap  sm:justify-normal mt-10 gap-3 md:gap-5 grid grid-cols-2 min-[413px]:grid-cols-3 border-2">
        {skillData &&
          skillData.map((icon: any, i: number) => (
            <div key={i} className="flex border truncate flex-col justify-center items-center  gap-2 bg-slate-100 px-4 py-2 max-w-[150px] w-full rounded-md ">
              <img
                style={{ height: 50, width: 50 }}
                key={icon.value}
                className="rounded-lg"
                src={
                  icon.label.startsWith("http") ||
                  icon.label.startsWith("https")
                    ? icon.label
                    : `https://skillicons.dev/icons?i=${icon.label}`
                }
              />

              <h1 className="font-medium text-md truncate">{icon.value}</h1>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SkillsSection;
