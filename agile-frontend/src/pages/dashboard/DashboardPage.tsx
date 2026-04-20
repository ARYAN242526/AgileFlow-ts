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

      // ✅ FIX 1: correct data extraction
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  // ✅ SAFE DATA ACCESS
  const overview = data?.overview || {};
  const stats = data?.taskStats || {};

  // ✅ FIX 2: Chart data mapping
  const chartData = [
    { name: "Todo", value: stats.todoTasks || 0 },
    { name: "In Progress", value: stats.inProgressTasks || 0 },
    { name: "Done", value: stats.doneTasks || 0 },
  ];

  const COLORS = ["#f87171", "#60a5fa", "#34d399"];

  return (
    <div className="space-y-6">

      {/* 🔥 TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard title="Projects" value={overview.totalProjects || 0} />
        <StatCard title="Sprints" value={overview.totalSprints || 0} />
        <StatCard title="Features" value={overview.totalFeatures || 0} />
        <StatCard title="Tasks" value={overview.totalTasks || 0} />
        <StatCard title="Completed Tasks" value={stats.doneTasks || 0} />
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
                outerRadius={90}
                label
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* ✅ Legend */}
          <div className="flex justify-around mt-4 text-sm">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i] }}
                ></span>
                {item.name} ({item.value})
              </div>
            ))}
          </div>
        </div>

        {/* 🧩 My Tasks */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">My Tasks</h2>

          <div className="space-y-3 max-h-[260px] overflow-y-auto">
            {(data?.myTasks || []).length === 0 ? (
              <p className="text-gray-400 text-sm">No tasks assigned</p>
            ) : (
              data.myTasks.map((task: any) => (
                <TaskItem key={task._id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🕒 Recent Tasks */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Recent Tasks</h2>

        <div className="space-y-3">
          {(data?.recentTasks || []).length === 0 ? (
            <p className="text-gray-400 text-sm">No recent activity</p>
          ) : (
            data.recentTasks.map((task: any) => (
              <RecentTask key={task._id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function TaskItem({ task }: any) {
  return (
    <div className="border p-3 rounded-lg flex justify-between items-center hover:shadow-sm cursor-pointer">
      <div>
        <p className="font-medium">{task.title}</p>

        {/* ✅ STATUS BADGE */}
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

      {/* ✅ Avatar fallback */}
      <img
        src={
          task.assignee?.avatar ||
          `https://ui-avatars.com/api/?name=${task.assignee?.name || "User"}`
        }
        className="w-8 h-8 rounded-full border"
      />
    </div>
  );
}

function RecentTask({ task }: any) {
  return (
    <div className="flex items-center gap-3 border-b pb-2">

      <img
        src={
          task.assignee?.avatar ||
          `https://ui-avatars.com/api/?name=${task.assignee?.name || "User"}`
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