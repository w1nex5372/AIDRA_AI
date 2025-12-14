import OpenAI from "openai";
import { config } from "../config/index.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askGPT(systemPrompt, businessContext, userMessage) {
  const completion = await client.chat.completions.create({
    model: config.openai.model,       // pvz: "o-4-mini"
    temperature: config.openai.temperature,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "system",
        content: `VERSLO KONTEKSTAS:\n${businessContext}`
      },
      { role: "user", content: userMessage }
    ]
  });

  return completion.choices[0].message.content;
}
