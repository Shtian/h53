import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/health",
    "/_next/image",
    "/_next/static(.*)",
    "/favicon.ico",
    "/robots.txt"
  ],
});

export const config = {
  matcher: ["/(.*)?"],
};
