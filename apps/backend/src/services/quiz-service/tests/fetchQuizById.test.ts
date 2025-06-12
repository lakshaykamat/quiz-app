// @ts-nocheck

import request from 'supertest';
import app from '../src/app';
import Quiz from '../src/models/Quiz';
import Question from '../src/models/Question';
import mongoose from 'mongoose';
import { describe, it } from 'node:test';

describe('Get quiz by ID', () => {
  let quizId= "6804f8fb6ca637d884a5f348";
  let questionIds: mongoose.Types.ObjectId[];

  it('GET /:id should return a quiz with populated questions', async () => {
    const res = await request(app).get(`/${quizId}?questionLimit=4`);
    console.log(res)
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', quizId);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('questionIds');
    expect(Array.isArray(res.body.questionIds)).toBe(true);
    expect(res.body.questionIds.length).toBe(4);

    const question = res.body.questionIds[0];
    expect(question).toHaveProperty('_id');
    expect(question).toHaveProperty('questionText');
    expect(question).toHaveProperty('correctAnswer');
    expect(question).toHaveProperty('explanation');
    expect(Array.isArray(question.tags)).toBe(true);
  });

  afterAll(async () => {
    // Clean up
    //await Quiz.findByIdAndDelete(quizId);
    // await Question.deleteMany({ _id: { $in: questionIds } });
  });
});
