import * as quizRepo from '../repositories/quiz.repository';

export const createNewQuiz = async (data:any) => {
  return await quizRepo.createQuiz(data);
};

export const getAllQuizzes = async () => {
  return await quizRepo.findAllQuizzes();
};
