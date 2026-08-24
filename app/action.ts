"use server";

import { blogSchema } from "@/schemas/blog";
import z from 'zod';
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect, RedirectType } from "next/navigation";



export async function CreateBlogPost(data : z.infer<typeof blogSchema>) {
  const validateData = blogSchema.safeParse(data);

  if(!validateData.success) throw new Error ("Blog creation data validation failed");

  await fetchMutation(api.blogs.CreateBlog,
    {title: validateData.data.title,body: validateData.data.body});
  
  // Redirecting the user back to home
  redirect('/',RedirectType.replace);
}