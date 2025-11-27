import "./Projects.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import caloriesCut from "../../assets/projectFiles/caloriesCut.png";
import chatApp from "../../assets/projectFiles/chatApp.png";
import pixarGallery from "../../assets/projectFiles/pixarGallery.png";

const imageMap = {
  "caloriesCut.png": caloriesCut,
  "chatApp.png": chatApp,
  "pixarGallery.png": pixarGallery,
};

function Projects() {
  const [projects, setProjects] = useState([]);

  const session = JSON.parse(sessionStorage.getItem("jwt"));
  const token = session?.token;
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("You want to delete this project?");
    if (!confirmed) return;

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("failed: " + error.message);
    }
  };

  return (
    <div className="projects-page">
      <h1 className="title">MY PROJECTS</h1>

      <div className="add-center">
        {isAdmin && (
          <a href="/add-project" className="add-button">
            Add New Project
          </a>
        )}
      </div>

      <div className="section-divider"></div>

      {projects.map((project) => (
        <div className="project-row" key={project._id}>
          <div className="project-text">
            <h2>{project.icon} {project.title}</h2>
            <p>{project.description}</p>

            <h4>🛠️ Tech Stack</h4>
            <ul>
              {project.techStack?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4>✨ Core Features</h4>
            <ul>
              {project.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4>☁️ Deployment</h4>
            <ul>
              {project.deployment?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="project-controls-inline">

              <a
                href={project.repoLink}
                target="_blank"
                rel="noreferrer"
                className="project-btn"
              >
                View Repository
              </a>

              {isAdmin && (
                <>
                  <Link to={`/edit-project/${project._id}`} className="project-btn">
                    Edit
                  </Link>

                  <button
                    className="project-btn delete"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>



          </div>

          <div className="project-image">
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
              <img
                src={
                  project.imageUrl?.startsWith("/uploads/")
                    ? `{project.imageUrl}`
                    : imageMap[project.imageUrl?.split("/").pop()] || "/default.png"
                }
                alt={project.title}
              />
            </a>
            <a
              href={project.demoLink}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              &lt; Visit Live Demo &gt;
            </a>
          </div>
        </div>
      ))}


    </div>
  );
}

export default Projects;
