'use client';


import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { commentsSchema } from "@/schemas/comments";
import { useTransition } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "@base-ui/react/button";
import { buttonVariants } from "../ui/button";

export default function CommentSection(){
  const [isPending,setTransition] = useTransition();

  const hookForm = useForm({
    resolver: zodResolver(commentsSchema),
  });
  
  return(
   <Card>
    <CardHeader className="flex space-x-1.5">
      <MessageSquare className="size-4"/>
      <span className="text-sm sm:text-l font-bold">10 comments</span>
    </CardHeader>

    <CardContent>
      <form>
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
          <Button className={`${buttonVariants()} px-0 w-[70] self-end cursor-pointer`}>Submit</Button>
        </FieldGroup>
      </form>
    </CardContent>
   </Card>
  )
}