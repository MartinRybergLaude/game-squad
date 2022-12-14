export function generateSquadHash() {
  return Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join("");
}

export function generateInviteCode() {
  return Array.from(Array(12), () => Math.floor(Math.random() * 36).toString(36)).join("");
}
