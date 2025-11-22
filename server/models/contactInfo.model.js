import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  linkedin: { type: String, required: true }
});

export default mongoose.model("ContactInfo", contactInfoSchema);
