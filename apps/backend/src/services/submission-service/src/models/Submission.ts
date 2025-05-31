import mongoose, { Schema, InferSchemaType, Types } from 'mongoose';

const AnswerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  userAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  timeTaken:{
    type:Number,
    required:true
  },
  points:{
    type:Number,
    required:true
  }
}, { _id: false }); // Prevents auto-adding _id to subdocs

const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
    index: true,
  },
  answers: {
    type: [AnswerSchema],
    required: true,
    validate: {
      validator: (arr: any[]) => arr.length > 0,
      message: 'At least one answer is required.',
    },
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  }
}, {
  timestamps: true, // Adds createdAt, updatedAt
  versionKey: false // Removes __v
});

export default mongoose.model('Submission', SubmissionSchema);
export type Submission = InferSchemaType<typeof SubmissionSchema>;
export type Answer = InferSchemaType<typeof AnswerSchema>;