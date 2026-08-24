'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller,useForm } from "react-hook-form";
import z from 'zod';
import { blogSchema } from "@/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@base-ui/react/button";
import { buttonVariants } from "@/components/ui/button";
import { useTransition } from "react";






export default function CreateRoute(){

  const [isPending,setTransition] = useTransition();

  // function handleOnSubmit (data : z.infer<typeof blogSchema>){
  //   setTransition(async() => {
      
  //   })
  // }

  const hookForm = useForm({
    resolver: zodResolver(blogSchema),
    mode: 'onChange',
    defaultValues:{
      title: '',
      content: ''
    }
  });


  return(
    <div className="py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold md:text-5xl tracking-tight">Create a blog</h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          The universe needs your ideas...Create a blog today
        </p>
      </div>

      <div className="flex items-center justify-around mt-20">
        <Card className="w-full sm:w-[35%]">
          <CardHeader>
            <CardTitle>Create a blog article</CardTitle>
            <CardDescription>Create and publish your blog article</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={() => hookForm.handleSubmit(handleOnSubmit)}>
              <FieldGroup>
                <Controller
                  name='title'
                  control={hookForm.control} 
                  render={({field,fieldState}) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input {...field}  
                        aria-invalid={fieldState.invalid}
                        placeholder="What are fast cars?"
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                  )}
                />

                <Controller
                  name='content'
                  control={hookForm.control} 
                  render={({field,fieldState}) => (
                    <Field>
                      <FieldLabel>Blog Content</FieldLabel>
                      <Textarea {...field} 
                        placeholder="Ever wonder how amazing it be to own a fast car?" 
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                  )}
                />

                <Button type="submit" className={`${buttonVariants()} cursor-pointer`}>
                  Create Blog
                </Button>

              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}