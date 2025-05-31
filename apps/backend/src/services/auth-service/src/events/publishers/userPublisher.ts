import { getChannel } from '../connection';

export const publishUserRegistered = async (userData: any) => {
  const channel = getChannel();
  const queue = 'user_registered';

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));

  console.log('User registered event published! ', userData);
  // Optionally, you can also close the channel after publishing the message  
  
};
