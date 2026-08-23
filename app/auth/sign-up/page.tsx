'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm,Controller} from 'react-hook-form'
import { FieldGroup,FieldError, FieldLabel,Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import {Loader2} from 'lucide-react';

export default function SignUp() {
  const [isPending,setTransition] = useTransition();

  const hookForm = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      name:'',
      email:'',
      password:'',
    }
  });

  // Using the router to navigate back to home
  const router = useRouter();

function handleOnSubmit(data: z.infer<typeof signUpSchema>){
    setTransition(async() => {
      //console.log(data)
      await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
      // Implementing toast message on screen on logout
      fetchOptions: {
        onError: (error) => {
          toast.error(error.error.message)
        },
        onSuccess: () => {
          toast.success('Welcome aboard');

          // Redirecting the user to the home page
          router.replace('/');
        }
      }
    })

    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Sign up to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={hookForm.handleSubmit(handleOnSubmit)}>
        <FieldGroup>
          <Controller 
            name='name'
            control={hookForm.control}
            render={({field,fieldState}) => (
              <Field>
                <FieldLabel htmlFor="name">FullName</FieldLabel>
                <Input 
                  aria-invalid={fieldState.invalid} 
                  id="name" 
                  placeholder="John Salivan" 
                  autoComplete="name" {...field}/>
                  {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
              </Field>
            )}
          />

          <Controller 
            name='email'
            control={hookForm.control}
            render={({field,fieldState}) =>(
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  aria-invalid={fieldState.invalid} 
                  id="email" placeholder="johnsalivan@gmail.com" 
                  autoComplete="email" {...field}/>
                  {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
              </Field>
            )}
          />

          <Controller 
            name='password'
            control={hookForm.control}
            render={({field,fieldState}) =>(
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input 
                  id="password" 
                  placeholder="*******" 
                  type="password" 
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid} {...field}/>
                  {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
              </Field>
            )}
          />

          <Button type='submit' 
            className="cursor-pointer" 
            disabled={isPending}>
            {
              isPending ? 
              <>
                <Loader2 className='size-4 animate-spin'/>
                <span>Signing Up...</span>
              </>
              :
              <span>Sign Up</span>
            }
          </Button>
        </FieldGroup>
      </form>
      </CardContent>
    </Card>
  )
}
