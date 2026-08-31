'use client';

import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { commentsSchema } from "@/schemas/comments";
import { useTransition } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@base-ui/react/button";
import { buttonVariants } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { type Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";


export default function CommentSection(){
  const [isPending,setTransition] = useTransition();

  const postId = useParams<{ postid: string }>().postid as Id<'blogs'>;
  
  const createCommentMutation = useMutation(api.comments.createComment);

  // Hook form definition
  const hookForm = useForm({
    resolver: zodResolver(commentsSchema),
    defaultValues:{
      body: '',
      postId
    }
  });

  // Submit handler logic
  function handleCreateComment({ postId,...data}: z.infer<typeof commentsSchema>): void{
    setTransition(async() => {
      try{
        if(!data.body){
          toast.error('Comment field cannot be empty');
          return;
        }

        await createCommentMutation({...data, postId});
        hookForm.reset();
        toast.success('Comment created')
      }
      catch(error){
        toast.error(error instanceof Error ? error.message : null);
      }
    })
  }
  
  return(
   <Card>
    <CardHeader className="flex space-x-1.5">
      <MessageSquare className="size-4"/>
      <span className="text-sm sm:text-l font-bold">10 comments</span>
    </CardHeader>

    <CardContent>
      <form onSubmit={hookForm.handleSubmit(handleCreateComment)}>
        <FieldGroup>
          <Controller 
            name='body'
            control={hookForm.control}
            render={({field,fieldState}) => (
              <Field>
                <FieldLabel htmlFor="body">Comment</FieldLabel>
                <Textarea 
                  id="body" 
                  placeholder="Share your thoughts" 
                  {...field}
                />
              </Field>
            )}
          />
          <Button className={`${buttonVariants()} 
            px-0 w-40 text-l font-bold self-end cursor-pointer`}
            disabled={isPending}
            type="submit"
          >
            {
              isPending ? 
              <>
                <Loader2 className='size-4 animate-spin'/>
                <span>Sending Comment</span>
              </>
              :
              <span>Comment</span>
            }
          </Button>
        </FieldGroup>
      </form>
    </CardContent>
   </Card>
  )
}