import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastContext.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { createProject, deleteProject, getProjects } from "../services/projectService.js";
import ProjectCard from "../components/ProjectCard.jsx";




function DashboardPage() {
    const navigate = useNavigate();
    const {showToast} = useContext(ToastContext);

    const [projects,setProjects] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (err) {
                showToast('Failed to load Projects' , 'error')
            }
            finally{
                setLoading(false)
            }
        }
        fetchProjects();
    },[]);
    const handleNewProject = async () => {
        try {
            const project = await createProject();
            navigate(`/builder/${project._id}`)
        } catch (error) {
            showToast('Failed to load projects','error');
        }
        
    };

    const handleOpen = (id) => {
        navigate(`builder/${id}`);
    }

    const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
      showToast('Project deleted.', 'success');
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="loading-state" style={{ flex: 1 }}>
        <div className="spinner" />
        <p>Loading projects...</p>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Your Projects</h1>
          <p className="dashboard-subtitle">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="dashboard-new-btn" onClick={handleNewProject}>
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="dashboard-empty">
          <p className="dashboard-empty-icon">&#9830;</p>
          <h2 className="dashboard-empty-title">No projects yet</h2>
          <p className="dashboard-empty-subtitle">Create your first project and start building with AI.</p>
          <button className="dashboard-new-btn" onClick={handleNewProject}>
            + Create First Project
          </button>
           </div>
      ) : (
        <div className="dashboard-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );

}

export default DashboardPage;