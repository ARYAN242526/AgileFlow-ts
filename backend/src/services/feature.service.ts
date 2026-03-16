import { Feature } from "../models/feature.model";
import { ApiError } from "../utils/ApiError";

export class FeatureService {

    static async createFeature(projectId: string, userId: string, data: any) {

        const feature = await Feature.create({
            ...data,
            project: projectId,
            createdBy: userId
        });

        return feature;
    }

    static async getProjectFeatures(projectId: string) {

        const features = await Feature
            .find({ project: projectId })
            .sort({ createdAt: -1 });

        return features;
    }

    static async getFeatureById(featureId: string) {

        const feature = await Feature.findById(featureId);

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
    }
}