import {z} from 'zod';

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name can't be longer than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name can't be longer than 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number can't exceed 15 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can't exceed 20 characters"),
});

