import express from "express"
import { Server } from "socket.io"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
export default app