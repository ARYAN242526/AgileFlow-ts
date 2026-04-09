import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../../components/task/TaskForm";
import TaskCard from "../../components/task/TaskCard";
import {
    getFeatureTasks,
    createTask,
    updateTaskStatus,
} from "../../services/taskService";
import type { Task } from "../../types/task";


export default function TasksPage() {
    const {featureId, projectId} = useParams();

    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        if(!featureId) return;
        const data = await getFeatureTasks(featureId);
        console.log("Tasks: ", data);
        console.log("Is Array: ", Array.isArray(data));
        
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, [featureId]);

    const handleCreate = async (data: {
        title: string;
        description?: string;
    }) => {
        if(!featureId || !projectId) return;

        console.log("Crreating task for featureId: ", featureId);
        

        await createTask({
            ...data,
            featureId,
            projectId
        });

        await fetchTasks();
    };

    const moveTask = async (taskId: string, status: Task["status"]) => {
        await updateTaskStatus(taskId, status);
        fetchTasks();
    };

    // group tasks based on status
    const todo = tasks.filter((t) => t.status === "todo");
    const inProgress = tasks.filter((t) => t.status === "in-progress");
    const done = tasks.filter((t) => t.status === "done");

    return (
        <div className="p-6">
            <TaskForm onCreate={handleCreate} />

            <div className="grid grid-cols-3 gap-4">

                {/* TODO */}
                <div className="bg-gray-100 p-3 rounded">
                    <h3 className="font-bold mb-2">TODO</h3>
                    {todo.map((task) => (
                        <div key={task._id}>
                            <TaskCard task={task} refresh={fetchTasks} />
                            <button
                            onClick={() => moveTask(task._id, "in-progress")}
                            className="text-blue-500 text-xs"
                            >
                                Move →
                            </button>
                        </div>
                    ))}
                </div>

                {/* IN PROGRESS */}
                    <div className="bg-gray-100 p-3 rounded">
                    <h3 className="font-bold mb-2">IN PROGRESS</h3>
                    {inProgress.map((task) => (
                        <div key={task._id}>
                        <TaskCard task={task} refresh={fetchTasks} />
                        <button
                            onClick={() => moveTask(task._id, "done")}
                            className="text-green-500 text-xs"
                        >
                            Move →
                        </button>
                        </div>
                    ))}
                    </div>

                    {/* DONE */}
                    <div className="bg-gray-100 p-3 rounded">
                    <h3 className="font-bold mb-2">DONE</h3>
                    {done.map((task) => (
                        <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                    ))}
                    </div>
                </div>
            </div>
    );
}