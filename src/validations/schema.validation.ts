import { z } from "zod";

// Password validation function
const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine(
    (password) => {
      // Check for at least one uppercase letter
      const hasUppercase = /[A-Z]/.test(password);
      // Check for at least one lowercase letter
      const hasLowercase = /[a-z]/.test(password);
      // Check for at least one number
      const hasNumber = /\d/.test(password);
      // Check for at least one special character
      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
        password
      );

      return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    },
    {
      message:
        "Password must include uppercase and lowercase letter, number, and a special character",
    }
  );

// User schema validation
export const userSchema = z.object({
  name: z.string().max(255).min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Must be a valid email"),

  phone: z.string().max(255).min(1, "Phone is required"),
  verified: z.boolean().optional(),
  password: passwordValidation,
});

// Challenge: Create a schema validation for the challenge object

export const challengeValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  moneyPrize: z.number().min(1, { message: "Money prize is required" }),
  contactEmail: z
    .string()
    .email()
    .min(1, { message: "Contact email is required" }),
  projectDescription: z
    .string()
    .min(1, { message: "Project description is required" }),
  projectBrief: z.string().min(1, { message: "Project brief is required" }),
  projectDescriptionTasks: z
    .string()
    .min(1, { message: "Project description tasks is required" }),
  skillsNeeded: z
    .array(z.string())
    .min(1, { message: "At least one skill is required" }),
  seniority: z.enum(["Junior", "Intermediate", "Senior"]),
  type: z.enum(["Challenge", "Hackathon"]),
  keyInstructions: z
    .string()
    .min(1, { message: "Key instructions are required" }),
  tasks: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Task text is required" }),
      })
    )
    .min(1, { message: "At least one task is required" }),
});
