import { Router } from 'express';
import { userRoute } from '../modules/user/user.routes';

export const router = Router();

const moduleRoutes = [{ path: '/user', route: userRoute }];

moduleRoutes.forEach(route => router.use(route.path, route.route));
