import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRoute from "./api/chat.js";

const app = express();

// ===== PATH SETUP =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== STATIC FILES (optional, bet ok palikti) =====
app.use(express.static(path.join(__dirname, "../public")));

// ===== CORS (FIXED) =====
app.use(
  cors({
    origin: (origin, callback) => {
      // leidžiam Postman, server-to-server, cron ir pan.
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "aidra.lt",
        "www.aidra.lt",
        "framer.com",
        "framercanvas.com",
        "framer.ai",
        "onrender.com",
      ];

      if (allowedOrigins.some((o) => origin.includes(o))) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===== BODY PARSER =====
app.use(express.json());

// ===== HEALTH CHECK =====
app.get("/", (_, res) => {
  res.send("AIDRA AI backend is running 🚀");
});

// ===== API =====
app.use("/api/chat", chatRoute);

// ===== START =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
