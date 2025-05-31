import * as amqp from 'amqplib/callback_api';

let connection: amqp.Connection;
let channel: amqp.Channel;

export const connectQueue = async () => {
  connection = await new Promise<amqp.Connection>((resolve, reject) => {
    amqp.connect(process.env.AMQP_URL || 'amqp://localhost', (err, conn) => {
      if (err) reject(err);
      else resolve(conn);
    });
  });

  channel = await new Promise<amqp.Channel>((resolve, reject) => {
    connection.createChannel((err, ch) => {
      if (err) reject(err);
      else resolve(ch);
    });
  });
};

export const getChannel = () => channel;
