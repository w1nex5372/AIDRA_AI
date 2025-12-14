import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./api/chat.js";

const app = express();

app.use(
  cors({
    origin: true, // 🔥 LEIDŽIA VISKĄ (iframe-safe)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on ${PORT}`);
});
