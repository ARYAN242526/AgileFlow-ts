import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
    getCurrentUser,
    updateProfile,
    changePassword,
    deleteUser
} from "../controllers/user.controller";

const router = Router();

router.use(authenticate);

router.get('/me', getCurrentUser);

router.patch('/update-profile', updateProfile);

router.patch('/change-password', changePassword);

router.delete('/delete', deleteUser);

export default router;