import { io } from "socket.io-client";


function getSocketUrl(){
  if(process.env.NEXT_PUBLIC_ENVIRONMENT === "development"){
    return "http://localhost:8000";
  }
  return process.env.NEXT_PUBLIC_API_DOMAIN;
}

const socket = io(getSocketUrl(), {
  withCredentials: true,
  path: "/socket.io", // ✅ default path, good to include
  transports: ["websocket"], // optional: speeds things up
});


export default socket;
