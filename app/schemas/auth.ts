import z from 'zod';


export const SignUpSchema = z.object({
  name: z.string().max(15).min(2),
  email: z.email(),
  password: z.string().min(5).max(15),
});