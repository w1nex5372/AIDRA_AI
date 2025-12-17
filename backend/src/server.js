import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRoute from "./api/chat.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ SERVE PUBLIC
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        origin.includes("framer.ai") ||
        origin.includes("framer.com") ||
        origin.includes("framercanvas.com") ||
        origin.includes("onrender.com")
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.send("AIDRA AI backend is running 🚀");
});

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
