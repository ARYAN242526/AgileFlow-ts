export const  ROLES =  {
  ADMIN : "Admin",
  PROJECT_MANAGER : "ProjectManager",
  DEVELOPER : "Developer",
  VIEWER : "Viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES]