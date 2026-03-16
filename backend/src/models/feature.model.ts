import mongoose , {Document, Schema, Types} from "mongoose";

export interface IFeature extends Document {
    title: string;
    description: string;
    project: Types.ObjectId;
    status: "planned" | "in-progress" | "completed";
    createdBy: Types.ObjectId;
}

const featureSchema = new Schema<IFeature>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["planned" , "in-progress", "completed"],
            default: "planned"
        }
    },
    { timestamps: true}
);

export const Feature = mongoose.model<IFeature>("Feature", featureSchema)