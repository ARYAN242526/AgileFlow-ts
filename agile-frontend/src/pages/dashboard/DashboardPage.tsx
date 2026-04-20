import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getDashboard } from "../../services/dashboardService";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <p>Loading...</p>;

  // 🔥 Chart Data
  const chartData = [
    { name: "Todo", value: data?.taskStats?.todoTasks || 0 },
    { name: "In Progress", value: data?.taskStats?.inProgressTasks || 0 },
    { name: "Done", value: data?.taskStats?.doneTasks || 0 },
  ];
  

  return (
    <div className="space-y-6">

      {/* 🔥 TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Projects" value={data?.overview?.totalProjects} />
        <StatCard title="Sprints" value={data?.overview?.totalSprints} />
        <StatCard title="Features" value={data?.overview?.totalFeatures} />
        <StatCard title="Tasks" value={data?.overview?.totalTasks} />
        <StatCard title="Completed Tasks" value={data?.taskStats?.doneTasks} />
      </div>

      {/* 🔥 CHART + MY TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 📊 Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Task Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={80}
                label
              >
                <Cell fill="#f87171" /> {/* red */}
                <Cell fill="#60a5fa" /> {/* blue */}
                <Cell fill="#34d399" /> {/* green */}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🧩 My Tasks */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">My Tasks</h2>

          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {data?.myTasks?.map((task: any) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {/* 🕒 Recent Tasks */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Recent Tasks</h2>

        <div className="space-y-3">
          {data?.recentTasks?.map((task: any) => (
            <RecentTask key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}


function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function TaskItem({ task }: any) {
  return (
    <div className="border p-3 rounded-lg flex justify-between items-center hover:shadow-sm">
      <div>
        <p className="font-medium">{task.title}</p>

        <span
          className={`text-xs px-2 py-1 rounded ${
            task.status === "done"
              ? "bg-green-100 text-green-600"
              : task.status === "in-progress"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Avatar */}
      <img
        src={
          task.assignee?.avatar ||
          `https://ui-avatars.com/api/?name=${task.assignee?.name}`
        }
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}

function RecentTask({ task }: any) {
  return (
    <div className="flex items-center gap-3 border-b pb-2">

      {/* Avatar */}
      <img
        src={
          task.assignee?.avatar ||
          `https://ui-avatars.com/api/?name=${task.assignee?.name}`
        }
        className="w-8 h-8 rounded-full"
      />

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">
            {task.assignee?.name || "User"}
          </span>{" "}
          worked on{" "}
          <span className="font-medium">{task.title}</span>
        </p>

        <p className="text-xs text-gray-400">
          {new Date(task.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}