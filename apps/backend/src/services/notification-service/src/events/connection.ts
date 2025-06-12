import amqp from 'amqplib';

let connection: any
let channel: any

export const connectQueue = async () => {
    //@ts-ignore
  connection = await amqp.connect(process.env.AMQP_URL || 'amqp://localhost');
  //@ts-ignore
  channel = await connection.createChannel();
};

export const getChannel = () => channel;
