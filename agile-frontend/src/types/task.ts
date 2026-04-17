export type TASK_STATUS = "todo" | "in-progress" | "done";
export type PRIORITY = "low" | "medium" | "high";

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: TASK_STATUS;
    priority: PRIORITY;
    assignee?: {
        _id: string;
        name: string;
        avatar: string;
    };
    feature: string;
    sprint: string;
    project: string;
}
