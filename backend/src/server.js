import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import chatRoute from "./api/chat.js";

const app = express();

/**
 * 🔒 CORS – FRAMER + WIDGET SAFE
 * leidžiam iframe, widget.js, widget-ui.html
 */
app.use(
  cors({
    origin: (origin, callback) => {
      // leidžiam server-side, render healthcheck, curl, postman
      if (!origin) return callback(null, true);

      if (
        origin.includes("framer.ai") ||
        origin.includes("framer.com") ||
        origin.includes("framercanvas.com") ||
        origin.includes("onrender.com")
      ) {
        return callback(null, true);
      }

      console.warn("❌ CORS blocked:", origin);
      return callback(null, false); // ❗ NE error, kad iframe nelūžtų
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/**
 * 🔥 STATINIAI FAILAI (WIDGET)
 * TAVO atveju public yra backend/public
 */
app.use(
  express.static(
    path.join(process.cwd(), "backend", "public")
  )
);

app.get("/", (_, res) => {
  res.send("AIDRA AI backend is running 🚀");
});

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
