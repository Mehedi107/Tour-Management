import { Router } from "express";
import { authController } from "./auth.controllers";

export const authRoute = Router()

authRoute.get('/login', authController.credentialsLogin)