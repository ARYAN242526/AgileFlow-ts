import  {DndContext, DragEndEvent, useDroppable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
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
    const [completion, setCompletion] = useState(0);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );
  
    const fetchTasks = async () => {
        if(!featureId) return;
        const data = await getFeatureTasks(featureId);

        setTasks(data.tasks);
        setCompletion(data.completion);
    };

      const calculateCompletion = (tasks: Task[]) => {
        const total = tasks.length;
        const done = tasks.filter(t => t.status === "done").length;

        return total === 0 ? 0 : Math.round((done / total) * 100);
    }; 


    useEffect(() => {
        if(!featureId) return;
        fetchTasks();
    }, [featureId]);

    const handleCreate = async (data: {
        title: string;
        description?: string;
        priority: Task["priority"];
        assignee?: string;
    }) => {
        if(!featureId || !projectId){
            return;
        }

        await createTask({
            ...data,
            featureId: featureId,
            projectId: projectId,
        });

        await fetchTasks();
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;

        if(!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Task["status"];
        
        const task = tasks.find((t) => t._id === taskId);
        if(!task || task.status === newStatus) return;

        const updatedTasks = tasks.map(
            (t) => 
            t._id === taskId ? {...t, status: newStatus } : t
        );

        setTasks(updatedTasks);
        setCompletion(calculateCompletion(updatedTasks));

        try {
            await updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.log("API FAILED", err);

            // rollback UI
            setTasks(tasks);
            setCompletion(calculateCompletion(tasks));
        }
    };

    // group tasks based on status
    const todo = tasks.filter((t) => t.status === "todo");
    const inProgress = tasks.filter((t) => t.status === "in-progress");
    const done = tasks.filter((t) => t.status === "done");

    function Column({
        id,
        title,
        count,
        children,
    }: {
        id: Task["status"];
        title: string;
        count: number;
        children: React.ReactNode;
    }) {
        const {setNodeRef} = useDroppable({ id });

        return (
            <div 
                ref={setNodeRef}
                className="bg-gray-50 p-4 rounded-xl shadow-sm border min-h-[350px]"
            >
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-700">{title}</h3>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {count}
                    </span>
                </div>

                <div className="space-y-3">{children}</div>
            </div>
        );
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <TaskForm onCreate={handleCreate} />

        {/* 🔥 Progress Bar */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">
                Feature Progress
            </h2>
            <span className="text-sm font-medium text-gray-600">
                {completion}%
            </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
                className={`h-3 rounded-full transition-all duration-500 ${
                completion < 40
                    ? "bg-red-500"
                    : completion < 80
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${completion}%` }}
            />
            </div>

            <p className="text-xs text-gray-500 mt-2">
            {completion === 100 ? "Completed 🎉" : "Work in progress..."}
            </p>
        </div>

            {/* 🔥 Kanban Board */}
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Column id="todo" title="TODO" count={todo.length}>
                    {todo.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                    ))}
                </Column>

                <Column
                    id="in-progress"
                    title="IN PROGRESS"
                    count={inProgress.length}
                >
                    {inProgress.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                    ))}
                </Column>

                <Column id="done" title="DONE" count={done.length}>
                    {done.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                    ))}
                </Column>
                </div>
            </DndContext>
    </div>
    )      
}