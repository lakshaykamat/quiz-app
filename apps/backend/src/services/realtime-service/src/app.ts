// main.ts or index.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { registerSocketHandlers } from './game';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.GATEWAY_URL || 'http://localhost:8000',
    credentials: true,
  },
});
app.get("/health",(req:any,res:any)=>res.send("Realtime service is running!"))
io.on('connection', (socket) => {
  registerSocketHandlers(io, socket);
});

const PORT = 4005;
httpServer.listen(PORT, () => {
  console.log(`✅ Realtime service running on http://localhost:${PORT}`);
});
export default app