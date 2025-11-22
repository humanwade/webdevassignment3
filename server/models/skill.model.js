import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [{ type: String }]
});

export default mongoose.model("Skill", skillSchema);