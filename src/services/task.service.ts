import { takeCoverage } from "node:v8";
import { Task } from "../models/task.model";
import { ApiError } from "../utils/ApiError";

export class TaskService {

    static async createTask(userId: string, data: any) {

        const task = await Task.create({
            ...data,
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