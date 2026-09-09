// Security gateway that sits in front of the (immutable) player origin.
// Nothing here touches the player itself — it only decides whether a request
// is allowed to reach it.

const ALLOWED_HOSTS = new Set([
  "pwnexus.vercel.app",
  "www.pwnexus.vercel.app",
  "pwnexus-player.vercel.app",
  "localhost",
  "127.0.0.1",
]);

// Our own deployments (preview + published + custom domains added later).
function isSelfHost(host: string, selfHost: string): boolean {
  if (host === selfHost) return true;
  return host.endsWith(".lovable.app") || host.endsWith(".lovableproject.com");
}

function isAllowedHost(host: string, selfHost: string): boolean {
  const bare = host.replace(/:\d+$/, "");
  return ALLOWED_HOSTS.has(bare) || isSelfHost(bare, selfHost.replace(/:\d+$/, ""));
}

export type GatewayVerdict = { allowed: true } | { allowed: false; reason: string };

export function evaluateRequest(request: Request): GatewayVerdict {
  const selfHost = new URL(request.url).host;
  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const fetchDest = request.headers.get("sec-fetch-dest");

  // 1. Cross-origin embedding (someone iframing / mirroring our player).
  if (fetchSite === "cross-site" && !refererAllowed(referer, selfHost)) {
    return { allowed: false, reason: `cross-site ${fetchDest ?? "request"}` };
  }

  // 2. An explicit Origin/Referer from a domain we do not recognise.
  for (const candidate of [origin, referer]) {
    if (!candidate) continue;
    const host = safeHost(candidate);
    if (host && !isAllowedHost(host, selfHost)) {
      return { allowed: false, reason: `unauthorized origin ${host}` };
    }
  }

  return { allowed: true };
}

function refererAllowed(referer: string | null, selfHost: string): boolean {
  const host = referer ? safeHost(referer) : null;
  return host ? isAllowedHost(host, selfHost) : false;
}

function safeHost(value: string): string | null {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}
