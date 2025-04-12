import Quiz, { QuizDocument } from '../models/Quiz';
export const createQuiz = (data:QuizDocument) => Quiz.create(data);
export const findAllQuizzes = async() => await Quiz.find().populate('questionIds');;