import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";

export default function TaskForm({
    onCreate,
}: {
    onCreate: (data: {
        title: string; 
        description?: string;
        priority: "low" | "medium" | "high";
        assignee: string;
    }) => void;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

    const [users, setUsers] = useState<any[]>([]);
    const [assignee, setAssignee] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(!title.trim()) return;

        onCreate({ 
            title,
            description, 
            priority, 
            assignee: assignee 
        });

        setTitle("");
        setDescription("");
        setAssignee("");
    };

        return (
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-xl shadow mb-4 space-y-3"
            >
            {/* Title */}
            <input
                className="w-full border p-2 rounded"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description */}
            <input
                className="w-full border p-2 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Row */}
            <div className="flex gap-2">

            {/* Priority */}
            <select
                className="border p-2 rounded flex-1"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
            >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>

            {/* Assignee */}
            <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="border p-2 rounded flex-1"
            >
                <option value="">Assign User</option>
                {users.map((u: any) => (
                <option key={u._id} value={u._id}>
                    {u.name}
                </option>
                ))}
            </select>

            </div>

            {/* Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
            Add Task
            </button>
        </form>
        );

}