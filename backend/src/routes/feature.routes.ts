import { Router } from "express";
import {
    createFeature,
    getProjectFeatures,
    getSprintFeatures,
    getFeature,
    updateFeature,
    deleteFeature
} from "../controllers/feature.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/sprint/:sprintId" , authenticate, getSprintFeatures);
router.get("/single/:id", authenticate, getFeature);

router.post("/:sprintId", authenticate, createFeature);
router.get("/project/:projectId", authenticate, getProjectFeatures);

router.patch('/:id', authenticate, updateFeature);
router.delete("/:id", authenticate, deleteFeature);

export default router;