import express, { Router } from 'express';
import { checkAuth, forgetPassword, logIn, logOut, resetPassword, signUp, verifyEmail } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/check-auth',verifyToken,checkAuth)

router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/logout',logOut);

router.post('/verify-email',verifyEmail);
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)



export default router
