import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import "./About.css";
import "./FormStyle.css"; 

function EditSkill() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [itemInput, setItemInput] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = JSON.parse(sessionStorage.getItem("jwt"));
    const token = session?.token;

    useEffect(() => {
        async function fetchSkill() {
            try {
                const res = await fetch(`/api/skills/${id}`);
                if (!res.ok) throw new Error("Failed to fetch skill");
                const data = await res.json();

                setCategory(data.category);
                setItems(data.items || []);
            } catch (err) {
                alert("Error loading skill data");
                navigate("/about");
            } finally {
                setLoading(false);
            }
        }
        fetchSkill();
    }, [id, navigate]);

    const handleAddItem = () => {
        if (itemInput.trim()) {
            setItems([...items, itemInput.trim()]);
            setItemInput("");
        }
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || items.length === 0) return;

        try {
            const res = await fetch(`/api/skills/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify({ category, items }),
            });

            if (!res.ok) throw new Error("Failed to update skill");

            navigate("/about");
        } catch (err) {
            alert("Update failed: " + err.message);
        }
    };

    if (loading) return <div className="form-page"><p>Loading...</p></div>;

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="title">Edit Skill</h1>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Skill Items</label>
                            <div className="input-with-btn">
                                <input
                                    type="text"
                                    className="form-input"
                                    value={itemInput}
                                    onChange={(e) => setItemInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
                                />
                                <button type="button" onClick={handleAddItem} className="edit-btn">
                                    Add
                                </button>
                            </div>

                            <ul className="added-list">
                                {items.map((item, i) => (
                                    <li key={i} className="added-item">
                                        <span>{item}</span>
                                        <button
                                            type="button"
                                            className="remove-item-btn"
                                            onClick={() => handleRemoveItem(i)}
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

export default EditSkill;