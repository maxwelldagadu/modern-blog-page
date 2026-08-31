import { Id } from "@/convex/_generated/dataModel";
import z from "zod";


export const commentsSchema = z.object({
  body: z.string(),
  postId: z.custom<Id<'blogs'>>()
})