// @ts-nocheck

import request from 'supertest';
import app from '../src/app';
import Quiz from '../src/models/Quiz';

describe('Get all quizzes', () => {
  it('GET / should return an array of quizzes with expected structure', async () => {
    const res = await request(app).get('/');
    
    // Check response status
    expect(res.statusCode).toEqual(200);

    // Check response is an array
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // Check structure of the first quiz
    const quiz = res.body[0];
    expect(quiz).toHaveProperty('_id');
    expect(quiz).toHaveProperty('title');
    expect(quiz).toHaveProperty('imageUrl');
    expect(quiz).toHaveProperty('description');
    expect(quiz).toHaveProperty('isPublic');
    expect(quiz).toHaveProperty('difficulty');
    expect(quiz).toHaveProperty('questionIds');
    expect(Array.isArray(quiz.questionIds)).toBe(true);
    expect(quiz).toHaveProperty('tags');
    expect(Array.isArray(quiz.tags)).toBe(true);
    expect(quiz).toHaveProperty('createdAt');
    expect(quiz).toHaveProperty('updatedAt');
  });
});

describe('Create a quiz', () => {
    let createdQuizId: string;
  
    it('POST /quiz should create a new quiz and return it', async () => {
      const payload = {
        title: 'Java Quiz',
        imageUrl: 'http://localhost:4002/static/java.png',
        description: 'Test your Java knowledge...',
        isPublic: true,
        difficulty: 1,
        questionIds: ['6804f8fa6ca637d884a5f2cd', '6804f8fa6ca637d884a5f2ce'],
        tags: ['java', 'OOP']
      };
  
      const res = await request(app)
        .post('/')
        .send(payload)
        .set('Accept', 'application/json');
  
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      createdQuizId = res.body._id;
  
      expect(res.body).toMatchObject({
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
        isPublic: payload.isPublic,
        difficulty: payload.difficulty,
        tags: payload.tags
      });
      expect(Array.isArray(res.body.questionIds)).toBe(true);
      expect(res.body.questionIds).toEqual(expect.arrayContaining(payload.questionIds));
    });
  
    afterEach(async () => {
      if (createdQuizId) {
        await Quiz.findByIdAndDelete(createdQuizId);
      }
    });
  });
  
