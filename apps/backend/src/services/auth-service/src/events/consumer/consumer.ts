import amqp from "amqplib";
import {calculateXPandLevelFromScore} from "../../utils/xpLevel";

const consumeQuizSubmissions = async () => {
  const connection = await amqp.connect(process.env.AMQP_URL || "amqb://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("quiz.submitted", { durable: true });

  channel.consume("quiz.submitted", async (msg:any) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString());

      await calculateXPandLevelFromScore(event.userId,event.score)
    
      channel.ack(msg);
    }
  });
};

export default consumeQuizSubmissions;
