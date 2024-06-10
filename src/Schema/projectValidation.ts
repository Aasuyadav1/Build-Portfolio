import zod from "zod"

export const projectValidation = zod.object({
    title: zod.string().min(1, "Title is required"),
    description: zod.string().min(1, "Description is required"),
    github: zod.string().min(1, "Github link is required"),
    image: zod.string().min(1, "Image is required"),
    link: zod.string().min(1, "Link is required"),
    technologies: zod.string().min(1, "Technologies is required"),
})