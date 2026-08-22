'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/dark-mode/toggle-dark-mode';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';


export function Navbar() {

  // Convex user session authentication
  const {isAuthenticated,isLoading} = useConvexAuth();

  return (
    <nav className="w-full py-5 flex items-center justify-between gap-8">
     <Link href='/'>
        <div className="flex items-center font-bold text-3xl">
          Next <span className="text-blue-500">Pro</span>
        </div>
     </Link>

      <div className="flex items-center gap-40 justify-between">
        <Link href='/' className={buttonVariants({variant:'ghost'})}>Home</Link>
        <Link href='/blog' className={buttonVariants({variant:'ghost'})}>Blog</Link>
        <Link href='/create' className={buttonVariants({variant:'ghost'})}>Create</Link>
      </div>
      
      <div className="flex items-center gap-10 justify-between">
        {isLoading ? null : 
          isAuthenticated ? 
          <Button onClick={() => authClient.signOut()} className={`${buttonVariants()} cursor-pointer`}>Log Out</Button> :
          (
            <>
              <Link href='/auth/sign-up' className={buttonVariants()}>Sign Up</Link>
              <Link href='/auth/sign-in' className={buttonVariants({variant:'outline'})}>Sign In</Link>
            </>
          )
        }
        <DarkModeToggle/>
      </div>
    </nav>
  )
}
