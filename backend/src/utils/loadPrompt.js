import fs from "fs";
import path from "path";

export function loadPrompt(name) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "prompts",
    `${name}.txt`
  );

  return fs.readFileSync(filePath, "utf-8");
}
