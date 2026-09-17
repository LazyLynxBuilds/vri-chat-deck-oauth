const http = require('http');

const port = Number(process.env.PORT || 10000);

const oauthPage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="referrer" content="no-referrer" />
  <title>VRI Chat Deck - Returning to app</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0b0a10; color: #f4f1fa; font-family: system-ui, -apple-system, Segoe UI, sans-serif; }
    .card { width: min(92vw, 560px); padding: 28px; border: 1px solid #302b3a; border-radius: 20px; background: #15121c; text-align: center; }
    .vri { color: #65e7ef; font-weight: 900; letter-spacing: .35em; font-size: 14px; }
    h1 { margin: 8px 0 10px; font-size: 28px; }
    p { color: #aaa2b7; line-height: 1.5; }
    a { display: inline-block; margin-top: 16px; padding: 14px 18px; border-radius: 12px; background: #7b39d8; color: white; font-weight: 800; text-decoration: none; }
    small { display: block; margin-top: 18px; color: #756d82; }
  </style>
</head>
<body>
  <main class="card">
    <div class="vri">VRI</div>
    <h1>Returning to Chat Deck…</h1>
    <p>Twitch authorization is complete. Chat Deck should reopen automatically.</p>
    <a id="returnButton" href="vri-chat-deck://oauth">OPEN CHAT DECK</a>
    <small>If the app does not open automatically, tap the button.</small>
  </main>
  <script>
    (function () {
      // Twitch's implicit-flow access token is in location.hash. URL fragments are
      // never sent to this server. This page only forwards the browser result into
      // the installed VRI Chat Deck app through its registered custom URI scheme.
      var target = 'vri-chat-deck://oauth' + window.location.search + window.location.hash;
      var button = document.getElementById('returnButton');
      button.href = target;
      setTimeout(function () {
        window.location.replace(target);
      }, 150);
    }());
  </script>
</body>
</html>`;

const homePage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VRI Chat Deck OAuth</title></head>
<body style="font-family:system-ui;background:#0b0a10;color:#f4f1fa;padding:40px">
<h1>VRI Chat Deck OAuth Bridge</h1><p>This service is running. Twitch should use <code>/oauth</code> as the callback path.</p>
</body></html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  };

  if (url.pathname === '/oauth' || url.pathname === '/oauth/') {
    res.writeHead(200, headers);
    res.end(oauthPage);
    return;
  }

  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end('ok');
    return;
  }

  if (url.pathname === '/') {
    res.writeHead(200, headers);
    res.end(homePage);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`VRI Chat Deck OAuth bridge listening on port ${port}`);
});
