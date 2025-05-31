import mongoose, { Schema, Types, model, InferSchemaType } from 'mongoose';
import { Difficulty } from './Question';

// Optional: extend this if you want better IDE support
const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Quiz title is required.'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long.'],
      maxlength: [100, 'Title cannot exceed 100 characters.'],
    },
    imageUrl: {
      type: String,
      trim: true,
      default:'/quiz.png'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    difficulty: {
      type: Number,
      enum: {
        values: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard],
        message: 'Difficulty must be one of: easy, medium, or hard.',
      }
    },
    questionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes for query optimization
quizSchema.index({ isPublic: 1 });
quizSchema.index({ difficulty: 1 });
quizSchema.index({ tags: 1 });

// Infer TypeScript type directly from schema
export type Quiz = InferSchemaType<typeof quizSchema>;
export default model<Quiz>('Quiz', quizSchema);
export type QuizDocument = Quiz & Document;