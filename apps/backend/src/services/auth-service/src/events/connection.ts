import * as amqp from "amqplib/callback_api";

let connection: any;
let channel: any;

export const connectQueue = async () => {
  connection = await new Promise<any>((resolve, reject) => {
    amqp.connect(
      process.env.AMQP_URL || "amqp://localhost",
      (err: any, conn: any) => {
        if (err) reject(err);
        else resolve(conn);
      }
    );
  });

  channel = await new Promise<any>((resolve, reject) => {
    connection.createChannel((err: any, ch: any) => {
      if (err) reject(err);
      else resolve(ch);
    });
  });
};

export const getChannel = () => channel;
