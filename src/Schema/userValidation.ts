import zod from "zod"

export const userValidation = zod.object({
    name: zod.string().min(1, "Name is required"),
    email: zod.string().email("Email is invalid"),
    password: zod.string().min(1, "Password is required"),
})