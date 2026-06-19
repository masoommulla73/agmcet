import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['contact', 'admission'],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  
  // Contact specific fields
  subject: { type: String },
  message: { type: String },

  // Admission specific fields
  course: { type: String },
  city: { type: String },
  education: { type: String },
  
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
  }
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
