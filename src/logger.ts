const ts = () => new Date().toISOString();

export function shortId(id: string, head = 10, tail = 6): string {
  if (!id || id.length <= head + tail) return id;
  return `${id.slice(0, head)}…${id.slice(-tail)}`;
}

const icons = {
  info: "ℹ",
  ok: "✔",
  warn: "⚠",
  error: "✗",
  skip: "⏭",
  buy: "💰",
  sell: "📤",
  redeem: "💸",
  connect: "🔗",
  start: "▶",
  stop: "■",
  price: "📊",
} as const;

function format(icon: keyof typeof icons, msg: string, level: "log" | "warn" | "error" = "log"): void {
  const prefix = `${ts()} ${icons[icon] ?? "•"}`;
  const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  fn(`${prefix} ${msg}`);
}

export const logger = {
  info: (msg: string) => format("info", msg),
  ok: (msg: string) => format("ok", msg),
  warn: (msg: string) => format("warn", msg, "warn"),
  error: (msg: string, err?: unknown) => {
    format("error", msg, "error");
    if (err !== undefined) console.error(err);
  },
  skip: (msg: string) => format("skip", msg),
  buy: (msg: string) => format("buy", msg),
  sell: (msg: string) => format("sell", msg),
  redeem: (msg: string) => format("redeem", msg),
  connect: (msg: string) => format("connect", msg),
  start: (msg: string) => format("start", msg),
  stop: (msg: string) => format("stop", msg),
  price: (msg: string) => format("price", msg),
};
