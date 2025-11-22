// Contact.jsx
// This component renders the "Contact Me" page of the portfolio website.
// It displays contact information and a contact form where users can send a message.
// The form uses React state for controlled inputs and navigates back to Home after submission.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import emailjs from "@emailjs/browser";

function Contact() {
    const navigate = useNavigate();
    const session = JSON.parse(sessionStorage.getItem("jwt"));
    const isAdmin = session?.user?.role === "admin";

    const [info, setInfo] = useState({ phone: "", email: "", linkedin: "" });
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        fetch("/api/contact-info")
            .then((res) => res.json())
            .then((data) => data && setInfo(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editing) setInfo({ ...info, [name]: value });
        else setForm({ ...form, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/contact-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        });

        if (res.ok) {
            alert("Contact info updated");
            setEditing(false);
        } else {
            alert("Update failed");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await emailjs.sendForm(
                "service_65ap7uq",
                "template_nev8jyd",
                event.target,
                "WZN4PCGKQVm4mikWW"
            );

            const contactData = {
                firstName: form.firstName,
                lastName: form.lastName,
                contact: form.contact,
                email: form.email,
                message: form.message,
            };

            const res = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData)
            });

            if (!res.ok) throw new Error("DB 저장 실패");

            alert("Message sent and saved!");
            navigate("/");
        } catch (error) {
            console.error("FAILED", error);
            alert("Sorry, something went wrong.");
        }
    };

    return (
        <div className="contact-page">
            <h1 className="contact-title">CONTACT ME</h1>
            <div className="contact-divider"></div>

            <div className="contact-info">
                {editing ? (
                    <form onSubmit={handleSave} className="edit-contact-form">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={info.phone}
                                onChange={handleChange}
                                placeholder="e.g. +1 123-456-7890"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={info.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>LinkedIn URL</label>
                            <input
                                type="text"
                                name="linkedin"
                                value={info.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>

                        <div className="edit-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                Save Info
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p><strong>📞 Phone:</strong> {info.phone}</p>
                        <p><strong>📧 Email:</strong> <a href={`mailto:${info.email}`}> {info.email}</a></p>
                        <p><strong>🔗 LinkedIn:</strong> <a href={info.linkedin} target="_blank" rel="noopener noreferrer">{info.linkedin}</a></p>
                        {isAdmin && (
                            <button
                                className="edit-contact-button"
                                onClick={() => setEditing(true)}
                                style={{ marginTop: '1.5rem' }}
                            >
                                Edit Info
                            </button>
                        )}
                    </>
                )}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                </div>
                <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows="4" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Contact;
