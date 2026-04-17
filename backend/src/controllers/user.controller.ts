import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

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

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("name email avatar");

    return res
            .status(200)
            .json(new ApiResponse(200, users, "Users Fetched"));
})