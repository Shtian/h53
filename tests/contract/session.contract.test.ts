import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./setup";

const endpoint = "http://localhost:3000/api/session";

describe("GET /session", () => {
  it("returns authenticated family member profile with role metadata", async () => {
    server.use(
      http.get(endpoint, () =>
        HttpResponse.json({
          id: "00000000-0000-0000-0000-000000000000",
          email: "test@example.com",
          fullName: "Test User",
          role: "viewer"
        })
      )
    );

    expect.unreachable(
      "Implement GET /session handler to satisfy contract expectations"
    );
  });
});
