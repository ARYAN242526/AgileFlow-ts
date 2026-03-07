import { Request , Response} from "express";
import {AuthService} from '../services/auth.service';
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const registerUser = asyncHandler(async(req: Request, res: Response) => {

    const {name, email, password} = req.body;

    const result = await AuthService.register(name, email, password);

    return res
            .status(201)
            .json(new ApiResponse(201, result, "User registred successfully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Login successful"));
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {

    const { refreshToken } = req.body;

    const result = await AuthService.refreshToken(refreshToken);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Token refreshed"));
});

export const logoutUser = asyncHandler(async(req: Request, res: Response) => {

    const userId = req.user?._id;

    if(!userId){
        throw new ApiError(401, "Unauthorized");
    }
    
    const result = await AuthService.logout(userId.toString());

    return res
            .status(200)
            .json(new ApiResponse(200, result, "Logout successful"));
});