import z from 'zod';


export const SignUpSchema = z.object({
  name: z.string().max(15,'Must be than 16 char').min(2,'Must be greater than 1 char'),
  email: z.email('Invalid Email'),
  password: z.string().min(5,'Must be greater than 4 char').max(15,'Must be less that 16 char '),
});