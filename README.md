# VRI Chat Deck OAuth Bridge

This tiny HTTPS service exists because Twitch's current Developer Console requires an HTTPS OAuth Redirect URL, while the installed mobile app needs a custom URI (`vri-chat-deck://oauth`) to reopen itself.

It stores no Twitch token and has no database. With Twitch's implicit flow, the access token arrives in the browser URL fragment (`#...`), and URL fragments are not transmitted in HTTP requests. The returned page forwards that fragment directly into the installed Chat Deck app.

## Render settings

Create a new Render **Web Service** from a repository containing this folder.

- Runtime: Node
- Build Command: leave blank or use `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

After deployment, your Twitch OAuth Redirect URL is:

`https://YOUR-RENDER-SERVICE.onrender.com/oauth`

Use that exact same URL in both the Twitch Developer Console and the VRI Chat Deck login setup field.
