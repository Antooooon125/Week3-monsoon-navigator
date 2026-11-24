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

### Second re-review follow-ups (2026-11-22)

- The builder no longer pins `html{font-size:16px}`, so the reader's browser text-size setting is honoured, as in the original page. At 375 px with a 24 px or 32 px browser default, every page state still fits.
- The "Classic version" link is a plain `href="classic.html"`. In this repository there is no `classic.html` beside `prototype.html`; the link is for the KVIS deployment.
- The footer's Atlas credit is marked "(proposed, pending the copyright holder’s confirmation)".
- The packaging test now extracts every `href`, `src` and `url()` (quoted or not, and quoted JS assignments). Each must be absolute, an anchor, a `${…}` template, or `classic.html` / `index.html`. It fails on each of eight planted relative references.
- The event reports read only voyage log entries (those containing " | Events: "). Survival's charter line names "Cyclone & Piracy Crisis". It matched the cyclone pattern, opened the game with a false cyclone report, and suppressed the first real one. A seeded event-card check in the KVIS repository (`tests/03/atlas-events.test.mjs`) found this.

### Collaborator decisions and third review (2026-11-22)

- **Licence:** the collaborator chose CC BY-NC-SA 4.0 **with** the Commercial Derivative Exception for the Atlas material. The footer now says so, and also credits Guntitat Sawadwuthikul as collaborator. The credit wording is still marked pending the copyright holder's confirmation.
- **Drawings:** vessel cards and the Sources dialog call the drawings "schematic illustrations", without "original", until the copyright holder confirms.
- **Packaging test:** it also reads `setAttribute('href'|'src', …)`, template-literal assignments and CSS `@import`, and it fails on twelve plants. Values assembled at run time are not checked; the test title now says "static".

- **Copyright holder's approval (2026-11-22):** the credit wording is approved, so the footer no longer carries the "pending" label.

### More detailed vessel drawings (2026-11-22)

The dhow and junk SVGs in `prototype/atlas.js` are redrawn with more detail, from scratch and without tracing or viewing the reference photographs. They are still schematic illustrations, not reconstructions, and the card and Sources wording is unchanged.

- **Dhow:** stitched-plank hull with plank seams and a stitching line, raked stem head, raised stern deck with rail, side rudder; forward-raked main mast with a long lateen yard and a sail whose cloths run parallel to the leech, halyard, sheet and stays; a smaller mizzen lateen aft.
- **Junk:** flat transom bow with an oculus, wales, a stern deckhouse with windows and a gallery rail, a fenestrated rudder; three battened lug sails with fanned sheets, the foremast raked forward.

Both use only `currentColor` and `var(--surface)`, so the light, dark and print themes follow, and stay `aria-hidden` inside the same fixed-height boxes. The voyage ship card's label now reads "schematic illustration" instead of "schematic silhouette". No game state is touched; `tests/prototype-engine.test.mjs` 20/20.

### Live-page review, presentation fixes (2026-11-22)

These are display-only changes; the engine script is still copied verbatim.
- **A1:** the hold bar draws its fill against a visible track.
- **A2:** the map key reads "Game wind (one wind for the whole map)".
- **A3:** the price dialog is labelled "Game prices (not historical)", priced in dirhams per game lot.
- **A4:** the glossary's monsoon link points to National Geographic Education's "Monsoon" page, which covers the Indian Ocean monsoon; the sailing dialog gives full references for Chaudhuri (Cambridge University Press, 1985) and Abu-Lughod (Oxford University Press), with DOIs taken from Crossref.
- **A5:** keyboard focus stays on the trade button after buying or selling. After a sail or wait with no event report, focus goes to "Choose your next port".
- **A6:** on phones the map labels are about 14 px, the route label box and the in-map clock are hidden (the month planner shows the same information), and the header is shorter.
- **A7:** the Play Only audit shows no goal or target verdict.
- **A8:** a double click sails or waits only once.
- **A9:** a new voyage opens at the top of the page, and the audit opens at its top.
- **A10:** the selected route follows its curved sea lane, and the map is captioned "not to scale".
- **A11:** land is at least 3:1 against the sea in every season, and port labels have a halo.
- **A12:** the clock's season wedges are distinct and labelled NE and SW, and the comparison month is pink on the clock as in the month row.
- **A13:** the commodity colours use an Okabe–Ito-based palette (CIEDE2000 minimum 16.6 in normal vision), and the hold lists loaded cargo in text.
- **A14:** on narrow screens the market sits directly after "Sail or stay".
- **A16:** the chosen game mode is outlined, keyboard focus previews a route, difficulty focus differs from selection, the plain headings replace the jargon, the wind badge reads "blowing toward SW, 225°", there is a ▲/▼ legend, and the dark theme reaches the trade panels.
- **Engine text left as it is.** The adapter does not edit the engine's strings. The voyage log's "Struck by inter-monsoon cyclone (−N% hull)" stays "cyclone" on every leg; where the adapter shows that line (the event report), it adds the basin beside it, "(western Pacific: a typhoon)" or "(Indian Ocean cyclone)". The engine's own log panel, the wind badge's "(Cyclone/Doldrum Risk)" (one badge for the whole map, not a leg), the "Cyclone/Doldrum Dead Zone" hint, the "Cyclone & Piracy Crisis" difficulty and the ship cards keep "cyclone"; the glossary entry explains the two names.
- **A17:** "a composite period" in the header; "Investor loan … (a game rule)"; "Chinese ocean-going junk" on the ship card and in the audit vessel line; the navigator card drops the kamal claim; the sailing dialog drops "flex over coral reefs"; the Sources dialog says port stories are fictional scenes.
- The "Classic version" link is removed, because the KVIS site no longer has classic.html.
- **Review of KVIS #21:**
  - the selected route (now a path) is pink again;
  - the dark theme's hold legend and bar fills reach ≥ 3:1 (measured: legend 7.8 and 8.8, bulk bar 7.4, cargo fills ≥ 4.7);
  - the Play Only badge has one neutral style;
  - phone map labels are about 14 px;
  - the phone header keeps its subtitle and fits in about 29 % of the screen;
  - a blocked second click moves focus to "Choose your next port";
  - the clock is hidden on phones through a class.

### Fixes from live play (2026-11-23)

Display only; the engine script is unchanged.

- **Routes over water.** Every sea lane, dashed or selected, is drawn through fixed sea waypoints: around the Horn of Africa, south of India and Sri Lanka, and through the Strait of Malacca. Before, the quadratic arcs crossed land on the Kilwa–Aden and Calicut–Malacca lanes. The game's distances, bearings and sailing times are unchanged. Every lane was checked in both monsoons at 1440 and 375 px by sampling the drawn path against the map's land shapes: no point is on land.
- **Wind relation on the selected route.** The line style shows the leg's relation to this month's wind, in the engine's own terms (`computeTransit`): solid for tailwind, long dashes for crosswind, short dashes for headwind, dots for a transition month. The map key explains the styles. The route label reads, for example, "Tailwind · 285° · ~16 d (1 mo)".
- **Labelled prices.** The trade table says "Sell here" and "Buy here" for this port's prices, and "you paid … D each (average)" for the cost basis. The labels are computed from the same functions `sellCargoQty` and `buyCargoQty` use. A browser check at every port, in two months, bought and sold one lot of each good and found the cash moves equal to the labels in all 60 rows. The legend explains ▲ and ▼ against the port's usual price. On phones each good's name has its own line, and the prices and hold sit below it.
- **Next month's price direction.** Each good shows which way this port's buy and sell prices move next month (↑ rising, ↓ falling, – steady), computed from the engine's own `getLivePortPrice` for the next month and the tariff as `buyCargoQty` applies it. The game's prices are a fixed seasonal wave with no random term, and trades never move them, so the direction is exact. The ▲/▼ markers now carry the words "high" and "low", meaning more than 2 D from the port's usual price.
- **Price chart.** A good's name is a button that opens a dialog with its buy price for the 12 months of the current campaign year at all five ports. Each point is the engine's price for that port and month. Lines are labelled at their ends, the player's port is drawn thick, and there are markers for now and, if a route is selected, the arrival month at the destination. A table gives each port's current, highest and lowest price. The note says the cycle repeats yearly, is not random, and ignores the player's trades, and that the tariff depends on standing. Sell prices are the same curves without the tariff, so they are stated rather than drawn. The palette is the dataviz reference categorical palette, validated against both dialog surfaces; in light mode three slots are below 3:1, so the end labels and the table carry identity too. Escape or Close returns focus to the good's name.
- **Real coastlines.** The hand-drawn land shapes are replaced at build time with real coastlines:
  - **Source.** Natural Earth 1:50m Land, v5.1.2, public domain ([terms](https://www.naturalearthdata.com/about/terms-of-use/)), from `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_land.geojson`, SHA-256 `e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b`. The raw file is not committed.
  - **Conversion.** `scripts/coastline.mjs` makes the pinned `prototype/coastline.json` and refuses any other input file. It projects with an axis-wise linear least-squares fit to the five ports (x from longitude, y from latitude). The game's port positions are not moved: each real port position lands within 6.2 map units of the game's (Calicut 6.2, Quanzhou 4.8, Malacca 2.7, Kilwa 2.2, Aden 1.8). It then clips to the map plus a 12-unit margin, simplifies with Douglas–Peucker at 0.75 map units, and drops rings under 6 square units: 58 rings kept, 16.4 KB of path data.
  - **Effects on the map.** The sea-lane waypoints are re-placed for the real coast. The Bay of Bengal label moves down 8 units, the South China Sea label becomes three lines, and the wind clock moves into the open Indian Ocean.
  - **Checks.** `tests/sea-lanes.test.mjs` checks that every lane runs over water (at least 1.5 units from land outside 9 units of each port) and that the labels and the clock sit on water. It fails on a waypoint moved into Sri Lanka or onto the Horn of Africa, on the clock at its old position, and on a label placed on Vietnam.
- **One trade panel.** "A collection in transit" duplicated the market's hold line, so its unique parts move into "Trade at the waterfront" and the panel is hidden. The engine still writes into it each repaint, so it stays in the page.
  - **Moved into each row:** the drawn commodity icon (decorative, hidden from screen readers, above the name), the tonnes aboard ("4 t aboard"), and a coloured edge on rows with cargo.
  - **Moved under the hold line:** the per-good weight bar with its legend (tonnes per good), the tonnes available, and the note that this is game weight, not hull volume, and that the drawings are schematic.
  - **Replaced by text:** the engine's bulk/luxury bar becomes a line, "The game's freight split: bulk … t · spices & luxury … t (it counts pepper as luxury)", from `getBulkAndLuxuryTonnage`.
  - **Dropped as duplicates:** names, categories, weight per lot, lots held and the percentage loaded, all already in the trade panel.
  - **Phones:** each good stacks icon and name, then prices and hold, then the trade buttons.
- **Layout from live play.**
  - The "Follow the season." heading now opens the voyage screen across both columns. The status strip (month, treasury, hull, hold, the two guides) sits directly above the map it describes. The page tools (theme, sources, original source) join the strip during a voyage and return to the header on the setup and audit screens.
  - **Care for ship and crew under the map.** The repair and the navigator, marines and tarpaulins hires (and, on hard, the loan repayment) sit under the map as a row of cards, stacked on phones, so the left column lines up with the market. Each card is a flexible column (text, then its button), so longer per-passage contract text or a status line can be added later without a relayout. The hiring behaviour and wording are unchanged. (An earlier version of this change showed more map instead; the user chose this layout, and the map keeps the game's 800 × 450 frame.)
  - **Phones.** The three sea names collided with the enlarged port labels, so they are hidden there (the INDIAN OCEAN label stays). Quanzhou's labels are right-aligned so they are not clipped.
  - **Original game source.** The link to this repository moves from the toolbar to the footer, beside the credit line, as "Original game source". It has the same target, and appears once.
- **Review fixes (KVIS #30, 2026-11-23).**
  - **Price chart.** It has a full month-by-month table under the summary ("Every month at every port"), and the key gives the destination's buy price in the arrival month.
  - **Layout fixes.** The Close button no longer shrinks at 320–375 px. The plot is inset 10 units so January's "Now" marker clears the axis labels.
  - **Wording.** The coastline fit is described as axis-wise linear, which is what it is, rather than equirectangular.
  - **Price legend.** It notes that buy directions assume today's tariff, which drops a point if standing here reaches 50.

  This branch (`fix/atlas-display`) is cut from `381dbe9` so KVIS #30's build does not include the later risk-and-timing commits on `fix/atlas-on-main`.

### Risk and timing (2026-11-23)

Display only; the engine script is unchanged, and nothing here draws randomness or changes state.

- **Storms and pirates on the map.** After a voyage, a storm marker sits on the leg (30% of the way) if the engine's transition-month roll produced a cyclone, and a pirate flag near the destination if its piracy check fired.
  - **How it's decided.** The adapter wraps `sailTo`, records the random draws the engine makes, and reads them in `sailTo`'s fixed draw order. A turn-back is read from state. The marker never depends on the log.
  - **What it says.** A line under the map key (`role="status"`) names what happened, with the hull actually lost to the storm (and "hull at its minimum (5%)" when the engine's 5% floor applied, since its log then overstates the loss), and the pirates' outcome in the engine's own words from that voyage's log entry. The entry is found among the entries the voyage added, because `advanceTime` can log after it (interest at months 6, 12 and 18).
  - **Lifetime.** Markers stay through trading, hiring and repairs in port, and clear at the next wait or voyage.
  - **Route label.** While the selected route's label is shown, a sea name it would cover is hidden.
  - **Accessibility.** Under `prefers-reduced-motion` they appear without animation. They carry an icon and text, not colour alone.
- **Route label.** The selected route's label gains a second line: pirates on arrival (and with armed marines), and, when they apply, the turn-back chance (headwind) and the storm chance (transition month).
- **Crew-health alert.** While `getMutinyRisk(health)` is above zero, the status strip shows ⚠ with:
  - the current health;
  - the mutiny chance at that health, and the least it can be after the next voyage from this port (8 health per month at sea, 12 more in a headwind, as in `sailTo`);
  - what a mutiny costs, and that waiting restores up to 20 health.

  It is announced politely when it changes and clears when health recovers or the campaign ends.
- **Port timing view.** Selecting a port on the map (a keyboard-operable button) opens, for each destination, the 12 months of this campaign year.
  - **Per month:** wind relation, sailing time (days and months charged), turn-back chance, storm chance (which depends on the navigator), and the expected months including turn-back retries.
  - **Per destination:** pirates on arrival, with and without marines, and a note that marines don't change the turn-back or storm chance.
  - **Marked:** the current month, and the best month or months (shortest expected time).
  - **Phones:** each month is a stacked row.
  - **Focus:** a focused port keeps the page's shared focus ring, with a white ring on the port as well (the ring is no longer switched off, which the KVIS packaging test now refuses).
- **Cyclone or typhoon.** A storm is called a typhoon on a leg in the western Pacific and a cyclone in the Indian Ocean. The rule is one line in the adapter: a leg is Pacific if any point of its drawn route (ports or sea waypoints) lies east of Malacca, the port on the Strait of Malacca. Only Malacca–Quanzhou qualifies; Calicut–Malacca ends at the strait from the west. The name follows the basin on the map marker (`data-basin` and a tooltip), the line under the map key, the event report's title, the route label and the port timing view's column. The glossary gains a "Cyclone and typhoon" entry. Storm behaviour is unchanged.
- **Tests.** KVIS `tests/03/atlas-hazards.test.mjs` takes ground truth from the engine's tagged draws and its source constants. It checks markers, the alert, every number in the port view, and that opening the view draws nothing and changes nothing. It fails on seven planted defects.

### Season, time and consequence (2026-11-24)

Display only; the engine script is unchanged, and nothing here draws randomness or changes state. The aim is to connect direction, season, travel time and consequence.

- **Route sailing calendar.** Under the departure list, each destination from the current port gets its year in words, for the current ship and navigator, from `computeTransit` for each month. For example: "Aden → Calicut: fast Jun–Sep (tailwind, ~14 d); slow Nov–Feb (headwind, ~53 d); transition Mar–May and Oct (~17–81 d)." It is the summary; the port timing view (select a port on the map, or the calendar's "Month by month" button) gives each month's numbers.
- **Sail now or wait.** For the selected route, a card with two columns.
  - **Sail now:** days and months charged, wind relation, the turn-back chance on a headwind (35%), the storm chance in a transition month (navigator-dependent), and the expected arrival.
  - **Wait until the best month:** the months in port, the cost of waiting (wages plus port fees, `getWaitingCosts`), the crossing and the expected arrival.
  - **Best month:** the departure month, among the next 12 the campaign allows, with the earliest expected arrival; the earlier departure wins a tie. Expected time counts turn-backs: the crossing's months plus 35% × the expected time from the month you're back in port.
  - If sailing now is already the best month, the second column shows the fastest crossing instead, to show that the faster wind isn't always the earlier arrival. Late in the campaign the year's fastest month (from months 0–11) may come after the campaign ends; the card then says "the fastest crossing left this campaign" and names the year's fastest. A closing line says which arrives earlier in expectation.
  - On a headwind, the turn-back row says you return to port; the expected-arrival note keeps the retry assumption.
  - It sits directly under the departure buttons. The calendar sits above the engine's own comparison ("Compare another departure"), which keeps its cost totals and any month you choose.
  - Closing the month view opened from the calendar's button returns focus to that button.
- **Pirate warning.** Above the departure buttons, for the selected route this month (selection only, never hover), a ⚠ line shows when the engine's full piracy chance on arrival is at least 10%. The chance is the same `pirateChance` as the port view (port risk, cargo value, difficulty, guards, standing). The 10% line is a display choice by the game's owner, not an engine rule; the glossary says so. Below it, the card shows the chance in a quiet line (no icon, no announcement). A chance under 0.5% reads "<1%". The warning gives:
  - the chance with your current crew;
  - the chance with armed marines, if they aren't hired;
  - what an encounter costs, from `sailTo`'s outcome table (a crate of cloves, else a lot of ivory, else a tribute of up to `min(cash − wages for the voyage, 75)` D, since the engine takes the wages first, and 20 D more if becalmed);
  - that marines don't reduce the chance of being turned back.

  The line is a `role="status"` region, unhidden before its text is written and rewritten only when the text changes, so it is announced once per change. It is a warning, not a gate: sailing is unchanged. The sail-or-wait card repeats it in one line.
- **After each voyage.** A line under the map key explains the voyage from engine state and the draws decoded for the storm marker, never from the log: the direction and season, the days at sea, the year's fastest crossing (or, when that comes after the campaign ends, the fastest left in it) and how long waiting for it would have taken, and whether leaving then gave the earliest expected arrival, as a plain fact ("would have arrived about N months earlier") with no judgement. When a headwind or a transition month applied, it separates what was predictable (the season's risks) from what was luck (the draws). It never calls a choice wrong. It clears when the month or the port changes. It is not written into the voyage log, because the log is engine state: writing to it would change the audit and the seeded campaigns.
- **Home port on the map (setup).** The real coastline with the five ports as buttons (keyboard-operable), the game's wind for a month, and the chosen port marked. Choosing a port sets the engine's own home-port control. The month only previews the wind and is labelled as a preview: every campaign starts in January, and choosing a start month is a later engine change.
- **Tests.** KVIS `tests/03/atlas-decisions.test.mjs` checks every calendar line, every card number, the best-month choice and the explanation against independent computations from the engine and its tagged draws. It also checks that painting draws nothing and changes nothing, and that the explanation never blames a choice. It fails on twenty-one planted defects.

### Follow-up (2026-11-24)

- **Price chart at 320 px.** With a classic scrollbar the chart dialog's content box is 228 px, and the summary table's narrowest layout was 235 px, so the dialog scrolled sideways. Below 640 px its cells now have 3 px side padding (was 6 px), which keeps the table under 212 px. KVIS's market check now checks every chart table's narrowest width against the dialog at 320 px, allowing 17 px for a classic scrollbar.

### Campaign replay on the audit page (2026-11-24)

Display only; the engine script is unchanged, and nothing here draws randomness or changes state.

- **What is recorded.** During play the adapter records one step per voyage or month waited, from engine state read around each `sailTo` and `waitInPort` call: ports, month, months charged, days at sea and wind relation, whether the ship was turned back (it is still in port), hull and cash before and after, and the row of the dated log the action wrote (the log's length before it: `sailTo` and `waitInPort` each write their entry before `advanceTime` adds anything). Storms and pirates come from the draws decoded for the storm and pirate markers, never from the log text. Trades are recorded from the change in cargo and cash around `buyCargoQty` and `sellCargoQty`, and shown at the port where the next step begins. Months the recorder did not see are counted and reported as not recorded; nothing is guessed.
- **What plays.** Above the dated log, on the same coastline map: the ship moves along each leg sailed (about 1.5 s a step at 1×), a turn-back goes halfway out and back, a wait holds the ship in port while the month label advances, the storm and pirate markers appear where #32 draws them (30% and 80% along the leg), and a counter runs month and cash. One polite live line narrates each step; the matching log row is outlined and marked `aria-current="step"`. Every step is also listed as text.
- **Grouped log, beside the map.** A real campaign's log is mostly repeated single-unit trades (15 × "Sold 1× Moluccan Cloves at Quanzhou …"). The replay panel's log view groups consecutive trades of the same kind, good, port and month at the same price into one row, for example "Sold 15× Moluccan Cloves at Quanzhou, 663 D each, 9,945 D (15 trades)", expandable to the raw lines. Grouping uses the trades recorded from engine state (each with the log row it wrote), and the totals are sums of the raw lines. A step's narration groups its port visit's trades the same way. The engine's dated log under it stays exactly as before, because print and the PDF export capture it; the printed audit is unchanged.
- **End of campaign.** After the last step, a final frame labelled "End of campaign (liquidation)" shows what `finishCampaign` sold (from the cargo before it and the engine's own prices) and any loan repaid. The engine tags its liquidation lines "[M24 • Jan]" (`addLog` caps the month number but not the month name); the grouped log shows those rows under "End of campaign (liquidation)" instead, and the counter reads "End of campaign" rather than a second month 24. The engine string is left for the combined engine change.
- **Vessel name.** The engine's charter line says "aboard Chinese Treasure Junk"; the replay and its log show the Atlas name, "Chinese ocean-going junk". The engine string is left for the combined engine change.
- **Controls.** Restart, Back, Play/Pause, Forward and a speed choice (0.5×, 1×, 2×). It never plays on its own. All controls are keyboard-operable buttons with the shared focus ring and 44 px targets.
- **Reduced motion.** Play and the speed choice are disabled; each step is a still frame at its end, moved through with Back and Forward.
- **Print and PDF.** The replay is hidden in print (`@media print`) and carries `data-html2canvas-ignore`, so the printed and exported audit are unchanged.
- **Tests.** KVIS `tests/03/atlas-replay.test.mjs` plays seeded campaigns to the end and checks the steps against the engine (one per voyage or wait, ports, months, turn-backs, storms and pirates from the engine's outcome), the highlighted log row for every step, purity while stepping and playing to the end, reduced motion, and the print opt-outs; it also plays a campaign shaped like a real one (single-unit trades, a five-month crossing, two mutinies, the corsairs, liquidation) and checks that every grouped row's count, quantity and total equal its raw lines. It fails on eighteen planted defects. `engine/preview-purity.test.mjs` also covers the replay.
- **Review fixes.** Narration joins only identical trades (same quantity and cash), as the log view does. Nothing is announced until you use a control. During play the panel's log list keeps the current row in view without scrolling the page. The PDF export (html2canvas) runs with the dated log's highlight cleared, and the highlight uses a plain colour, because html2canvas 1.4.1 cannot parse `color-mix`.

### Visual consistency, on the replay (2026-11-24)

The design commit (shared dialog frame, unified close buttons, labelled trade action groups, ledger presentation) is carried onto the replay builder (`0207682`), with these changes from review:

- **Trade rows.** Each action group shows the price it trades at ("Buy · 40 D", "Sell · 38 D"), from the same values as the price column, so the price order and the button order can't disagree. The caption sits above its buttons; where the trade panel is at least 640 px wide (a container query), beside them.
- **Market height.** From 768 px the actions sit in the third column beside the prices, with the hold under the prices, and cell padding is trimmed. A row is 139–149 px at 1440 px (129 before the design commit, 199 with it), 119 px at 768–1024 px, and 241 px at 375 px (262 before).
- **Home port.** Gold on the setup map, like the current port on the voyage map; a selected route stays pink.
- **Focus on the setup map.** A 3 px outline in `--atlas-on-sea` and a white stroke on the port, which also applies to the selected port (the selected style used to win). The global ring is about 1.3:1 against the sea.
- **Backdrop.** `--atlas-backdrop`, derived from `--atlas-map-outline`.

### Waterfront trade rows (2026-11-24)

Owner decision. Each row has four parts: the good, what you hold, then Buy and Sell, in that order everywhere (the price column used to read Sell, Buy while the buttons read Buy, Sell).

- **Prices.** The separate price column is no longer shown. Each action group's caption gives the price it trades at ("Buy · 40 D", "Sell · 38 D"), with next month's arrow beside it (↑ rising, ↓ falling, – steady; the tooltip gives next month's price). The ▲ high / ▼ low marker sits beside the sell price.
- **Controls.** Buy: +1, +5, Max. Sell: −1, −5 (new), Max. Max's accessible names are "Buy as many <good> as you can afford and fit" and "Sell all <good> you hold".
- **Max no longer stops at 99.** The engine's market template passes 99 to `buyCargoQty` and `sellCargoQty` for MAX and ALL, so a junk holding 217 cloves sold 99 and kept 118. The Atlas now builds its own trade controls, and they call the same engine functions with the quantity shown; Max passes `Infinity`. `buyCargoQty` caps it by weight and cash, and `sellCargoQty` by what is held. Whether buying or selling is possible still comes from the engine (its own buttons' disabled state), and its buttons are then removed. The engine script is unchanged; its template still says 99, for the combined engine change.
- **Layout.** Where the trade panel is at least 600 px wide (the single-column layouts, 768–1279 px), the four parts are columns of the same width in every row, under a header (Good, In your hold, Buy, Sell). Where it is narrower (beside the map at 1440 px, and phones), the good and the hold sit over Buy and Sell, with the drawing beside the name. Below 300 px everything stacks in the same order. Row heights: 137 px at 1440, 89 px at 768–1024, 156 px at 375, 252 px at 320. All targets stay 44 px.
- **Accessible names (review).** Each action group is named by its caption through `aria-labelledby`, so the price is read with it ("Buy · 40 D"). Next month's arrow is drawn for the eye and said in visually hidden text ("next month rising, 41 D"). The row records how many engine buttons it found (`data-engine-buttons`, five today); the market check asserts that count and the enabled state at the engine's edges.

### UX audit, on the waterfront rows (2026-11-24)

The owner's UX audit commit (sticky status strip on narrow screens, the market under the map up to 1099 px, Student Mode error handling, the `beforeunload` guard during a voyage, `touch-action`, `overscroll-behavior`, the `theme-color` sync, and the chart-name targets) is carried onto the waterfront rows (`261b411`), with two adjustments:

- **Disabled trade controls in dark mode.** The audit's rule targeted the old −1/ALL buttons. On the waterfront controls it gave 3.28:1 (3.34:1 before), so disabled buttons in dark mode now have no fill, a dashed border (3.16:1 on the panel) and muted text at full opacity (5.35:1). Enabled buttons stay filled (11.6:1). Light mode is unchanged.
- **Chart-name targets.** They keep the audit's 36 px minimum (48 px rendered), with negative vertical margins so they add nothing to the row height: rows stay at 137 px at 1440 px and 89 px at 768–1024 px.

After review of the KVIS rebuild (#49), four more changes:

- **Only the strip's numbers stay pinned (up to 1099 px).** The whole strip was sticky: it hid focused controls (WCAG 2.4.11) and took 41% of a 320×568 screen. From 768 px it also sat under the engine's own sticky header (69 px, drawn above it), which hid its numbers. Now the page tools and the crew alert come first in the strip, in the DOM as on screen, and scroll away. The numbers row stays below the header, through a negative `top` equal to the height above it. That is 60 px at 320–375 px and 74 px below the header at 768–1099 px. `html` gets `scroll-padding-top` equal to the header plus that row plus 8 px, so a control that takes focus scrolls clear of both. `atlas.js` keeps the variables current with a `ResizeObserver`. A page tool that takes focus while the strip is pinned brings the strip back into view. Above 1099 px nothing changes.
- **Student Mode marks the fields the engine rejects.** Each field is checked with `startSimulation`'s own condition:
  - name and student number non-empty after trimming;
  - `parseInt(target, 10)` a number of at least 100;
  - the prediction at least 15 characters after trimming.

  Exactly the failing fields get `aria-invalid="true"` and `aria-describedby="setup-error"`, and the first takes focus. `#setup-error` keeps `role="alert"` without a second `aria-live`.
- **`beforeunload`** also guards a voyage where something was traded in month 0, since the log holds more than its opening entry. It stays off on the setup screen and after the campaign ends.
- **"Wait one month"** gets its spacing from `gap: .35em` on the button. A trailing space in a flex item has no effect.
