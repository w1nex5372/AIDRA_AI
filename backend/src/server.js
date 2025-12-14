import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./api/chat.js";

const app = express();

/**
 * 🔒 CORS – DEMO / FRAMER SAFE
 * (be regex – kad Render nenulūžtų)
 */
app.use(
  cors({
    origin: (origin, callback) => {
      // leidžiam server-side, render healthcheck, curl, postman
      if (!origin) return callback(null, true);

      // leidžiam VISUS framer domenus demo stadijoje
      if (
        origin.includes("framer.ai") ||
        origin.includes("framer.com") ||
        origin.includes("framercanvas.com") ||
        origin.includes("onrender.com")
      ) {
        return callback(null, true);
      }

      console.warn("❌ CORS blocked:", origin);
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
