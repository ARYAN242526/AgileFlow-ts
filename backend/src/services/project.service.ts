import { Project } from "../models/project.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

export class ProjectService {

    static async createProject(userId: string, data: any) {
        const project = await Project.create({
            ...data,
            owner: userId,
            members: [
                {user: userId, role: "Admin"}
            ]
        });

        return project;
    }
    
    static async getUserProjects(userId: string) {
        const projects = await Project
                .find({
                    $or: [
                        { owner: userId },
                        { "members.user": userId }
                    ]
                })
                .populate("owner", "name email")
                .populate("members.user", "name email avatar")
                .sort({ createdAt: -1 });

        return projects;
    }

    static async addMemberByEmail(projectId: string, email: string) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        return await Project.findByIdAndUpdate(
            projectId,
            {
            $addToSet: {
                members: { user: user._id, role: "Member" }
            }
            },
            { returnDocument : "after" }
        ).populate("members.user", "name email avatar");
    }

    static async updateMemberRole(projectId: string, userId: string, role: string) {

        const project = await Project.findById(projectId);

        if(!project) {
            throw new Error("Project not found");
        }

        if(userId == project.owner.toString()){
            throw new Error("Cannot modify owner");
        }

        return await Project.findOneAndUpdate(
            { _id: projectId, "members.user": userId },
            {
                $set: { "members.$.role": role }
            },
            { returnDocument: "after"}
        ).populate("members.user", "name email avatar");
    }

    static async removeMember(projectId: string, userId: string) {

        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        if (userId === project.owner.toString()) {
            throw new Error("Cannot remove owner");
        }

        return await Project.findByIdAndUpdate(
            projectId,
            {
                $pull: { members : { user: userId } }
            },
            { returnDocument: "after" }
        ).populate("members.user", "name email avatar");
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