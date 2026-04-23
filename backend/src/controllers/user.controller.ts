import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {QueryFilter} from "mongoose";
import { User, IUser } from "../models/user.model";
import { Project } from "../models/project.model";

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user!._id.toString();

    const user = await UserService.getCurrentUser(userId);

    return res
            .status(200)
            .json(new ApiResponse(200, user, "User fetched successfully" ));
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user!._id.toString();

    const updatedUser = await UserService.updateProfile(userId, req.body);

    return res
            .status(200)
            .json(new ApiResponse(200, updatedUser, "User Profile updated"));
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user!._id.toString();

    const {oldPassword, newPassword} = req.body;

    await UserService.changePassword(userId, oldPassword, newPassword);

    return res
            .status(200)
            .json(new ApiResponse(200, {} , "Password changed successfully"));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!._id.toString();

    await UserService.deleteUser(userId);

    return res
            .status(200)
            .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select("name email avatar");

    return res
            .status(200)
            .json(new ApiResponse(200, users, "Users Fetched"));
});

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
    const rawSearch = req.query.search;
    const projectId = req.query.projectId as string;

    if (!rawSearch || typeof rawSearch !== "string") {
        return res.status(200).json([]);
    }


    const searchQuery = rawSearch.trim();

    // get project members
    let memberIds: string[] = [];

    if(projectId) {
        const project = await Project.findById(projectId).select("members");

        if(project) {
            memberIds = project.members.map((m: any) => m.user.toString());
        }
    }

    const filter: QueryFilter<IUser> = {
        _id: { $nin: memberIds },
        $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
        ],
    };

    const users = await User.find(filter).select("name email avatar").limit(10);

    return res
            .status(200)
            .json(new ApiResponse(200, users, "Search Users to add member in project"));
});

