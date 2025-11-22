import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./features//home/Home";
import About from "./features/about/About";
import Projects from "./features/projects/Projects";
import Education from "./features/education/Education";
import Services from "./features/services/Services";
import Contact from "./features/contact/Contact";
import Signup from "../user/Signup";
import Users from "../user/Users";
import Profile from "../user/Profile";
import EditProfile from "../user/EditProfile";
import Signin from "../lib/Signin";
import AddProject from "./features/projects/AddProject";
import EditProject from "./features/projects/EditProject";
import AddExperience from "./features/about/AddExperience";
import AddSkill from "./features/about/AddSkill";
import EditSkill from "./features/about/EditSkill";
import EditExperience from "./features/about/EditExperience";

function App() {
  const navigate = useNavigate();

  const handleProjectAdded = () => {
    navigate("/projects");
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-skill" element={<AddSkill />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/edit-skill/:id" element={<EditSkill />} />
          <Route path="/edit-experience/:id" element={<EditExperience />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/add-project"
            element={<AddProject onProjectAdded={handleProjectAdded} />}
          />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/user/edit/:userId" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
