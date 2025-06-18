import axios from 'axios';

const SERVICE_URL = process.env.GATEWAY_URL || 'http://localhost:8000';

export const getQuizWithQuestions = async (quizId: string) => {
  const res = await axios.get(`${SERVICE_URL}/api/v1/quiz/${quizId}?questionLimit=-1`);
  return res.data;
};

export const getUser = async (userId: string) => {
  const res = await axios.get(`${SERVICE_URL}/api/v1/auth/get/${userId}`);
  console.log(res.data)
  return res.data;
};

export const submitToSubmissionService = async (payload: any) => {
  await axios.post(`${SERVICE_URL}/api/v1/submissions`, payload);
};
