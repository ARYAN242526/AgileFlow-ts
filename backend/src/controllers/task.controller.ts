import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createTask = asyncHandler(async (req: Request, res: Response) => {

  const userId = req.user!._id.toString();

  const task = await TaskService.createTask(userId, req.body);

  res.status(201).json(
    new ApiResponse(201, task, "Task created")
  );
});


export const getProjectTasks = asyncHandler(async (req: Request, res: Response) => {

  const { projectId } = req.params;

  const tasks = await TaskService.getProjectTasks(projectId as string);

  res.status(200).json(
    new ApiResponse(200, tasks, "Tasks fetched")
  );
});

export const getFeatureTasks = asyncHandler(async (req, res) => {
  const {featureId} = req.params;
  
  const result = await TaskService.getFeatureTasks(featureId as string);

  res.status(200).json(
    new ApiResponse(200, result, "Feature tasks fetched")
  );
});


export const updateTask = asyncHandler(async (req: Request, res: Response) => {

  const { id } = req.params;

  const task = await TaskService.updateTask(id as string, req.body);

  res.status(200).json(
    new ApiResponse(200, task, "Task updated")
  );
});


export const updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {

  const { id } = req.params;
  const { status } = req.body;

  const task = await TaskService.updateStatus(id as string, status);

  res.status(200).json(
    new ApiResponse(200, task, "Task status updated")
  );
});


export const deleteTask = asyncHandler(async (req: Request, res: Response) => {

  const { id } = req.params;

  await TaskService.deleteTask(id as string);

  res.status(200).json(
    new ApiResponse(200, {}, "Task deleted")
  );
});