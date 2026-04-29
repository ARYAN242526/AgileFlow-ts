import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ROLES } from "../constants/roles";

export const authorizeRoles = (...allowedRoles: ROLES[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user){
            throw new ApiError(401, "Unauthorized access");
        }

        const userRole = req.user.role;

        if(!allowedRoles.includes(userRole)){
            throw new ApiError(
                403,
                "You are not authorized to perform this action"
            );
        }
        next();
    }
} 