import * as zod from "zod";

// validation and schema of ZOD

//----------------------------- Register Schema---------------------------------

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "min lenght is 3 ")
      .max(10, "max lenght is 10"),
    email: zod
      .email()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email",
      ),
    dateOfBirth: zod
      .string()
      .nonempty("Date is required")
      .refine((valueOfDate) => {
        const userYear = new Date(valueOfDate).getFullYear();
        const nowYear = new Date().getFullYear();
        if (nowYear - userYear > 10) {
          return true;
        } else {
          return false;
        }
      }, "your age must be more than 10 "),
    gender: zod.enum(["male", "female"]),
    password: zod
      .string()
      .nonempty("pass is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).",
      ),
    rePassword: zod.string().nonempty("rePassword is required"),
  })
  .refine(
    (obj) => {
      if (obj.password == obj.rePassword) return true;
      else return false;
    },
    {
      path: ["rePassword"],
      error: "password and repassword are not match",
    },
  );

export type registerSchemaType = zod.infer<typeof registerSchema>;

//----------------------------- Login Schema---------------------------------

export const loginSchema = zod.object({
  email: zod
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
  password: zod
    .string()
    .nonempty("pass is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).",
    ),
});

export type loginSchemaType = zod.infer<typeof loginSchema>;
