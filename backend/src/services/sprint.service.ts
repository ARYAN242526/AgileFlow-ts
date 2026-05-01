import { Sprint } from "../models/sprint.model";
import { Feature } from "../models/feature.model";
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

    static async getProjectSprintsWithStatus(projectId: string) {
        const sprints = await Sprint.find({ project: projectId });

        const result = await Promise.all(
            sprints.map(s =>
                this.getSprintWithStatus(s._id.toString())
            )
        );

        return result;
    }

    static async calculateSprintStatus(sprintId: string) {
        const sprint = await Sprint.findById(sprintId);

        if(!sprint) {
            throw new ApiError(404, "Sprint not found");
        }

        const features = await Feature.find({ sprint: sprintId });

        if(features.length === 0) return "planned";

        const total = features.length;
        const completed = features.filter(f => f.status === "completed").length; 
        const inProgress = features.filter(f => f.status === "in-progress").length;
        
        if(completed === total) return "completed";

        if(inProgress > 0 || completed > 0) return "active";

        return "planned";
    }

    // updaet sprint status in DB
    static async updateSprintStatus(sprintId: string) {
        const status = await this.calculateSprintStatus(sprintId);

        const updatedSprint = await Sprint.findByIdAndUpdate(
        sprintId,
        { status },
        { returnDocument : "after" }
        );

        return updatedSprint;
    }

     static async getSprintWithStatus(sprintId: string) {
            const sprint = await Sprint.findById(sprintId);

            if (!sprint) {
                throw new ApiError(404, "Sprint not found");
            }

            const features = await Feature.find({ sprint: sprintId });

            const total = features.length;
            const completed = features.filter(f => f.status === "completed").length;
            const inProgress = features.filter(f => f.status === "in-progress").length;

            let status: "planned" | "active" | "completed";

            if(total === 0) status = "planned";
            else if (completed === total) status = "completed";
            else if (inProgress> 0 || completed > 0) status = "active";
            else status = "planned";


            const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

            return {
            ...sprint.toObject(),
            status,
            progress, // added
            };
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