import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-blue-600">AgileFlow</h1>

                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 hover:text-blue-600">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="text-center py-20 px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Manage Projects <span className="text-blue-600">Smarter</span>
                </h2>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    AgileFlow helps teams organize tasks, track progress, and deliver
                    faster using powerful Kanban boards and agile workflows.
                </p>

                <Link
                    to="/register"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700"
                >
                    Start for Free 🚀
                </Link>
            </section>


             {/* FEATURES */}
            <section className="py-16 px-8 bg-white">
                <h3 className="text-3xl font-bold text-center mb-12">
                    Powerful Features
                </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Kanban Boards</h4>
            <p className="text-gray-600">
              Visualize your workflow with drag-and-drop task management.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Sprint Planning</h4>
            <p className="text-gray-600">
              Organize tasks into sprints and track progress efficiently.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Role-Based Access</h4>
            <p className="text-gray-600">
              Secure your project with role-based permissions.
            </p>
          </div>

        </div>
      </section>

      {/* WORKFLOW SECTION */}
            <section className="py-16 px-8">
                <h3 className="text-3xl font-bold text-center mb-12">
                    How AgileFlow Works
                </h3>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div>
            <div className="text-4xl mb-3">📌</div>
            <h4 className="font-semibold mb-2">Create Tasks</h4>
            <p className="text-gray-600">Add tasks inside features & projects</p>
          </div>

          <div>
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold mb-2">Track Progress</h4>
            <p className="text-gray-600">Move tasks across Kanban stages</p>
          </div>

          <div>
            <div className="text-4xl mb-3">✅</div>
            <h4 className="font-semibold mb-2">Deliver Faster</h4>
            <p className="text-gray-600">Complete work efficiently</p>
          </div>

        </div>
      </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16">
            <h3 className="text-3xl font-bold mb-4">
                Ready to boost your productivity?
            </h3>

        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
        >
          Get Started Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} AgileFlow. All rights reserved.
      </footer>
        </div>
    )
}