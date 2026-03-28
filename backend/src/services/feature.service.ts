import { Feature } from "../models/feature.model";
import { Sprint } from "../models/sprint.model";
import { ApiError } from "../utils/ApiError";

export class FeatureService {

    // Create Feature (derive project from sprint) 
    static async createFeature(userId: string, data: any) {

        const { title, description, sprint, status} = data;

        if(!title) {
            throw new ApiError(400, "Title is required");
        }

        if(!sprint) {
            throw new ApiError(400, "Sprint is required");
        }

        // validate sprint
        const sprintDoc = await Sprint.findById(sprint);

        if (!sprintDoc) {
            throw new ApiError(404, "Sprint not found");
        }

        const feature = await Feature.create({
            title,
            description,
            sprint,
            project: sprintDoc.project, // derive project
            status,
            createdBy: userId
        });

        return feature;
    }

    static async getProjectFeatures(projectId: string) {

        const features = await Feature
            .find({ project: projectId })
            .populate("sprint", "name")
            .sort({ createdAt: -1 });

        return features;
    }

    // get features by sprint
    static async getSprintFeatures(sprintId: string) {

        const features = await Feature
            .find({ sprint: sprintId })
            .sort({ createdAt: -1 });

        return features;
    }

    static async getFeatureById(featureId: string) {

        const feature = await Feature
            .findById(featureId)
            .populate("sprint", "name")
            .populate("project", "name");
        
        if (!feature) {
            throw new ApiError(404, "Feature not found");
        }

        return feature;
    }

    static async updateFeature(featureId: string, data: any) {

        const feature = await Feature.findByIdAndUpdate(
            featureId,
            data,
            { returnDocument : "after" }
        );

        if (!feature) {
            throw new ApiError(404, "Feature not found");
        }

        return feature;
    }

    static async deleteFeature(featureId: string) {

        const feature = await Feature.findByIdAndDelete(featureId);

        if (!feature) {
            throw new ApiError(404, "Feature not found");
        }

        return;
    }
}