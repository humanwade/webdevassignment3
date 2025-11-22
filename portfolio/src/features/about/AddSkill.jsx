import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import "./FormStyle.css";

function AddSkill() {
    const [category, setCategory] = useState("");
    const [itemInput, setItemInput] = useState("");
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const handleAddItem = () => {
        if (itemInput.trim()) {
            setItems([...items, itemInput.trim()]);
            setItemInput("");
        }
    };

    // 아이템 잘못 추가했을 때 삭제하는 기능 추가 (UX 향상)
    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || items.length === 0) return;

        await fetch("/api/skills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, items }),
        });

        navigate("/about");
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="title">Add New Skill</h1>

                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        {/* Category Input */}
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., Frontend, Backend"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        {/* Items Input */}
                        <div className="form-group">
                            <label>Skill Items</label>
                            <div className="input-with-btn">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g., React, Node.js"
                                    value={itemInput}
                                    onChange={(e) => setItemInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddItem}
                                    className="edit-btn"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Added Items List */}
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
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSkill;
