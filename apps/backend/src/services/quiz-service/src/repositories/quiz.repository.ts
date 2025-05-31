import Quiz, { QuizDocument } from "../models/Quiz";

export const createQuiz = (data: QuizDocument) => Quiz.create(data);
export const findAllQuizzes = async () => await Quiz.find();
export const findQuizById = async (id: string) =>
  await Quiz.findById(id).populate("questionIds").lean();
