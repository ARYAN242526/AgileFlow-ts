import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { ROLES } from "../constants/roles";
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    addMember,
    updateMemberRole,
    removeMember
} from "../controllers/project.controller";

const router = Router();

router.use(authenticate);

router.post(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER),
    createProject
);

router.post(
    "/:projectId/members",
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER),
    addMember
);

router.patch(
    ":projectId/members/:userId",
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER),
    updateMemberRole
);

router.delete(
    "/:projectId/members/:userId",
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER),
    removeMember
);

router.get(
    '/',
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER, ROLES.DEVELOPER, ROLES.VIEWER),
    getProjects
);

router.get(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER, ROLES.DEVELOPER, ROLES.VIEWER),
    getProject
);

router.patch(
    '/:id',
    authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER), 
    updateProject
);

router.delete(
    '/:id',
    authorizeRoles(ROLES.ADMIN), 
    deleteProject
);

export default router;