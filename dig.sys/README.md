# Digital Sissy — Design Assets

Static design preview for the **Digital Sissy** TTRPG: rulebook cover, lore + resources landing, GM screen, handout cards, session zero / safety sheet, and brand identity sheet — all on a single design canvas.

## View

Just open `index.html`. No build step. Loads React + Babel from CDN.

## Hosting on GitHub Pages

This site is static and uses only relative paths, so it works as-is.

1. Push the repo to GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (or whichever branch holds this), folder: `/ (root)`.
5. Save. First deploy takes ~30 seconds.

The `.nojekyll` file at the project root tells Pages to skip Jekyll processing, so files with leading underscores (and any future build artifacts) are served untouched.

## Structure

```
index.html                          entry point
design-canvas.jsx                   canvas (pan/zoom, reorder, focus)
tweaks-panel.jsx                    Tweaks UI
image-slot.js                       drag-and-drop image slot web component
art/
  tokens.css                        design tokens — onyx + alice-blue themes
  canvas-app.jsx                    wires Tweaks + canvas + artboards
  logo.jsx                          brand sheet
  cover.jsx                         rulebook cover
  landing.jsx                       lore + resources hub
  gm-screen.jsx                     three GM panels
  items.jsx                         handout cards
  session-zero.jsx                  safety sheet
  brand/
    logo.png                        dig.sys spray icon
    logo-word.png                   dig.sys wordmark (held)
  portraits/
    alex.png · becky.png · jaw-man.png
```

## Tweaks

The toolbar **Tweaks** toggle reveals controls: theme (Onyx / Alice), accent color, display weight. Choices persist via the host bridge.

## Status

`v0.4 · DRAFT`. Logo wired. Real portraits in place for Alex, Becky, Jaw-man. NPC personality + story-function copy pending. Handout art is placeholder, to be replaced with proper drawings.
