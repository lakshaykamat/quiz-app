import mongoose from 'mongoose';

// Define User Schema with more details
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [3, 'Name must be at least 3 characters'],
    max: [50, 'Name must be at most 50 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: [5, 'Email must be at least 5 characters'],
    max: [100, 'Email must be at most 100 characters'],
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false, // Do not return password by default
    min:[6, 'Password must be at least 6 characters'],
    max:[20, 'Password must be at most 20 characters']
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
