"use server";

// import { api } from "@/convex/_generated/api";
// import { fetchMutation } from "convex/nextjs";
import { redirect,RedirectType } from "next/navigation";
import { updateTag } from "next/cache";
import { z } from "zod";

/* 
  The auth (token) isn't passed to the server fro authentication when
  we use the fetchAuthMutation method to crate the blogSchema.
  useMutation however works fine 
*/

// import { blogSchema } from "@/schemas/blog";
// import z from 'zod';
// import { fetchAuthMutation } from "@/lib/auth-server";
// import { api } from "@/convex/_generated/api";
// import { redirect, RedirectType } from "next/navigation";



// export async function CreateBlogPost(data : z.infer<typeof blogSchema>) {
//   const validateData = blogSchema.safeParse(data);

//   if(!validateData.success) throw new Error ("Blog creation data validation failed");

//   // fecthAuthMutation auto passes the user token for authentication
//   await fetchAuthMutation(api.blogs.CreateBlog,
//     {title: validateData.data.title,body: validateData.data.body});
  
//   // Redirecting the user back to home
//   redirect('/',RedirectType.replace);
 
interface create {
  uploadURL: string,
  parse: z.ZodSafeParseResult<{title: string,body: string,image: File}>,
  data: {title: string,body: string,image: File},
}

export async function CreateBlog(args:create){

  try{
    const response = await fetch(args.uploadURL,{
      method: 'POST',
      headers:{
        'Content-Type': args.parse.data?.image.type || 'image/jpeg'
      },
      body: args.parse.data?.image
    });
    
    if(!response.ok) throw new Error("Cannot upload Image. Check it's of the right type");

    const imageURL = await response.json();

    updateTag('allBlogs');

    return {title:args.data.title,body:args.data.body,storageId:imageURL.storageId};
  }
  catch(error){
    console.log(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}