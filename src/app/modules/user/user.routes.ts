import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controllers';
import z from 'zod';

export const userRoute = Router();

const createUserZodValidation = async (req: Request, res: Response, next: NextFunction) => {
    const createUserZodSchema = z.object({
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
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)"),

        phone: z.number().optional(),
        address: z.string().trim().optional(),
    })

    req.body = await createUserZodSchema.parseAsync(req.body)

    console.log(req.body);

    // next()
}

userRoute.post('/register', createUserZodValidation, userController.createUser);
userRoute.get('/all-users', userController.getAllUsers);
