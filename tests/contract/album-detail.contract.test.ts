import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./setup";

const endpoint = "http://localhost:3000/api/album/album-id";

describe("GET /album/{id}", () => {
  it("returns album entry with UploadThing asset data", async () => {
    server.use(
      http.get(endpoint, () =>
        HttpResponse.json({
          id: "album-id",
          title: "Cabin Arrival",
          caption: "Family photo",
          imageUrl: "https://example.com/image.jpg",
          takenAt: "2024-07-04T16:00:00.000Z",
          uploadedAt: "2024-07-05T16:00:00.000Z",
          tags: ["family"],
          visibility: "family"
        })
      )
    );

    expect.unreachable(
      "Implement GET /album/{id} handler to satisfy contract expectations"
    );
  });
});
