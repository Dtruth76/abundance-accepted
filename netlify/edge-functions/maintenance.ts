import type { Config } from "@netlify/edge-functions";

// Maintenance mode is ON while this file is deployed.
// To turn it off without deleting this file, set the environment variable
// MAINTENANCE_MODE to "off" (or "false") in the Netlify UI and redeploy.
const isEnabled = () => {
  const value = (Netlify.env.get("MAINTENANCE_MODE") ?? "on").trim().toLowerCase();
  return !["off", "false", "0", "no"].includes(value);
};

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#1d3d31" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <title>Abundance Accepted | Back Soon</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; margin: 0; }
      body {
        min-height: 100vh; display: grid; place-items: center; padding: 2rem;
        background: #1d3d31; color: #f5f1e8; font-family: Inter, system-ui, sans-serif; text-align: center;
      }
      main { max-width: 32rem; }
      img { width: 72px; height: 72px; border-radius: 50%; margin-bottom: 1.5rem; }
      p.eyebrow { text-transform: uppercase; letter-spacing: .2em; font-size: .75rem; opacity: .7; margin-bottom: .75rem; }
      h1 { font-family: Fraunces, Georgia, serif; font-weight: 600; font-size: clamp(2rem, 6vw, 3rem); line-height: 1.1; margin-bottom: 1rem; }
      p.lead { font-size: 1.05rem; line-height: 1.6; opacity: .85; }
    </style>
  </head>
  <body>
    <main>
      <img src="/logo.png" alt="Abundance Accepted" />
      <p class="eyebrow">Scheduled maintenance</p>
      <h1>We'll be back soon</h1>
      <p class="lead">Abundance Accepted is getting a little tune-up. Thanks for your patience &mdash; please check back shortly.</p>
    </main>
  </body>
</html>`;

export default async () => {
  if (!isEnabled()) return;

  return new Response(page, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "3600",
    },
  });
};

export const config: Config = {
  path: "/*",
  // Keep functions (Stripe, newsletter, chat) and assets used by the maintenance page working.
  excludedPath: ["/.netlify/*", "/logo.png", "/favicon.ico"],
};
