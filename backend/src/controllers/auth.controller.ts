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

    const {accessToken, refreshToken, user } = result;

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    });

     res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {user}, "Login successful"));
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {

    const refreshToken  = req.cookies.refreshToken;

    if(!refreshToken){
        throw new ApiError(401, "Refresh token missing");
    }

    const result = await AuthService.refreshAccessToken(refreshToken);

     res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Token refreshed"));
});

export const logoutUser = asyncHandler(async(req: Request, res: Response) => {

    const userId = req.user?._id;

    if(!userId){
        throw new ApiError(401, "Unauthorized");
    }
    
    const result = await AuthService.logout(userId.toString());

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res
            .status(200)
            .json(new ApiResponse(200, {}, "Logout successful"));
});