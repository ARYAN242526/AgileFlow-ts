import { Sprint } from "../models/sprint.model";
import { ApiError } from "../utils/ApiError";

export class SprintService {

    static async createSprint(projectId: string, data: any) {
        const sprint = await Sprint.create({
            ...data,
            project: projectId
        });

        return sprint;
    }

    static async getProjectSprints(projectId: string) {
        const sprints = await Sprint
                .find({ project: projectId })
                .populate("project", "name")
                .sort({ createdAt: -1 });

        return sprints;
    }

    static async startSprint(sprintId: string) {
        const sprint = await Sprint.findById(sprintId);
        
        if(!sprint){
            throw new ApiError(404, "Sprint not found");
        }

        sprint.status = "active";
        sprint.startDate = new Date();

        await sprint.save();

        return sprint;
    }

    static async completeSprint(sprintId: string) {

        const sprint = await Sprint.findById(sprintId);

        if(!sprint) {
            throw new ApiError(404, "Sprint not found");
        }

        sprint.status = "completed";
        sprint.endDate = new Date();

        await sprint.save();

        return sprint;
    }

    static async deleteSprint(sprintId: string) {
        const sprint = await Sprint.findByIdAndDelete(sprintId);

        if(!sprint){
            throw new ApiError(404, "Sprint not found");
        }
    }
}