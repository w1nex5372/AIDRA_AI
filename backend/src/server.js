import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./api/chat.js";

const app = express();

/**
 * LEIDŽIAMI ORIGINAI (TEISINGAI)
 */
const allowedOrigins = [
  /^https:\/\/.*\.framer\.ai$/,
  /^https:\/\/.*\.framercanvas\.com$/,
  /^https:\/\/framer\.com$/,
  /^https:\/\/.*\.onrender\.com$/, // jei testuosi iš kitur
];

app.use(
  cors({
    origin: (origin, callback) => {
      // leidžiam server-side, curl, postman
      if (!origin) return callback(null, true);

      const allowed = allowedOrigins.some((regex) =>
        regex.test(origin)
      );

      if (allowed) {
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
  console.log(`✅ Backend running on ${PORT}`);
});
