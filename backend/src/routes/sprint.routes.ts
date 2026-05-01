import express from 'express';
import {
    createSprint,
    getProjectSprints,
    getSprintProgress,
    deleteSprint 
} from '../controllers/sprint.controller';

import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// create sprint
router.post("/:projectId", authenticate, createSprint);

// get all sprints of a progress (WITH status + progress)
router.get("/project/:projectId", authenticate, getProjectSprints);

// get single sprint (WITH status + progress)
router.get("/details/:sprintId", authenticate, getSprintProgress);

// delete sprint
router.delete("/:id", authenticate, deleteSprint);

export default router;