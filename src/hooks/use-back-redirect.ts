import { useEffect } from "react";

/**
 * Frontend-only guard: when the user presses the browser Back button on the
 * player page, immediately redirect them to the given URL (Telegram channel).
 *
 * How it works: on mount we push one sentinel history entry on top of the
 * player page. Pressing Back pops that sentinel (the player page itself stays
 * in history), we detect it via popstate and hard-redirect with
 * location.replace, which swaps the sentinel entry for the target URL.
 *
 * No backend/proxy behavior is touched.
 */
export function useBackRedirect(redirectUrl: string) {
  useEffect(() => {
    // Only add the sentinel once per page load.
    const current = window.history.state as { __backRedirectSentinel?: boolean } | null;
    if (!current?.__backRedirectSentinel) {
      window.history.pushState({ __backRedirectSentinel: true }, "");
    }

    const onPopState = () => {
      window.location.replace(redirectUrl);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [redirectUrl]);
}
