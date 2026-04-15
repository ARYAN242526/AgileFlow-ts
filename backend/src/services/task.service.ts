import mongoose from "mongoose";
import { Feature } from "../models/feature.model";
import { Task } from "../models/task.model";
import { ApiError } from "../utils/ApiError";

export class TaskService {

    static async createTask(userId: string, data: any) {

        const {title, description, feature, status, priority} = data;

        if (!title) {
            throw new Error("Title is required");
        }

        if (!feature) {
            throw new Error("Feature is required");
        }
        const featureDoc = await Feature.findById(feature);

        if (!featureDoc) {
            throw new Error("Feature not found");
        }

        const task = await Task.create({
            title,
            description,
            priority,
            feature: featureDoc._id,
            sprint: featureDoc.sprint,
            project: featureDoc.project,
            status: status ||  "todo",
            createdBy: userId
        }); 
        
        return task;
    }

    static async getProjectTasks(projectId: string) {
        const tasks = await Task
                .find({ project: projectId })
                .populate("assignee", "name email")
                .populate("feature", "title");

        return tasks;            
    }

    static async getFeatureTasks(featureId: string) {
        
        const tasks = await Task
            .find({ feature: featureId })
            .populate("feature", "title");

        const total = tasks.length;
        const completed = tasks.filter(t => t.status === "done").length;

        const completion = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        return {
            tasks,
            completion
        };
    }


    static async updateTask(taskId: string, data: any) {

        const task = await Task.findByIdAndUpdate(
            taskId,
            data,
            { returnDocument : "after" }
        );

        if(!task) {
            throw new ApiError(404, "Task not found");
        }

        return task;
    }

    static async deleteTask(taskId: string) {
        const task = await Task.findByIdAndDelete(taskId);

        if(!task) {
            throw new ApiError(404, "Task not found");
        }
    }

    static async updateStatus(taskId: string, status: string) {
        const task = await Task.findById(taskId);

        if(!task) {
            throw new ApiError(404, "Task not found");
        }

        task.status = status as any;

        await task.save();

        return task;
    }
}