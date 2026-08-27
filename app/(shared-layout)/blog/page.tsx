'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card,CardHeader,CardTitle,CardDescription,CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";



export default function AllBlogs(){
  const userBlogs = useQuery(api.blogs.getBlogs);

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

      <div className="grid p-6 gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {userBlogs?.map((blog) => {
         return (
            <Card key={blog._id} className="py-0">
              <div className="relative h-50 w-full">
                <Image src='https://cdn.britannica.com/22/19222-050-2267F357/Bob-Marley.jpg'
                  fill 
                  alt="Bob Marley"
                  className="object-cover rounded-t-lg"
                  sizes="300"
                />
              </div>
              <CardContent>
                <Link href={`/blog/${blog._id}`}>
                  <h2 className="text-2xl font-bold hover:text-blue-500">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground font-medium line-clamp-3">
                  {blog.body}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${blog._id}`} className={cn(buttonVariants({className:'w-full'}))}>
                  Read More
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 