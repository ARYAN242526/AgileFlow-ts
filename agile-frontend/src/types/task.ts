export type TASK_STATUS = "todo" | "in-progress" | "done";

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: TASK_STATUS;
    feature: string;
    sprint: string;
    project: string;
}
