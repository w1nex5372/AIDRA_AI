import express from "express";
import { askGPT } from "../services/openai.js";
import { loadPrompt } from "../utils/loadPrompt.js";
import { loadBusiness } from "../utils/loadBusiness.js";
import { loadClientConfig } from "../utils/loadClientConfig.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, clientId } = req.body;

    if (!message || !clientId) {
      return res.status(400).json({ error: "Missing message or clientId" });
    }

    // 1️⃣ Client config (viena tiesa)
    const client = loadClientConfig(clientId);
    if (!client) {
      return res.status(404).json({ error: "Unknown clientId" });
    }

    // 2️⃣ Prompt pagal planą / versiją
    const systemPrompt = loadPrompt(client.prompt);

    // 3️⃣ Business kontekstas
    const business = loadBusiness(client.business);

    // 4️⃣ GPT
    const reply = await askGPT(
      systemPrompt,
      JSON.stringify(business),
      message
    );

    res.json({ reply });

  } catch (err) {
    console.error("CHAT ERROR:", err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
