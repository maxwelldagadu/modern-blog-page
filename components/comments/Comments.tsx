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
import { Preloaded, useMutation, usePreloadedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export default function CommentSection(props: {preloadedComments: 
  Preloaded<typeof api.comments.getComments>}){

  const [isPending,setTransition] = useTransition();

  const postId = useParams<{ postid: string }>().postid as Id<'blogs'>;

  //const comments = useQuery(api.comments.getComments,{postId});

  const comments = usePreloadedQuery(props.preloadedComments);

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
   <Card className="gap-y-8">
    <CardHeader className="flex space-x-1.5 items-center">
      <MessageSquare className="size-4"/>
      <span className="text-sm sm:text-l font-bold">{comments?.length} Comments</span>
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

    <div className="flex gap-5 flex-col">
      {comments?.map(comment => {
       return(
        <div key={comment._id}  className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage
              src={`https://avatar.vercel.sh/${comment.authorName}?size=300`}
              alt='user'
            />  
            <AvatarFallback>
              {comment.authorName.slice(0,2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="w-full flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-l font-medium">
                {comment.authorName}
              </span>
              <span className="text-muted-foreground">
                {new Date(Number(comment._creationTime)).toLocaleDateString()}
              </span>
            </div>
            <div>
            <p className="text-sm sm:text-l text-muted-foreground/90 whitespace-pre-wrap
              leading-4
            ">
              {comment.body}
            </p>
            </div>
          </div>
        </div>
       )
      })}
    </div>
   </Card>
  )
}