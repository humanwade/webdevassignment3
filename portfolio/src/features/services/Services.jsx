import { useEffect, useState } from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faDatabase,
    faChartBar,
    faCogs,
    faCloud,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
    code: faCode,
    database: faDatabase,
    chart: faChartBar,
    cogs: faCogs,
    cloud: faCloud,
};

const iconOptions = ["code", "database", "chart", "cogs", "cloud"];

function Services() {
    const [services, setServices] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", icon: "", description: "" });
    const [newFormVisible, setNewFormVisible] = useState(false);
    const [newForm, setNewForm] = useState({ title: "", icon: "code", description: "" });

    const session = JSON.parse(sessionStorage.getItem("jwt"));
    const isAdmin = session?.user?.role === "admin";

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Failed to fetch services", err));
    }, []);

    const startEdit = (service) => {
        setEditingId(service._id);
        setEditForm({
            title: service.title,
            icon: service.icon,
            description: service.description,
        });
    };

    const cancelEdit = () => setEditingId(null);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
        if (res.ok) {
            setServices(services.filter((s) => s._id !== id));
        } else {
            alert("Delete failed");
        }
    };

    const submitEdit = async (id) => {
        const res = await fetch(`/api/services/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
        });

        if (res.ok) {
            const updated = await res.json();
            setServices(services.map((s) => (s._id === id ? updated : s)));
            setEditingId(null);
        } else {
            alert("Update failed");
        }
    };

    const submitNew = async () => {
        const res = await fetch(`/api/services`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newForm),
        });

        if (res.ok) {
            const created = await res.json();
            setServices([...services, created]);
            setNewForm({ title: "", icon: "code", description: "" });
            setNewFormVisible(false);
        } else {
            alert("Create failed");
        }
    };

    return (
        <div className="services-page">
            <h1 className="title">EXPERTISE</h1>
            <div className="services-divider"></div>

            <p className="services-intro">
                As a <strong>Co-op Software Engineer</strong>, I specialize in full-stack web development,
                <br />API integration, and cloud deployment. <br />
                I aim to build intelligent, scalable systems that combine performance, usability, and clean design.
            </p>

            {isAdmin && (
                <div className="admin-controls">
                    <button className="service-btn add" onClick={() => setNewFormVisible(!newFormVisible)}>
                        {newFormVisible ? "Cancel New" : "Add New Service"}
                    </button>
                    {newFormVisible && (
                        <div className="service-form new-form">
                            <input
                                placeholder="Title"
                                value={newForm.title}
                                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                            />
                            <select
                                value={newForm.icon}
                                onChange={(e) => setNewForm({ ...newForm, icon: e.target.value })}
                            >
                                {iconOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Description"
                                value={newForm.description}
                                onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                            />
                            <button className="service-btn edit" onClick={submitNew}>
                                Save
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="services-grid">
                {services.map((service) => (
                    <div className="service-card" key={service._id}>
                        <FontAwesomeIcon
                            icon={iconMap[service.icon] || faCogs}
                            className="service-icon"
                        />

                        {editingId === service._id ? (
                            <div className="service-form">
                                <input
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                />
                                <select
                                    value={editForm.icon}
                                    onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                                >
                                    {iconOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, description: e.target.value })
                                    }
                                />
                                <div className="service-controls">
                                    <button className="service-btn edit" onClick={() => submitEdit(service._id)}>
                                        Save
                                    </button>
                                    <button className="service-btn delete" onClick={cancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                {isAdmin && (
                                    <div className="service-controls">
                                        <button className="service-btn edit" onClick={() => startEdit(service)}>
                                            Edit
                                        </button>
                                        <button className="service-btn delete" onClick={() => handleDelete(service._id)}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
