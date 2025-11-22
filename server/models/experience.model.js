import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    details: [{ type: String }]
});

export default mongoose.model("Experience", experienceSchema);