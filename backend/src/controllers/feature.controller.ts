import { Request, Response } from "express";
import { FeatureService } from "../services/feature.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createFeature = asyncHandler(async (req: Request, res: Response) => {

    const { projectId } = req.params;

    const userId = req.user!._id.toString();

    const feature = await FeatureService.createFeature(projectId as string, userId, req.body);

    return res
            .status(201)
            .json(new ApiResponse(201, feature, "Feature created successfully"));
});

export const getProjectFeatures = asyncHandler(async (req: Request, res: Response) => {

    const { projectId } = req.params;

    const features = await FeatureService.getProjectFeatures(projectId as string);

    res.status(200).json(
        new ApiResponse(200, features, "Features fetched")
    );
});


export const getFeature = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const feature = await FeatureService.getFeatureById(id as string);

    res.status(200).json(
        new ApiResponse(200, feature, "Feature fetched")
    );
});


export const updateFeature = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const feature = await FeatureService.updateFeature(id as string, req.body);

    res.status(200).json(
        new ApiResponse(200, feature, "Feature updated")
    );
});


export const deleteFeature = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    await FeatureService.deleteFeature(id as string);

    res.status(200).json(
        new ApiResponse(200, {}, "Feature deleted")
    );
});