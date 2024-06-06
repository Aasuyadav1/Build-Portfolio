import React from "react";

const ProjectCard = () => {
  const projects = [
    {
      id: 1,
      name: "Project 1",
      description: "This is project 1",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is project 2",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Project 3",
      description: "This is project 3",
      image: "https://picsum.photos/200/300",
    },
  ];
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <div className="flex flex-col mt-1   bg-slate-100 px-4 py-2 max-w-[250px] w-full rounded-md ">
            <img
              className="w-full object-cover h-[150px] aspect-square rounded-md"
              src={project.image}
              alt=""
            />
            <h3 className="font-medium mt-2 text-md truncate ">{project.name}</h3>

            <p className="truncate text-[#000000ea]  text-sm">
              {project.description}
            </p>
          </div>
        ))
      ) : (
        <div>No Projects Found</div>
      )}
    </div>
  );
};

export default ProjectCard;
