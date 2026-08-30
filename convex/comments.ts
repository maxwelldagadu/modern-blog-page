import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

// Get blog commenst
export const getComments = query({
  args: {postId:v.id('blogs')},
  handler: async (ctx,args) => {
    const comments = await ctx.db.query('comments')
    .filter((cmt) => cmt.eq(cmt.field('postId'),args.postId)).order('desc').collect();
    return comments;
  } 
})

// Create blog comments
export const createComment = mutation({
  args: {
    body: v.string(),
    postId: v.id('blogs'),
  },
  handler: async(ctx,args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
      
    if(!user) throw new ConvexError ("You're not authenticated");
        
    await ctx.db.insert('comments',{
      body:args.body,
      author: user._id,
      postId: args.postId,
      authorName: user.name
    });
  }
})