import express from 'express';
import {
    loginUser,
    registerUser,
    refreshToken
} from '../controllers/auth.controller';

import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.post("/refresh", asyncHandler(refreshToken));

export default router;
