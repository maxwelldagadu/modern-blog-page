import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';


export default function AuthLayout({children}: {children:ReactNode}) {
  return (
    <div className="flex items-center justify-center gap-2 h-[70vh] w-full">
      <div>
        <Link  href='/' className={`${buttonVariants({variant:'secondary'})} flex-1 absolute left-5 top-5`}>
          <ArrowLeft/>
          Go Back
        </Link>
      </div>
      
      <div className="w-[25%]">
        {children}
      </div>
    </div>
  )
}
