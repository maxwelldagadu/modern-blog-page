import { v } from "convex/values";
import { query } from "./_generated/server";


export const getComments = query({
  args: {postId:v.id('blogs')},
  handler: async (ctx,args) => {
    const comments = await ctx.db.query('comments')
    .filter((cmt) => cmt.eq(cmt.field('postId'),args.postId)).order('desc').collect();
    return comments;
  } 
})