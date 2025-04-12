import Submission, { Submission as SubmissionType } from '../models/Submission';

export const createSubmission = async (data:SubmissionType) => Submission.create(data);
export const getSubmissionsByUser = async (userId: string) =>
  Submission.find({ userId });
