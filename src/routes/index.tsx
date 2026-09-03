import { createFileRoute, useLocation } from "@tanstack/react-router";

import { handleProxy } from "@/lib/player-proxy";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      // Same fast path as /play.php: the player document is streamed straight
      // back on the first request, with the query string untouched.
      GET: async ({ request }) => handleProxy(request, "play.php"),
    },
  },
  head: () => ({
    meta: [
      { title: "Player — Stream" },
      {
        name: "description",
        content:
          "Watch your content through a fast, secure player proxy with a clean full-screen experience.",
      },
      { property: "og:title", content: "Player — Stream" },
      {
        property: "og:description",
        content:
          "Watch your content through a fast, secure player proxy with a clean full-screen experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const location = useLocation();
  // Forward the full query string so the player always receives its config.
  const playerSrc = `/api/proxy/play.php${location.searchStr ?? ""}`;

  return (
    <main className="flex h-dvh w-full flex-col bg-background">
      <iframe
        src={playerSrc}
        title="Player"
        className="h-full w-full flex-1 border-0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </main>
  );
}
