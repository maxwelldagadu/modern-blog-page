
import { defineSchema,defineTable } from "convex/server";
import {v} from 'convex/values';



export default defineSchema({
  blogs: defineTable({
    title: v.string(),
    body: v.string(),
    author: v.string(),
    storageId: v.optional(v.id('_storage'))
  }),

  comments: defineTable({
    body: v.string(),
    author: v.string(),
    authorName: v.string(),
    postId: v.id('blogs')
  })
})
