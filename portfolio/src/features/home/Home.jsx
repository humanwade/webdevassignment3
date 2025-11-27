import { Link } from "react-router-dom";
import "./Home.css";
import profile from "../../assets/profile.webp";
import auth from "../../../lib/auth-helper.js";

function Home() {
    const user = auth.isAuthenticated()?.user;

    return (
        <div className="home-page">
            {/* Left Section: Profile Image */}
            <div className="home-image">
                <img src={profile} alt="Profile" />
            </div>

            {/* Right Section: Introduction Text */}
            <div className="home-text">

                <h1>
                    {user ? `Welcome, ${user.name.split(" ")[0]}!` : "WELCOME!"}
                </h1>

                <h2>
                    I'm Seounghoon (Wade) Jung
                </h2>

                <p>
                    A <strong>Co-op Software Engineer</strong> passionate about building intelligent,<br />
                    full-stack web applications that combine clean design with practical functionality.
                </p>

                <p>
                    Experienced with <strong>Spring Boot, React, Node.js, and Flask</strong>,
                    integrating <strong>AI models</strong>,<br /> and deploying scalable services
                    on <strong>Oracle Cloud</strong>.
                </p>

                <p>
                    Bringing strong <strong>data analysis</strong>, <strong>problem-solving</strong>,
                    and <strong>cross-functional collaboration</strong> skills<br /> to every project.
                </p>

                <p>
                    📍 Based in Toronto, Canada | 🎓 Centennial College
                </p>

                <Link to={user ? "/about" : "/signup"}>
                    <button>
                        MORE ABOUT ME
                        {!user && (
                            <>
                                <br />
                                JOIN NOW !
                            </>
                        )}
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
