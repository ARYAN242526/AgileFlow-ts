import { useState, useEffect } from "react";
import { getDashboard } from "../../services/dashboardService";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
      const fetchData = async () => {
        const res = await getDashboard();
        setData(res.data);
      };
      fetchData();
    }, []);

    if(!data) return <p>Loading...</p>;

    return (
      <div className="p-6 space-y-6">

      <div className="grid grid-cols-4 gap-4">
        <Card title="Projects" value={data.overview.totalProjects} />
        <Card title="Sprints" value={data.overview.totalSprints} />
        <Card title="Features" value={data.overview.totalFeatures} />
        <Card title="Tasks" value={data.overview.totalTasks} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Task Progress</h2>

        <div className="flex justify-between text-sm mb-1">
          <span>Completion</span>
          <span>{data.taskStats.completion}%</span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${data.taskStats.completion}%` }}
          />
        </div>

        <div className="flex justify-between mt-3 text-sm">
          <span>Todo: {data.taskStats.todoTasks}</span>
          <span>In Progress: {data.taskStats.inProgressTasks}</span>
          <span>Done: {data.taskStats.doneTasks}</span>
        </div>
      </div>

      {/* 🔥 My Tasks */}
      <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-3">My Tasks</h2>

      {data?.myTasks?.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks assigned</p>
      ) : (
        <div className="space-y-3">
          {data?.myTasks?.map((task: any) => (
            <div
              key={task._id}
              className="flex items-center justify-between border-b pb-2"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-gray-500">
                  {task.status} • {task.priority}
                </p>
              </div>

              {/* RIGHT (Avatar) */}
              {task.assignee && (
                <div className="flex items-center gap-2">
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="w-7 h-7 rounded-full border"
                  />
                  <span className="text-xs text-gray-600">
                    {task.assignee.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
        

        {/* 🔥 Recent Tasks */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Recent Tasks</h2>

        {data.recentTasks.map((task: any) => (
          <TaskRow key={task._id} task={task} />
        ))}
      </div>
      </div>
    );
}

function Card({ title, value}: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function TaskRow({ task }: any) {
  return (
    <div className="flex justify-between border-b py-2 text-sm">
      <span>{task.title}</span>

      {task.assignee && (
        <div className="flex items-center gap-2">
          <img
          src={task.assignee.avatar}
          className="w-6 h-6 rounded-full"
          />
          <span>{task.assignee.name}</span>
        </div>
      )}
    </div>
  )
}