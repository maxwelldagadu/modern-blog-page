'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";



export default function AllBlogs(){
  const userBlogs = useQuery(api.blogs.getBlogs)
  return(
    <div className="mt-5">
      <ul>
        {userBlogs?.map((blog,index) => {
         return (
            <li key={index}>
              <h2>{blog.title}</h2>
              <p>{blog.body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
} 