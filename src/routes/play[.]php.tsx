import { createFileRoute, redirect } from "@tanstack/react-router";

// Visiting /play.php?... on this domain routes into the proxy,
// preserving the full query string so the player receives its config.
export const Route = createFileRoute("/play.php")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/api/proxy/play.php${location.searchStr ?? ""}${location.hash ?? ""}`,
    });
  },
});
