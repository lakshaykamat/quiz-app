import ky from "ky";

export const submitQuiz = async ({
  userId,
  quizId,
  score,
  answers,
}: {
  userId: string;
  quizId: string;
  score: number;
  answers: any[];
}) => {
  try {
    const res = await ky.post(`${process.env.NEXT_PUBLIC_API_URL}/submission`, {
      json: {
        userId,
        quizId,
        score,
        answers,
      },
    });
    console.log(res)
    return res.json();
  } catch (error) {
    console.error("Failed to submit quiz:", error);
    throw error;
  }
};
