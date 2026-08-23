'use client';


import {signInSchema} from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {useForm,Controller} from 'react-hook-form'
import { FieldGroup,FieldError, FieldLabel,Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from "react";
import {Loader2} from 'lucide-react';


export default function SignIn() {
  const [isPending,setTransition] = useTransition();

  const hookForm = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues:{
      email: '',
      password: ''
    }
  });

  // Using the router to navigate back to home
  const router = useRouter();

  // submit handler function
  async function handleOnSubmit(data:z.infer<typeof signInSchema>){
    setTransition(async() => {
      await authClient.signIn.email({
      email: data.email,
      password: data.password,
      // Implementing toast message on screen on logout
      fetchOptions: {
        onError: (error) => {
          toast.error(error.error.message)
        },
        onSuccess: () => {
          toast.success('Logged in successfully');

          // Redirecting the user to the home page
          router.replace('/');
        }
      }   
    });
    })
  };
      
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Sign In to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={hookForm.handleSubmit(handleOnSubmit)}>
          <FieldGroup>
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
              <Button 
                type='submit' 
                className="cursor-pointer"
                disabled={isPending}
              >
                {
                  isPending ? 
                  <>
                    <Loader2 className='size-4 animate-spin'/>
                    <span>Signing In...</span>
                  </>
                  :
                  <span>Sign In</span>
                }
              </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )

}
