import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "pontos.json");

export function lerPontos() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function salvarPontos(pontos: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(pontos, null, 2));
}
