import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const createProject = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user!._id.toString();

    const project = await ProjectService.createProject(userId, req.body);

    return res
            .status(201)
            .json(new ApiResponse(201, project, "Project created"));
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user!._id.toString();

    const projects = await ProjectService.getUserProjects(userId);

    return res
            .status(200)
            .json(new ApiResponse(200, projects, "Projects fetched"));
});

export const addMember = asyncHandler(async (req: Request, res: Response) => {
    const {projectId} = req.params;
    const {email} = req.body;

    const project = await ProjectService.addMemberByEmail(projectId as string, email);

    return res
            .status(200)
            .json(new ApiResponse(200, project, "Member added successfuly"));
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params;

    const project = await ProjectService.getProjectById(id as string);

    return res
            .status(200)
            .json(new ApiResponse(200, project, "Project fetched"));
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const project = await ProjectService.updateProject(id as string, req.body);

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project updated"));
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    await ProjectService.deleteProject(id as string);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Project deleted"));
});