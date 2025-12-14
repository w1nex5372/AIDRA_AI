export const config = {
  openai: {
    model: "gpt-4o-mini",
    temperature: 0.6
  },
  server: {
    port: process.env.PORT || 3001
  }
};
