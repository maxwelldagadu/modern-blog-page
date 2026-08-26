import { mutation } from "./_generated/server";
import {ConvexError, v} from 'convex/values';
import { authComponent } from "./auth";
import { query } from "./_generated/server";


// Sending a blog post into the convex database

export const CreateBlog = mutation({
  args: {title: v.string(), body: v.string()},
  handler: async (ctx,args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
  
    if(!user) throw new ConvexError("You're not authenticated");

    const blog = await ctx.db.insert('blogs',{title:args.title,body:args.body,author: user._id});

    return blog;
  }
})


// Fecthing blogs from the convex db

export const getBlogs = query({
  args: {},

  handler: async (ctx,args) => {
    const blogs = await ctx.db.query('blogs').order('desc').collect();
    return blogs;
  }
})