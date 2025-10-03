import express from "express"
import { Server } from "socket.io"

const app = express()
app.get("/", (req, res) => {
  res.send("Hello World!")
}) 

export default app