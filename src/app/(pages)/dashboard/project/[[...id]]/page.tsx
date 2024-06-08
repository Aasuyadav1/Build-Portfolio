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
  const { data: session } = useSession();

  const handleChange = (e: any) => {
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "file" &&
      e.target.files
    ) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      // setValue("image", file); // Use setValue to update the file input in the form
    }
  };

  useEffect(() => {
    return () => {
      // Clean up the URL.createObjectURL to avoid memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (data: any) => {
    console.log(data);
    reset();
  };

  const getProjects = async () => {
    try {
      const id = params.id[0];

      const response = await fetch("/api/portfolio/project/" + id, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setValue("title", data.data[0].title);
        setValue("description", data.data[0].description);
        setValue("live", data.data[0].link);
        setValue("Github", data.data[0].githublink);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async () => {
    try {
      const response = await fetch("/api/portfolio/project/addproject/" + session?.user?.id, {
        method: "POST",
        body: JSON.stringify({
          title: getValues("title"),
          description: getValues("description"),
          skills: getValues("skills"),
          github: getValues("Github"),
          link: getValues("live"),
          // image: getValues("image"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("new project added", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (id: any) => {
    try {
      const response = await fetch(
        "/api/portfolio/project/" + id,
        {
          method: "PUT",
          body: JSON.stringify({
            title: getValues("title"),
            description: getValues("description"),
            skills: getValues("skills"),
            github: getValues("Github"),
            link: getValues("live"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("project updated", data);
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

  return (
    <div className="w-full mt-2 border rounded-md p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-medium">Add New Project</h1>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-4 grid grid-cols-2 gap-x-6">
          <div className="flex flex-col gap-9">
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
          <div className="flex flex-col gap-9">
            <InputAdmin
              type="file"
              label="Image"
              placeholder="Upload project image"
              // onChange={handleChange}
              // {...register("image")}
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
        <Button type="submit" className="mt-4">
          {" "}
          Add Project
        </Button>
      </form>
    </div>
  );
};

export default Page;
