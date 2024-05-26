import zod from "zod";

export const skillValidation = zod.object({
    skillname: zod.string().min(1, "Skill name is required"),
})