import { z } from 'zod';

// PAN validation: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
export const panSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: 'Invalid PAN format. Must be like ABCDE1234F',
  });

export const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Invalid email address' })
  .max(255, { message: 'Email must be less than 255 characters' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(72, { message: 'Password must be less than 72 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[6-9][0-9]{9}$/, {
    message: 'Invalid Indian mobile number',
  })
  .optional()
  .or(z.literal(''));

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Name must be at least 2 characters' })
  .max(100, { message: 'Name must be less than 100 characters' });

// Aadhaar OTP - 6 digits
export const aadhaarOtpSchema = z
  .string()
  .trim()
  .regex(/^[0-9]{6}$/, {
    message: 'OTP must be 6 digits',
  });

// Masked Aadhaar - last 4 digits only (we don't store full Aadhaar)
export const aadhaarMaskedSchema = z
  .string()
  .trim()
  .regex(/^[0-9]{4}$/, {
    message: 'Enter last 4 digits of Aadhaar',
  });

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  fullName: fullNameSchema,
  panNumber: panSchema,
  phone: phoneSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'Password is required' }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
