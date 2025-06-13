import { publishEvent } from "../events/connection";
import { Submission } from "../models/Submission";
import * as repo from "../repositories/submission.repository";

export const submitQuiz = async (submissionData: Submission) => {
  const { quizId, userId, answers, score } = submissionData;

  const data = await repo.createSubmission({
    userId,
    quizId,
    answers: answers,
    score,
    createdAt: new Date(),
    updatedAt: new Date(),
    submittedAt: new Date(),
  });
  await publishEvent("quiz.submitted", {
    eventType: "quiz.submitted",
    userId,
    quizId,
    score,
    submissionId: data._id,
    timestamp: new Date().toISOString(),
  });
  return data;
};

export const getUserSubmissions = async (userId: string) =>
  await repo.getSubmissionsByUser(userId);
