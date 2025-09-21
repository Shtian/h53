import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./setup";

const endpoint = "http://localhost:3000/api/audit-logs";

describe("GET /audit-logs", () => {
  it("requires content_admin role and returns paginated log entries", async () => {
    server.use(
      http.get(endpoint, ({ request }) => {
        void request.headers.get("authorization");
        return HttpResponse.json([
          {
            id: "log-1",
            eventType: "login_success",
            occurredAt: "2024-07-04T16:00:00.000Z",
            actorId: "admin-user",
            payload: { source: "portal" }
          }
        ]);
      })
    );

    expect.unreachable(
      "Implement GET /audit-logs handler enforcing content_admin role"
    );
  });
});
