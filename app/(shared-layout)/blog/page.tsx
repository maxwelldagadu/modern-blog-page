
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Card,CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";


// Medatada for all blogs posts
export const metadata: Metadata = {
  title: 'Blogs | Daily',
  description: 'All user blogs',
  
}


export default async function AllBlogs(){
  
  return(
    <div className="py-10 ">
      <div className="text-center pb-12">
        <h2 className="text-4xl mx-auto font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h2>
        <p className="pt-4 text-muted-foreground">
          Insight, thoughts and trends from our team
        </p>
      </div>

      <Suspense fallback={<BlogSkeleton/>}>
        <LoadBlog/>
      </Suspense>
    </div>
  )
} 

// Blog loading logic

async function LoadBlog(){

  'use cache';
  cacheLife({revalidate: 60});
  cacheTag('allBlogs');

  await new Promise((ressolve) => setTimeout(ressolve,5000));

  const data = await fetchQuery(api.blogs.getBlogs);

  return(
    <div className="grid p-6 gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((blog) => {
        return (
          <Card key={blog._id} className="py-0">
            <div className="relative h-50 w-full">
              <Image src={blog.imageURL ?? 'https://cdn.britannica.com/22/19222-050-2267F357/Bob-Marley.jpg'}
                fill 
                alt="Bob Marley"
                className="object-cover rounded-t-lg"
                sizes="300"
              />
            </div>
            <CardContent>
              <Link href={`/blog/${blog._id}`}>
                <h2 className="text-2xl font-bold hover:text-blue-500 line-clamp-1">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-muted-foreground font-medium line-clamp-3">
                {blog.body}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${blog._id}`} className={buttonVariants({className:'w-full'})}>
                Read More
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}


// Skeleton

function BlogSkeleton(){
  return(
    <div className="grid p-6 gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(6).fill('').map((_,i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-52 w-full rounded-2xl bg-muted/80"/>
          <div className="flex space-y-2 flex-col w-full">
             <Skeleton className="h-5 w-3/4 bg-muted/80"/>
             <Skeleton className="h-5 w-3/4 bg-muted/80"/>
             <Skeleton className="h-5 w-2/4 bg-muted/80"/>
          </div>
        </div>
      ))}
    </div>
  )
}