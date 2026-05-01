import { Request, Response } from "express";
import { SprintService } from "../services/sprint.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";


//  Create Sprint
export const createSprint = asyncHandler(async (req: Request, res: Response) => {

    const { projectId } = req.params;

    const sprint = await SprintService.createSprint(projectId as string, req.body);

    res.status(201).json(
        new ApiResponse(201, sprint, "Sprint created")
    );
});


//  Get ALL sprints with progress + correct status
export const getProjectSprints = asyncHandler(async (req: Request, res: Response) => {

    const { projectId } = req.params;

    const sprints = await SprintService.getProjectSprintsWithStatus(projectId as string);

    res.status(200).json(
        new ApiResponse(200, sprints, "Sprints fetched")
    );
});


//  Get SINGLE sprint with progress
export const getSprintProgress = asyncHandler(async (req: Request, res: Response) => {

    const { sprintId } = req.params;

    const sprint = await SprintService.getSprintWithStatus(sprintId as string);

    res.status(200).json(
        new ApiResponse(200, sprint, "Sprint progress fetched")
    );
});


export const deleteSprint = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    await SprintService.deleteSprint(id as string);

    res.status(200).json(
        new ApiResponse(200, {}, "Sprint deleted")
    );
});