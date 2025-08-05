import { Router } from 'express';
import { userController } from './user.controllers';

export const userRoute = Router();

userRoute.post('/register', userController.createUser);
