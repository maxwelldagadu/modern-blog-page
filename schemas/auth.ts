import z from 'zod';


export const signUpSchema = z.object({
  name: z.string().max(15,'Must be than 16 char').min(2,'Must be greater than 1 char'),
  email: z.email('Invalid Email'),
  password: z.string()
    .min(8,'  Password is too short.')
    .max(15,'Must be less that 16 char '),
});


export const signInSchema = z.object({
  email: z.email('Invalid email'),
  password : z.string()
    .min(8,'Password is too short')
    .max(15,'Must be less that 16 char '),
})