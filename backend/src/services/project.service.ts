import { Project } from "../models/project.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ROLES } from "../constants/roles";

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

    static async addMemberByEmail(
        projectId: string, 
        email: string,
        role: ROLES
    ) {
        const project  = await Project.findById(projectId);

        if (!project) {
            throw new ApiError(400, "Project not found");
        }

        const user = await User.findOne({ email });

        if(!user) {
            throw new ApiError(400, "User not found");
        }

        if(project.owner.toString() === user._id.toString()){
            throw new ApiError(400, "Owner is already part of project");
        }

        const alreadyMember = project.members?.some(
            (m: any) => m.user.toString() === user._id.toString()
        );

        if (alreadyMember) {
            throw new ApiError(400, "User already added");
        }

         if (!Object.values(ROLES).includes(role)) {
            throw new ApiError(400, "Invalid role");
        }

        // ✅ Add member
        project.members.push({
            user: user._id,
            role: role,
        });

        await project.save();

        return await Project.findById(projectId)
            .populate("owner", "name email avatar")
            .populate("members.user", "name email avatar");
    }

    static async updateMemberRole(projectId: string, userId: string, role: string) {

        const project = await Project.findById(projectId);

        if(!project) {
            throw new ApiError(400, "Project not found");
        }

        if(userId == project.owner.toString()){
            throw new ApiError(400, "Cannot modify owner");
        }

         if (!Object.values(ROLES).includes(role as any)) {
            throw new ApiError(400, "Invalid role");
        }

        const memberExists = project.members.some(
            (m: any) => m.user.toString() === userId
        );

        if (!memberExists) {
            throw new ApiError(404, "Member not found in project");
        }

        const updatedProject =  await Project.findOneAndUpdate(
            { _id: projectId, "members.user": userId },
            {
                $set: { "members.$.role": role }
            },
            { returnDocument: "after" }
        ).populate("members.user", "name email avatar");

        return updatedProject;
    }

    static async removeMember(projectId: string, userId: string) {

        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        if (userId === project.owner.toString()) {
            throw new ApiError(400, "Cannot remove owner");
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