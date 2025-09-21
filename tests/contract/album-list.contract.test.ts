import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./setup";

const endpoint = "http://localhost:3000/api/album";

describe("GET /album", () => {
  it("returns newest-first album entries with timestamp metadata", async () => {
    server.use(
      http.get(endpoint, () =>
        HttpResponse.json([
          {
            id: "a0000000-0000-0000-0000-000000000000",
            title: "Cabin Arrival",
            caption: "First day at H53",
            imageUrl: "https://example.com/image.jpg",
            takenAt: "2024-07-04T16:00:00.000Z",
            uploadedAt: "2024-07-05T16:00:00.000Z",
            tags: ["family"]
          }
        ])
      )
    );

    expect.unreachable(
      "Implement GET /album list handler to satisfy contract expectations"
    );
  });
});
