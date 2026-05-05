import mongoose, {Document, Types} from "mongoose";

export interface ISprint extends Document {
    name: string;
    goal?: string;
    project: Types.ObjectId;
    startDate?: Date;
    endDate?: Date;
    status: "planned" | "active" | "completed";
}

const sprintSchema = new mongoose.Schema<ISprint>(
    {
        name: {
            type: String,
            required: true
        },
        goal: {
            type: String
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        startDate: Date,
        endDate: {
            type: Date,
            validators: function(value: Date) {
                return !this.startDate || value >= this.startDate;
            },
            message: "End date must be greater than or equal to start date" 
        },
        status: {
            type: String,
            enum: ["planned", "active", "completed"],
            default: "planned"
        }
    },
    { timestamps: true}
);

export const Sprint = mongoose.model<ISprint>("Sprint", sprintSchema);