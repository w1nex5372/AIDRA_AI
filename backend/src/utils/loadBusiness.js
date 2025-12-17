import fs from "fs";
import path from "path";

export function loadBusiness(slug) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "businesses",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Business not found: ${slug}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
