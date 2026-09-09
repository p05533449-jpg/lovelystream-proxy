export function renderAccessDeniedPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Access Declined</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0;
        background: #050506;
        color: #f5f5f5;
        font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        display: grid;
        place-items: center;
        padding: 24px;
        text-align: center;
      }
      .card {
        max-width: 30rem;
        width: 100%;
        border: 1px solid rgba(239, 68, 68, 0.35);
        border-radius: 14px;
        background: radial-gradient(120% 120% at 50% 0%, rgba(239,68,68,0.12), rgba(5,5,6,0.9));
        padding: 40px 28px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.72rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #fca5a5;
        border: 1px solid rgba(239, 68, 68, 0.4);
        border-radius: 999px;
        padding: 6px 12px;
        margin-bottom: 22px;
      }
      .dot { width: 7px; height: 7px; border-radius: 50%; background: #ef4444; }
      h1 {
        margin: 0 0 10px;
        font-size: clamp(1.8rem, 6vw, 2.4rem);
        letter-spacing: 0.06em;
        color: #ef4444;
        text-transform: uppercase;
      }
      h2 { margin: 0 0 18px; font-size: 1.05rem; font-weight: 600; color: #f87171; }
      p { margin: 0 0 8px; color: #d4d4d8; }
      .url { margin-top: 18px; font-weight: 600; letter-spacing: 0.04em; color: #fafafa; user-select: all; }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="badge"><span class="dot"></span>Security check failed</span>
      <h1>Access Declined</h1>
      <h2>Unauthorized Access</h2>
      <p>Please use our official PW Nexus website.</p>
      <p class="url">pwnexus.vercel.app</p>
    </div>
  </body>
</html>`;
}
