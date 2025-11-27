import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProject.css"; 

function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const storedToken = JSON.parse(sessionStorage.getItem("jwt"));
    const token = storedToken?.token;

    const [project, setProject] = useState({
        title: "", firstname: "", lastname: "", email: "",
        completion: "", description: "",
        repoLink: "", demoLink: "", imageUrl: "", icon: ""
    });

    const [techStack, setTechStack] = useState([]);
    const [features, setFeatures] = useState([]);
    const [deployment, setDeployment] = useState([]);
    
    const [inputs, setInputs] = useState({ tech: "", feat: "", deploy: "" });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`/api/projects/${id}`);
                const data = res.data;

                let formattedDate = "";
                if (data.completion) {
                    formattedDate = new Date(data.completion).toISOString().split('T')[0];
                }

                setProject({
                    title: data.title,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    completion: formattedDate,
                    description: data.description,
                    repoLink: data.repoLink,
                    demoLink: data.demoLink,
                    imageUrl: data.imageUrl,
                    icon: data.icon
                });

                setTechStack(data.techStack || []);
                setFeatures(data.features || []);
                setDeployment(data.deployment || []);
            } catch (err) {
                alert("Failed to load project data");
                console.error(err);
                navigate("/projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id, navigate]);

    const ensureProtocol = (url) => {
        if (!url) return "";
        return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    };

    // === Handlers ===
    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAddItem = (type) => {
        const val = inputs[type].trim();
        if (!val) return;

        if (type === 'tech') setTechStack([...techStack, val]);
        if (type === 'feat') setFeatures([...features, val]);
        if (type === 'deploy') setDeployment([...deployment, val]);

        setInputs({ ...inputs, [type]: "" });
    };

    const handleKeyDown = (e, type) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddItem(type);
        }
    };

    const handleRemoveItem = (type, index) => {
        if (type === 'tech') setTechStack(techStack.filter((_, i) => i !== index));
        if (type === 'feat') setFeatures(features.filter((_, i) => i !== index));
        if (type === 'deploy') setDeployment(deployment.filter((_, i) => i !== index));
    };

    const uploadImage = async () => {
        if (!imageFile) return null;
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data.imageUrl;
        } catch (err) {
            alert("Image upload failed: " + err.message);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadedUrl = await uploadImage();
            
            const finalProject = {
                ...project,
                techStack,
                features,
                deployment,
                repoLink: ensureProtocol(project.repoLink),
                demoLink: ensureProtocol(project.demoLink),
                imageUrl: uploadedUrl || project.imageUrl, 
            };

            await axios.put(`/api/projects/${id}`, finalProject, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            alert("Project updated successfully!");
            navigate("/projects");
        } catch (err) {
            alert("Update failed: " + (err.response?.data?.error || err.message));
        }
    };

    if (loading) return <div className="add-project-page"><p>Loading...</p></div>;

    return (
        <div className="add-project-page">
            <div className="form-container">
                <h1 className="title">Edit Project</h1>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <h3 className="form-section-title">Basic Info</h3>
                        <div className="form-group">
                            <label>Project Title</label>
                            <input type="text" name="title" className="form-input" value={project.title} onChange={handleChange} required />
                        </div>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstname" className="form-input" value={project.firstname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastname" className="form-input" value={project.lastname} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" className="form-input" value={project.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Completion Date</label>
                                <input type="date" name="completion" className="form-input" value={project.completion} onChange={handleChange} required />
                            </div>
                        </div>

                        <h3 className="form-section-title">Description</h3>
                        <div className="form-group">
                            <textarea name="description" className="form-textarea" value={project.description} onChange={handleChange} required />
                        </div>

                        <h3 className="form-section-title">Technical Details</h3>
                        
                        <div className="form-group">
                            <label>Tech Stack</label>
                            <div className="input-with-btn">
                                <input type="text" className="form-input" placeholder="Add item and press Enter" 
                                    value={inputs.tech} 
                                    onChange={(e) => setInputs({...inputs, tech: e.target.value})}
                                    onKeyDown={(e) => handleKeyDown(e, 'tech')}
                                />
                                <button type="button" className="add-mini-btn" onClick={() => handleAddItem('tech')}>Add</button>
                            </div>
                            <ul className="added-list">
                                {techStack.map((item, i) => (
                                    <li key={i} className="added-item">
                                        {item} <button type="button" className="remove-item-btn" onClick={() => handleRemoveItem('tech', i)}>&times;</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-group">
                            <label>Key Features</label>
                            <div className="input-with-btn">
                                <input type="text" className="form-input" placeholder="Add item and press Enter" 
                                    value={inputs.feat} 
                                    onChange={(e) => setInputs({...inputs, feat: e.target.value})}
                                    onKeyDown={(e) => handleKeyDown(e, 'feat')}
                                />
                                <button type="button" className="add-mini-btn" onClick={() => handleAddItem('feat')}>Add</button>
                            </div>
                            <ul className="added-list">
                                {features.map((item, i) => (
                                    <li key={i} className="added-item">
                                        {item} <button type="button" className="remove-item-btn" onClick={() => handleRemoveItem('feat', i)}>&times;</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                         <div className="form-group">
                            <label>Deployment Info</label>
                            <div className="input-with-btn">
                                <input type="text" className="form-input" placeholder="Add item and press Enter" 
                                    value={inputs.deploy} 
                                    onChange={(e) => setInputs({...inputs, deploy: e.target.value})}
                                    onKeyDown={(e) => handleKeyDown(e, 'deploy')}
                                />
                                <button type="button" className="add-mini-btn" onClick={() => handleAddItem('deploy')}>Add</button>
                            </div>
                            <ul className="added-list">
                                {deployment.map((item, i) => (
                                    <li key={i} className="added-item">
                                        {item} <button type="button" className="remove-item-btn" onClick={() => handleRemoveItem('deploy', i)}>&times;</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h3 className="form-section-title">Links & Media</h3>
                        <div className="form-group">
                            <label>GitHub Repository</label>
                            <input type="text" name="repoLink" className="form-input" value={project.repoLink} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Live Demo Link</label>
                            <input type="text" name="demoLink" className="form-input" value={project.demoLink} onChange={handleChange} />
                        </div>
                        
                        <div className="form-row">
                             <div className="form-group">
                                <label>Icon Emoji</label>
                                <input type="text" name="icon" className="form-input" value={project.icon} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Project Image</label>
                                {project.imageUrl && !imageFile && (
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{color:'#888', fontSize:'0.8rem'}}>Current Image:</span>
                                        <br/>
                                        <img 
                                            src={project.imageUrl.startsWith("/uploads") ? `{project.imageUrl}` : `/assets/projectFiles/${project.imageUrl}`} 
                                            alt="Current" 
                                            style={{ height: '60px', borderRadius: '4px', marginTop: '5px' }} 
                                        />
                                    </div>
                                )}
                                <div className="file-upload-wrapper">
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => navigate("/projects")}>
                                Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                Update Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProject;
