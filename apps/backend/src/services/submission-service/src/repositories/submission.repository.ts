import Submission, { Submission as SubmissionType } from '../models/Submission';

export const createSubmission = async (data:SubmissionType) => await Submission.create(data);
export const getSubmissionsByUser = async (userId: string) => await Submission.find({ userId });
