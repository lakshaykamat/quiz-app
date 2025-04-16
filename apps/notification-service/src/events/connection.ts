import amqp from 'amqplib';

let connection: amqp.Connection;
let channel: amqp.Channel;

export const connectQueue = async () => {
    //@ts-ignore
  connection = await amqp.connect('amqp://localhost');
  //@ts-ignore
  channel = await connection.createChannel();
};

export const getChannel = () => channel;
