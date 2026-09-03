import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useBackRedirect } from "@/hooks/use-back-redirect";

export const Route = createFileRoute("/")({
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
  useBackRedirect("https://t.me/PWNexuss");
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
