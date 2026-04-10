import express from "express";
import {
  createTask,
  getProjectTasks,
  getFeatureTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
} from "../controllers/task.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";
import { ROLES } from "../constants/roles";

const router = express.Router();

/* Create task */
router.post(
  "/",
  authenticate,
  authorizeRoles(ROLES.ADMIN, ROLES.PROJECT_MANAGER),
  createTask
);

/* View tasks */
router.get(
  "/project/:projectId",
  authenticate,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.DEVELOPER,
    ROLES.VIEWER
  ),
  getProjectTasks
);

router.get(
  "/feature/:featureId",
  authenticate,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.DEVELOPER,
    ROLES.VIEWER
  ),
  getFeatureTasks
);

/* Update task */
router.patch(
  "/:id",
  authenticate,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.DEVELOPER
  ),
  updateTask
);

/* Update status */
router.patch(
  "/status/:id",
  authenticate,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.PROJECT_MANAGER,
    ROLES.DEVELOPER
  ),
  updateTaskStatus
);

/* Delete task */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  deleteTask
);

export default router;