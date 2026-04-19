import { useEffect, useState } from "react";
import ProjectCard from "../../components/project/ProjectCard";
import ProjectForm from "../../components/project/ProjectForm";
import { getProjects, createProject } from "../../services/projectService";
import type { Project } from "../../types/project";


export default function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      await createProject(data);
      fetchProjects(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* Create Project */}
      <div className="mb-6">
        <ProjectForm onCreate={handleCreate} />
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
    </div>
    </>
  )
}
