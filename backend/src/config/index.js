export const config = {
  openai: {
    model: "o-4-mini",
    temperature: 0.6
  },
  server: {
    port: process.env.PORT || 3001
  }
};
