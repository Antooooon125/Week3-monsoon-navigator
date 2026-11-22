/* Presentation adapter. The inherited engine remains in index.html and is copied
 * verbatim by scripts/build-prototype.mjs. Never mutate state or draw randomness here. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const svg = (contents, viewBox='0 0 300 140') => `<svg viewBox="${viewBox}" aria-hidden="true" focusable="false">${contents}</svg>`;
  const ships = {
    dhow: '<path d="M28 99 Q140 147 270 94 L244 119 Q145 146 60 120Z" fill="currentColor"/><path d="M142 19V104M66 104H252" stroke="currentColor" stroke-width="3"/><path d="M140 20L53 93L137 87Z" fill="currentColor" opacity=".8"/><path d="M150 31L229 83L150 83Z" fill="currentColor" opacity=".35"/><path d="M34 132Q80 124 125 132T219 132T287 132" fill="none" stroke="currentColor" opacity=".4"/>',
    junk: '<path d="M26 98L273 98L252 120Q149 146 49 120Z" fill="currentColor"/><path d="M93 13V103M160 5V103M220 22V103" stroke="currentColor" stroke-width="3"/><path d="M88 17Q40 48 58 86H88ZM155 10Q108 40 120 88H155ZM215 26Q176 50 184 89H215Z" fill="currentColor" opacity=".65"/><path d="M55 47H88M56 66H88M120 39H155M118 59H155M120 77H155M184 56H215M182 73H215" stroke="var(--surface)" stroke-width="2"/><path d="M34 132Q80 124 125 132T219 132T287 132" fill="none" stroke="currentColor" opacity=".4"/>'
  };
  const goods = {
    teak:['#8c510a','<path d="M12 47L65 17L87 29L34 61Z M32 62L85 32L106 44L54 75Z M53 76L106 46L127 58L74 89Z" fill="currentColor"/><path d="M12 47V59L34 73V61M34 61V73L54 86V75M54 75V87L74 100V89" fill="none" stroke="currentColor" stroke-width="4"/>'],
    porcelain:['#0072b2','<path d="M51 16H89V24L82 35Q113 56 99 83Q70 104 41 83Q27 56 58 35L51 24Z" fill="#ece8db" stroke="currentColor" stroke-width="3"/><path d="M43 57Q71 41 99 57M42 70Q70 87 99 70M58 26H82" fill="none" stroke="currentColor" stroke-width="3"/>'],
    textiles:['#d55e00','<path d="M18 35L91 20L123 46L51 64Z" fill="#d9c8ab" stroke="currentColor" stroke-width="2"/><path d="M19 48L51 77L123 59M19 61L51 90L123 72M19 35V61M123 46V72M51 64V90" fill="none" stroke="currentColor" stroke-width="3"/><path d="M43 30L76 58M67 25L100 52" stroke="#c84238" stroke-width="6"/>'],
    pepper:['#007a5e','<path d="M73 11Q97 42 59 90" fill="none" stroke="#7e9857" stroke-width="4"/><g fill="currentColor"><circle cx="67" cy="28" r="9"/><circle cx="85" cy="35" r="9"/><circle cx="62" cy="46" r="9"/><circle cx="81" cy="53" r="9"/><circle cx="57" cy="64" r="9"/><circle cx="74" cy="70" r="9"/><circle cx="58" cy="85" r="9"/></g>'],
    cloves:['#b5579a','<g fill="currentColor"><path d="M37 29L50 82L58 80L51 27Z M70 21L65 86L73 87L83 24Z M91 41L78 88L86 91L105 45Z"/><circle cx="42" cy="26" r="12"/><circle cx="78" cy="21" r="12"/><circle cx="101" cy="39" r="12"/></g>'],
    ivory:['#5e6670','<path d="M26 84Q97 112 119 17Q110 65 69 65Q42 65 26 84Z" fill="#e7dfc9" stroke="currentColor" stroke-width="3"/>']
  };
  const sources = {
    kilwa:['Kilwa Kisiwani','https://whc.unesco.org/en/list/144/'],
    aden:['Indian Ocean documents from the Cairo Geniza','https://genizalab.princeton.edu/projects/indian-ocean-documents-cairo-geniza'],
    calicut:['Sites of Encounter: Calicut','https://chssp.ucdavis.edu/sites/g/files/dgvnsk8426/files/inline-files/Calicut.pdf'],
    malacca:['Asian Maritime Networking Centered in Fifteenth Century Melaka','https://doi.org/10.1163/15685209-12341569'],
    quanzhou:['Quanzhou in Song–Yuan China','https://whc.unesco.org/en/list/1561/']
  };
  const materialTints={teak:['#d8b784','#4b5640'],porcelain:['#ece8db','#b8c6d9'],textiles:['#d9c8ab','#c84238'],pepper:['#c6d2aa','#7e9857'],cloves:['#d4b19c','#8d9e68'],ivory:['#e7dfc9','#527976']};
  const specimen=(id)=>{
    const [tint,detail]=materialTints[id];
    return svg(`<defs><linearGradient id="material-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${tint}"/><stop offset="1" stop-color="${detail}" stop-opacity=".16"/></linearGradient></defs><ellipse cx="70" cy="94" rx="49" ry="7" fill="${detail}" opacity=".12"/><circle cx="72" cy="53" r="46" fill="url(#material-${id})" opacity=".38"/>${goods[id][1]}`,'0 0 140 110');
  };

  document.body.dataset.plate='predict';
  document.body.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  const toolbar=document.createElement('div');toolbar.className='atlas-toolbar';
  toolbar.innerHTML='<button type="button" id="atlas-theme">Reading theme</button><button type="button" id="atlas-sources-open">Sources & assumptions</button><a href="https://github.com/Antooooon125/Week3-monsoon-navigator" target="_blank" rel="noopener noreferrer">Original source</a>';
  document.querySelector('header>div').append(toolbar);
  const theme=()=>{$('atlas-theme').textContent=`Theme: ${document.body.dataset.theme}`;$('atlas-theme').setAttribute('aria-label',`Reading theme ${document.body.dataset.theme}; switch theme`);};
  $('atlas-theme').addEventListener('click',()=>{document.body.dataset.theme=document.body.dataset.theme==='light'?'dark':'light';theme();});theme();
  document.querySelector('header h1').textContent='Monsoon Navigator';
  document.querySelector('header h1+p').textContent='Global History / Indian Ocean / c. 1000–1450 (a composite period)';
  const intro=document.createElement('section');intro.className='atlas-intro';intro.setAttribute('aria-labelledby','atlas-title');
  intro.innerHTML=`<div><div class="atlas-eyebrow">An Atlas of Moving Worlds</div><h2 id="atlas-title">The ocean<br>sets <em>the rhythm.</em></h2><p>How did seasonal winds shape what merchants carried, when they sailed, and whom they depended on?</p><div class="atlas-steps" id="atlas-steps"></div><p class="atlas-caption">Five ports. Two vessels. A 24-month venture.<br>A classroom model of a changing maritime world.</p></div><div><div class="atlas-cover">${svg('<rect width="500" height="430" fill="#e9e7d9"/><g stroke="#234a91" stroke-width=".5" opacity=".25"><path d="M0 86H500M0 172H500M0 258H500M0 344H500M100 0V430M200 0V430M300 0V430M400 0V430"/></g><g class="overprint" fill="#234a91" opacity=".88"><path d="M-10 40L102 62L151 131L138 193L105 226L90 348L38 412L-10 419Z"/><path d="M99 0H510V77L437 150L371 137L343 223L315 198L288 123L252 125L236 82L171 90L151 66Z"/><path d="M333 250L375 289L410 339L395 347L359 311Z"/></g><g class="overprint" fill="#bf4838" opacity=".82"><circle cx="265" cy="225" r="117"/><circle cx="265" cy="225" r="83" fill="#e9e7d9"/></g><path d="M77 328Q132 111 243 184T372 291Q431 215 454 106" fill="none" stroke="#bf4838" stroke-width="3" stroke-dasharray="5 5"/><g fill="#bf4838" stroke="#e9e7d9" stroke-width="3"><circle cx="77" cy="328" r="7"/><circle cx="134" cy="166" r="7"/><circle cx="243" cy="184" r="7"/><circle cx="372" cy="291" r="7"/><circle cx="454" cy="106" r="7"/></g><g fill="#192b2c" font-family="monospace" font-size="12"><text x="40" y="355">KILWA</text><text x="109" y="149">ADEN</text><text x="222" y="167">CALICUT</text><text x="340" y="315">MALACCA</text><text x="402" y="88">QUANZHOU</text><text x="178" y="406" letter-spacing="3">INDIAN OCEAN</text></g>','0 0 500 430')}</div><p class="atlas-caption">Schematic network · overlapping seasons and connections</p></div>`;
  $('phase-setup').prepend(intro);
  const setup=$('phase-setup').lastElementChild;
  setup.querySelector('h2').textContent='Charter your voyage';
  const setupLead=setup.querySelector('h2+p');
  const isStudent=()=>(state.mode??'student')==='student';
  const paintSetupLead=()=>{$('atlas-steps').innerHTML=isStudent()?'<b>Predict</b><span>Navigate & trade</span><span>Audit</span>':'<b>Navigate & trade</b><span>Results</span>';setupLead.textContent=isStudent()?'Choose a vessel, set a target, and predict how your trading strategy will work.':'Choose a mode, a starting port, a vessel and a difficulty.';};paintSetupLead();
  if(typeof selectGameMode==='function'){const modeOriginal=selectGameMode;selectGameMode=function(mode){modeOriginal(mode);paintSetupLead();};}
  $('input-name').placeholder='Your name';$('input-id').placeholder='Your student ID';
  document.querySelectorAll('label').forEach(label=>{const field=label.parentElement.querySelector('input,textarea,select');if(field&&field.id&&!label.htmlFor)label.htmlFor=field.id;});
  $('input-reflection').setAttribute('aria-label','Post-voyage reflection');
  for(const key of ['dhow','junk']) {
    const card=$('card-'+key);card.setAttribute('role','radio');card.tabIndex=0;
    const art=document.createElement('div');art.className='atlas-vessel-plate';art.innerHTML=svg(ships[key]);card.prepend(art);
    card.addEventListener('keydown',event=>{if(['Enter',' ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();const next=event.key.startsWith('Arrow')?(state.vesselKey==='dhow'?'junk':'dhow'):key;selectVessel(next);$('card-'+next).focus();}});
  }
  const vesselGroup=$('card-dhow').parentElement;vesselGroup.setAttribute('role','radiogroup');vesselGroup.setAttribute('aria-label','Vessel');
  const syncSelectors=()=>{for(const key of ['dhow','junk'])$('card-'+key).setAttribute('aria-checked',String(state.vesselKey===key));for(const key of Object.keys(DIFFICULTIES))$('diff-'+key).setAttribute('aria-pressed',String(state.diffKey===key));};
  const selectOriginal=selectVessel;selectVessel=function(key){selectOriginal(key);syncSelectors();};
  const difficultyOriginal=selectDifficulty;selectDifficulty=function(key){difficultyOriginal(key);syncSelectors();};syncSelectors();
  // Rewrite the two model descriptions without presenting numerical game values as historical measurements.
  $('card-dhow').querySelector('p').textContent='Lower crew costs and a smaller hold. In this model, speed responds more strongly to the alignment between route and wind.';
  $('card-junk').querySelector('p').textContent='A larger hold and higher crew costs. In this model, the junk carries 2.5 times as much cargo and takes less storm damage.';
  $('diff-normal').querySelector('p').textContent='Standard model winds, port tariffs, and voyage hazards.';
  setup.querySelector('button[onclick="startSimulation()"]').textContent='Begin your voyage';
  // Plain headings and wording that does not present game rules as history (review A16/A17).
  setup.querySelectorAll('label,h3,span,p').forEach(node=>{
    if(node.children.length)return;
    const t=node.textContent.trim();
    if(/^1\. SELECT VESSEL ARCHETYPE/i.test(t))node.textContent='1. Choose your ship';
    else if(/^2\. SELECT CLASSROOM DIFFICULTY/i.test(t))node.textContent='2. Choose a difficulty';
    else if(/^Commenda loan accrues 5% interest every 6 months/.test(t))node.textContent='Investor loan: 5% interest every 6 months (a game rule); tight capital margins.';
  });
  document.querySelectorAll('#btn-navigator').forEach(button=>{const note=button.parentElement.querySelector('.text-\\[11px\\]');if(note&&/Kamal/.test(note.textContent))note.textContent='+15% sailing speed and about half the cyclone risk in transition months (game rules).';});
  document.querySelectorAll('div').forEach(node=>{if(!node.children.length&&node.textContent.trim()==='Settle Commenda Merchant Loan')node.textContent='Repay the investor loan';});
  const intel=$('intel-modal');
  intel.querySelectorAll('span,h3').forEach(node=>{if(node.textContent.trim()==='Merchant Guild Ledger')node.textContent='Game prices (not historical)';else if(/Price Matrix \(Dirhams \/ Unit\)/.test(node.textContent))node.textContent='Starting price matrix (dirhams per game lot)';});
  const monsoonLink=document.querySelector('a[href="https://www.weather.gov/twc/MonsoonInfo"]');
  if(monsoonLink){monsoonLink.href='https://education.nationalgeographic.org/resource/monsoon/';monsoonLink.textContent='National Geographic Education, “Monsoon”';}
  const physics=$('physics-modal');
  physics.querySelectorAll('p').forEach(par=>{
    if(par.innerHTML.includes('allowing hulls to flex over coral reefs'))par.innerHTML=par.innerHTML.replace(', allowing hulls to flex over coral reefs','');
    if(par.textContent.includes('Chaudhuri & Abu-Lughod')){const refs=document.createElement('p');refs.className='atlas-refs';refs.innerHTML='Further reading: K. N. Chaudhuri, <cite>Trade and Civilisation in the Indian Ocean: An Economic History from the Rise of Islam to 1750</cite> (Cambridge University Press, 1985), <a href="https://doi.org/10.1017/CBO9781107049918" target="_blank" rel="noopener noreferrer">doi:10.1017/CBO9781107049918</a>. Janet L. Abu-Lughod, <cite>Before European Hegemony: The World System A.D. 1250–1350</cite> (Oxford University Press), <a href="https://doi.org/10.1093/oso/9780195067743.001.0001" target="_blank" rel="noopener noreferrer">doi:10.1093/oso/9780195067743.001.0001</a>.';par.after(refs);}
  });

  const left=$('phase-sim').firstElementChild,right=$('phase-sim').lastElementChild;
  const harbor=left.querySelector('figure');harbor.remove();
  const map=$('ocean-svg').parentElement.parentElement;map.classList.add('atlas-map-panel');
  left.classList.add('atlas-navigation');right.classList.add('atlas-cargo-column');
  const stageHeading=document.createElement('div');stageHeading.className='atlas-stage-heading';stageHeading.innerHTML='<div class="atlas-eyebrow">Navigate / the seasonal ocean</div><h2>Follow the season.</h2><p>Choose when to sail, what to carry, and where to build your next connection.</p>';left.prepend(stageHeading);
  const mapKey=map.querySelector('p');mapKey.className='atlas-map-key';mapKey.innerHTML='<span><i class="atlas-key-wind" aria-hidden="true"></i>Game wind (one wind for the whole map)</span><span><i class="atlas-key-route" aria-hidden="true"></i>Selected route</span><span><i class="atlas-key-port" aria-hidden="true"></i>Current port</span>';
  const calendar=document.createElement('section');calendar.className='atlas-calendar';calendar.setAttribute('aria-label','Departure month planner');
  calendar.innerHTML='<div class="atlas-calendar-head"><strong id="atlas-actual-date"></strong><span id="atlas-forecast-date"></span></div><div class="atlas-months" id="atlas-months"></div><p class="atlas-calendar-note">Outlined month = actual date. Pink month = comparison only. Sailing always uses the actual date.</p>';
  map.append(calendar);
  const caveat=document.createElement('p');caveat.className='atlas-calendar-note';caveat.textContent='Schematic geography, not to scale · arrows show the game’s wind at departure, not reconstructed historical weather · route labels give the game’s bearing and sailing time.';map.append(caveat);
  const comparison=$('wind-comparison-heading').parentElement;
  const departure=$('routes-container').parentElement;departure.classList.add('atlas-departure');map.after(departure);
  departure.querySelector('h3').textContent='Choose your next port';
  departure.querySelector('span').textContent='Sail or stay';
  departure.querySelector('button[onclick="waitInPort()"] span').textContent='Wait one month';
  // A16: keyboard focus previews a route, as hover does. setHoveredLane only redraws the map.
  $('routes-container').addEventListener('focusin',event=>{const button=event.target.closest?.('button[onclick^="sailTo"]');const id=button?.getAttribute('onclick').match(/'(\w+)'/)?.[1];if(id)setHoveredLane(id);});
  $('routes-container').addEventListener('focusout',()=>setHoveredLane(null));
  // A8: a double click must not sail or wait twice. The list re-renders under the second click.
  departure.addEventListener('click',event=>{if(event.detail>1&&event.target.closest?.('button')){event.stopPropagation();event.preventDefault();}},true);
  departure.querySelector('h3').tabIndex=-1;
  const standing=$('diaspora-rank-badge').parentElement.parentElement;standing.classList.add('atlas-standing');departure.append(standing);
  const planner=document.createElement('details');planner.id='atlas-planner';planner.className='atlas-planner';planner.innerHTML='<summary><strong>Compare another departure</strong><span>Timing, wages and the cost of waiting</span></summary>';planner.append(comparison);departure.after(planner);
  $('wind-comparison-heading').textContent='Now or another season?';
  const previewOriginal=previewClockMonth;previewClockMonth=function(...args){planner.open=true;previewOriginal(...args);};
  const eventCard=document.createElement('aside');eventCard.id='atlas-event';eventCard.className='atlas-event';eventCard.hidden=true;eventCard.setAttribute('aria-labelledby','atlas-event-title');
  eventCard.innerHTML='<div class="atlas-eyebrow">From the voyage ledger</div><h3 id="atlas-event-title" tabindex="-1">Conditions changed</h3><p id="atlas-event-message"></p><ul id="atlas-event-consequences"></ul><p class="atlas-event-caption">First encounter with this event type. Later occurrences remain in the voyage log.</p><button type="button" id="atlas-event-close">Continue the voyage</button><a href="#voyage-log">Read the log</a>';
  departure.before(eventCard);
  const displayedTypes=new Set(),processedEntries=new Set();
  $('atlas-event-close').addEventListener('click',()=>{eventCard.hidden=true;});
  const portContext=document.createElement('details');portContext.className='atlas-port-context';portContext.innerHTML='<summary id="atlas-port-heading">About this port</summary><p id="atlas-port-detail"></p><p>Port fees, standings and risks are simulation parameters. The circuit compresses several centuries; the ports did not all peak at the same time.</p><a id="atlas-port-source" target="_blank" rel="noopener noreferrer">Explore a historical reference</a>';
  left.append(portContext);
  const hold=right.querySelector('section:nth-child(2)');hold.classList.add('atlas-hold');hold.querySelector('.harbor-art').remove();
  hold.querySelector('h3').textContent='A collection in transit';
  const holdManifest=document.createElement('div');holdManifest.id='atlas-hold-manifest';holdManifest.className='atlas-hold-manifest';$('cargo-shelf-weight').after(holdManifest);
  const cargoCaption=document.createElement('p');cargoCaption.className='atlas-specimen-caption';cargoCaption.textContent='Schematic material studies. Quantities and weights come from your cargo manifest.';hold.append(cargoCaption);
  const market=$('market-tbody').closest('table').parentElement.parentElement;market.classList.add('atlas-trade');right.prepend(market);
  const narrow=typeof matchMedia==='function'?matchMedia('(max-width: 1099px)'):null;
  const placeMarket=()=>{if(narrow?.matches)departure.after(market);else right.prepend(market);};
  narrow?.addEventListener?.('change',placeMarket);placeMarket();
  market.querySelector('h3').textContent='Trade at the waterfront';market.querySelector('span').textContent='Trade / material ecology';
  const marketScroll=market.querySelector('.overflow-x-auto');marketScroll.tabIndex=0;marketScroll.setAttribute('role','region');marketScroll.setAttribute('aria-label','Commodity market');
  const tableHint=document.createElement('p');tableHint.className='atlas-table-hint';tableHint.textContent='Prices are per game lot. Buy includes the tariff. ▲ = more than 2 D above this port’s base price; ▼ = more than 2 D below.';marketScroll.before(tableHint);
  const photo=$('ship-photo');const shipPlate=document.createElement('div');shipPlate.id='atlas-ship';shipPlate.className='atlas-ship';shipPlate.setAttribute('role','img');photo.replaceWith(shipPlate);
  const sourceDialog=document.createElement('dialog');sourceDialog.id='atlas-source-dialog';sourceDialog.className='atlas-source-dialog';sourceDialog.setAttribute('aria-labelledby','atlas-source-title');
  sourceDialog.innerHTML='<h2 id="atlas-source-title">How we know</h2><p>This presentation keeps the original game model. Its numbers are learning tools, not calibrated historical estimates.</p><h3>Historical references</h3><ul>'+Object.values(sources).map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join('')+'</ul><h3>Game assumptions</h3><p>One simplified seasonal wind applies across the map. Ship speeds, cargo weights, prices, tariffs, hazards and standing effects are game parameters. Quanzhou’s Song–Yuan setting and Malacca’s fifteenth-century rise are compressed into one circuit.</p><p>Port stories in the voyage log are fictional scenes written for the game, not sourced events.</p><p>Vessel and commodity drawings are schematic illustrations, not archaeological reconstructions. References above are starting points from the repository reading list; this page does not certify every existing historical claim.</p><p><a href="https://github.com/Antooooon125/Week3-monsoon-navigator/blob/ba2f279/README.md" target="_blank" rel="noopener noreferrer">Read the model description and known limitations</a></p><form method="dialog"><button>Close sources</button></form>';
  document.body.append(sourceDialog);$('atlas-sources-open').addEventListener('click',()=>sourceDialog.showModal());
  const footer=document.createElement('footer');footer.className='atlas-footer';footer.innerHTML='<span>Original game: Amnuayvit Thitibordin (KVIS) · CC BY-NC-SA 4.0 with a Commercial Derivative Exception</span><span>An Atlas of Moving Worlds: art direction and adaptation by Thanakrit Wongsatit, with AI assistance · <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> with a Commercial Derivative Exception · Collaborator: Guntitat Sawadwuthikul</span>';document.body.append(footer);
  // Simplify inherited headings while keeping numerical definitions and model controls.
  const labels=[['#voyage-log','h3','Voyage log']];
  for(const [id,tag,text] of labels){if(!tag)continue;const node=document.querySelector(id);const heading=node.parentElement.querySelector(tag);if(heading)heading.textContent=text;}
  right.lastElementChild.querySelector('h3').textContent='Care for ship and crew';
  document.querySelectorAll('button').forEach(button=>{if(button.getAttribute('onclick')==="toggleModal('intel-modal')")button.textContent='Port price guide';if(button.getAttribute('onclick')==="toggleModal('physics-modal')")button.textContent='How sailing works';});
  const auditReport=$('pdf-export-target');auditReport.querySelector('h2').textContent='Voyage ledger';
  const prediction=$('audit-hypothesis-text').parentElement.parentElement;prediction.classList.add('atlas-audit-prediction');auditReport.querySelector('.grid').before(prediction);
  const auditLead=document.createElement('section');auditLead.className='atlas-audit-lead';auditLead.innerHTML='<div class="atlas-eyebrow" id="atlas-audit-eyebrow">Audit / prediction and evidence</div><h2>Your venture, reviewed.</h2><p id="atlas-audit-summary"></p><p id="atlas-audit-prompt"></p>';auditReport.prepend(auditLead);
  $('audit-log-table').parentElement.querySelector('h3').textContent='Dated voyage evidence';
  const exportNote=document.createElement('p');exportNote.id='atlas-export-note';exportNote.className='atlas-export-note';exportNote.textContent='Opens your browser’s print dialog. Choose “Save as PDF” there to keep a file. This offline page has no separate PDF download.';$('btn-export-pdf').parentElement.append(exportNote);
  // One action: both inherited buttons open the same print dialog here, so keep the gated print button and hide the duplicate.
  $('btn-print-audit').textContent='Print / Save as PDF';$('btn-export-pdf').classList.add('hidden');
  const auditEvidence=$('audit-wind-ratio').parentElement.parentElement.parentElement;auditEvidence.querySelector('span').textContent='Voyage evidence';

  // Decorative atmospheric colour is confined to the scene. These strokes encode
  // the model's single departure wind direction; they are not measured flow data.
  const ocean=$('ocean-svg'),defs=ocean.querySelector('defs');
  const land=ocean.querySelector('g[fill="#243950"]');land.setAttribute('id','atlas-land');
  const landMask=[...land.querySelectorAll('path')].map(path=>`<path d="${path.getAttribute('d')}" fill="black"/>`).join('');
  defs.insertAdjacentHTML('beforeend',`<radialGradient id="atlas-sea-light" cx="43%" cy="42%" r="70%"><stop stop-color="var(--field)" stop-opacity=".16"/><stop offset="1" stop-color="var(--sea)" stop-opacity="0"/></radialGradient><linearGradient id="atlas-wind-spectrum" x1="0" y1="1" x2="1" y2="0"><stop stop-color="var(--field)"/><stop offset=".72" stop-color="var(--spectral)"/><stop offset="1" stop-color="#ec9abe"/></linearGradient><mask id="atlas-ocean-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="450"><rect width="800" height="450" fill="white"/>${landMask}<rect x="632" y="286" width="168" height="164" fill="black"/></mask><marker id="atlas-wind-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M1 2L8 5L1 8" fill="none" stroke="var(--field)" stroke-width="1.4"/></marker>`);
  const atmosphere=document.createElementNS('http://www.w3.org/2000/svg','g');atmosphere.id='atlas-atmosphere';atmosphere.setAttribute('pointer-events','none');atmosphere.setAttribute('aria-hidden','true');atmosphere.innerHTML='<rect width="800" height="450" fill="url(#atlas-sea-light)"/><text x="285" y="403" fill="var(--field)" opacity=".32" font-size="13" letter-spacing="7">INDIAN OCEAN</text>';land.before(atmosphere);
  $('svg-wind-field').setAttribute('mask','url(#atlas-ocean-mask)');$('svg-wind-field').setAttribute('aria-hidden','true');$('svg-wind-field').setAttribute('pointer-events','none');

  // Replace a purely presentational renderer with local, offline SVG illustrations.
  renderVoyageVisuals=function(port,vessel,usedTonnage){
    const shipName=state.vesselKey==='junk'?'Chinese ocean-going junk':vessel.name;
    $('atlas-ship').innerHTML=svg(ships[state.vesselKey]);$('atlas-ship').setAttribute('aria-label',`${shipName}, schematic silhouette`);
    $('ship-name').textContent=shipName;$('ship-credit').textContent='Schematic illustration; reference photograph: '+(state.vesselKey==='dhow'?'Jewel of Muscat reconstruction · Jacklee · CC BY-SA 3.0':'Zheng He treasure ship model · Mike Peel · CC BY-SA 4.0');
    $('ship-credit').href='https://commons.wikimedia.org/wiki/File:'+SHIP_PHOTOS[state.vesselKey][1];
    for(const [meter,value] of [['hull',state.hull],['crew',state.crewHealth]]){$(meter+'-meter').value=value;$(meter+'-meter-value').textContent=value+'%';}
    $('cargo-shelf-weight').textContent=`${usedTonnage} / ${vessel.capacity} tons loaded · game weight, not hull volume`;
    $('atlas-hold-manifest').setAttribute('role','img');$('atlas-hold-manifest').setAttribute('aria-label',`${usedTonnage} of ${vessel.capacity} tons loaded; ${vessel.capacity-usedTonnage} tons available.`);
    $('atlas-hold-manifest').innerHTML='<div class="atlas-weight-bar">'+COMMODITIES.filter(item=>state.cargo[item.id]>0).map(item=>`<span style="width:${state.cargo[item.id]*item.weight/vessel.capacity*100}%;background:${goods[item.id][0]}" title="${item.name}: ${state.cargo[item.id]*item.weight} tons"></span>`).join('')+`</div><ul class="atlas-manifest-legend">`+COMMODITIES.filter(item=>state.cargo[item.id]>0).map(item=>`<li><i style="background:${goods[item.id][0]}" aria-hidden="true"></i>${item.name} ${state.cargo[item.id]*item.weight} t</li>`).join('')+`</ul><div class="atlas-manifest-label"><span>${Math.round(usedTonnage/vessel.capacity*100)}% loaded</span><span>${vessel.capacity-usedTonnage} t available</span></div>`;
    $('cargo-shelves').innerHTML=COMMODITIES.map(item=>`<li class="atlas-commodity" data-good="${item.id}" data-loaded="${state.cargo[item.id]>0}" style="--material:${goods[item.id][0]};--material-tint:${materialTints[item.id][0]}"><div class="atlas-specimen" style="color:${goods[item.id][0]}">${specimen(item.id)}</div><span class="atlas-commodity-category">${item.category}</span><strong class="block">${item.name}</strong><span class="atlas-commodity-stock">${state.cargo[item.id]} lots <span aria-hidden="true">/</span> ${state.cargo[item.id]*item.weight} t</span><span class="atlas-commodity-unit">${item.weight} t per lot</span></li>`).join('');
  };
  const paintCalendar=()=>{
    const actual=state.monthIndex%12,forecast=getForecastMonthIndex();
    $('atlas-actual-date').textContent=`Actual: ${MONTHS[actual]} · month ${state.monthIndex+1}/24`;
    $('atlas-forecast-date').textContent=forecast===null?'Choose a future month':`Comparison: ${MONTHS[forecast%12]} · month ${forecast+1}/24`;
    $('atlas-months').innerHTML=MONTHS.map((name,index)=>{const wait=(index-actual+12)%12,enabled=wait>0&&state.monthIndex+wait<CAMPAIGN_MONTHS;return `<button type="button" data-month="${index}" ${index===actual?'aria-current="date"':''} aria-pressed="${forecast!==null&&index===forecast%12}" ${enabled?'':'disabled'} aria-label="${name}${index===actual?', actual month':enabled?', compare departure':' unavailable within this campaign'}">${name}</button>`;}).join('');
  };
  $('atlas-months').addEventListener('click',event=>{const button=event.target.closest('button[data-month]');if(button){const month=Number(button.dataset.month);previewClockMonth(month);$('atlas-months').querySelector(`[data-month="${month}"]`)?.focus();}});
  const clock=$('svg-clock-months').parentElement;
  clock.insertAdjacentHTML?.('beforeend','<text x="-30" y="52" class="atlas-clock-label" text-anchor="middle">SW</text><text x="-30" y="-42" class="atlas-clock-label" text-anchor="middle">NE</text>');
  const comparisonOriginal=renderWindComparison;renderWindComparison=function(){comparisonOriginal();paintCalendar();};
  const mapOriginal=renderSVGMap;renderSVGMap=function(wind){
    mapOriginal(wind);ocean.querySelector(':scope > rect').setAttribute('fill','var(--sea)');
    const angle=wind.bearing*Math.PI/180,dx=Math.sin(angle)*54,dy=-Math.cos(angle)*54;
    const tracers=[];
    for(let row=0;row<8;row++)for(let column=0;column<13;column++){
      const x=column*64+(row%2)*26-12,y=row*59+12,index=row*13+column;
      tracers.push(`<line x1="${x}" y1="${y}" x2="${(x+dx).toFixed(2)}" y2="${(y+dy).toFixed(2)}" class="atlas-wind-tracer" style="animation-delay:-${index%9*.6}s" ${index%7===0?'marker-end="url(#atlas-wind-arrow)"':''}/>`);
    }
    $('svg-wind-field').innerHTML=tracers.join('');
    // A10: draw the selected route along its curved sea lane instead of a straight line over land.
    const preview=$('svg-route-preview'),line=preview.querySelector?.('line');
    const pt=(v)=>v.split(',').map(Number);
    if(line&&line.getAttribute&&line.getAttribute('x1')!=null){
      const a=[+line.getAttribute('x1'),+line.getAttribute('y1')],b=[+line.getAttribute('x2'),+line.getAttribute('y2')];
      for(const lanePath of $('svg-sea-lanes').querySelectorAll('path')){
        const m=(lanePath.getAttribute('d')||'').match(/M\s*([\d.]+,[\d.]+)\s*Q\s*([\d.]+,[\d.]+)\s*([\d.]+,[\d.]+)/);if(!m)continue;
        const [p1,c,p2]=[pt(m[1]),pt(m[2]),pt(m[3])];const same=(u,v)=>Math.abs(u[0]-v[0])<1&&Math.abs(u[1]-v[1])<1;
        let s0,s1;if(same(p1,a)&&same(p2,b)){s0=p1;s1=p2;}else if(same(p2,a)&&same(p1,b)){s0=p2;s1=p1;}else continue;
        const curve=document.createElementNS('http://www.w3.org/2000/svg','path');
        curve.setAttribute('d',`M ${s0[0]},${s0[1]} Q ${c[0]},${c[1]} ${s1[0]},${s1[1]}`);curve.setAttribute('fill','none');
        for(const attr of ['stroke','stroke-width','marker-end'])if(line.getAttribute(attr))curve.setAttribute(attr,line.getAttribute(attr));
        line.replaceWith(curve);
        const mid=[(s0[0]+2*c[0]+s1[0])/4,(s0[1]+2*c[1]+s1[1])/4-14];
        const rect=preview.querySelector('rect'),label=preview.querySelector('text');
        if(rect){rect.setAttribute('x',mid[0]-58);rect.setAttribute('y',mid[1]-12);}
        if(label){label.setAttribute('x',mid[0]);label.setAttribute('y',mid[1]+1);}
        break;
      }
    }
    // A12: the comparison month is pink everywhere (the engine draws it amber on the clock).
    $('svg-clock-months').querySelectorAll?.('text[fill="#fbbf24"]').forEach(t=>t.setAttribute('fill','#ec9abe'));
    const selected=state.hoveredLaneTo||state.windRouteTo;
    ocean.querySelectorAll('#svg-ports>g').forEach((group,index)=>{const port=Object.values(PORTS)[index];group.setAttribute('data-current',String(port.id===state.currentPort));group.setAttribute('data-selected',String(port.id===selected));});
  };
  const eventKinds=[
    ['turnback',/TURNED BACK|forced vessel back/i,'The crossing was interrupted'],
    ['cyclone',/cyclone/i,'A cyclone on the crossing'],
    ['headwind',/severe monsoon headwinds/i,'Against the monsoon'],
    ['piracy',/corsairs|pirate tribute/i,'A costly encounter'],
    ['cargo',/jettisoned|shattered|mildewed/i,'Cargo lost at sea'],
    ['mutiny',/mutiny settled/i,'A settlement with the crew']
  ];
  const paint=()=>{
    const wind=getWindState(state.monthIndex);document.body.dataset.plate=state.ended?'audit':'navigate';document.body.dataset.season=wind.isDeadZone?'transition':wind.regime.startsWith('SW')?'sw':'ne';
    $('atlas-port-heading').textContent=`Port notebook: ${PORTS[state.currentPort].name}`;$('atlas-port-detail').textContent='In this simulation: '+PORTS[state.currentPort].trait;
    const [label,url]=sources[state.currentPort];$('atlas-port-source').href=url;$('atlas-port-source').textContent=label;
    const fresh=state.logs.filter(entry=>!processedEntries.has(entry));fresh.forEach(entry=>processedEntries.add(entry));
    for(const entry of fresh){
      // Only voyage entries carry events; other log lines (for example "Charter signed … (Cyclone & Piracy Crisis)") must never become a card.
      if(!entry.includes(' | Events: '))continue;
      const kind=eventKinds.find(([,pattern])=>pattern.test(entry));if(!kind||displayedTypes.has(kind[0]))continue;
      displayedTypes.add(kind[0]);eventCard.dataset.kind=kind[0];$('atlas-event-title').textContent=kind[2];
      const [voyage,effects]=entry.split(' | Events: ');$('atlas-event-message').textContent=voyage;
      $('atlas-event-consequences').innerHTML='';
      if(effects)for(const effect of effects.split('; ')){const item=document.createElement('li');item.textContent=effect;$('atlas-event-consequences').append(item);}
      eventCard.hidden=false;$('atlas-event-title').focus();break;
    }
    const windBadge=$('wind-regime-badge');windBadge.textContent=windBadge.textContent.replace(/\((\d+)° ([NESW]{1,3})\)/,'(blowing toward $2, $1°)');
    document.querySelectorAll('#market-tbody button').forEach(button=>{const row=button.closest('tr');button.setAttribute('aria-label',`${button.textContent.trim()} ${row.querySelector('td').textContent.trim().replace(/\s+/g,' ')}`);});
    document.querySelectorAll('#market-tbody tr').forEach((row,index)=>{const item=COMMODITIES[index];row.dataset.good=item.id;row.style.setProperty('--material',goods[item.id][0]);});
  };
  const renderOriginal=renderAll;renderAll=function(){renderOriginal();paint();};
  const finishOriginal=finishCampaign;finishCampaign=function(){finishOriginal();document.body.dataset.plate='audit';const profit=state.cash-state.startEquity;const result=`Your venture finished with ${state.cash.toLocaleString()} D in cash: a net ${profit<0?'loss':'gain'} of ${Math.abs(profit).toLocaleString()} D`;$('atlas-audit-summary').textContent=isStudent()?`${result} against your ${state.targetProfit.toLocaleString()} D profit target.`:`${result}.`;$('atlas-audit-eyebrow').textContent=isStudent()?'Audit / prediction and evidence':'Results / voyage evidence';$('atlas-audit-prompt').textContent=isStudent()?'Compare your prediction with the ledger. Choose two dated entries that explain the result.':'Choose two dated entries in the ledger that explain the result.';$('phase-audit').tabIndex=-1;
    if(!isStudent()){
      // A7: Play Only has no target, so show no goal or target verdict.
      $('audit-roi').textContent=$('audit-roi').textContent.replace(/\s*\(Goal:[^)]*\)/,'');
      const badge=$('audit-outcome-badge');badge.textContent=state.cash-state.startEquity>0?'PROFITABLE VOYAGE':'VENTURE DEFICIT';
    }
    $('audit-ports-visited').textContent=$('audit-ports-visited').textContent.replace('Emporia Visited','ports visited');
    $('audit-vessel-meta').textContent=$('audit-vessel-meta').textContent.replace('Chinese Treasure Junk','Chinese ocean-going junk');
    // A9: open the audit at its top.
    $('phase-audit').scrollIntoView?.({block:'start'});$('phase-audit').focus({preventScroll:true});};
  // A9: start the voyage at the top of the page.
  const startOriginal=startSimulation;startSimulation=function(...args){startOriginal(...args);if(state.logs.length&&typeof scrollTo==='function'){scrollTo(0,0);stageHeading.querySelector('h2').tabIndex=-1;stageHeading.querySelector('h2').focus?.({preventScroll:true});}};
  // A5: keep keyboard focus on the trade button after the market re-renders.
  for(const name of ['buyCargoQty','sellCargoQty']){
    const original=globalThis[name];
    globalThis[name]=function(...args){
      const key=document.activeElement?.getAttribute?.('onclick');
      original.apply(this,args);
      if(!key)return;
      const buttons=[...document.querySelectorAll('#market-tbody button')];
      const same=buttons.find(b=>b.getAttribute('onclick')===key);
      const target=same&&!same.disabled?same:(same?.closest('tr')?[...same.closest('tr').querySelectorAll('button')].find(b=>!b.disabled):null);
      target?.focus();
    };
  }
  // F6/A5: after sailing or waiting without an event report, keep focus in the departure panel.
  for(const name of ['sailTo','waitInPort']){
    const original=globalThis[name];
    globalThis[name]=function(...args){original.apply(this,args);if(document.activeElement===document.body&&!state.ended)departure.querySelector('h3').focus?.({preventScroll:true});};
  }
  // Mark any inherited non-native overlay modal as a dialog, manage focus and Escape.
  const modalOriginal=toggleModal;let modalReturn=null;
  toggleModal=function(id){const element=$(id),opening=element.classList.contains('hidden');modalOriginal(id);if(opening){modalReturn=document.activeElement;element.setAttribute('role','dialog');element.setAttribute('aria-modal','true');element.setAttribute('aria-label',element.querySelector('h3')?.textContent||'Reference');element.querySelector('button')?.focus();}else modalReturn?.focus();};
  document.addEventListener('keydown',event=>{const modal=[...document.querySelectorAll('#intel-modal,#physics-modal')].find(el=>!el.classList.contains('hidden'));if(!modal)return;if(event.key==='Escape'){event.preventDefault();toggleModal(modal.id);}else if(event.key==='Tab'){const controls=[...modal.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')];if(!controls.length)return;const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
  document.addEventListener('visibilitychange',()=>{document.body.dataset.paused=String(document.hidden);});
  if(typeof IntersectionObserver!=='undefined'){new IntersectionObserver(entries=>{document.body.dataset.paused=String(document.hidden||!entries[0].isIntersecting);}).observe($('ocean-svg'));}
})();
