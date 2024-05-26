import zod from "zod"

export const projectValidation = zod.object({
    projects : zod.array(
        zod.object({
            projectname: zod.string().min(1, "Project name is required"),
            description: zod.string().min(1, "Description is required"),
            skills: zod.array(
                zod.object({
                    skillname: zod.string().min(1, "Skill name is required"),
                })
            ),
            githublink: zod.string().min(1, "Github link is required"),
            projectlink: zod.string().min(1, "Project link is required"),
            image: zod.string().min(1, "Image is required"),
        })
    )
})