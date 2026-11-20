# Global History Week 3 — Monsoon Navigator

**Course** · Global History at Kamnoetvidya Science Academy (KVIS)  
**Setting** · Indian Ocean maritime networks, c. 1000–1450 CE  
**Original credit** · Amnuayvit Thitibordin (KVIS), CC BY-NC-SA 4.0  
**Status** · Classroom prototype

## The historical concept

**Inquiry question:** How did seasonal winds shape what merchants carried, when they sailed, and whom they depended on?

Students run a merchant venture through Kilwa, Aden, Calicut, Malacca and Quanzhou. The five ports represent a network with several centers of trade across East Africa, Arabia, South Asia, Southeast Asia and China. The lesson uses that network to show how long-distance commerce linked these regions before Vasco da Gama reached Calicut. It builds on Week 1’s overland trade and Week 2’s Andean terraces by asking how a different environment changes the costs, opportunities and institutions people face. [K. N. Chaudhuri, *Trade and Civilisation in the Indian Ocean*](https://www.cambridge.org/core/books/abs/trade-and-civilisation-in-the-indian-ocean/trade-and-civilisation-in-the-indian-ocean-social-cultural-economic-and-temporal-dimensions/9A15D10940D38A59C372B32C9B78FE21) · [Janet Abu-Lughod, *Before European Hegemony*](https://academic.oup.com/book/54378)

| Historical idea | Decision the game gives students |
| --- | --- |
| Seasonal winds shaped the timing of passage. | Compare two departure months for the same route. Decide whether faster passage and lower exposure justify another month of port fees and wages. |
| Sea freight made heavier loads feasible. | Compare the 120-ton dhow with the 300-ton junk. Choose a cargo mix using weight, purchase price, tariff, sale price and time before the next sale. The junk’s extra capacity comes with higher monthly wages. |
| Repeated stays helped sustain merchant communities. | Waiting costs money and builds local standing. At higher standing, the game discounts warehousing and eventually reduces buying tariffs and arrival piracy risk. Use the port vignettes to ask how relationships, brokers and institutions helped merchants trade. |

The five-port map compresses several centuries into one playable circuit. Present the prices, ship capacities, hazard odds, route bearings and standing scores as game parameters. Ask students to explain how seasonal waiting could encourage durable ties alongside settlement, political protection and existing trade networks. Use dated examples when discussing real ports. Quanzhou’s Song–Yuan prominence and Malacca’s fifteenth-century rise illustrate the time compression. [UNESCO, Quanzhou](https://whc.unesco.org/en/list/1561/) · [UNESCO Silk Roads, early accounts of Melaka](https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/foreign_documents_and_the_descriptions_of_melaka_between_a.d._1505-1511_0.pdf)

## Predict → Simulate → Audit

1. **Predict.** Start with a short map and source inquiry. Have students pick a starting port, vessel and difficulty, set a profit target in simulated dirhams (D), and write a hypothesis linking monsoon timing, vessel choice and freight. Ask them to identify which part of their hypothesis they can test by holding the vessel and route constant while changing the departure month.
2. **Simulate.** Use the SVG map, wind clock and route cards to plan a nominal 24-month campaign. Buy low and sell at another port, subject to cash and hold capacity. Sailing charges monthly crew wages and can bring adverse winds, damage, cargo loss or piracy. Waiting costs wages and port fees and adds 15 standing points. A successful arrival adds five. Repairs, a navigator, a marine escort and cargo covers change the trade-offs.
3. **Audit.** At campaign end the game sells the remaining cargo, settles any debt and displays net profit and return on starting equity. Students compare their hypothesis with two dated ledger entries and explain one consequence of waiting or sailing. The audit includes the wind tally, freight mix, layovers and ports visited. Use these figures as evidence alongside the written explanation. The prototype displays rubric telemetry and leaves grading to the teacher.

**Worked example.** On Aden → Calicut, the prototype estimates **14 days in July** with a tailwind and **53 days in January** with a headwind for a dhow without a navigator. The game charges one month of dhow crew wages in July (15 D) and two in January (30 D). A player should also consider the cost of waiting until July, cargo prices and the chance of being forced back.

**Source inquiry.** Pair an illustrated ship from al-Ḥarīrī’s *Maqāmāt* with a museum-catalogued version of *Tribute Giraffe with Attendant*. Ask what each image can establish about seafaring or court diplomacy and what would require a second source. The 1414 episode commemorated a gift presented by Bengal to the Yongle emperor. The Philadelphia scroll is catalogued as a sixteenth-century work. The giraffe image supports a tribute discussion. Use a separately sourced ship image if students will compare hull construction or sail rigs. [BnF manuscript record](https://catalogue.bnf.fr/ark:/12148/cb14533657j) · [Philadelphia Museum of Art, scroll record](https://www.philamuseum.org/objects/181783) · [The Met, historical context](https://www.metmuseum.org/art/collection/search/51649)

## What the prototype contains

The pasted HTML is the playable source. The attached `gemini-code-1795190967723.md` provides the curriculum rationale and proposed mechanics. Its suggested filename, lesson activities and implementation descriptions serve as reference material. The map-and-source activity is a separate teaching step.

The game uses one HTML page with inline SVG, vanilla JavaScript and Tailwind’s browser CDN. To run the prototype locally, download and open `index.html` in a modern browser with internet access. `PORTS`, `SEA_LANES`, `VESSELS` and `COMMODITIES` define the model. `computeTransit` uses the cosine of the angle between the route and the departure month’s downwind direction, applies transition-season and navigator modifiers, and rounds travel into whole campaign months. A shared in-memory `state` holds the voyage, finances and log. The page has no backend or save-and-resume mechanism. Client-side export uses html2canvas and jsPDF, with browser printing as a fallback.

## Before a classroom release

| Priority | Finding | Release action |
| --- | --- | --- |
| High | The wind clock previews another month’s route, but clicking **Sail** uses the actual campaign month. | Make the preview read-only or show and confirm the actual departure conditions before sailing. |
| High | The engine resolves arrival before checking the campaign deadline. A December departure in the second year can arrive in simulated month 26 and still be credited with the destination. | Define how voyages that would overrun month 24 should end, then align sailing, settlement and ledger dates. Label early endings separately from month-24 liquidation. |
| High | The engine treats **March–May and October** as transition months. The on-page history note and parts of the curriculum brief omit March. The brief’s illustrative 20–30 vs. 120+ day passage also differs from the implemented 14 vs. 53 day dhow example. | Align the student-facing calendar and examples with the intended model. Label them as simulation values. |
| Medium | The market labels pepper **Semi-Bulk** while the audit counts it as luxury. The freight tally includes cargo on departures that turn back and cargo later lost en route. | Show semi-bulk as a distinct category and define whether the audit measures tons loaded or delivered. |
| Medium | Browser print is available, but Tailwind styling, PDF libraries and fonts rely on remote resources. The PDF filename sanitizer replaces non-ASCII characters with underscores. | Ship compiled CSS and local dependencies for an offline release. Test the multi-page PDF and print fallback with fictional student details, including non-Latin names. [Tailwind CDN guidance](https://v3.tailwindcss.com/docs/upgrade-guide) |

**Verification.** The original inline script ran in Node with a simulated DOM and controlled random outcomes. Checks covered route timing, buying and selling, wind preview, standing discounts, end-of-campaign audit data and invocation of the print fallback. Browser layout and PDF rendering still need hands-on verification.

## Attribution and license

The original game in index.html is credited to Amnuayvit Thitibordin (KVIS) and carries [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The existing repository MIT license does not relicense the game. Third-party libraries retain their respective licenses.

