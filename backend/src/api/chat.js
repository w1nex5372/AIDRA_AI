import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { askGPT } from "../services/openai.js";
import { loadPrompt } from "../utils/loadPrompt.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const businessPath = path.join(__dirname, "../businesses/aidra.json");
const business = fs.readFileSync(businessPath, "utf-8");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const systemPrompt = loadPrompt("premium_aidra");


    const reply = await askGPT(
      systemPrompt,
      business,
      message
    );

    res.json({ reply });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
