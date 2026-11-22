# An Atlas of Moving Worlds — playable prototype

Open **prototype.html** directly in a modern browser. It is a self-contained, offline page. The published `index.html` remains the original game.

The prototype implements the approved ivory/cobalt/vermilion opening, dark seasonal navigation map, celadon commodity collection, aubergine event reports and light printable audit. It uses the original routes, prices, vessels, season calendar, hazards, state transitions and audit calculations. The month strip previews departures through the existing forecast function. It does not sail or advance time. Commodity plates show actual inventory weight; no synthetic history charts are added.

The refined navigation composition puts sailing and waiting directly below the map. Detailed departure comparisons live in an expandable panel that opens when a future month is selected. A masked spectral tracer field follows the actual departure wind even while another month is being compared. The gradients are atmospheric illustration; stroke hue and animation do not represent measured wind speed or historical weather. The selected route and its legend share a stable pink treatment across seasons.

The market leads the trading column, followed by material-study cargo plates and a weight-based hold manifest. First occurrences of adverse event types receive inline reports built from the exact voyage-log text. Dismissal and repeat rendering do not alter the simulation or draw randomness. The audit brings prediction and reflection ahead of the financial evidence and retains the full dated ledger.

The illustrations are original schematic SVGs. Their captions distinguish them from historical objects. The source dialog links to the repository's existing starting references; it is not a completed historical evidence audit. Read the original README for known model limitations, including deadline overruns and freight aggregation.

Integration base: upstream `b607af9` on 2026-11-22. This retains PR #1's corrected month-clock drawing and hand, whole-word hypothesis matching, minimum profit-target validation and model explanations. `index.html` is unchanged by this feature. The repository's existing transit harness and pinned 480-row snapshot are checked against both the original page and the prototype; no baseline is regenerated.

## Development

Requires Node.js; no package installation or remote build service.

```sh
node scripts/build-prototype.mjs
node --test tests/prototype-engine.test.mjs
```

Edit `prototype/atlas.css` and `prototype/atlas.js`, then rebuild. Do not edit the generated `prototype.html` by hand. The builder copies the original inline engine script verbatim and embeds the local style and display adapter. This avoids maintaining a second simulation implementation. When index.html changes, rebuild and rerun regression checks before pushing.

The prototype bundles Archivo variable for expanded editorial headings, Atkinson Hyperlegible for body text and controls, and IBM Plex Mono for measurements, calendar labels and metadata. All five font files are embedded in the standalone HTML, with their full SIL Open Font Licences preserved there and in `prototype/fonts/`. Headline width and size adapt on small screens. There are no required external script or font requests; PDF export uses the original browser-print fallback. Choose Print → Save as PDF in your browser. Historical links and the original vessel photograph references require an internet connection, but are not needed to play.

## Review

Check setup and vessel keyboard selection; each seasonal palette; actual versus comparison month; buy, sell, wait and sail; first adverse-event report and dismissal; settlement/reflection; dark reading theme; 375px layout; reduced motion; and multi-page printing. Original game mechanics are deliberately preserved, including known limitations. No CI workflow is added.

The Node suite exercises both ships and all difficulties against the unchanged engine, including adverse events and random draw counts, actual versus preview wind direction, event dismissal and repeated events, loaded-weight reconciliation, last-month behavior and print fallback. It uses a minimal DOM double and does not establish browser layout, font rendering, contrast or PDF pagination compliance. Automated browser review remains pending because the available browser security policy blocks local-file navigation.

Original game: Amnuayvit Thitibordin (KVIS), CC BY-NC-SA 4.0. The adapted prototype and its new visual material are distributed under the same terms. Referenced photographs remain at their sources and retain their credited Creative Commons licences.

## Rebuilt on main for the KVIS deployment (2026-11-22)

Branch `fix/atlas-on-main` merges game `main` (`ba2f279`: Play Only / Student Mode, reflection gate, licence header) into `ff74d45` and fixes what a browser review of the rebuilt page found:

- Vessel drawings no longer cover the vessel card text (the SVGs now fill their fixed-height boxes).
- At 375 px the market fits the screen: trade buttons sit on their own row under each good. The header no longer sticks, and the audit export button wraps.
- The desktop market table no longer clips its last column.
- Labels are only pointed at fields that have an `id`, so the game-mode radios keep their labels.
- In Play Only, setup and audit text no longer mention a target or prediction.
- The first event report takes keyboard focus. Amber and pink market text now reaches 4.5:1. The actual month in the planner is no longer dimmed.
- The page says that export opens the browser's print dialog, because the offline page has no direct PDF download.
- The builder writes every breakpoint rule after the base rules (`grid-cols-1 sm:grid-cols-2` had collapsed), and removes the Google Fonts `@import` whole.

`tests/prototype-engine.test.mjs`: test 3 now selects Student Mode first; the ungated export test is replaced by one that pins the gate; there are new tests for the Play Only default, utility order and Play Only audit wording. 17/17 pass.

### Resolutions recommended by the collaborator (2026-11-22)

- **Links:** the header's "Original game" link becomes "Classic version". It points to `classic.html` where this page is deployed as `index.html`, and to `index.html` here. A separate "Original source" link goes to this repository.
- **Credit:** the footer credits the original game (Amnuayvit Thitibordin, KVIS; CC BY-NC-SA 4.0 with the Commercial Derivative Exception) and the Atlas adaptation (art direction by Thanakrit Wongsatit, with AI assistance; CC BY-NC-SA 4.0, without the exception). The game's own credit line is kept.
- **Drawings:** vessel cards read "Original schematic illustration; reference photograph: …". The photograph is linked separately; the drawings are not presented as adaptations of it.
- **PDF:** one action, "Print / Save as PDF". The duplicate export button is hidden, because both open the same print dialog on this offline page. This is a deliberate change from the original game's direct PDF download.

The licence and credit wording still awaits the copyright holder's confirmation.

### Review follow-ups (2026-11-22)

- The Sources dialog's "model description" link points to this repository's README at `ba2f279`. A relative `README.md` link missed on the KVIS site.
- In Play Only, the intro steps read "Navigate & trade / Results" and the audit eyebrow "Results / voyage evidence". The engine's "(Goal: +1200 D)" on the return line is inherited and unchanged.
- The market region's label no longer tells readers to scroll sideways. The page no longer calls itself a prototype.
- The builder drops the unused `.harbor-art` CSS, so the page references no image file.
- At 200 % text the toolbar, market header and audit rows wrap. Before this, the page widened to 541 px at 375 px (the original page's audit reaches 749 px at the same setting).
