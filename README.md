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
2. **Simulate.** Use the map and wind planner to plan a nominal 24-month campaign. Select a route and a future month to compare wind direction, sailing time, crew wages and the cost of waiting. The forecast leaves the voyage unchanged. **Sail now** always uses the actual departure month. Buy low and sell at another port, subject to cash and hold capacity. Sailing charges monthly crew wages and can bring adverse winds, damage, cargo loss or piracy. Waiting costs wages and port fees and adds 15 standing points. A successful arrival adds five. Repairs, a navigator, a marine escort and cargo covers change the trade-offs.
3. **Audit.** At campaign end the game sells the remaining cargo, settles any debt and displays net profit and return on starting equity. Students compare their hypothesis with two dated ledger entries and explain one consequence of waiting or sailing. The audit includes the wind tally, freight mix, layovers and ports visited. Use these figures as evidence alongside the written explanation. The prototype displays rubric telemetry and leaves grading to the teacher.

**Worked example.** On Aden → Calicut, the prototype estimates **14 days in July** with a tailwind and **53 days in January** with a headwind for a dhow without a navigator. The game charges one month of dhow crew wages in July (15 D) and two in January (30 D). A player should also consider the cost of waiting until July, cargo prices and the chance of being forced back.

**Source inquiry.** Pair an illustrated ship from al-Ḥarīrī’s *Maqāmāt* with a museum-catalogued version of *Tribute Giraffe with Attendant*. Ask what each image can establish about seafaring or court diplomacy and what would require a second source. The 1414 episode commemorated a gift presented by Bengal to the Yongle emperor. The Philadelphia scroll is catalogued as a sixteenth-century work. The giraffe image supports a tribute discussion. Use a separately sourced ship image if students will compare hull construction or sail rigs. [BnF manuscript record](https://catalogue.bnf.fr/ark:/12148/cb14533657j) · [Philadelphia Museum of Art, scroll record](https://www.philamuseum.org/objects/181783) · [The Met, historical context](https://www.metmuseum.org/art/collection/search/51649)

## What the prototype contains

`index.html` is the playable source. The curriculum brief it was built from, which gave the rationale and proposed mechanics, is not included in this repository. Its suggested filename, lesson activities and implementation descriptions serve as reference material. The map-and-source activity is a separate teaching step.

The game uses one HTML page with inline SVG, vanilla JavaScript and Tailwind’s browser CDN. To run the prototype locally, download and open `index.html` in a modern browser with internet access. `PORTS`, `SEA_LANES`, `VESSELS` and `COMMODITIES` define the model. `computeTransit` uses the cosine of the angle between the route and the departure month’s downwind direction, applies transition-season and navigator modifiers, and rounds travel into whole campaign months. A shared in-memory `state` holds the voyage, finances and log. The page has no backend or save-and-resume mechanism. Client-side export uses html2canvas and jsPDF, with browser printing as a fallback.

## Before a classroom release

| Priority | Finding | Release action |
| --- | --- | --- |
| High | The engine resolves arrival before checking the campaign deadline. A December departure in the second year can arrive in simulated month 26 and still be credited with the destination. | Define how voyages that would overrun month 24 should end, then align sailing, settlement and ledger dates. Label early endings separately from month-24 liquidation. |
| High | Some descriptions in the original curriculum brief omit March from the transition months and give a different Aden → Calicut travel-time example. | Use the game’s **March–May and October** calendar and the simulation example above when teaching with this version. |
| Medium | The market labels pepper **Semi-Bulk** while the audit counts it as luxury. The freight tally includes cargo on departures that turn back and cargo later lost en route. | Show semi-bulk as a distinct category and define whether the audit measures tons loaded or delivered. |
| Medium | Browser print is available, but Tailwind styling, PDF libraries and fonts rely on remote resources. The PDF filename sanitizer replaces non-ASCII characters with underscores. | Ship compiled CSS and local dependencies for an offline release. Test the multi-page PDF and print fallback with fictional student details, including non-Latin names. [Tailwind CDN guidance](https://v3.tailwindcss.com/docs/upgrade-guide) |

**Verification.** The original inline script ran in Node with a simulated DOM and controlled random outcomes. Checks covered route timing, buying and selling, wind preview, standing discounts, end-of-campaign audit data and invocation of the print fallback. That harness is not committed to this repository. Browser layout and PDF rendering still need hands-on verification.

**Baseline and contributing.** [docs/baseline.md](docs/baseline.md) pins the classroom version, lists its parameters and known defects, and explains the committed sailing-model check (`tools/baseline-check.html`). [CONTRIBUTING.md](CONTRIBUTING.md) says which changes need the owner's agreement first.

## Attribution and license

The original game in index.html is credited to Amnuayvit Thitibordin (KVIS) and carries [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The existing repository MIT license does not relicense the game. Third-party libraries retain their respective licenses.



## Playable ships

The game offers two vessels. Capacity, speed, wages, wind response and damage multipliers below are simulation values. Both photographs can be reused without royalties under the listed Creative Commons terms. Each caption credits the photographer and links to the original file and license.

### Arab/Indian dhow

<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Jewel_of_Muscat%2C_Maritime_Experiential_Museum_%26_Aquarium%2C_Singapore_-_20120102-08.jpg/960px-Jewel_of_Muscat%2C_Maritime_Experiential_Museum_%26_Aquarium%2C_Singapore_-_20120102-08.jpg" width="640" alt="Full-size Jewel of Muscat reconstruction showing the wooden dhow hull and its rigging">

*Jewel of Muscat* is a modern, full-size reconstruction based on the ninth-century Belitung shipwreck. Photograph by **Jacklee**, shown as a resized preview. [Full resolution, 3,872 × 2,592](https://upload.wikimedia.org/wikipedia/commons/6/64/Jewel_of_Muscat%2C_Maritime_Experiential_Museum_%26_Aquarium%2C_Singapore_-_20120102-08.jpg) · [Wikimedia Commons source](https://commons.wikimedia.org/wiki/File:Jewel_of_Muscat%2C_Maritime_Experiential_Museum_%26_Aquarium%2C_Singapore_-_20120102-08.jpg) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

### Chinese treasure junk

<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Zheng_He%27s_Treasure_Ship_1.jpg/960px-Zheng_He%27s_Treasure_Ship_1.jpg" width="640" alt="Museum model of Zheng He’s Chinese treasure ship showing multiple masts and sails">

*Zheng He's Treasure Ship*, a model at the Hong Kong Science Museum. Photograph by **Mike Peel (www.mikepeel.net)**, shown as a resized preview. [Full resolution, 5,184 × 3,456](https://upload.wikimedia.org/wikipedia/commons/c/ce/Zheng_He%27s_Treasure_Ship_1.jpg) · [Wikimedia Commons source](https://commons.wikimedia.org/wiki/File:Zheng_He%27s_Treasure_Ship_1.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

### Strengths and trade-offs in play

| | Arab/Indian dhow | Chinese treasure junk |
| --- | --- | --- |
| **Cargo capacity** | 120 tons | 300 tons |
| **Base speed** | 110 nautical miles/day | 95 nautical miles/day |
| **Wind response coefficient** | 0.85. Gains more from favorable alignment and loses more of its speed factor as the wind opposes the route. | 0.60. Speed responds less to the same change in wind alignment. |
| **Crew wages** | 15 simulated dirhams per month | 35 simulated dirhams per month |
| **Hull damage from severe headwinds and cyclones** | Baseline damage | Half the baseline damage before rounding |
| **Advantages** | Lower overhead and faster favorable passages make it easier to earn back operating costs on lighter cargoes. | Carries 2.5 times as much. The larger hold can pay off when you can afford enough heavy freight and have a good destination market. |
| **Disadvantages** | A hold filled only with teak fits 12 lots. Adverse weather can require more repairs. | Higher wages apply at sea and during layovers. An underfilled hold still costs 35 D per month to crew, and adverse weather can still cause a turnback or cargo losses. |

Try Aden → Calicut in July at the same difficulty and with the same cargo. Both ships use a one-month sailing turn without a navigator. The junk can carry up to 30 ten-ton lots of teak and costs 20 D more in crew wages for that month. Compare actual profits after the tariff, purchase cost and sale price.

## Reading list

### Ships and navigation

- **Sewn-plank ships.** Read the Belitung wreck overview and note what the surviving stitched timbers and cargo tell us about long-distance sailing. For the reconstruction, look at how the builders distinguished archaeological evidence from choices they had to make. [Asian Civilisations Museum, *Tang Shipwreck*](https://www.nhb.gov.sg/acm/galleries/maritime-trade/tang-shipwreck) · [Tom Vosmer, *The Jewel of Muscat*](https://asia.si.edu/wp-content/uploads/2023/06/shipwrecked-08-vosmer.pdf)
- **Chinese junks.** Look at how watertight bulkheads divide a hull and limit flooding. Compare this construction principle with the junk’s reduced hull damage in the game. [UNESCO, *Watertight-bulkhead technology of Chinese junks*](https://ich.unesco.org/en/RL?RL=00321)

### The five ports

| Port | What to look for |
| --- | --- |
| **Kilwa Kisiwani, Tanzania** | Follow how a Swahili port connected inland ivory and gold to overseas markets. Look for Chinese porcelain at the site. [UNESCO, *Kilwa Kisiwani and Songo Mnara*](https://whc.unesco.org/en/list/144/) |
| **Aden, Yemen** | Read about the Cairo Geniza merchant correspondence for evidence of how traders coordinated shipments across ports and relied on intermediaries. [Princeton Geniza Lab, *Indian Ocean Documents from the Cairo Geniza*](https://genizalab.princeton.edu/projects/indian-ocean-documents-cairo-geniza) |
| **Calicut (Kozhikode), India** | Read Ibn Battuta’s account of the harbor and compare it with the classroom packet’s source on pepper cultivation and trade. [UC Davis History–Social Science Project, *Sites of Encounter: Calicut*](https://chssp.ucdavis.edu/sites/g/files/dgvnsk8426/files/inline-files/Calicut.pdf) |
| **Malacca (Melaka), Malaysia** | Trace exchanges of Indian cloth, Malabar pepper and Chinese wares through the fifteenth-century entrepôt. [Kenneth R. Hall, *Asian Maritime Networking Centered in Fifteenth Century Melaka*](https://doi.org/10.1163/15685209-12341569) |
| **Quanzhou, China** | Explore how docks, workshops and religious sites supported a Song–Yuan maritime hub. [UNESCO, *Quanzhou: Emporium of the World in Song–Yuan China*](https://whc.unesco.org/en/list/1561/) |

### Monsoons and climate

- **Seasonal wind reversal.** Compare the January and July maps. The wind name tells you where it comes from. The game’s Southwest Monsoon blows toward the northeast in June–September, and the Northeast Monsoon blows toward the southwest in November–February. [U.S. National Weather Service, *Monsoon Information*](https://www.weather.gov/twc/MonsoonInfo)
- **Cyclones and transition seasons.** Compare observed North Indian Ocean cyclone formation with the game’s simplified transition months of March–May and October. Real wind and storm conditions vary by region and season. [India Meteorological Department, *Cyclone Genesis*](https://rsmcnewdelhi.imd.gov.in/genesis.php)

### The six trade goods

The weights are tons per purchase unit in the game. Use the readings to compare the game’s categories and hazards with evidence about production and trade.

| Good | In the game | Read or examine |
| --- | --- | --- |
| **Teak timber** | 10 tons, bulk. A lot can be thrown overboard in severe headwinds. | Excavated structural timbers from the Belitung vessel include teak through-beams. [Michael Flecker, *A Ninth-Century Arab Shipwreck in Indonesia*](https://asia.si.edu/wp-content/uploads/2023/06/shipwrecked-07-flecker.pdf) |
| **Ming porcelain** | 8 tons, bulk. Some crates can break in rough conditions if hull integrity falls below 70%. | Inspect an early fifteenth-century blue-and-white vessel, then trace the movement of early Ming porcelain in the exhibition catalogue. [The Met, Xuande-period bowl](https://www.metmuseum.org/art/collection/search/44745) · [*Defining Yongle*](https://resources.metmuseum.org/resources/metpublications/pdf/Defining_Yongle_Imperial_Art_in_Early_Fifteenth_Century_China.pdf) |
| **Cotton textiles** | 5 tons, bulk. A bale can mildew on a transition-season voyage without tarpaulins. | See thirteenth- and fourteenth-century Indian textiles recovered in Egypt and learn how cloth moved across the Red Sea. [The Met, *Made in India, Found in Egypt*](https://www.metmuseum.org/essays/red-sea-textile-trade) |
| **Black pepper** | 2 tons, semi-bulk in the marketplace. | Read the historical Calicut sources for pepper cultivation and trade. [UC Davis History–Social Science Project, *Sites of Encounter: Calicut*](https://chssp.ucdavis.edu/sites/g/files/dgvnsk8426/files/inline-files/Calicut.pdf) |
| **Moluccan cloves** | 1 ton, luxury. Carrying cloves raises piracy risk in the game. | Learn why the Maluku Islands matter to the history of cloves. Find Maluku and Malacca on a map, then explain the difference between a place of production and a market. [Kew, *Syzygium aromaticum*](https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:601421-1/general-information) |
| **East African ivory** | 3 tons, luxury. Carrying ivory raises piracy risk in the game. | Trace the historic trade from the East African hinterland through a Swahili port. [UNESCO, *Kilwa Kisiwani and Songo Mnara*](https://whc.unesco.org/en/list/144/) |

## Playable atlas prototype

Open [prototype.html](prototype.html) for **An Atlas of Moving Worlds**, the offline visual prototype. It preserves the original game engine and adds the editorial opening, seasonal map/calendar, commodity plates, event reports and print ledger. The default index.html remains the original game.

See [prototype notes](docs/prototype.md) for development, font licences, validation and known limitations.
