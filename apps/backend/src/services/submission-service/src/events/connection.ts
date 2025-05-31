import amqp from 'amqplib';

export const publishEvent = async (queueName: string, event: any) => {
  const connection = await amqp.connect(process.env.AMQP_URL || 'amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(event)));
  await channel.close();
  await connection.close();
};
