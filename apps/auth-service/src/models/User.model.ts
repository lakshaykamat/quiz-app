import mongoose from 'mongoose';

// Define User Schema with more details
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: 'https://avatar.iran.liara.run/public' // Default avatar URL
  }, // Optional: link to user's avatar image
  bio: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  quizzesTaken: [{
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission'  // Reference to Submission model
    }
  }],
  lastLogin: Date,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
export type User = mongoose.InferSchemaType<typeof userSchema>;
