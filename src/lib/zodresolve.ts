import { z } from "zod";

export const zodResolver = (schema: z.ZodSchema) => {
  return async (values: any) => {
    try {
      const data = schema.parse(values);
      return { values: data, errors: {} };
    } catch (error : any) {
      const formattedErrors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = {
          type: curr.code,
          message: curr.message,
        };
        return acc;
      }, {});
      return { values: {}, errors: formattedErrors };
    }
  };
};
