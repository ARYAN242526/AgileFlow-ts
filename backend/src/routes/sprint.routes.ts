import express from 'express';
import {
    createSprint,
    getProjectSprints,
    startSprint,
    completeSprint,
    deleteSprint 
} from '../controllers/sprint.controller';

import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post("/:projectId", authenticate, createSprint);

router.get("/:projectId", authenticate, getProjectSprints);

router.patch("/start/:id", authenticate, startSprint);

router.patch("/complete/:id", authenticate, completeSprint);

router.delete("/:id", authenticate, deleteSprint);

export default router;