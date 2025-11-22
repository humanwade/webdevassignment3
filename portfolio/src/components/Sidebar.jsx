import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUser,
    faFolderOpen,
    faGraduationCap,
    faBriefcase,
    faEnvelope,
    faRightFromBracket,
    faRightToBracket, // sign-in icon
} from "@fortawesome/free-solid-svg-icons";
import auth from "../../lib/auth-helper.js";

const navItems = [
    { path: "/", icon: faHome, label: "Home" },
    { path: "/about", icon: faUser, label: "About" },
    { path: "/projects", icon: faFolderOpen, label: "Projects" },
    { path: "/education", icon: faGraduationCap, label: "Education" },
    { path: "/services", icon: faBriefcase, label: "Services" },
    { path: "/contact", icon: faEnvelope, label: "Contact" },
];

function Sidebar() {
    const user = auth.isAuthenticated()?.user;

    const handleSignOut = () => {
        auth.clearJWT(() => {
            window.location = "/";
        });
    };

    return (
        <div className="sidebar">
            <div className="wj-menu">

                {/* ICON: WJ / First letter / G */}
                <div className="wj-button">
                    {user
                        ? user.role === "admin"
                            ? "WJ"
                            : user.name.charAt(0).toUpperCase()
                        : "G"}
                </div>

                {/* without login  */}
                {!user && (
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink
                                to="/signin"
                                className="nav-link"
                            >
                                <FontAwesomeIcon icon={faRightToBracket} className="nav-icon" />
                                <span className="nav-text">Sign In</span>
                            </NavLink>
                        </li>
                    </ul>
                )}

                {/* If login nav bar*/}
                {user && (
                    <ul className="nav-list">
                        {navItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                                    <span className="nav-text">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}

                        {/* Sign Out */}
                        <li className="nav-item" style={{ marginTop: "20px" }}>
                            <div
                                onClick={handleSignOut}
                                className="nav-link"
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    background: "none",
                                }}
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} className="nav-icon" />
                                <span className="nav-text">Sign Out</span>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
