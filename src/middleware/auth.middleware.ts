import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

interface JwtPayload {
    id: string;
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized request");
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            throw new ApiError(401, "Token missing");
        }
        const secret = process.env.JWT_ACCESS_SECRET!;

        const decoded = jwt.verify(token , secret) as unknown as JwtPayload;

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;

        next();

    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"));
    }
};