import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useBackRedirect } from "@/hooks/use-back-redirect";

export const Route = createFileRoute("/play.php")({
  head: () => ({
    meta: [
      { title: "Player — Stream" },
      { name: "description", content: "Watch your lecture in the full-screen player." },
      { property: "og:title", content: "Player — Stream" },
      { property: "og:description", content: "Watch your lecture in the full-screen player." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PlayerProxy,
});

function PlayerProxy() {
  const location = useLocation();
  useBackRedirect("https://t.me/PWNexuss");
  const playerSrc = `/api/proxy/play.php${location.searchStr ?? ""}`;

  return (
    <main className="flex h-dvh w-full bg-background">
      <iframe
        src={playerSrc}
        title="Player"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </main>
  );
}
