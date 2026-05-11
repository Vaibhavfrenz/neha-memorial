# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

A static memorial website for Neha Tomar, deployed to GitHub Pages at `https://vaibhavfrenz.github.io/neha-memorial`. It uses Firebase Firestore for all real-time data — no build step, no bundler, no framework.

## Running Locally

Open `index.html` directly in a browser, or use `local-dev.html` which is a variant set up for local development (no `<base href>` issues). There is no dev server or build process.

## Firebase Architecture

- **`firebase-config.js`** — initializes the Firebase app and exposes `window.db` (Firestore instance). Loaded before `script.js`.
- **`script.js`** — all client-side logic. Waits 1 second after `DOMContentLoaded` for `window.db` to be available before calling feature init functions.
- **Firestore collections**: `candles`, `photos`, `memories`, `visitors`
- **Photos** are stored as base64 strings directly in Firestore documents (no Firebase Storage), capped at ~2MB per photo with client-side compression to stay within Firestore's 1MB document limit.
- **Visitor tracking** uses `ipapi.co/json/` to resolve IP geolocation, then writes to the `visitors` collection.

## Admin Scripts (`admin/`)

Node.js scripts using the Firebase Admin SDK (`firebase-admin` package). All require:
```
ADMIN_SECRET=applemango node admin/<script>.js
```

Available scripts:
- `clear-visitors.js` — interactive CLI to delete all visitor records
- `clear-visitors-cli.js` — non-interactive version
- `clear-candles.js` — browser console script (uses `window.db`)
- `clear-test-data.js` — removes test candles/data
- `delete-after-timestamp.js` — prune records after a given timestamp
- `visitor-analytics.js` — read-only analytics report
- `admin-server.js` — local HTTP server (port 3001) with password `applemango` that runs the above scripts via REST; for local use only, never expose publicly

The `admin/neha-memorial-website-1f540-firebase-adminsdk-fbsvc-12de9073a0.json` file is the service account key — do not commit changes to it or expose it.

## Key Constraints

- The `<base href="/neha-memorial/">` in `index.html` makes all relative URLs work on GitHub Pages. Remove or adjust this when testing locally (use `local-dev.html` instead).
- Firestore offline persistence is enabled; multi-tab conflicts are handled silently.
- Duplicate candle submissions are prevented with a session flag in `script.js`.
- Image uploads are compressed client-side before storing as base64 to avoid the 1MB Firestore document size limit.
