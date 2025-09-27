import { ConvexHttpClient } from "convex/browser";

let client: ConvexHttpClient<any> | null = null;

export function getConvexClient(): ConvexHttpClient<any> {
  if (!client) {
    const deployment =
      process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_DEPLOYMENT ?? "";
    const url = deployment.startsWith("http")
      ? deployment
      : deployment
      ? `https://${deployment}.convex.cloud`
      : "http://localhost:3210";
    client = new ConvexHttpClient(url);
    const token = process.env.CONVEX_AUTH_TOKEN;
    if (token) {
      client.setAuth(token);
    }
  }
  return client;
}
