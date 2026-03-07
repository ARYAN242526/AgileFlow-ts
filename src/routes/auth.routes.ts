import express from 'express';
import {
    loginUser,
    registerUser,
    refreshToken,
    logoutUser
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post('/logout', authenticate, logoutUser);

export default router;
