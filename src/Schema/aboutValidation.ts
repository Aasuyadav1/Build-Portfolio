import { z } from "zod";

export const aboutValidation = z.object({
  userid: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Name is required"),
  heading: z.string().min(1, "Heading is required"),
  about: z.string().min(1, "About is required"),
  image: z.string().optional(),
});
