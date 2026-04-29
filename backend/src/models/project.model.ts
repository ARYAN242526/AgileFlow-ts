import mongoose, {Document, Types} from "mongoose";
import { ROLES } from "../constants/roles";

export interface IProject extends Document {
    name: string;
    description?: string;
    owner: Types.ObjectId;
    members: {
        user: Types.ObjectId;
        role: ROLES;
    }[];
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
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                role: {
                    type: String,
                    enum: Object.values(ROLES),
                    default: ROLES.VIEWER,
                },
            },
        ],
    },
    {
        timestamps: true
    }
);

projectSchema.index(
    { _id: 1, "members.user": 1},
    {unique: true}
);

export const Project = mongoose.model<IProject>("Project", projectSchema);