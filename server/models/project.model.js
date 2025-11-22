import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    completion: { type: Date, required: true },
    description: { type: String, required: true },
    techStack: { type: [String] },
    features: { type: [String] },
    deployment: { type: [String] },
    repoLink: { type: String },
    demoLink: { type: String },
    imageUrl: { type: String },
    icon: { type: String }
});

export default mongoose.model("Project", ProjectSchema);
