import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function PostIDRoute({params}:{params : Promise<{postid:string}>}){

  const postid = await params;

  return(
    <div className="max-w-7xl relative mx-auto fade-in animate-in py-8 px-4">
      <Link href='/blog' className={buttonVariants()}>
        <ArrowLeft/> Back
      </Link>
      
      <div className="relative w-full h-1/4 rounded-2xl p-4 shadow-sm overflow-hidden mb-8">
        <Image fill src='' alt='Blog Image'/>
      </div>
    </div>
  )
}