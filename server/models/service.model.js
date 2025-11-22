import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: String,
    icon: String, 
    description: String
});

export default mongoose.model("Service", serviceSchema);