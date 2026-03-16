import mongoose , {Document} from "mongoose";
import { Types } from "mongoose";

export interface IProject extends Document {
    name: string;
    description?: string;
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);