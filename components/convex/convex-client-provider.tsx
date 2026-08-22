"use client";

import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!,{

  /*
    expectAuth:true is very neccessary. This makes 
    sure data is only fetched when the user is
    authenticated.
  */
  expectAuth:true
});

export function ConvexClientProvider({ children,initialToken }: { children: ReactNode; initialToken?: string | null; }) {
  return (
    <ConvexBetterAuthProvider 
      client={convex}
      authClient={authClient}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  );
}