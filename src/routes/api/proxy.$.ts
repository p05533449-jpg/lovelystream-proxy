import { createFileRoute } from "@tanstack/react-router";

import { handleProxy } from "@/lib/player-proxy";

export const Route = createFileRoute("/api/proxy/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => handleProxy(request, params._splat ?? ""),
      POST: async ({ request, params }) => handleProxy(request, params._splat ?? ""),
      HEAD: async ({ request, params }) => handleProxy(request, params._splat ?? ""),
    },
  },
});
