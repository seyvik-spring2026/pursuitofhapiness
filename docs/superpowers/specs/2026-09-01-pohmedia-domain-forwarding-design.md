# POH Media Domain Forwarding Design

## Goal

Send visitors who enter `pohmedia.co` or `www.pohmedia.co` to the existing portfolio at `https://www.seyvikmagon.com`.

## Current state

- `pohmedia.co` uses Squarespace nameservers.
- The apex domain currently resolves to Squarespace addresses.
- `www.pohmedia.co` currently points to Squarespace.
- The portfolio remains hosted on Vercel under `www.seyvikmagon.com`.

## Approved approach

Configure Squarespace domain forwarding rather than moving `pohmedia.co` to Vercel.

- Forward the root subdomain (`@`) to `www.seyvikmagon.com`.
- Also forward the `www` subdomain to `www.seyvikmagon.com`.
- Use a permanent `301` redirect.
- Remove incoming paths so every `pohmedia.co` URL lands on the portfolio homepage.
- Do not mask the destination URL; the browser should display `www.seyvikmagon.com` after forwarding.

## Safety and rollback

- No portfolio source code or Vercel settings need to change.
- Squarespace may replace its default website DNS records when forwarding is enabled.
- The forwarding rule can be removed from the Squarespace domain settings to roll back.
- Existing email-related DNS records, if any, must remain untouched.

## Verification

After Squarespace reports the rule saved:

- Confirm `http://pohmedia.co` redirects to `https://www.seyvikmagon.com/`.
- Confirm `https://pohmedia.co` redirects to `https://www.seyvikmagon.com/`.
- Confirm `http://www.pohmedia.co` redirects to `https://www.seyvikmagon.com/`.
- Confirm `https://www.pohmedia.co` redirects to `https://www.seyvikmagon.com/`.
- Confirm a sample path such as `/test` also lands on the portfolio homepage.
- Allow up to 48 hours for DNS and forwarding changes to propagate.
