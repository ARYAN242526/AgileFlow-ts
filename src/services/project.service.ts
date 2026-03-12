import { Project } from "../models/project.model";
import { ApiError } from "../utils/ApiError";

export class ProjectService {

    static async createProject(userId: string, data: any) {
        const project = await Project.create({
            ...data,
            owner: userId
        });

        return project;
    }
    
    static async getUserProjects(userId: string) {
        const projects = await Project
                .find({owner: userId})
                .populate("owner", "name email")
                .sort({ createdAt: -1 });

        return projects;
    }

    static async getProjectById(projectId: string) {

        const project = await Project.findById(projectId);

        if(!project){
            throw new ApiError(404, "Project not found");
        }

        return project;
    }

    static async updateProject(projectId: string, data: any) {

        const project = await Project.findByIdAndUpdate(
            projectId,
            data,
            { returnDocument : "after" }
        );

        if(!project) {
            throw new ApiError(404, "Project not found");
        }

        return project;
    }

    static async deleteProject(projectId: string) {
        const project = await Project.findByIdAndDelete(projectId);

        if(!project) {
            throw new ApiError(404, "Project not found");
        }
    }
}