import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  institution: { 
    type: String,
    required: true
  },
  program: {  
    type: String
  },
  description: {  
    type: String
  },
  type: {  
    type: String,
    enum: ['university', 'bootcamp', 'training', 'certification', 'other'],
    default: 'other'
  }
});

export default mongoose.model('Education', educationSchema);