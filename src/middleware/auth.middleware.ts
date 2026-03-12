import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { UserPayload } from "../types/auth.types";

interface JwtPayload {
    id: string;
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const token = req.cookies.accessToken;

        if(!token){
            throw new ApiError(401, "Unauthorized");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as unknown as JwtPayload;

        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            throw new ApiError(401, "Invalid token");
        }

        const payload: UserPayload = {
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
        };
        
        req.user = payload;

        next();

    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};