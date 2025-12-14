import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./api/chat.js";

const app = express();

/**
 * LEIDŽIAMI ORIGINAI
 * Framer naudoja dinaminius subdomenus – todėl regex
 */
const allowedOrigins = [
  "https://aidra.framer.ai",
  "https://framer.com",
  /\.framer\.ai$/,
  /\.framercanvas\.com$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // leidžiam server-side (Render healthcheck, curl, Postman)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        console.error("❌ CORS blocked:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
