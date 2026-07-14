import { Server } from "socket.io";
import { votingQueue, votingQueueName } from "./jobs/VotingJob.js";
import { commentQueue, commentQueueName } from "./jobs/CommentJob.js";
export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("A user connected!", socket.id);
    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });

    //Listen events:
    //socket provides us with a method to listen to any events.
    socket.onAny(async (eventName: string, data: any) => {
      if (eventName.startsWith("verso-")) {
        console.log("The vote data is: ", data);
        await votingQueue.add(votingQueueName, data);
        socket.broadcast.emit(`verso-${data?.versoId}`, data);
      } else if (eventName.startsWith("verso_comment-")) {
        console.log("The vote data is: ", data);
        await commentQueue.add(commentQueueName, data);
        socket.broadcast.emit(`verso_comment-${data?.id}`, data);
      }
    });

    // --- PRESENCE & HYPE BUILDING ---
    
    // Join Room
    socket.on("join_verso", (versoId: number) => {
      const room = `verso_room_${versoId}`;
      socket.join(room);
      const count = io.sockets.adapter.rooms.get(room)?.size || 0;
      io.to(room).emit(`viewer_count_${versoId}`, count);
    });

    // Leave Room
    socket.on("leave_verso", (versoId: number) => {
      const room = `verso_room_${versoId}`;
      socket.leave(room);
      const count = io.sockets.adapter.rooms.get(room)?.size || 0;
      io.to(room).emit(`viewer_count_${versoId}`, count);
    });

    // Handle Disconnect to update counts
    socket.on("disconnecting", () => {
      for (const room of socket.rooms) {
        if (room.startsWith("verso_room_")) {
          const versoId = room.split("_")[2];
          const count = (io.sockets.adapter.rooms.get(room)?.size || 1) - 1;
          io.to(room).emit(`viewer_count_${versoId}`, count);
        }
      }
    });

    // Typing Indicators
    socket.on("typing", (data: { versoId: number; name: string }) => {
      socket.to(`verso_room_${data.versoId}`).emit(`typing_update_${data.versoId}`, {
        name: data.name,
        isTyping: true,
      });
    });

    socket.on("stop_typing", (data: { versoId: number; name: string }) => {
      socket.to(`verso_room_${data.versoId}`).emit(`typing_update_${data.versoId}`, {
        name: data.name,
        isTyping: false,
      });
    });

  });
}
