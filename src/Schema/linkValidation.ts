import zod from "zod"

export const linkValidation = zod.object({
    label: zod.string().min(1, "Label is required"),
    link: zod.string().min(1, "Link is required"),
})