import { Router } from 'express';
import { userController } from './user.controller';

export const userRoute = Router();

userRoute.post('/register', userController.createUser);
