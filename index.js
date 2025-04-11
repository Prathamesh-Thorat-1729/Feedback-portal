const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");

const { UserRoutes } = require("./routes/User.js");

const { Feedback } = require("./model/Feedback.js");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// Serve React static files
app.use(express.static(path.join(__dirname, "client/dist")));

app.use("/api/user", UserRoutes);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token provided"));

  try {
    const user = jwt.verify(token, JWT_SECRET);
    socket.user = user; // save user to socket
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

io.on("connection", async (socket) => {
  console.log("A user connected:", socket.id);

  // Send old messages
  const messages = await Feedback.find().sort({ createdAt: 1 });
  socket.emit("load_messages", messages);

  // Handle new message
  socket.on("new_message", async (data) => {
    const msg = new Feedback(data);
    await msg.save();
    io.emit("new_message", msg); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Catch-all route to serve index.html on unmatched routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
