export function generateSquadHash() {
  return Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join("");
}
