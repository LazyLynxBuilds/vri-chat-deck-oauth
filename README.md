# VRI Chat Deck — Free GitHub Pages OAuth Bridge

This replaces the Node/Render web service with a completely static callback page.

## Files

- `index.html` — simple landing page.
- `oauth/index.html` — Twitch OAuth callback. It forwards the returned query/hash to `vri-chat-deck://oauth` so the Android app can finish login.

## Publish with GitHub Pages

1. Create or open the GitHub repository you want to use for the callback, for example `vri-chat-deck-oauth`.
2. Upload **the contents of this folder** to the repository root. The repository should show `index.html`, `README.md`, and an `oauth` folder.
3. In the repository go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then click **Save**.
6. GitHub will publish the site. For a repository named `vri-chat-deck-oauth`, the callback will normally be:

   `https://YOUR-GITHUB-USERNAME.github.io/vri-chat-deck-oauth/oauth/`

7. Open that exact `/oauth/` URL in a browser to confirm the page appears.
8. Put that exact HTTPS URL into **OAuth Redirect URLs** in the Twitch Developer Console.
9. Put the exact same HTTPS URL into the VRI Chat Deck callback field in v0.2.

No Node server, database, Client Secret, or paid hosting is required.
