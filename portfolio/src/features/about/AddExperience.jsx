import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import "./FormStyle.css";

function AddExperience() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [period, setPeriod] = useState("");
    const [detailInput, setDetailInput] = useState("");
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    const handleAddDetail = () => {
        if (detailInput.trim()) {
            setDetails([...details, detailInput.trim()]);
            setDetailInput("");
        }
    };

    const handleRemoveDetail = (index) => {
        setDetails(details.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !company || !period || details.length === 0) return;

        await fetch("/api/experiences", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, company, period, details }),
        });

        navigate("/about");
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="title">Add Experience</h1>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., Software Engineer"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., Google"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Period</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., Jan 2023 - Present"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Details / Achievements</label>
                            <div className="input-with-btn">
                                <textarea
                                    className="form-textarea"
                                    placeholder="Describe what you did..."
                                    value={detailInput}
                                    onChange={(e) => setDetailInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAddDetail())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddDetail}
                                    className="edit-btn"
                                    style={{ height: 'fit-content', alignSelf: 'flex-end' }}
                                >
                                    Add
                                </button>
                            </div>

                            <ul className="added-list" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                {details.map((d, i) => (
                                    <li key={i} className="added-item" style={{ width: '100%', justifyContent: 'space-between' }}>
                                        <span style={{ wordBreak: 'break-all' }}>{d}</span>
                                        <button
                                            type="button"
                                            className="remove-item-btn"
                                            onClick={() => handleRemoveDetail(i)}
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => navigate("/about")}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="edit-btn">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddExperience;
