import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadPrompt(name) {
  const filePath = path.join(__dirname, "../prompts", `${name}.txt`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Prompt not found: ${name}`);
  }

  return fs.readFileSync(filePath, "utf-8");
}
