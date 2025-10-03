import app from "./src/app.js";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import { generateResponse } from "./src/service/ai.service.js";
import { log } from "console";

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("ai-message", async (data) => {
    console.log("Prompt received:", data.prompt);
    const aiResponse = await generateResponse(data);
    console.log("AI Response:", aiResponse);
    socket.emit("ai-message-response", { aiResponse });
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
