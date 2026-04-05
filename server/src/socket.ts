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
      if (eventName.startsWith("opinionate-")) {
        console.log("The vote data is: ", data);
        await votingQueue.add(votingQueueName, data);
        socket.broadcast.emit(`opinionate-${data?.opinionId}`, data);
      } else if (eventName.startsWith("opinionate_comment-")) {
        console.log("The vote data is: ", data);
        await commentQueue.add(commentQueueName, data);
        socket.broadcast.emit(`opinionate_comment-${data?.id}`, data);
      }
    });
  });
}
