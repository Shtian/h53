import { AuthConfig } from "convex/server";

export const authConfig: AuthConfig = {
  providers: [
    {
      domain: "clerk",
      applicationID: "convex"
    }
  ]
};
