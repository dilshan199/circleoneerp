export function normalizeUsername( firstName: string ): string {
  return firstName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}