import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src",
  "config",
  "clients.json"
);

let cache = null;

export function loadClientConfig(clientId) {
  if (!cache) {
    cache = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  return cache[clientId];
}
