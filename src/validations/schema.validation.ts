import { z } from "zod";
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
