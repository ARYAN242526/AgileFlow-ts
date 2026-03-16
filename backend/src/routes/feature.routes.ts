import { Router } from "express";
import {
    createFeature,
    getProjectFeatures,
    getFeature,
    updateFeature,
    deleteFeature
} from "../controllers/feature.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/:projectId", authenticate, createFeature);

router.get("/:projectId", authenticate, getProjectFeatures);

router.get("/single/:id", authenticate, getFeature);

router.patch('/:id', authenticate, updateFeature);

router.delete("/:id", authenticate, deleteFeature);

export default router;