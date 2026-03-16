import { Request, Response } from "express";
import { SprintService } from "../services/sprint.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const createSprint = asyncHandler(async (req: Request, res: Response) => {

    const { projectId } = req.params;

    const sprint = await SprintService.createSprint(projectId as string, req.body);

    res.status(201).json(
        new ApiResponse(201, sprint, "Sprint created")
    );
});

export const getProjectSprints = asyncHandler(async (req: Request, res: Response) => {

    const { projectId } = req.params;

    const sprints = await SprintService.getProjectSprints(projectId as string);

    res.status(200).json(
        new ApiResponse(200, sprints, "Sprints fetched")
    );
});


export const startSprint = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const sprint = await SprintService.startSprint(id as string);

    res.status(200).json(
        new ApiResponse(200, sprint, "Sprint started")
    );
});

export const completeSprint = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const sprint = await SprintService.completeSprint(id as string);

    res.status(200).json(
        new ApiResponse(200, sprint, "Sprint completed")
    );
});


export const deleteSprint = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    await SprintService.deleteSprint(id as string);

    res.status(200).json(
        new ApiResponse(200, {}, "Sprint deleted")
    );
});