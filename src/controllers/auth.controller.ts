import { Request , Response} from "express";
import {AuthService} from '../services/auth.service';
import { ApiResponse } from "../utils/ApiResponse";

export const registerUser = async(req: Request, res: Response) => {

    const {name, email, password} = req.body;

    const result = await AuthService.register(name, email, password);

    return res
            .status(201)
            .json(new ApiResponse(201, result, "User registred successfully"));
}

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Login successful"));
};

export const refreshToken = async (req: Request, res: Response) => {

    const { refreshToken } = req.body;

    const result = await AuthService.refreshToken(refreshToken);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Token refreshed"));
};