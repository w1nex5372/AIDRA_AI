import fs from "fs";
import path from "path";

export function loadBusiness(slug) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "businesses",
    `${slug}.json`
  );

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
