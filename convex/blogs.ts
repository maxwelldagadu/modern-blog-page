import { mutation } from "./_generated/server";
import {ConvexError, v} from 'convex/values';
import { authComponent } from "./auth";


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