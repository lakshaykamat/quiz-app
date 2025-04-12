import mongoose, { Schema, model, InferSchemaType } from 'mongoose';

// Enums
export enum QuestionType {
  MCQ = 0,
  Code = 1,
  Boolean = 2,
  Text = 3,
}

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

// Mongoose Schema
const questionSchema = new Schema(
  {
    type: {
      type: Number,
      enum: {
        values: [QuestionType.MCQ, QuestionType.Code, QuestionType.Boolean, QuestionType.Text],
        message: 'Type must be one of: mcq, code, boolean, or text.',
      },
      default: QuestionType.MCQ,
      required: [true, 'Question type is required.'],
    },
    questionText: {
      type: String,
      required: [true, 'Question text is required.'],
      trim: true,
      minlength: [5, 'Question must be at least 5 characters.'],
      maxlength: [1000, 'Question cannot exceed 1000 characters.'],
    },
    options: {
      type: [String],
      validate: {
        validator: function (this: any, options: string[] | undefined) {
          if (this.type === QuestionType.MCQ) {
            return Array.isArray(options) && options.length >= 2;
          }
          return true;
        },
        message: 'MCQ questions must have at least two options.',
      },
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer is required.'],
      trim: true,
    },
    explanation: {
      type: String,
      trim: true,
      maxlength: [1000, 'Explanation cannot exceed 1000 characters.'],
    },
    difficulty: {
      type: Number,
      enum: {
        values: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard],
        message: 'Difficulty must be one of: easy, medium, or hard.',
      },
      default: Difficulty.Medium,
      required: [true, 'Difficulty is required.'],
    },
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

// Indexes
questionSchema.index({ difficulty: 1 });
questionSchema.index({ tags: 1 });

// Infer TS type from schema
export type Question = InferSchemaType<typeof questionSchema>;
export default model<Question>('Question', questionSchema);
export type QuestionDocument = Question & Document;