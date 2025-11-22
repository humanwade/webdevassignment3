import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./About.css";
import "./FormStyle.css";

function EditExperience() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [period, setPeriod] = useState("");
    const [detailInput, setDetailInput] = useState("");
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = JSON.parse(sessionStorage.getItem("jwt"));
    const token = session?.token;

    useEffect(() => {
        async function fetchExperience() {
            try {
                const res = await fetch(`/api/experiences/${id}`);
                if (!res.ok) throw new Error("Failed to fetch experience");
                const data = await res.json();

                setTitle(data.title);
                setCompany(data.company);
                setPeriod(data.period);
                setDetails(data.details || []);
            } catch (err) {
                alert("Error loading experience data");
                navigate("/about");
            } finally {
                setLoading(false);
            }
        }
        fetchExperience();
    }, [id, navigate]);

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

        try {
            const res = await fetch(`/api/experiences/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, company, period, details }),
            });

            if (!res.ok) throw new Error("Failed to update experience");

            navigate("/about");
        } catch (err) {
            alert("Update failed: " + err.message);
        }
    };

    if (loading) return <div className="form-page"><p>Loading...</p></div>;

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="title">Edit Experience</h1>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input
                                type="text"
                                className="form-input"
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
                                Update Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditExperience;