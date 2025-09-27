export function logEvent(message: string, context?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[H53] ${message}`, context ?? {});
  }
}
