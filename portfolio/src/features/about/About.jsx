// Updated About.jsx
// Includes debug logs, error fallback, and fetch improvements for both Skills and Experiences

import "./About.css";
import profileMain from "../../assets/profileMain.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function About() {
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const session = JSON.parse(sessionStorage.getItem("jwt"));
    const isAdmin = session?.user?.role === "admin";
    const token = session?.token;

    // Fetch data with debug
    useEffect(() => {
        async function fetchData() {
            try {
                const [skillsRes, expRes] = await Promise.all([
                    fetch("/api/skills"),
                    fetch("/api/experiences")
                ]);

                if (!skillsRes.ok || !expRes.ok) {
                    throw new Error("Failed to fetch data.");
                }

                const skillsData = await skillsRes.json();
                const expData = await expRes.json();

                setSkills(skillsData);
                setExperiences(expData);
            } catch (err) {
                console.error("Error fetching about data:", err);
                setError("Unable to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (type, id) => {
        const name = type === "skill" ? "skill" : "experience";
        if (!window.confirm(`Delete this ${name}?`)) return;

        try {
            const res = await fetch(`/api/${type}s/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error(`Failed to delete ${name}`);

            if (type === "skill") setSkills((prev) => prev.filter((s) => s._id !== id));
            else setExperiences((prev) => prev.filter((e) => e._id !== id));

        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    return (
        <div className="about-page">
            <h1 className="title">ABOUT ME</h1>
            <div className="about-header">
                <div className="about-photo">
                    <img src={profileMain} alt="Profile" />
                </div>
                <div className="about-intro">
                    <p className="headline">
                        A <strong>Co-op Software Engineer</strong> passionate about developing
                        intelligent, full-stack web applications that combine clean design with
                        practical functionality. Experienced in <strong>Spring Boot, React, Node.js, Flask</strong>, and
                        <strong> MySQL</strong>, with hands-on deployment on <strong>Oracle Cloud</strong>.
                    </p>
                    <div className="resume-button">
                        <a href="https://drive.google.com/file/d/1-SrrWaCaURgQDQNAPIV7kzMBTXudusC3/view?usp=drive_link" target="_blank" rel="noreferrer">
                            View My Resume
                        </a>
                    </div>
                </div>
            </div>

            {/* LOADING OR ERROR */}
            {loading && <p style={{ textAlign: "center" }}>Loading data...</p>}
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {/* SKILLS */}
            <div className="about-section">
                <h2>TECHNICAL SKILLS</h2>
                {isAdmin && (
                    <div className="admin-controls">
                        <Link to="/add-skill" className="add-button">Add New Skill</Link>
                    </div>
                )}
                <div className="skills-grid">
                    {skills.map((skill) => (
                        <div className="skill-card" key={skill._id}>
                            <h3>{skill.category}</h3>
                            <ul>
                                {skill.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                            {isAdmin && (
                                <div className="about-controls">
                                    <Link to={`/edit-skill/${skill._id}`} className="edit-btn">Edit</Link>
                                    <button className="delete-btn" onClick={() => handleDelete("skill", skill._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* EXPERIENCE */}
            <div className="about-section">
                <h2>EXPERIENCE</h2>
                {isAdmin && (
                    <div className="admin-controls">
                        <Link to="/add-experience" className="add-button">Add Experience</Link>
                    </div>
                )}
                <div className="experience-grid">
                    {experiences.map((exp) => (
                        <div className="card" key={exp._id}>
                            <h3>{exp.title}</h3>
                            <p><strong>Company:</strong> {exp.company}</p>
                            <p><strong>Duration:</strong> {exp.period}</p>
                            <ul>
                                {exp.details?.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                            {isAdmin && (
                                <div className="about-controls">
                                    <Link to={`/edit-experience/${exp._id}`} className="edit-btn">Edit</Link>
                                    <button className="delete-btn" onClick={() => handleDelete("experience", exp._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
