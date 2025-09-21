import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./setup";

const endpoint = "http://localhost:3000/api/handbook/arrival-guide";

describe("GET /handbook/{slug}", () => {
  it("returns article markdown content and metadata", async () => {
    server.use(
      http.get(endpoint, () =>
        HttpResponse.json({
          slug: "arrival-guide",
          title: "Arrival Guide",
          summary: "Checklist for reaching H53.",
          publishedAt: "2024-06-01T12:00:00.000Z",
          tags: ["checklist"],
          content: "# Arrival Guide"
        })
      )
    );

    expect.unreachable(
      "Implement GET /handbook/{slug} handler to satisfy contract expectations"
    );
  });
});
