import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to userId is required")
    .max(255)
    .optional(),
});
