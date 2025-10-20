import { Router } from 'express';
import { userController } from './user.controllers';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserZodSchema } from './user.zodSchema';
import { checkAuth } from '../../middleware/checkAuth';

export const userRoute = Router();

userRoute.post('/register', validateRequest(createUserZodSchema), userController.createUser);

userRoute.get('/all-users', checkAuth(), userController.getAllUsers);

userRoute.patch('/:id', checkAuth(), userController.updateUser);
