import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoute from "./api/chat.js";

const app = express();

/**
 * LEIDŽIAMI ORIGINAI
 * pridėk čia visus Framer variantus
 */
const allowedOrigins = [
  "https://aidra.framer.ai",
  "https://framer.com",
  /\.framercanvas\.com$/,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // leidžiam server-side / curl / postman
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((o) =>
        o instanceof RegExp ? o.test(origin) : o === origin
      );

      if (isAllowed) {
        callback(null, true);
      } else {
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
  console.log(`Backend running on http://localhost:${PORT}`);
});
