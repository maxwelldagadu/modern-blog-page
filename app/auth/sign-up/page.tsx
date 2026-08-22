'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm,Controller} from 'react-hook-form'
import { FieldGroup,FieldError, FieldLabel,Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import { authClient } from "@/lib/auth-client";


export default function SignUp() {

  const hookForm = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: {
      name:'',
      email:'',
      password:'',
    }
  });


  async function handleOnSubmit(data: z.infer<typeof SignUpSchema>){
    //console.log(data)
    await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password
    })
  }

  return (
    <div>
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

            <Button type='submit' className="cursor-pointer">Sign Up</Button>
          </FieldGroup>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}
