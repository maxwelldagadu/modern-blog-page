import { v } from "convex/values";
import { query } from "./_generated/server";


export const getComments = query({
  args: v.id('blogs'),
  handler: async (ctx,args) => {
    const comments = await ctx.db.query('comments').order('desc').collect();
    return comments;
  } 
})