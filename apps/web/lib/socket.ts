import { io } from "socket.io-client";


const socket = io(process.env.NEXT_PUBLIC_API_DOMAIN ||"http://localhost:8000", {
  withCredentials: true,
  path: "/socket.io", // ✅ default path, good to include
  transports: ["websocket"], // optional: speeds things up
});


export default socket;
