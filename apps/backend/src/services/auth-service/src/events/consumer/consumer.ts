import amqp from "amqplib";
import { calculateXPandLevelFromScore } from "../../utils/xpLevel";
import { addSubmittedQuiz } from "../../utils/addSubmittedQuiz";

const consumeQuizSubmissions = async () => {
  const connection = await amqp.connect(
    process.env.AMQP_URL || "amqb://localhost"
  );
  const channel = await connection.createChannel();
  await channel.assertQueue("quiz.submitted", { durable: true });

  channel.consume("quiz.submitted", async (msg: any) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString());
      const { userId, score, quizId, timestamp, submissionId} = event;

      await calculateXPandLevelFromScore(userId, score);

      await addSubmittedQuiz(submissionId, userId);

      channel.ack(msg);
    }
  });
};

export default consumeQuizSubmissions;
