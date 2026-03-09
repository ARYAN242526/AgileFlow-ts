import express from 'express';
import {
    loginUser,
    registerUser,
    logoutUser,
    refreshAccessToken
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post('/logout', authenticate, logoutUser);

export default router;
