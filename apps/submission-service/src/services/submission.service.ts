import { Submission } from '../models/Submission';
import * as repo from '../repositories/submission.repository';
import axios from 'axios'; // To fetch quiz & questions

export const submitQuiz = async (submissionData:Submission) => {
  const { quizId, userId, answers } = submissionData;

  // Get correct answers from quiz-service
  const quizRes = await axios.get(`http://quiz-service:4002/api/quizzes/${quizId}`);
  const quiz = quizRes.data;

  let score = 0;
  const markedAnswers = answers.map(ans => {
    //@ts-ignore
    const question = quiz.questions.find(q => q._id === ans.questionId);
    const isCorrect = question?.correctAnswer === ans.selectedAnswer;
    if (isCorrect) score += 1;
    return { ...ans, isCorrect };
  });

  return await repo.createSubmission({
    userId,
    quizId,
    //@ts-ignore
    answers: markedAnswers,
    score
  });
};

export const getUserSubmissions = async (userId: string) =>
  await repo.getSubmissionsByUser(userId);
