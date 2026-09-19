export function plainText(content) {
  if (typeof content === "string") return content;
  return (content || [])
    .map((block) =>
      block._type === "code"
        ? block.code || ""
        : (block.children || []).map((child) => child.text || "").join(""),
    )
    .join(" ");
}
export function readingMinutes(content) {
  return Math.max(
    1,
    Math.ceil(plainText(content).split(/\s+/).filter(Boolean).length / 220),
  );
}
export function formatDate(date) {
  if (!date || Number.isNaN(new Date(date).getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
export function safeUrl(url) {
  return typeof url === "string" &&
    /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(url)
    ? url
    : undefined;
}
