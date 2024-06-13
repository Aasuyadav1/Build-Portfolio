"use client";
import React, { useState, useEffect } from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { Button } from "@/components/ui/button";
import { useForm, FieldError } from "react-hook-form";
import { useSession } from "next-auth/react";

type ProjectFormData = {
  title: string;
  description: string;
  live: string;
  Github: string;
  skills: string;
  technologies: string;
  image: FileList;
};

const Page = ({ params }: any) => {
  const [imagePreview, setImagePreview] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<ProjectFormData>();
  const { data: session, status } = useSession();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "file" &&
      e.target.files
    ) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setValue("image", e.target.files);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    let imageUrl = imagePreview;

    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("file", data.image[0]);

      const imageResponse = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });

      const imageResult = await imageResponse.json();
      if (imageResponse.ok) {
        imageUrl = imageResult.imgUrl;
      } else {
        console.error("Failed to upload image", imageResult);
        setIsLoading(false);
        return;
      }
    }

    // Split technologies string into an array
    const technologiesArray = data.technologies.split(',');

    const ProjectData = {
      userid: session?.user?.id,
      title: data.title,
      description: data.description,
      skills: data.skills,
      github: data.Github,
      link: data.live,
      image: imageUrl,
      technologies: technologiesArray,
    };

    try {
      if (isUpdate) {
        await updateProject(ProjectData);
      } else {
        await addProject(ProjectData);
      }
    } catch (error) {
      console.error("Failed to submit project", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProjects = async () => {
    try {
      const id = params?.id[0];

      const response = await fetch("/api/portfolio/project/" + id, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setIsUpdate(true);
        setValue("title", data.data.title);
        setValue("description", data.data.description);
        setValue("live", data.data.link);
        setValue("Github", data.data.github);
        setValue("technologies", data.data.technologies.join(", "));
        setImagePreview(data.data.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async (projectData: any) => {
    try {
      const response = await fetch(
        "/api/portfolio/project/addproject/" + session?.user?.id,
        {
          method: "POST",
          body: JSON.stringify(projectData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("New project added", data);
        reset(); // Reset form after successful addition
        setImagePreview("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (projectData: any) => {
    try {
      const response = await fetch("/api/portfolio/project/" + projectId, {
        method: "PUT",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Project updated", data);
        reset(); // Reset form after successful update
        setImagePreview("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getErrorMessage = (
    error: FieldError | undefined
  ): string | undefined => {
    return error?.message;
  };

  useEffect(() => {
    if (params?.id) {
      setProjectId(params?.id);
      getProjects();
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [params?.id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mt-2 border rounded-md p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-medium">
          {isUpdate ? "Update Project" : "Add New Project"}
        </h1>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-4 lg:grid lg:grid-cols-2 gap-x-6">
          <div className="flex  flex-col gap-9">
            <InputAdmin
              label="Title"
              placeholder="Enter project name"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Title must be less than 50 characters",
                },
              })}
              error={getErrorMessage(errors?.title)}
            />
            <InputAdmin
              label="Description"
              placeholder="Enter project description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Description must be less than 200 characters",
                },
              })}
              error={getErrorMessage(errors?.description)}
            />
            <InputAdmin
              label="Technologies"
              placeholder="Enter project Tech stack"
              {...register("technologies", {
                required: "Technologies are required",
                minLength: {
                  value: 3,
                  message: "Technologies must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Technologies must be less than 50 characters",
                },
              })}
              error={getErrorMessage(errors?.technologies)}
            />
            <InputAdmin
              label="Live Link"
              placeholder="Enter live link"
              {...register("live", {
                required: "Live link is required",
                minLength: {
                  value: 3,
                  message: "Live link must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Live link must be less than 100 characters",
                },
              })}
              error={getErrorMessage(errors?.live)}
            />
          </div>
          <div className="flex mt-9 lg:mt-0 flex-col gap-9">
            <InputAdmin
              type="file"
              label="Image"
              placeholder="Upload project image"
              onChange={handleChange}
              error={getErrorMessage(errors.image)}
              image={!!imagePreview}
              imageUrl={imagePreview}
            />
            <InputAdmin
              label="Github repository link"
              placeholder="Enter github repository link"
              {...register("Github", {
                required: "Github link is required",
                minLength: {
                  value: 3,
                  message: "Github link must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Github link must be less than 100 characters",
                },
              })}
              error={getErrorMessage(errors?.Github)}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <span>{isUpdate ? "Update Project" : "Add Project"}</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
