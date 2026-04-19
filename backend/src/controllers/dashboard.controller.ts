import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { ApiResponse } from "../utils/ApiResponse";

export const getDashboard = async(req: Request, res: Response) => {
    const userId = req.user?._id;

    const data = await DashboardService.getDashboard(userId as string);

   return res
            .status(200)
            .json(new ApiResponse(200, data, "DashBoard details fetched"));
};