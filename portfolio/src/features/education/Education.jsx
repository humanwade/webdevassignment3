import { useEffect, useState } from "react";
import "./Education.css";

function Education() {
  const [educations, setEducations] = useState([]);
  const session = JSON.parse(sessionStorage.getItem("jwt"));
  const isAdmin = session?.user?.role === "admin";
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    date: "",
    institution: "",
    program: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    institution: "",
    program: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/educations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      const newEdu = await res.json();
      setEducations([newEdu, ...educations]);
      setForm({ date: "", institution: "", program: "", description: "" });
      setShowModal(false);
    } else {
      alert("Create failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    const res = await fetch(`/api/educations/${id}`, { method: "DELETE" });

    if (res.ok) {
      setEducations(educations.filter((e) => e._id !== id));
    } else {
      alert("Delete failed");
    }
  };

  const startEdit = (edu) => {
    setEditingId(edu._id);
    setEditForm({
      date: edu.date,
      institution: edu.institution,
      program: edu.program,
      description: edu.description
    });
    setShowEditModal(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/educations/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    });

    if (res.ok) {
      const updated = await res.json();
      setEducations(educations.map(e => e._id === editingId ? updated : e));
      setEditingId(null);
    } else {
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetch("/api/educations")
      .then((res) => res.json())
      .then((data) => setEducations(data))
      .catch((err) => console.error("Failed to fetch educations", err));
  }, []);

  return (
    <div className="education-page">
      <h1 className="title">MY JOURNEY</h1>

      {isAdmin && (
        <div className="add-edu-wrapper">
          <button className="add-edu-btn" onClick={() => setShowModal(true)}>
            Add New Education
          </button>
        </div>
      )}

      <div className="timeline-goal">
        <div className="goal-icon">🎯</div>
        <div className="goal-text">Professional Software Engineer</div>
      </div>

      <div className="timeline">
        {educations.map((edu) => (
          <div className="timeline-item" key={edu._id}>
            <div className="timeline-date">{edu.date}</div>
            <div className="timeline-content">
              <h3>
                {edu.institution} <br />
                <span>{edu.program}</span>
              </h3>
              {edu.description && <p>{edu.description}</p>}

              {isAdmin && (
                <div className="edu-controls">
                  <button
                    className="edu-btn edit"
                    onClick={() => startEdit(edu)}
                  >
                    Edit
                  </button>
                  <button
                    className="edu-btn delete"
                    onClick={() => handleDelete(edu._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Education</h3>
            <form onSubmit={handleCreate}>
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Date (e.g. 2024.09 - Present)"
                required
              />
              <input
                name="institution"
                value={form.institution}
                onChange={handleChange}
                placeholder="Institution"
                required
              />
              <input
                name="program"
                value={form.program}
                onChange={handleChange}
                placeholder="Program"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
              />
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Education</h3>
            <form onSubmit={submitEdit}>
              <input
                name="date"
                value={editForm.date}
                onChange={handleEditChange}
                placeholder="Date (e.g. 2024.09 - Present)"
                required
              />
              <input
                name="institution"
                value={editForm.institution}
                onChange={handleEditChange}
                placeholder="Institution"
                required
              />
              <input
                name="program"
                value={editForm.program}
                onChange={handleEditChange}
                placeholder="Program"
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Description"
                rows="3"
              />
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => { cancelEdit(); setShowEditModal(false); }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Education;
