import z from "zod";
import { UserRole, UserStatus } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string().trim().min(2).max(50),

    email: z
    .email()
    .trim()
    .regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/i),

    password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)").optional(),

    phone: z.number().optional(),
    address: z.string().trim().optional(),
})

export const updateUserZodSchema = z.object({
    name: z.string().trim().min(2).max(50).optional(),

    password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)").optional(),

    phone: z.number().optional(),

    address: z.string().trim().optional(),

    isDeleted: z.boolean(),

    isActive: z
    .enum(Object.values(UserStatus)),

    isVerified: z.boolean(),

    role: z.enum(Object.values(UserRole))
})