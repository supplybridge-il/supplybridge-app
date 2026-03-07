import { z } from 'zod';
import { UserRole } from '@/types/user.types';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  role: z.nativeEnum(UserRole, {
    message: 'Invalid role selected',
  }),
}).strict(); 

export type RegisterInput = z.infer<typeof registerSchema>;