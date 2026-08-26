'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card,CardHeader,CardTitle,CardDescription,CardContent } from "@/components/ui/card";
import Image from 'next/image';


export default function AllBlogs(){
  const userBlogs = useQuery(api.blogs.getBlogs);

  return(
    <div className="py-10 ">
      <div className="text-center pb-12">
        <h2 className="text-4xl mx-auto font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h2>
        <p className="pt-4 max-w-2xl text-muted-foreground">
          Insight, thoughts and trends from our team
        </p>
      </div>

      <div className="grid p-6 gap-x-2 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {userBlogs?.map((blog) => {
         return (
            <Card key={blog._id} className="relative h-50 w-full hover:cursor-pointer rounded-xl  border border-muted-foreground">
             <Image src='https://cdn.britannica.com/22/19222-050-2267F357/Bob-Marley.jpg'
              fill 
              alt="Bob Marley"
              placeholder='blur'
              blurDataURL="data"
              />
            </Card>
          )
        })}
      </div>
    </div>
  )
} 