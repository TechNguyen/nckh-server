import {Server } from 'socket.io'

export const io=(httpServer)=>{
    return new Server(httpServer, { cors: {
        origin: "http://localhost:3302"
      } });
}