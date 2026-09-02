import { mutation } from "./_generated/server";
import { authComponent } from "./auth";

// Get user Id
export const getUserId = mutation({
  args:{},
  handler: async(ctx) => {
    const user =  await authComponent.safeGetAuthUser(ctx);
    return user?._id;
  }
});