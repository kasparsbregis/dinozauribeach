import { readFile } from "node:fs/promises";
import path from "node:path";

export const contentType = "image/webp";
export const size = { width: 320, height: 320 };

export default async function AppleIcon() {
  const buffer = await readFile(
    path.join(process.cwd(), "public", "dinozauri.webp"),
  );

  return new Response(buffer, {
    headers: { "Content-Type": "image/webp" },
  });
}
