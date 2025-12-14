import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askGPT(systemPrompt, businessContext, userMessage) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "system", content: `VERSLO KONTEKSTAS:\n${businessContext}` },
      { role: "user", content: userMessage }
    ],
  });

  return completion.choices[0].message.content;
}
