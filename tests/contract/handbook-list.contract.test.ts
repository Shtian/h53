import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./setup";

const endpoint = "http://localhost:3000/api/handbook";

describe("GET /handbook", () => {
  it("returns published handbook articles with summaries", async () => {
    server.use(
      http.get(endpoint, () =>
        HttpResponse.json([
          {
            slug: "arrival-guide",
            title: "Arrival Guide",
            summary: "Checklist for reaching H53.",
            publishedAt: "2024-06-01T12:00:00.000Z",
            tags: ["checklist"],
            content: "# Arrival Guide"
          }
        ])
      )
    );

    expect.unreachable(
      "Implement GET /handbook handler to satisfy contract expectations"
    );
  });
});
