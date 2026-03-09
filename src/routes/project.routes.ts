import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} from "../controllers/project.controller";

const router = Router();

router.use(authenticate);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;