import  {DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core'
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
        setTasks(data);
    };

    useEffect(() => {
        if(!featureId) return;
        fetchTasks();
    }, [featureId]);

    const handleCreate = async (data: {
        title: string;
        description?: string;
    }) => {
        if(!featureId || !projectId){
            return;
        }

        await createTask({
            ...data,
            featureId,
            projectId
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

        setTasks((prev) => 
            prev.map((t) => 
                t._id === taskId ? {...t, status: newStatus} : t
            )
        );

        // backend update
        await updateTaskStatus(taskId, newStatus);
    };


    // group tasks based on status
    const todo = tasks.filter((t) => t.status === "todo");
    const inProgress = tasks.filter((t) => t.status === "in-progress");
    const done = tasks.filter((t) => t.status === "done");

    function Column({
        id,
        title,
        children,
    }: {
        id: Task["status"];
        title: string;
        children: React.ReactNode;
    }) {
        const {setNodeRef} = useDroppable({ id });

        return (
            <div ref={setNodeRef} className='bg-gray-100 p-3 rounded min-h-[300px]'>
                <h3 className='font-bold mb-2'>{title}</h3>
                {children}
            </div>
        );
    }

    return (
        <div className="p-6">
            <TaskForm onCreate={handleCreate} />

            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-4">

                <Column id='todo' title='TODO'>
                {todo.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                ))}
                </Column>

                <Column id='in-progress' title='IN PROGRESS'>
                {inProgress.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                ))}
                </Column>

                <Column id='done' title='DONE'>
                {done.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} />
                ))}
                </Column>
                </div>
            </DndContext>
            </div>
    );
}