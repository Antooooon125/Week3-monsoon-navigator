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
