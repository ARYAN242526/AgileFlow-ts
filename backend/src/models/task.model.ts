import mongoose, {Schema, Document, Types} from "mongoose";

export interface ITask extends Document {
    title: string;
    description?: string;
    project: Types.ObjectId;
    feature: Types.ObjectId;
    sprint?: Types.ObjectId;
    assignee?: Types.ObjectId;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    createdBy: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        feature: {
            type: Schema.Types.ObjectId,
            ref: "Feature",
            required: true
        },
        sprint: {
            type: Schema.Types.ObjectId,
            ref: "Sprint",
        },
        assignee: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    {timestamps: true}
);

export const Task = mongoose.model<ITask>("Task", taskSchema);