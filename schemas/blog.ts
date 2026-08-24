import z from 'zod';

export const blogSchema = z.object({
  title: z.string().min(3,'Must be atleast 3 characters')
    .max(50,'Cannot be greater than 50 characters'),
  content: z.string()
    .min(15,'Must be greater than 15 characters')
    .max(1000,'Cannot be greater than 50 characters')
})