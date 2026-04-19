import { Project } from "../models/project.model";
import { Sprint } from "../models/sprint.model";
import { Feature } from "../models/feature.model";
import { Task } from "../models/task.model";

export class DashboardService {

    static async getDashboard(userId: string) {

        const [
            totalProjects,
            totalSprints,
            totalFeatures,
            totalTasks,
            todoTasks,
            inProgressTasks,
            doneTasks,
            myTasks,
            recentTasks,
        ] = await Promise.all([
            Project.countDocuments(),
            Sprint.countDocuments(),
            Feature.countDocuments(),
            Task.countDocuments(),

            Task.countDocuments({ status: "todo" }),
            Task.countDocuments({ status: "in-progress" }),
            Task.countDocuments({ status: "done" }),

            Task.find({ assignee: userId })
            .populate("assignee", "name avatar")
            .sort({ createdAt: -1 })
            .limit(5),

            Task.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate("assignee", "name avatar"),
        ]);

        const completion = totalTasks === 0 
                            ? 0
                            : Math.round((doneTasks / totalTasks) * 100);

        return {
            overview: {
                totalProjects,
                totalSprints,
                totalFeatures,
                totalTasks,
            },
            taskStats: {
                todoTasks,
                inProgressTasks,
                doneTasks,
                completion,
            },
            myTasks,
            recentTasks,
        };
    }
}