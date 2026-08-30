

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";


interface RoutePostID {
  postid: Id<'blogs'>
}

export const instant = false;

export default async function PostIDRoute({params}:{params : Promise<RoutePostID>}){

  const {postid} = await params;
  
  const blog =  await fetchQuery(api.blogs.getBlogById,{postId:postid});

  const comments = await fetchQuery(api.comments.getComments,{postId:postid});

  if(!blog){
    return <h2 className="text-l text-white sm:text-3xl md:text-4xl lg:text-5xl font-bold">No Blog Post</h2>
  }
  
  return(
    <div className="max-w-5xl relative mx-auto fade-in animate-in py-8 px-4">
      <Suspense fallback={<LoadBlog />}>
        <>
          <Link href='/blog' className={buttonVariants()}>
            <ArrowLeft/> Back
          </Link>
        
          <div className="relative w-full h-100 rounded-2xl p-4 shadow-sm overflow-hidden mb-8 mt-4">
            <Image fill src={blog?.imageURL?? 'https://cdn.britannica.com/22/19222-050-2267F357/Bob-Marley.jpg'} 
              alt='Blog Image'
              className='object-cover hover:scale-105 transition-transform duration-500'
            />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <h2 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground'>
              {blog.title}
            </h2>
            <span className="text-l font-light text-muted-foreground">
              Created at: {new Date(Number(blog._creationTime)).toDateString()}
            </span>
            <Separator className="my-2"/>
            <p className="text-l font-medium text-foreground/90 whitespace-pre-wrap">
              {blog.body}
            </p>
             <Separator className="my-2"/>
          </div>
        </>
      </Suspense>
    </div>
  )
}

function LoadBlog(){
  return(
    <div className="max-w-7xl relative mx-auto fade-in animate-in py-8 px-4">
      <Skeleton className={buttonVariants()}/>
      <Skeleton className="relative w-full h-100 rounded-2xl p-4 shadow-sm overflow-hidden mb-8 mt-4"/>
    </div>
  )
}