import { getChannel } from '../connection';
import { sendEmail } from '../../config/sendEmail';

export const startUserRegisteredConsumer = async () => {
  const channel = getChannel();
  const queue = 'user_registered';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const userData = JSON.parse(msg.content.toString());
      console.log('Received user registered event:', userData);

      await sendEmail(userData.name,userData.email,);

      console.log('Event Processed: ', userData.name, userData.email);
      // Acknowledge the message after processing

      channel.ack(msg);
    }
  });

  console.log('🚀 UserRegistered consumer is running...');
};
