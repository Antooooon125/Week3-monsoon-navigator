/* Presentation adapter. The inherited engine remains in index.html and is copied
 * verbatim by scripts/build-prototype.mjs. Never mutate state or draw randomness here. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const svg = (contents, viewBox='0 0 300 140') => `<svg viewBox="${viewBox}" aria-hidden="true" focusable="false">${contents}</svg>`;
  const ships = {
    dhow: '<path d="M14 121Q62 114 110 121T206 121T294 121" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".45"/><path d="M40 130Q80 125 120 130T200 130T270 130" fill="none" stroke="currentColor" opacity=".25"/><path d="M102 69L46 37Q46 64 56 84Q82 82 102 69Z" fill="currentColor" opacity=".45"/><path d="M64.5 47.6L71.2 79M83.5 58.4L86.8 74" stroke="currentColor" stroke-width=".9" opacity=".7"/><path d="M68 92L71 38" stroke="currentColor" stroke-width="2.4"/><path d="M108 72L40 33" stroke="currentColor" stroke-width="2"/><path d="M238 78L84 8Q96 52 126 88Q182 92 238 78Z" fill="currentColor" opacity=".6"/><path d="M114.8 22L148.4 86M145.6 36L170.8 84M176.4 50L193.2 82M207.2 64L215.6 80" stroke="var(--surface)" stroke-width="1.1" opacity=".75"/><path d="M150 101L167 12" stroke="currentColor" stroke-width="3.2"/><path d="M250 84L72 3" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M167 13L161 43M126 88L104 95M166 16L136 98M166 16L270 80" fill="none" stroke="currentColor" stroke-width=".9" opacity=".7"/><path d="M167 12L182 9L167 6Z" fill="currentColor"/><path d="M36 79L94 86M40 79.5V89M54 81V90M68 83V92M82 84.5V94" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M46 94L34 121L47 122L55 104Z" fill="currentColor" opacity=".8"/><path d="M36 86Q42 98 52 112Q150 130 238 110L270 80Q160 104 36 86Z" fill="currentColor"/><path d="M266 83L279 69" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M36 85Q160 103 270 79" fill="none" stroke="currentColor" stroke-width="2"/><path d="M44 96Q150 116 252 96M50 105Q150 122 244 105" fill="none" stroke="var(--surface)" stroke-width="1"/><path d="M47 100Q150 119 248 100" fill="none" stroke="var(--surface)" stroke-width="2" stroke-dasharray="1 4"/>',
    junk: '<path d="M14 121Q62 114 110 121T206 121T294 121" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".45"/><path d="M40 130Q80 125 120 130T200 130T270 130" fill="none" stroke="currentColor" opacity=".25"/><path d="M90 22L52 14Q36 42 44 68L90 70Z" fill="currentColor" opacity=".45"/><path d="M90 32L45.5 27.9M90 46L42 41.5M90 58L41.5 54.9M52 14L90 22" stroke="currentColor" stroke-width="1.5"/><path d="M45.5 27.9L30 64M42 41.5L30 64M41.5 54.9L30 64M44 68L30 64" stroke="currentColor" stroke-width=".8" opacity=".6"/><path d="M86 74L84 16" stroke="currentColor" stroke-width="2.6"/><path d="M166 14L118 4Q96 46 108 88L166 90Z" fill="currentColor" opacity=".55"/><path d="M166 28L110.6 20.8M166 44L105.8 37.6M166 58L103.8 54.4M166 72L104.6 71.2M118 4L166 14M108 88L166 90" stroke="currentColor" stroke-width="1.6"/><path d="M110.6 20.8L120 96M105.8 37.6L120 96M103.8 54.4L120 96M104.6 71.2L120 96" stroke="currentColor" stroke-width=".8" opacity=".6"/><path d="M160 100L160 4" stroke="currentColor" stroke-width="3.2"/><path d="M160 5L176 8.5L160 12Z" fill="currentColor"/><path d="M250 30L212 20Q196 56 206 88L246 88Z" fill="currentColor" opacity=".45"/><path d="M249.2 42L205.6 37.8M248.1 58L202.5 55M247 74L202.6 71.8M212 20L250 30" stroke="currentColor" stroke-width="1.5"/><path d="M205.6 37.8L198 96M202.5 55L198 96M202.6 71.8L198 96" stroke="currentColor" stroke-width=".8" opacity=".6"/><path d="M234 98L247 24" stroke="currentColor" stroke-width="2.6"/><path d="M28 80L28 63Q64 62 102 71L102 94Z" fill="currentColor" opacity=".85"/><path d="M38 68h7v6h-7zM54 68h7v6h-7zM70 70h7v6h-7z" fill="var(--surface)"/><path d="M16 60L30 62M18 60V68M24 61V70" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M32 90L22 121L42 123L48 102Z" fill="currentColor" opacity=".8"/><path d="M33 108l3-3 3 3-3 3zM31 116l3-3 3 3-3 3z" fill="var(--surface)"/><path d="M24 74Q30 92 46 108Q150 130 250 110L274 84Q150 104 24 74Z" fill="currentColor"/><path d="M274 84L262 110" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M36 90Q150 116 264 96M42 100Q150 122 258 104" fill="none" stroke="var(--surface)" stroke-width="1.2"/><circle cx="250" cy="103" r="4.2" fill="var(--surface)"/><circle cx="251" cy="103" r="2" fill="currentColor"/>'
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
  document.body.dataset.plate='predict';
  document.body.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  const toolbar=document.createElement('div');toolbar.className='atlas-toolbar';
  toolbar.innerHTML='<button type="button" id="atlas-theme">Reading theme</button><button type="button" id="atlas-sources-open">Sources & assumptions</button>';
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
  // Glossary: cyclone and typhoon are one kind of storm, named by ocean.
  [...document.querySelectorAll('[data-glossary-entry]')].find(entry=>/^Transition months/.test(entry.querySelector('dt')?.textContent||''))?.insertAdjacentHTML('afterend',
    '<div data-glossary-entry data-atlas-entry="storm-names"><dt class="font-semibold text-white">Cyclone and typhoon</dt><dd>The same kind of storm: it is called a cyclone in the Indian Ocean (the Arabian Sea and the Bay of Bengal) and a typhoon in the western Pacific. The game’s log calls every storm a cyclone; the map, the event report and the port timing view call one on the Malacca–Quanzhou leg a typhoon.</dd></div>');
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
  const stageHeading=document.createElement('div');stageHeading.className='atlas-stage-heading';stageHeading.innerHTML='<div class="atlas-eyebrow">Navigate / the seasonal ocean</div><h2>Follow the season.</h2><p>Choose when to sail, what to carry, and where to build your next connection.</p>';
  // Live-play layout (2026-11-23): the heading opens the voyage screen across both columns, and the status strip
  // (month, treasury, hull, hold, and the page tools) sits directly above the map it describes.
  $('phase-sim').prepend(stageHeading);
  const status=document.createElement('div');status.className='atlas-status';status.setAttribute('role','region');status.setAttribute('aria-label','Voyage status');
  status.append($('hud-bar'));left.prepend(status);
  // The page tools also serve the setup and audit screens, so they join the strip only while the voyage screen shows.
  const headerRow=document.querySelector('header>div');
  const placeTools=()=>{const toolbar=document.querySelector('.atlas-toolbar');if(!toolbar)return;const target=$('phase-sim').classList.contains('hidden')?headerRow:status;if(toolbar.parentElement!==target)target.append(toolbar);};
  const mapKey=map.querySelector('p');mapKey.className='atlas-map-key';mapKey.innerHTML='<span><i class="atlas-key-wind" aria-hidden="true"></i>Game wind (one wind for the whole map)</span><span><i class="atlas-key-route" aria-hidden="true"></i>Selected route, drawn by this month’s wind:</span><span><svg class="atlas-key-line" viewBox="0 0 28 6" aria-hidden="true"><line x1="1" y1="3" x2="27" y2="3" data-wind="tailwind"/></svg>tailwind</span><span><svg class="atlas-key-line" viewBox="0 0 28 6" aria-hidden="true"><line x1="1" y1="3" x2="27" y2="3" data-wind="crosswind"/></svg>crosswind</span><span><svg class="atlas-key-line" viewBox="0 0 28 6" aria-hidden="true"><line x1="1" y1="3" x2="27" y2="3" data-wind="headwind"/></svg>headwind</span><span><svg class="atlas-key-line" viewBox="0 0 28 6" aria-hidden="true"><line x1="1" y1="3" x2="27" y2="3" data-wind="transition"/></svg>transition month</span><span><i class="atlas-key-port" aria-hidden="true"></i>Current port</span>';
  const calendar=document.createElement('section');calendar.className='atlas-calendar';calendar.setAttribute('aria-label','Departure month planner');
  calendar.innerHTML='<div class="atlas-calendar-head"><strong id="atlas-actual-date"></strong><span id="atlas-forecast-date"></span></div><div class="atlas-months" id="atlas-months"></div><p class="atlas-calendar-note">Outlined month = actual date. Pink month = comparison only. Sailing always uses the actual date.</p>';
  map.append(calendar);
  const caveat=document.createElement('p');caveat.className='atlas-calendar-note';caveat.textContent='Schematic geography, not to scale · arrows show the game’s wind at departure, not reconstructed historical weather · lanes are drawn through open water for clarity; the route label gives the game’s wind relation, bearing and sailing time this month.';map.append(caveat);
  const comparison=$('wind-comparison-heading').parentElement;
  const departure=$('routes-container').parentElement;departure.classList.add('atlas-departure');map.after(departure);
  departure.querySelector('h3').textContent='Choose your next port';
  departure.querySelector('span').textContent='Sail or stay';
  departure.querySelector('button[onclick="waitInPort()"] span').textContent='Wait one month ';
  // A16: keyboard focus previews a route, as hover does. setHoveredLane only redraws the map.
  $('routes-container').addEventListener('focusin',event=>{const button=event.target.closest?.('button[onclick^="sailTo"]');const id=button?.getAttribute('onclick').match(/'(\w+)'/)?.[1];if(id)setHoveredLane(id);});
  $('routes-container').addEventListener('focusout',()=>setHoveredLane(null));
  // A8: a double click must not sail or wait twice. The list re-renders under the second click.
  departure.addEventListener('click',event=>{if(event.detail>1&&event.target.closest?.('button')){event.stopPropagation();event.preventDefault();const card=$('atlas-event');(card&&!card.hidden?$('atlas-event-title'):departure.querySelector('h3')).focus?.({preventScroll:true});}},true);
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
  const market=$('market-tbody').closest('table').parentElement.parentElement;market.classList.add('atlas-trade');right.prepend(market);
  const narrow=typeof matchMedia==='function'?matchMedia('(max-width: 1099px)'):null;
  const placeMarket=()=>{if(narrow?.matches)map.after(market);else right.prepend(market);};
  narrow?.addEventListener?.('change',placeMarket);placeMarket();
  market.querySelector('h3').textContent='Trade at the waterfront';market.querySelector('span').textContent='Trade / material ecology';
  const marketScroll=market.querySelector('.overflow-x-auto');marketScroll.tabIndex=0;marketScroll.setAttribute('role','region');marketScroll.setAttribute('aria-label','Commodity market');
  const tableHint=document.createElement('p');tableHint.className='atlas-table-hint';tableHint.textContent='Prices at this port this month, per game lot. Sell here: what you receive for each lot you sell. Buy here: what each lot costs, including the port’s tariff. ▲ high / ▼ low: the sell price is more than 2 D above / below this port’s usual price. Next month: which way this port’s prices move next month (↑ rising, ↓ falling, – steady), from the game’s fixed seasonal cycle. Buy directions assume today’s tariff: if your standing here reaches 50, the tariff drops a point and the buy price with it. Select a good’s name for its prices through the year at every port.';marketScroll.before(tableHint);
  // One trade panel. The lower "collection in transit" panel duplicated the market's hold line; its unique
  // parts (drawn icons, tonnes aboard, the per-good weight bar and legend, tonnes available, the weight note)
  // move here and the panel is hidden. It stays in the page because the engine still writes its cargo shelf.
  hold.hidden=true;hold.setAttribute('aria-hidden','true');
  const holdLine=$('hold-util-label').closest('div.mb-3');holdLine.classList.add('atlas-hold-line');
  const engineBar=$('bar-bulk-tons').parentElement;engineBar.classList.add('atlas-engine-split');engineBar.nextElementSibling?.classList.add('atlas-engine-split');
  holdLine.append(holdManifest);
  const holdSplit=document.createElement('p');holdSplit.id='atlas-hold-split';holdSplit.className='atlas-hold-split';holdLine.append(holdSplit);
  const holdNote=document.createElement('p');holdNote.className='atlas-hold-note';holdNote.textContent='Game weight, not hull volume. The drawings are schematic material studies.';holdLine.append(holdNote);
  const marketHead=market.querySelectorAll('thead th');if(marketHead.length===4){marketHead[1].textContent='Prices here';marketHead[2].textContent='In your hold';}
  // Prices straight from the engine: getLivePortPrice is a fixed seasonal wave (no random term, no market depth);
  // the buy price adds the port's effective tariff exactly as buyCargoQty does.
  const sellAt=(item,port,month)=>getLivePortPrice(item,port,month);
  const buyAt=(item,port,month)=>Math.round(getLivePortPrice(item,port,month)*(1+getEffectiveTariff(port)));
  const direction=(now,next)=>next>now?'up':next<now?'down':'steady';
  const directionWord={up:'↑ rising',down:'↓ falling',steady:'– steady'};
  const chartDialog=document.createElement('dialog');chartDialog.id='atlas-price-chart';chartDialog.className='atlas-chart-dialog';chartDialog.setAttribute('aria-labelledby','atlas-chart-title');
  chartDialog.innerHTML='<div class="atlas-chart-head"><h2 id="atlas-chart-title"></h2><button type="button" id="atlas-chart-close">Close</button></div><p class="atlas-chart-note" id="atlas-chart-note"></p><ul class="atlas-chart-legend" id="atlas-chart-legend" aria-label="Ports"></ul><div id="atlas-chart-plot"></div><table class="atlas-chart-table" id="atlas-chart-table"></table><details class="atlas-chart-all"><summary>Every month at every port (table)</summary><table class="atlas-chart-table" id="atlas-chart-months"></table></details>';
  document.body.append(chartDialog);
  let chartOpener=null;
  $('atlas-chart-close').addEventListener('click',()=>chartDialog.close());
  chartDialog.addEventListener('close',()=>{const id=chartOpener;chartOpener=null;document.querySelector(`.atlas-good-chart[data-good="${id}"]`)?.focus();});
  const drawChart=id=>{
    const item=COMMODITIES.find(c=>c.id===id),ports=Object.keys(PORTS),here=state.currentPort;
    const yearStart=state.monthIndex-state.monthIndex%12,now=state.monthIndex%12;
    // Each point is the engine's buy price for that port in that calendar month of this campaign year.
    const series=ports.map(port=>({port,values:MONTHS.map((_,m)=>buyAt(item,port,yearStart+m))}));
    const lane=SEA_LANES.find(route=>route.from===here&&route.to===(state.hoveredLaneTo||state.windRouteTo));
    const arrival=lane?state.monthIndex+computeTransit(lane).months:null;
    $('atlas-chart-title').textContent=`${item.name}: buy price through the year`;
    const tariffs=ports.map(port=>Math.round(getEffectiveTariff(port)*100));
    $('atlas-chart-note').textContent=`Dirhams per lot (1 lot = ${item.weight} t), at every port, by month of the year. The game's prices follow a fixed seasonal cycle that repeats each year: nothing in them is random, and your own buying and selling never moves them. Buy prices include each port's tariff (${Math.min(...tariffs)}–${Math.max(...tariffs)}% for you now; it drops 1 point once your standing at a port reaches 50). Sell prices are the same curves without the tariff.`;
    $('atlas-chart-legend').innerHTML=series.map((line,i)=>`<li><i style="background:var(--atlas-series-${i+1})" aria-hidden="true"></i>${PORTS[line.port].name}${line.port===here?' (you are here)':''}</li>`).join('');
    const host=$('atlas-chart-plot'),W=Math.max(300,Math.min(640,Math.floor(host.clientWidth||600))),narrow=W<440,H=narrow?250:300;
    const L=44,P=10,R=narrow?78:96,T=26,B=30,plotW=W-L-R,plotH=H-T-B,step=(plotW-P)/11;
    const all=series.flatMap(line=>line.values);let lo=Math.min(...all),hi=Math.max(...all);
    const raw=(hi-lo)/4||1,mag=10**Math.floor(Math.log10(raw)),tick=[1,2,5,10].map(f=>f*mag).find(t=>t>=raw);
    lo=Math.floor(lo/tick)*tick;hi=Math.ceil(hi/tick)*tick;if(hi===lo)hi=lo+tick;
    const X=m=>L+P+m*step,Y=v=>T+(hi-v)/(hi-lo)*plotH,f=n=>+n.toFixed(2);
    let svg=`<svg id="atlas-chart-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="atlas-chart-title" aria-describedby="atlas-chart-table" data-left="${L+P}" data-step="${f(step)}" data-top="${T}" data-bottom="${T+plotH}" data-y-min="${lo}" data-y-max="${hi}" data-year-start="${yearStart}">`;
    for(let v=lo;v<=hi+1e-9;v+=tick)svg+=`<line class="atlas-chart-grid" x1="${L}" x2="${L+plotW}" y1="${f(Y(v))}" y2="${f(Y(v))}"/><text class="atlas-chart-axis" x="${L-6}" y="${f(Y(v)+4)}" text-anchor="end">${v}</text>`;
    MONTHS.forEach((name,m)=>{if(!narrow||m%2===0)svg+=`<text class="atlas-chart-axis" x="${f(X(m))}" y="${H-10}" text-anchor="middle">${name}</text>`;});
    svg+=`<line class="atlas-chart-marker" data-mark="now" data-month="${now}" x1="${f(X(now))}" x2="${f(X(now))}" y1="${T-6}" y2="${T+plotH}"/><text class="atlas-chart-mark-label" x="${f(X(now))}" y="${T-10}" text-anchor="middle">Now</text>`;
    if(arrival!==null){const a=arrival%12;svg+=`<line class="atlas-chart-marker atlas-chart-arrival" data-mark="arrival" data-month="${a}" x1="${f(X(a))}" x2="${f(X(a))}" y1="${T-6}" y2="${T+plotH}"/>`;}
    series.forEach((line,i)=>{
      const mine=line.port===here;
      svg+=`<polyline class="atlas-chart-line${mine?' atlas-chart-here':''}" data-port="${line.port}" style="stroke:var(--atlas-series-${i+1})" points="${line.values.map((v,m)=>`${f(X(m))},${f(Y(v))}`).join(' ')}"/>`;
      svg+=line.values.map((v,m)=>`<circle class="atlas-chart-point" cx="${f(X(m))}" cy="${f(Y(v))}" r="3" style="fill:var(--atlas-series-${i+1})"><title>${PORTS[line.port].name}, ${MONTHS[m]}: buy ${v} D</title></circle>`).join('');
    });
    if(arrival!==null){const a=arrival%12,dest=series.find(line=>line.port===lane.to);svg+=`<circle class="atlas-chart-arrive-dot" cx="${f(X(a))}" cy="${f(Y(dest.values[a]))}" r="6"><title>Arrive ${PORTS[lane.to].name} in ${MONTHS[a]}: buy ${dest.values[a]} D</title></circle>`;}
    // Direct labels at the line ends, nudged apart so they never overlap.
    const ends=series.map((line,i)=>({i,port:line.port,y:Y(line.values[11])})).sort((a,b)=>a.y-b.y);
    for(let k=1;k<ends.length;k++)ends[k].y=Math.max(ends[k].y,ends[k-1].y+13);
    const overflow=ends.at(-1).y-(T+plotH);if(overflow>0)ends.forEach(e=>e.y-=overflow);
    for(const e of ends)svg+=`<line class="atlas-chart-leader" x1="${f(X(11)+4)}" x2="${f(X(11)+12)}" y1="${f(e.y)}" y2="${f(e.y)}" style="stroke:var(--atlas-series-${e.i+1})"/><text class="atlas-chart-end${e.port===here?' atlas-chart-here-label':''}" x="${f(X(11)+15)}" y="${f(e.y+4)}">${PORTS[e.port].name}</text>`;
    svg+='</svg>';
    const arrivalText=arrival===null?'':` Dashed line: you would arrive at ${PORTS[lane.to].name} in ${MONTHS[arrival%12]}${arrival>=CAMPAIGN_MONTHS?', after the campaign ends':''} on the selected route (ringed), when its buy price is ${series.find(line=>line.port===lane.to).values[arrival%12]} D.`;
    host.innerHTML=`<p class="atlas-chart-key">Solid line: now (${MONTHS[now]}).${arrivalText} Thick line: your port.</p>`+svg;
    $('atlas-chart-table').innerHTML=`<caption>Highest and lowest buy price this year</caption><thead><tr><th scope="col">Port</th><th scope="col">Now</th><th scope="col">Highest</th><th scope="col">Lowest</th></tr></thead><tbody>`+series.map(line=>{
      const max=Math.max(...line.values),min=Math.min(...line.values);
      return `<tr data-port="${line.port}"><th scope="row">${PORTS[line.port].name}</th><td>${line.values[now]} D</td><td>${max} D (${MONTHS[line.values.indexOf(max)]})</td><td>${min} D (${MONTHS[line.values.indexOf(min)]})</td></tr>`;}).join('')+'</tbody>';
    $('atlas-chart-months').innerHTML=`<caption>${item.name}: buy price by month (D per lot)</caption><thead><tr><th scope="col">Month</th>${series.map(line=>`<th scope="col" data-port="${line.port}"><span class="atlas-name-full">${PORTS[line.port].name}</span><abbr class="atlas-name-short" title="${PORTS[line.port].name}">${PORTS[line.port].name.slice(0,3)}</abbr></th>`).join('')}</tr></thead><tbody>`+MONTHS.map((name,m)=>`<tr data-month="${m}"><th scope="row">${name}${m===now?' <span class="atlas-port-tag">now</span>':''}</th>${series.map(line=>`<td data-port="${line.port}">${line.values[m]}</td>`).join('')}</tr>`).join('')+'</tbody>';
  };
  $('market-tbody').addEventListener('click',event=>{const button=event.target.closest?.('.atlas-good-chart');if(!button)return;chartOpener=button.dataset.good;chartDialog.showModal();drawChart(chartOpener);});
  const photo=$('ship-photo');const shipPlate=document.createElement('div');shipPlate.id='atlas-ship';shipPlate.className='atlas-ship';shipPlate.setAttribute('role','img');photo.replaceWith(shipPlate);
  const sourceDialog=document.createElement('dialog');sourceDialog.id='atlas-source-dialog';sourceDialog.className='atlas-source-dialog';sourceDialog.setAttribute('aria-labelledby','atlas-source-title');
  sourceDialog.innerHTML='<h2 id="atlas-source-title">How we know</h2><p>This presentation keeps the original game model. Its numbers are learning tools, not calibrated historical estimates.</p><h3>Historical references</h3><ul>'+Object.values(sources).map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join('')+'</ul><h3>Game assumptions</h3><p>One simplified seasonal wind applies across the map. Ship speeds, cargo weights, prices, tariffs, hazards and standing effects are game parameters. Quanzhou’s Song–Yuan setting and Malacca’s fifteenth-century rise are compressed into one circuit.</p><p>Port stories in the voyage log are fictional scenes written for the game, not sourced events.</p><p>Vessel and commodity drawings are schematic illustrations, not archaeological reconstructions. References above are starting points from the repository reading list; this page does not certify every existing historical claim.</p><p><a href="https://github.com/Antooooon125/Week3-monsoon-navigator/blob/ba2f279/README.md" target="_blank" rel="noopener noreferrer">Read the model description and known limitations</a></p><form method="dialog"><button>Close sources</button></form>';
  document.body.append(sourceDialog);$('atlas-sources-open').addEventListener('click',()=>sourceDialog.showModal());
  const footer=document.createElement('footer');footer.className='atlas-footer';footer.innerHTML='<span>Original game: Amnuayvit Thitibordin (KVIS) · CC BY-NC-SA 4.0 with a Commercial Derivative Exception · <a href="https://github.com/Antooooon125/Week3-monsoon-navigator" target="_blank" rel="noopener noreferrer">Original game source</a></span><span>An Atlas of Moving Worlds: art direction and adaptation by Thanakrit Wongsatit, with AI assistance · <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> with a Commercial Derivative Exception · Collaborator: Guntitat Sawadwuthikul</span>';document.body.append(footer);
  // Simplify inherited headings while keeping numerical definitions and model controls.
  const labels=[['#voyage-log','h3','Voyage log']];
  for(const [id,tag,text] of labels){if(!tag)continue;const node=document.querySelector(id);const heading=node.parentElement.querySelector(tag);if(heading)heading.textContent=text;}
  right.lastElementChild.querySelector('h3').textContent='Care for ship and crew';
  // Live-play layout: the care panel sits under the map as a row of cards (stacked on phones), so the left column
  // lines up with the market. Each card is a flexible column (text, then its button), so longer contract or status
  // text can be added later without a relayout. Hiring behaviour and wording are unchanged.
  const care=right.lastElementChild;care.classList.add('atlas-care');care.setAttribute('role','region');care.setAttribute('aria-label','Care for ship and crew');
  const careCards=document.createElement('div');careCards.className='atlas-care-cards';
  for(const card of [...(care.children||[])].slice(2))careCards.append(card);care.append(careCards);
  map.after(care);
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
  const mapView={top:0,height:450};
  const land=ocean.querySelector('g[fill="#243950"]');land.setAttribute('id','atlas-land');
  // Real coastlines (Natural Earth 1:50m, inlined by the builder) leave less open water than the hand-drawn map did.
  // These positions keep the sea labels and the wind clock off land; tests/sea-lanes.test.mjs checks them against the coastline.
  const mapPlacements={bayOfBengal:[454,199],southChinaSea:[678,180],clock:[574,376]};
  for(const label of ocean.querySelectorAll(':scope > text')){
    const name=label.textContent.trim();
    if(name==='BAY OF BENGAL')label.setAttribute('y',mapPlacements.bayOfBengal[1]);
    if(name==='SOUTH CHINA SEA'){const [x,y]=mapPlacements.southChinaSea;label.setAttribute('text-anchor','middle');label.setAttribute('x',x);label.setAttribute('y',y);label.innerHTML=`<tspan x="${x}" y="${y}">SOUTH</tspan><tspan x="${x}" dy="12.5">CHINA</tspan><tspan x="${x}" dy="12.5">SEA</tspan>`;}
  }
  $('svg-clock-months').parentElement.setAttribute('transform',`translate(${mapPlacements.clock[0]}, ${mapPlacements.clock[1]})`);
  const landMask=[...land.querySelectorAll('path')].map(path=>`<path d="${path.getAttribute('d')}" fill="black"/>`).join('');
  defs.insertAdjacentHTML('beforeend',`<radialGradient id="atlas-sea-light" cx="43%" cy="42%" r="70%"><stop stop-color="var(--field)" stop-opacity=".16"/><stop offset="1" stop-color="var(--sea)" stop-opacity="0"/></radialGradient><linearGradient id="atlas-wind-spectrum" x1="0" y1="1" x2="1" y2="0"><stop stop-color="var(--field)"/><stop offset=".72" stop-color="var(--spectral)"/><stop offset="1" stop-color="#ec9abe"/></linearGradient><mask id="atlas-ocean-mask" maskUnits="userSpaceOnUse" x="0" y="${mapView.top}" width="800" height="${mapView.height}"><rect y="${mapView.top}" width="800" height="${mapView.height}" fill="white"/>${landMask}<rect x="${mapPlacements.clock[0]-78}" y="${mapPlacements.clock[1]-78}" width="156" height="156" fill="black"/></mask><marker id="atlas-wind-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M1 2L8 5L1 8" fill="none" stroke="var(--field)" stroke-width="1.4"/></marker>`);
  const atmosphere=document.createElementNS('http://www.w3.org/2000/svg','g');atmosphere.id='atlas-atmosphere';atmosphere.setAttribute('pointer-events','none');atmosphere.setAttribute('aria-hidden','true');atmosphere.innerHTML=`<rect y="${mapView.top}" width="800" height="${mapView.height}" fill="url(#atlas-sea-light)"/><text x="285" y="403" fill="var(--field)" opacity=".32" font-size="13" letter-spacing="7">INDIAN OCEAN</text>`;land.before(atmosphere);
  $('svg-wind-field').setAttribute('mask','url(#atlas-ocean-mask)');$('svg-wind-field').setAttribute('aria-hidden','true');$('svg-wind-field').setAttribute('pointer-events','none');

  // Replace a purely presentational renderer with local, offline SVG illustrations.
  renderVoyageVisuals=function(port,vessel,usedTonnage){
    const shipName=state.vesselKey==='junk'?'Chinese ocean-going junk':vessel.name;
    $('atlas-ship').innerHTML=svg(ships[state.vesselKey]);$('atlas-ship').setAttribute('aria-label',`${shipName}, schematic illustration`);
    $('ship-name').textContent=shipName;$('ship-credit').textContent='Schematic illustration; reference photograph: '+(state.vesselKey==='dhow'?'Jewel of Muscat reconstruction · Jacklee · CC BY-SA 3.0':'Zheng He treasure ship model · Mike Peel · CC BY-SA 4.0');
    $('ship-credit').href='https://commons.wikimedia.org/wiki/File:'+SHIP_PHOTOS[state.vesselKey][1];
    for(const [meter,value] of [['hull',state.hull],['crew',state.crewHealth]]){$(meter+'-meter').value=value;$(meter+'-meter-value').textContent=value+'%';}
    $('atlas-hold-manifest').setAttribute('role','img');$('atlas-hold-manifest').setAttribute('aria-label',`${usedTonnage} of ${vessel.capacity} tons loaded; ${vessel.capacity-usedTonnage} tons available.`);
    $('atlas-hold-manifest').innerHTML='<div class="atlas-weight-bar">'+COMMODITIES.filter(item=>state.cargo[item.id]>0).map(item=>`<span style="width:${state.cargo[item.id]*item.weight/vessel.capacity*100}%;background:${goods[item.id][0]}" title="${item.name}: ${state.cargo[item.id]*item.weight} tons"></span>`).join('')+`</div><ul class="atlas-manifest-legend">`+COMMODITIES.filter(item=>state.cargo[item.id]>0).map(item=>`<li><i style="background:${goods[item.id][0]}" aria-hidden="true"></i>${item.name} ${state.cargo[item.id]*item.weight} t</li>`).join('')+`</ul><div class="atlas-manifest-label"><span></span><span data-free="${vessel.capacity-usedTonnage}">${vessel.capacity-usedTonnage} t available</span></div>`;
    const split=getBulkAndLuxuryTonnage();
    $('atlas-hold-split').textContent=`The game's freight split: bulk ${split.bulk} t · spices & luxury ${split.luxury} t (it counts pepper as luxury).`;
  };
  const paintCalendar=()=>{
    const actual=state.monthIndex%12,forecast=getForecastMonthIndex();
    $('atlas-actual-date').textContent=`Actual: ${MONTHS[actual]} · month ${state.monthIndex+1}/24`;
    $('atlas-forecast-date').textContent=forecast===null?'Choose a future month':`Comparison: ${MONTHS[forecast%12]} · month ${forecast+1}/24`;
    $('atlas-months').innerHTML=MONTHS.map((name,index)=>{const wait=(index-actual+12)%12,enabled=wait>0&&state.monthIndex+wait<CAMPAIGN_MONTHS;return `<button type="button" data-month="${index}" ${index===actual?'aria-current="date"':''} aria-pressed="${forecast!==null&&index===forecast%12}" ${enabled?'':'disabled'} aria-label="${name}${index===actual?', actual month':enabled?', compare departure':' unavailable within this campaign'}">${name}</button>`;}).join('');
  };
  $('atlas-months').addEventListener('click',event=>{const button=event.target.closest('button[data-month]');if(button){const month=Number(button.dataset.month);previewClockMonth(month);$('atlas-months').querySelector(`[data-month="${month}"]`)?.focus();}});
  const clock=$('svg-clock-months').parentElement;clock.classList?.add('atlas-clock');
  clock.insertAdjacentHTML?.('beforeend','<text x="-30" y="52" class="atlas-clock-label" text-anchor="middle">SW</text><text x="-30" y="-42" class="atlas-clock-label" text-anchor="middle">NE</text>');
  const comparisonOriginal=renderWindComparison;renderWindComparison=function(){comparisonOriginal();paintCalendar();};
  // Sea lanes through fixed sea waypoints (map units), so no lane crosses the map's land shapes.
  // Display only: the engine's distances, bearings and sailing times are unchanged.
  // Checked against the inlined Natural Earth coastline by tests/sea-lanes.test.mjs (no point on land; at least 1.5 units of water outside 9 units of each port).
  const seaWaypoints={
    'kilwa-aden':[[118,318],[135,285],[172,240],[200,200],[194,174],[172,172],[150,177]],
    'kilwa-calicut':[[125,320],[200,285],[290,240],[345,205]],
    'aden-calicut':[[150,177],[170,172],[190,166],[225,163],[280,168],[340,178]],
    'calicut-malacca':[[370,200],[384,224],[404,235],[430,237],[500,236],[545,217],[566,225],[574,234],[582,246]],
    'malacca-quanzhou':[[598,258],[606,262.3],[616,263],[632,252],[640,225],[660,190],[680,150],[704,120],[718,104]]
  };
  const lanePoints=(from,to)=>{const mids=seaWaypoints[`${from}-${to}`]||[...(seaWaypoints[`${to}-${from}`]||[])].reverse();return [[PORTS[from].x,PORTS[from].y],...mids,[PORTS[to].x,PORTS[to].y]];};
  // Storm names by basin (display only; the engine's own text says "cyclone" everywhere). One rule: a leg is in the western
  // Pacific if any point of its drawn route (its ports or sea waypoints) lies east of Malacca, the port on the Strait of
  // Malacca. A storm there is a typhoon; anywhere else (Arabian Sea, Bay of Bengal, the Malacca approaches) a cyclone.
  const stormBasin=(from,to)=>lanePoints(from,to).some(([x])=>x>PORTS.malacca.x)?'pacific':'indian';
  const stormName=(from,to)=>stormBasin(from,to)==='pacific'?'typhoon':'cyclone';
  const capital=word=>word[0].toUpperCase()+word.slice(1);
  // Straight to the first midpoint, a quadratic through each waypoint, straight to the port: the curve stays inside each corner.
  const lanePath=points=>{const f=n=>+n.toFixed(1),mid=(a,b)=>[f((a[0]+b[0])/2),f((a[1]+b[1])/2)];let d=`M ${points[0][0]},${points[0][1]}`;
    if(points.length===2)return d+` L ${points[1][0]},${points[1][1]}`;
    const first=mid(points[0],points[1]);d+=` L ${first[0]},${first[1]}`;
    for(let i=1;i<points.length-1;i++){const m=i<points.length-2?mid(points[i],points[i+1]):points[i+1];d+=` Q ${points[i][0]},${points[i][1]} ${m[0]},${m[1]}`;}
    return d;};
  const portAt=(x,y)=>Object.values(PORTS).find(port=>Math.abs(port.x-x)<1&&Math.abs(port.y-y)<1)?.id;
  // The wind relation in the engine's own terms (computeTransit), for the actual month.
  const windRelation=calc=>calc.isHeadwind?['headwind','Headwind']:calc.isTailwind?['tailwind','Tailwind']:calc.isDeadZone?['transition','Transition month']:['crosswind','Crosswind'];
  const mapOriginal=renderSVGMap;renderSVGMap=function(wind){
    mapOriginal(wind);ocean.querySelector(':scope > rect').setAttribute('fill','var(--sea)');
    const angle=wind.bearing*Math.PI/180,dx=Math.sin(angle)*54,dy=-Math.cos(angle)*54;
    const tracers=[];
    for(let row=0;row<8;row++)for(let column=0;column<13;column++){
      const x=column*64+(row%2)*26-12,y=row*59+12,index=row*13+column;
      tracers.push(`<line x1="${x}" y1="${y}" x2="${(x+dx).toFixed(2)}" y2="${(y+dy).toFixed(2)}" class="atlas-wind-tracer" style="animation-delay:-${index%9*.6}s" ${index%7===0?'marker-end="url(#atlas-wind-arrow)"':''}/>`);
    }
    $('svg-wind-field').innerHTML=tracers.join('');
    // Dashed lanes: the engine's arcs, redrawn through the sea waypoints with the engine's own styling.
    for(const path of $('svg-sea-lanes').querySelectorAll('path')){
      const n=(path.getAttribute('d')||'').match(/-?[\d.]+/g)?.map(Number);if(!n||n.length<4)continue;
      const a=portAt(n[0],n[1]),b=portAt(n.at(-2),n.at(-1));if(a&&b)path.setAttribute('d',lanePath(lanePoints(a,b)));
    }
    // Selected route: the same sea lane, styled by its wind relation and labelled in words.
    const preview=$('svg-route-preview'),line=preview.querySelector?.('line');
    const to=state.hoveredLaneTo||state.windRouteTo,lane=SEA_LANES.find(route=>route.from===state.currentPort&&route.to===to);
    if(line&&line.getAttribute&&lane){
      const calc=computeTransit(lane),[kind,word]=windRelation(calc);
      const curve=document.createElementNS('http://www.w3.org/2000/svg','path');
      curve.setAttribute('d',lanePath(lanePoints(lane.from,lane.to)));curve.setAttribute('fill','none');curve.setAttribute('data-wind',kind);
      for(const attr of ['stroke','stroke-width','marker-end'])if(line.getAttribute(attr))curve.setAttribute(attr,line.getAttribute(attr));
      line.replaceWith(curve);
      const text=`${word} · ${lane.bearing}° · ~${calc.days} d (${calc.months} mo)`,width=Math.round(text.length*5.6+16);
      let mid=[(PORTS[lane.from].x+PORTS[lane.to].x)/2,(PORTS[lane.from].y+PORTS[lane.to].y)/2];
      if(curve.getTotalLength){const half=curve.getPointAtLength(curve.getTotalLength()/2);mid=[half.x,half.y];}
      const x=Math.min(800-width/2-4,Math.max(width/2+4,mid[0])),y=Math.min(mapView.top+mapView.height-10,Math.max(mapView.top+18,mid[1]-16));
      const rect=preview.querySelector('rect'),label=preview.querySelector('text');
      if(rect){rect.setAttribute('x',x-width/2);rect.setAttribute('y',y-12);rect.setAttribute('width',width);}
      if(label){label.setAttribute('x',x);label.setAttribute('y',y+1);label.textContent=text;}
      preview.setAttribute?.('aria-label',`Selected route ${PORTS[lane.from].name} to ${PORTS[lane.to].name}: ${text}`);
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
      const [voyage,effects]=entry.split(' | Events: ');
      // The leg comes from the entry itself ("[M3 • Mar] Sailed A → B" or "… Attempted A → B"), so the basin matches the voyage reported.
      const legNames=voyage.match(/(?:Sailed|Attempted) (.+?) → (.+?)(?: \(TURNED BACK\))? \(/),byName=name=>Object.values(PORTS).find(p=>p.name===name)?.id;
      const leg=legNames&&byName(legNames[1])&&byName(legNames[2])?[byName(legNames[1]),byName(legNames[2])]:null,storm=leg?stormName(...leg):'cyclone';
      displayedTypes.add(kind[0]);eventCard.dataset.kind=kind[0];if(leg)eventCard.dataset.basin=stormBasin(...leg);else delete eventCard.dataset.basin;
      $('atlas-event-title').textContent=kind[0]==='cyclone'?`A ${storm} on the crossing`:kind[2];
      $('atlas-event-message').textContent=voyage;
      $('atlas-event-consequences').innerHTML='';
      // The engine's words are kept; a storm line gets the basin's name beside it.
      if(effects)for(const effect of effects.split('; ')){const item=document.createElement('li');item.textContent=effect+(leg&&/cyclone/i.test(effect)?(storm==='typhoon'?' (western Pacific: a typhoon)':' (Indian Ocean cyclone)'):'');$('atlas-event-consequences').append(item);}
      eventCard.hidden=false;$('atlas-event-title').focus();break;
    }
    const windBadge=$('wind-regime-badge');windBadge.textContent=windBadge.textContent.replace(/\((\d+)° ([NESW]{1,3})\)/,'(blowing toward $2, $1°)');
    // Labels come from the same functions buyCargoQty and sellCargoQty use, so they cannot be swapped.
    const tariffHere=getEffectiveTariff(state.currentPort);
    document.querySelectorAll('#market-tbody tr').forEach((row,index)=>{
      const item=COMMODITIES[index];if(!item||row.children.length<4)return;
      const sell=getLivePortPrice(item,state.currentPort,state.monthIndex),buy=Math.round(sell*(1+tariffHere)),usual=item.prices[state.currentPort];
      const trend=sell-usual>2?'<span class="atlas-trend" data-level="high" title="More than 2 D above this port’s usual price">▲ high</span>':sell-usual<-2?'<span class="atlas-trend" data-level="low" title="More than 2 D below this port’s usual price">▼ low</span>':'';
      let next='<div class="atlas-next">Next month: the campaign ends</div>';
      if(state.monthIndex+1<CAMPAIGN_MONTHS){
        const buyNext=buyAt(item,state.currentPort,state.monthIndex+1),sellNext=sellAt(item,state.currentPort,state.monthIndex+1);
        const b=direction(buy,buyNext),sl=direction(sell,sellNext);
        next=`<div class="atlas-next" data-buy-next="${b}" data-sell-next="${sl}" title="Next month here: buy ${buyNext} D, sell ${sellNext} D">Next month: ${b===sl?directionWord[b]:`buy ${directionWord[b]}, sell ${directionWord[sl]}`}</div>`;
      }
      row.children[1].innerHTML=`<div class="atlas-price-sell"><span class="atlas-price-label">Sell here</span> <b>${sell} D</b>${trend}</div><div class="atlas-price-buy"><span class="atlas-price-label">Buy here</span> <b>${buy} D</b></div>${next}`;
      const nameCell=row.children[0].firstElementChild;
      row.dataset.loaded=String(state.cargo[item.id]>0);
      if(nameCell)nameCell.innerHTML=`<span class="atlas-row-icon" style="color:${goods[item.id][0]}">${svg(goods[item.id][1],'0 0 140 110')}</span><button type="button" class="atlas-good-chart" data-good="${item.id}" aria-haspopup="dialog" title="Prices through the year at every port">${item.name}</button> <span class="font-mono text-[10px] text-slate-400">(${item.weight}T)</span>`;
      const held=state.cargo[item.id];
      row.children[2].innerHTML=held>0?`<div class="atlas-held"><b>${held}</b> held</div><div class="atlas-held-tons">${held*item.weight} t aboard</div><div class="atlas-basis">you paid ${state.costBasis[item.id]} D each (average)</div>`:'<div class="atlas-held"><b>0</b> held</div>';
    });
    document.querySelectorAll('#market-tbody button').forEach(button=>{const row=button.closest('tr');if(button.classList.contains('atlas-good-chart')){button.setAttribute('aria-label',`${button.textContent.trim()}: prices through the year`);return;}button.setAttribute('aria-label',`${button.textContent.trim()} ${row.querySelector('td').textContent.trim().replace(/\s+/g,' ')}`);});
    document.querySelectorAll('#market-tbody tr').forEach((row,index)=>{const item=COMMODITIES[index];row.dataset.good=item.id;row.style.setProperty('--material',goods[item.id][0]);});
  };
  const renderOriginal=renderAll;renderAll=function(){renderOriginal();paint();placeTools();};
  const finishOriginal=finishCampaign;finishCampaign=function(){finishOriginal();placeTools();document.body.dataset.plate='audit';const profit=state.cash-state.startEquity;const result=`Your venture finished with ${state.cash.toLocaleString()} D in cash: a net ${profit<0?'loss':'gain'} of ${Math.abs(profit).toLocaleString()} D`;$('atlas-audit-summary').textContent=isStudent()?`${result} against your ${state.targetProfit.toLocaleString()} D profit target.`:`${result}.`;$('atlas-audit-eyebrow').textContent=isStudent()?'Audit / prediction and evidence':'Results / voyage evidence';$('atlas-audit-prompt').textContent=isStudent()?'Compare your prediction with the ledger. Choose two dated entries that explain the result.':'Choose two dated entries in the ledger that explain the result.';$('phase-audit').tabIndex=-1;
    if(!isStudent()){
      // A7: Play Only has no target, so show no goal or target verdict.
      $('audit-roi').textContent=$('audit-roi').textContent.replace(/\s*\(Goal:[^)]*\)/,'');
      const badge=$('audit-outcome-badge');badge.textContent=state.cash-state.startEquity>0?'PROFITABLE VOYAGE':'VENTURE DEFICIT';badge.className='inline-block px-3 py-1 rounded-full text-xs font-mono font-bold atlas-play-badge';
    }
    $('audit-ports-visited').textContent=$('audit-ports-visited').textContent.replace('Emporia Visited','ports visited');
    $('audit-vessel-meta').textContent=$('audit-vessel-meta').textContent.replace('Chinese Treasure Junk','Chinese ocean-going junk');
    // A9: open the audit at its top.
    $('phase-audit').scrollIntoView?.({block:'start'});$('phase-audit').focus({preventScroll:true});};
  // Student Mode validation accessibility: alert role, aria-invalid, focus-first-error, and form attributes.
  $('setup-error')?.setAttribute?.('role','alert');
  $('setup-error')?.setAttribute?.('aria-live','polite');
  $('input-name')?.setAttribute?.('name','studentName');
  $('input-name')?.setAttribute?.('autocomplete','name');
  $('input-id')?.setAttribute?.('name','studentId');
  $('input-id')?.setAttribute?.('autocomplete','off');
  [$('input-hypothesis'),$('input-reflection')].forEach(el=>{if(el?.placeholder)el.placeholder=el.placeholder.replace(/\.\.\./g,'…');});
  [$('input-name'),$('input-id'),$('input-target-profit'),$('input-hypothesis')].forEach(el=>el?.addEventListener?.('input',()=>el.removeAttribute?.('aria-invalid')));
  // A9: start the voyage at the top of the page.
  const startOriginal=startSimulation;startSimulation=function(...args){
    startOriginal(...args);
    const err=$('setup-error');
    if(err&&!err.classList.contains('hidden')){
      const checks=[
        [$('input-name'),!$('input-name')?.value.trim()],
        [$('input-id'),!$('input-id')?.value.trim()],
        [$('input-target-profit'),!(Number($('input-target-profit')?.value)>=100)],
        [$('input-hypothesis'),!$('input-hypothesis')?.value.trim()]
      ];
      let firstInvalid=null;
      checks.forEach(([el,bad])=>{if(!el)return;if(bad){el.setAttribute?.('aria-invalid','true');if(!firstInvalid)firstInvalid=el;}else el.removeAttribute?.('aria-invalid');});
      firstInvalid?.focus?.();
      return;
    }
    if(state.logs.length&&typeof scrollTo==='function'){scrollTo(0,0);stageHeading.querySelector('h2').tabIndex=-1;stageHeading.querySelector('h2').focus?.({preventScroll:true});}
  };
  // Prevent accidental refresh/tab close mid-voyage.
  if(typeof window!=='undefined'&&window.addEventListener){
    window.addEventListener('beforeunload',event=>{if(!state.ended&&state.monthIndex>0){event.preventDefault();event.returnValue='';}});
  }
  // Keep browser theme-color meta synced with Atlas light/dark theme.
  const syncThemeMeta=()=>{let m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.append(m);}m.content=document.body.dataset.theme==='dark'?'#101821':'#f1f0e8';};
  syncThemeMeta();
  $('atlas-theme')?.addEventListener('click',syncThemeMeta);
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
  // ---------------------------------------------------------------------------------------------
  // Risk and timing (2026-11-23): storms and pirates on the map, a crew-health alert, a port timing view.
  // Display only. The engine is unchanged; nothing here draws randomness or changes state.
  // ---------------------------------------------------------------------------------------------
  // Pirate chance on arrival, exactly as sailTo computes pirateProb (tests/03/atlas-hazards.test.mjs
  // reads the engine's constants from its source and checks this against them).
  const pirateChance=(dest,{marines=state.specialists.marines,cargo=state.cargo}={})=>{
    const valuable=cargo.cloves>0||cargo.ivory>0;
    let p=PORTS[dest].piracyRisk*(valuable?1.5:0.6)*(state.diffKey==='survival'?1.8:1.0);
    if(marines)p*=0.2;
    if((state.diaspora[dest]||0)>=50)p*=0.5;
    return p;
  };
  const pct=p=>`${Math.round(p*100)}%`;
  // The turn-back chance on a headwind leg, and the health lost at sea, as in sailTo.
  const TURN_BACK=0.35,CREW_PER_MONTH=8,CREW_HAZARD=12;

  // 1. Storms and pirates that actually happened, decoded from the engine's own draws in sailTo's fixed order:
  //    headwind [damage, turn-back, (jettison if teak aboard and not turned back)]; transition month
  //    [storm roll, (storm damage if storm)]; [mildew if textiles aboard, no tarpaulins, transition month];
  //    [piracy, unless turned back]; [mutiny]. Turn-back is read from state (the ship stays in port).
  const hazardLayer=document.createElementNS('http://www.w3.org/2000/svg','g');hazardLayer.id='atlas-hazards';hazardLayer.setAttribute('aria-hidden','true');ocean.append(hazardLayer);
  const voyageNote=document.createElement('p');voyageNote.id='atlas-voyage-note';voyageNote.className='atlas-voyage-note';voyageNote.setAttribute('role','status');voyageNote.setAttribute('aria-live','polite');voyageNote.hidden=true;
  map.querySelector('.atlas-map-key')?.after(voyageNote);
  let lastVoyage=null;
  const pointAlong=(points,t)=>{const seg=[];let total=0;for(let i=1;i<points.length;i++){const l=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);seg.push(l);total+=l;}
    let d=t*total;for(let i=0;i<seg.length;i++){if(d<=seg[i]){const f=seg[i]?d/seg[i]:0;return [points[i][0]+(points[i+1][0]-points[i][0])*f,points[i][1]+(points[i+1][1]-points[i][1])*f];}d-=seg[i];}return points.at(-1);};
  const glyph={
    storm:'<circle r="11" class="atlas-hazard-disc"/><path d="M-5 -2a6 6 0 1 1 3 7M5 2a6 6 0 1 1-3-7" class="atlas-hazard-line"/><circle r="1.8" class="atlas-hazard-dot"/>',
    pirates:'<circle r="11" class="atlas-hazard-disc"/><path d="M-5 7V-7M-5 -7L6 -3L-5 1" class="atlas-hazard-line"/><circle cx="0.5" cy="-3" r="1.3" class="atlas-hazard-dot"/>'
  };
  const paintHazards=()=>{
    const v=lastVoyage&&lastVoyage.month===state.monthIndex&&lastVoyage.port===state.currentPort?lastVoyage:null;
    if(!v){hazardLayer.innerHTML='';voyageNote.hidden=true;voyageNote.textContent='';return;}
    const points=lanePoints(v.from,v.to),marks=[];
    if(v.storm){const [x,y]=pointAlong(points,0.3);marks.push(`<g class="atlas-hazard" data-kind="storm" data-basin="${stormBasin(v.from,v.to)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><title>${capital(stormName(v.from,v.to))}</title>${glyph.storm}</g>`);}
    if(v.pirates){const [x,y]=pointAlong(points,0.8);marks.push(`<g class="atlas-hazard" data-kind="pirates" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><title>Pirates</title>${glyph.pirates}</g>`);}
    hazardLayer.innerHTML=marks.join('');
    const parts=[];
    if(v.storm)parts.push(`${capital(stormName(v.from,v.to))} on the crossing (storm icon on the map)${v.hullLoss>0?`: hull −${v.hullLoss}%`:''}${v.hullAfter<=5?`${v.hullLoss>0?',':':'} hull at its minimum (5%)`:''}.`);
    if(v.pirates)parts.push(`Pirates on arrival (flag icon on the map): ${(v.pirateOutcome||'an encounter').replace(/[!.\s]+$/,'')}.`);
    // Unhide before writing, so screen readers announce the new text; rewrite only when it changes.
    const note=parts.length?`Last voyage, ${PORTS[v.from].name} → ${PORTS[v.to].name}: ${parts.join(' ')}`:'';
    voyageNote.hidden=!parts.length;if(voyageNote.textContent!==note)voyageNote.textContent=note;
  };
  {
    const original=globalThis.sailTo;
    globalThis.sailTo=function(dest,...rest){
      const from=state.currentPort,lane=SEA_LANES.find(l=>l.from===from&&l.to===dest);
      if(!lane||state.ended)return original.call(this,dest,...rest);
      const calc=computeTransit(lane),pre={teak:state.cargo.teak,textiles:state.cargo.textiles,tarps:state.specialists.tarpaulins,hull:state.hull,cloves:state.cargo.cloves,ivory:state.cargo.ivory,pirate:pirateChance(dest),logs:state.logs.length};
      const draws=[],random=Math.random;
      Math.random=function(){const value=random.apply(this,arguments);draws.push(value);return value;};
      try{original.call(this,dest,...rest);}finally{Math.random=random;}
      if(state.monthIndex===undefined)return;
      const turnedBack=state.currentPort===from;let i=0,storm=false,pirates=false;
      if(calc.isHeadwind){i+=2;if(!turnedBack&&pre.teak>0)i++;}
      if(calc.isDeadZone){storm=draws[i++]<calc.stormProbability;if(storm)i++;}
      if(pre.textiles>0&&!pre.tarps&&calc.isDeadZone)i++;
      if(!turnedBack)pirates=draws[i++]<pre.pirate;
      // The outcome as the engine reports it (the voyage's own log entry); the marker itself never depends on the log.
      // advanceTime can log after the voyage (interest at months 6, 12, 18), so search only this voyage's new entries.
      const entry=state.logs.slice(0,state.logs.length-pre.logs).find(e=>e.includes(' | Events: '))||'';
      const pirateOutcome=pirates?(entry.match(/Corsairs [^;|]*|Paid \d+ D pirate tribute[^;|]*/)?.[0]||''):'';
      lastVoyage={from,to:dest,month:state.monthIndex,port:state.currentPort,storm,pirates,hullLoss:storm?pre.hull-state.hull:0,hullAfter:state.hull,pirateOutcome};
      paintHazards();
    };
  }

  // 2. Crew-health alert: shown exactly while the engine's mutiny risk at the current health is above zero.
  const crewAlert=document.createElement('p');crewAlert.id='atlas-crew-alert';crewAlert.className='atlas-crew-alert';crewAlert.setAttribute('role','status');crewAlert.setAttribute('aria-live','polite');crewAlert.hidden=true;
  status.append(crewAlert);
  const paintCrew=()=>{
    const risk=getMutinyRisk(state.crewHealth);
    if(!(risk>0)||state.ended){crewAlert.hidden=true;crewAlert.textContent='';delete crewAlert.dataset.risk;return;}
    const lanes=SEA_LANES.filter(l=>l.from===state.currentPort).map(l=>{const c=computeTransit(l);return getMutinyRisk(Math.max(0,state.crewHealth-c.months*CREW_PER_MONTH-(c.isHeadwind?CREW_HAZARD:0)));});
    const next=lanes.length?Math.min(...lanes):risk;
    const text=`⚠ Crew health ${state.crewHealth}%: mutiny is possible. Chance at this health: ${pct(risk)}; after your next voyage from here, at least ${pct(next)}, because each month at sea costs ${CREW_PER_MONTH} health (${CREW_HAZARD} more in a headwind or storm). A mutiny costs two months' wages. Waiting a month in port restores up to 20 health.`;
    crewAlert.dataset.risk=String(risk);
    crewAlert.hidden=false;
    if(crewAlert.textContent!==text)crewAlert.textContent=text;
  };

  // 3. Port timing view: select a port on the map for each month's departure conditions to every destination.
  //    It only reads engine functions (computeTransit is pure), so it never draws randomness or moves the date.
  const portDialog=document.createElement('dialog');portDialog.id='atlas-port-view';portDialog.className='atlas-chart-dialog atlas-port-dialog';portDialog.setAttribute('aria-labelledby','atlas-port-title');
  portDialog.innerHTML='<div class="atlas-chart-head"><h2 id="atlas-port-title"></h2><button type="button" id="atlas-port-close">Close</button></div><div id="atlas-port-body"></div>';
  document.body.append(portDialog);
  let portOpener=null;
  $('atlas-port-close').addEventListener('click',()=>portDialog.close());
  portDialog.addEventListener('close',()=>{const id=portOpener;portOpener=null;$('svg-ports').querySelector?.(`[data-port="${id}"]`)?.focus?.();});
  const expectedMonths=(lane,month,depth=0)=>{const c=computeTransit(lane,month);if(!c.isHeadwind||depth>12)return c.months;return c.months+TURN_BACK*expectedMonths(lane,month+c.months,depth+1);};
  const renderPortView=id=>{
    const yearStart=state.monthIndex-state.monthIndex%12,now=state.monthIndex%12,nav=state.specialists.navigator;
    $('atlas-port-title').textContent=`Leaving ${PORTS[id].name}: month by month`;
    const sections=SEA_LANES.filter(l=>l.from===id).map(lane=>{
      const rows=MONTHS.map((name,m)=>{const c=computeTransit(lane,yearStart+m),[kind,word]=windRelation(c);return {m,name,c,kind,word,turn:c.isHeadwind?TURN_BACK:0,storm:c.isDeadZone?c.stormProbability:0,exp:expectedMonths(lane,yearStart+m)};});
      const best=Math.min(...rows.map(r=>r.exp));
      const p=pirateChance(lane.to,{marines:false}),pg=pirateChance(lane.to,{marines:true}),storm=capital(stormName(lane.from,lane.to));
      return `<section class="atlas-port-lane" data-to="${lane.to}" data-pirates="${p}" data-pirates-guarded="${pg}" data-basin="${stormBasin(lane.from,lane.to)}"><h3>To ${PORTS[lane.to].name} <span>(${lane.dist} nm, sailing toward ${lane.bearing}°)</span></h3>`+
        `<p class="atlas-chart-note">Pirates on arrival: ${pct(p)} without armed marines, ${pct(pg)} with them, for your current cargo, difficulty and standing there. Marines do not change the turn-back or ${storm.toLowerCase()} chance.</p>`+
        `<table class="atlas-port-table"><caption class="atlas-sr">Departures from ${PORTS[id].name} to ${PORTS[lane.to].name}</caption><thead><tr><th scope="col">Month</th><th scope="col">Wind</th><th scope="col">Sailing time</th><th scope="col">Turn-back</th><th scope="col">${storm}</th><th scope="col">Expected</th></tr></thead><tbody>`+
        rows.map(r=>`<tr data-month="${r.m}" data-days="${r.c.days}" data-months="${r.c.months}" data-wind="${r.kind}" data-turnback="${r.turn}" data-storm="${r.storm}" data-expected="${r.exp}"${r.m===now?' data-now="true"':''}${Math.abs(r.exp-best)<1e-9?' data-best="true"':''}><th scope="row">${r.name}${r.m===now?' <span class="atlas-port-tag">now</span>':''}${Math.abs(r.exp-best)<1e-9?' <span class="atlas-port-tag">★ best</span>':''}</th><td data-label="Wind">${r.word}</td><td data-label="Time">${r.c.days} d (${r.c.months} mo)</td><td data-label="Turn-back">${r.turn?pct(r.turn):'–'}</td><td data-label="${storm}">${r.storm?pct(r.storm):'–'}</td><td data-label="Expected">${(Math.round(r.exp*100)/100).toString()} mo</td></tr>`).join('')+
        '</tbody></table></section>';
    }).join('');
    $('atlas-port-body').innerHTML=`<p class="atlas-chart-note">From the game's own sailing model, for this campaign year. Sailing time: days and months charged. Turn-back: the chance a headwind sends you back (you pay the months and try again). Cyclone or typhoon: the chance of a storm in a transition month${nav?' (lowered to 18% by your navigator)':' (a navigator lowers it to 18%)'}; it is called a typhoon on legs east of Malacca, in the western Pacific. Expected: months to arrive, counting turn-backs. ★ best = the shortest expected time; ties are all marked. Storms damage the hull but do not lengthen the voyage in the game, so they don't change “best”.</p>`+sections;
  };
  const openPortView=id=>{if(!PORTS[id])return;portOpener=id;renderPortView(id);if(!portDialog.open)portDialog.showModal?.();};
  $('svg-ports').addEventListener('click',event=>{const id=event.target?.closest?.('[data-port]')?.dataset?.port;if(id)openPortView(id);});
  $('svg-ports').addEventListener('keydown',event=>{if(event.key!=='Enter'&&event.key!==' ')return;const id=event.target?.closest?.('[data-port]')?.dataset?.port;if(id){event.preventDefault();openPortView(id);}});

  // Ports become buttons; storms, pirates and the alert repaint with the page.
  const riskMapOriginal=renderSVGMap;renderSVGMap=function(wind){
    riskMapOriginal(wind);
    ocean.querySelectorAll('#svg-ports>g').forEach((group,index)=>{const port=Object.values(PORTS)[index];group.setAttribute('data-port',port.id);group.setAttribute('role','button');group.setAttribute('tabindex','0');group.setAttribute('aria-label',`${port.name}: departure timing by month`);});
    ocean.append(hazardLayer);
    // Route label: pirates, storm and turn-back chances for the selected leg this month (engine values).
    const preview=$('svg-route-preview'),to=state.hoveredLaneTo||state.windRouteTo,lane=SEA_LANES.find(route=>route.from===state.currentPort&&route.to===to),rect=preview.querySelector?.('rect'),label=preview.querySelector?.('text');
    if(lane&&rect&&label&&rect.getAttribute){
      const c=computeTransit(lane),risks=[`Pirates ${pct(pirateChance(lane.to))}${state.specialists.marines?'':` (${pct(pirateChance(lane.to,{marines:true}))} with marines)`}`];
      if(c.isHeadwind)risks.push(`turn-back ${pct(TURN_BACK)}`);if(c.isDeadZone)risks.push(`${stormName(lane.from,lane.to)} ${pct(c.stormProbability)}`);
      const line2=risks.join(' · '),w=Math.max(+rect.getAttribute('width'),Math.round(line2.length*5.6+16));
      const cx=+label.getAttribute('x'),x=Math.min(800-w/2-4,Math.max(w/2+4,cx));
      rect.setAttribute('x',x-w/2);rect.setAttribute('width',w);rect.setAttribute('height',32);label.setAttribute('x',x);
      const extra=document.createElementNS('http://www.w3.org/2000/svg','text');extra.setAttribute('class','atlas-route-risk');
      for(const attr of ['fill','font-size','font-family','font-weight'])if(label.getAttribute(attr))extra.setAttribute(attr,label.getAttribute(attr));
      extra.setAttribute('x',x);extra.setAttribute('y',+label.getAttribute('y')+12);extra.setAttribute('text-anchor','middle');extra.textContent=line2;label.after(extra);
      preview.setAttribute('aria-label',`${preview.getAttribute('aria-label')||''}. ${line2}`);
    }
    // A sea name under the route label is hidden while the label is shown (it overlapped "ARABIAN SEA" on
    // Kilwa–Aden and "SOUTH CHINA SEA" on Malacca–Quanzhou), and shown again otherwise.
    const box=lane&&rect?.getAttribute?{x:+rect.getAttribute('x'),y:+rect.getAttribute('y'),w:+rect.getAttribute('width'),h:+rect.getAttribute('height')}:null;
    for(const t of ocean.querySelectorAll('text')){
      if(!/^(ARABIANSEA|BAYOFBENGAL|SOUTHCHINASEA|INDIANOCEAN)$/.test((t.textContent||'').replace(/\s/g,'')))continue;
      const b=box&&t.getBBox?t.getBBox():null,covered=!!b&&b.x<box.x+box.w&&box.x<b.x+b.width&&b.y<box.y+box.h&&box.y<b.y+b.height;
      if(covered)t.setAttribute('data-covered','true');else t.removeAttribute('data-covered');
    }
  };
  const riskRenderOriginal=renderAll;renderAll=function(){riskRenderOriginal();paintCrew();paintHazards();};
  // The audit replaces the voyage screen without a repaint; clear the alert so it never carries over.
  const riskFinishOriginal=finishCampaign;finishCampaign=function(){riskFinishOriginal();paintCrew();};
  {
  // ---------------------------------------------------------------------------------------------
  // Season, time and consequence (2026-11-24): a route sailing calendar, a sail-now-or-wait card,
  // a plain explanation after each voyage, and the home-port map on the setup screen.
  // Display only. Every number comes from the engine's own functions (computeTransit, getWindState,
  // getWaitingCosts) and the turn-back constant above; nothing here draws randomness or changes state.
  // ---------------------------------------------------------------------------------------------
  const DIRECTIONS=['north','north-east','east','south-east','south','south-west','west','north-west'];
  const compassWord=bearing=>DIRECTIONS[Math.round(bearing/45)%8];
  const seasonWord=month=>{const w=getWindState(month);return w.isDeadZone?'the transition between monsoons':w.regime.startsWith('SW')?'the southwest monsoon':'the northeast monsoon';};
  const monthNumber=index=>`month ${Math.round((index+1)*10)/10}`;
  const monthsWord=n=>`${n} month${n===1?'':'s'}`;
  // A chance shown to the nearest percent, except that a chance above zero never reads as 0%.
  const pctFine=p=>p>0&&p<0.005?'<1%':pct(p);
  // Group month numbers 0–11 into ranges, wrapping across the year end: [10,11,0,1] → "Nov–Feb".
  const monthRanges=months=>{
    const set=new Set(months);if(!set.size)return '';if(set.size===12)return 'all year';
    let start=[...set].find(m=>!set.has((m+11)%12));const out=[];const seen=new Set();
    for(let k=0;k<12;k++){const m=(start+k)%12;if(!set.has(m)||seen.has(m))continue;let end=m;seen.add(m);while(set.has((end+1)%12)&&!seen.has((end+1)%12)){end=(end+1)%12;seen.add(end);}out.push(end===m?MONTHS[m]:`${MONTHS[m]}–${MONTHS[end]}`);}
    return out.length>1?`${out.slice(0,-1).join(', ')} and ${out.at(-1)}`:out[0];
  };
  const dayRange=days=>{const lo=Math.min(...days),hi=Math.max(...days);return lo===hi?`~${lo} d`:`~${lo}–${hi} d`;};

  // 1. Route sailing calendar: each destination's year in words, for the current ship and navigator.
  //    The pattern is the same every year (the wind depends only on the month), so it is computed for
  //    months 0–11. The port timing view (select a port on the map) gives each month's numbers.
  const CALENDAR_ORDER=[['tailwind','fast','tailwind'],['crosswind','steady','crosswind'],['headwind','slow','headwind'],['transition','transition','transition months']];
  const routeCalendar=lane=>{
    const months=MONTHS.map((_,m)=>{const c=computeTransit(lane,m);return {m,c,kind:windRelation(c)[0]};});
    const parts=CALENDAR_ORDER.map(([kind,word,why])=>{const hit=months.filter(x=>x.kind===kind);if(!hit.length)return null;
      return {kind,months:hit.map(x=>x.m),days:hit.map(x=>x.c.days),text:kind==='transition'?`transition ${monthRanges(hit.map(x=>x.m))} (${dayRange(hit.map(x=>x.c.days))})`:`${word} ${monthRanges(hit.map(x=>x.m))} (${why}, ${dayRange(hit.map(x=>x.c.days))})`};}).filter(Boolean);
    return {lane,parts,text:`${PORTS[lane.from].name} → ${PORTS[lane.to].name}: ${parts.map(p=>p.text).join('; ')}.`};
  };
  const calendarSection=document.createElement('section');calendarSection.id='atlas-route-calendar';calendarSection.className='atlas-route-calendar';calendarSection.setAttribute('aria-labelledby','atlas-route-calendar-heading');
  const paintCalendar=()=>{
    if(state.ended||!state.currentPort){calendarSection.hidden=true;return;}
    calendarSection.hidden=false;
    const lanes=SEA_LANES.filter(l=>l.from===state.currentPort);
    calendarSection.innerHTML=`<h3 id="atlas-route-calendar-heading">Sailing calendar from ${PORTS[state.currentPort].name}</h3>`+
      `<p class="atlas-chart-note">The same every year, for your ${state.vesselKey}${state.specialists.navigator?' with a navigator':''}: days at sea by season. For each month’s numbers, open the month-by-month view.</p>`+
      `<ul>${lanes.map(lane=>{const cal=routeCalendar(lane);return `<li data-to="${lane.to}">${cal.text}</li>`;}).join('')}</ul>`+
      `<button type="button" class="atlas-route-calendar-open" data-port="${state.currentPort}">Month by month from ${PORTS[state.currentPort].name}</button>`;
  };
  let calendarOpened=false;
  calendarSection.addEventListener('click',event=>{const id=event.target?.closest?.('.atlas-route-calendar-open')?.dataset?.port;if(id){calendarOpened=true;openPortView(id);}});
  // The port view's own close handler focuses the port on the map; when the calendar opened it, focus comes back here
  // instead (the button is found again, since the calendar may have been repainted while the view was open).
  portDialog.addEventListener('close',()=>{if(!calendarOpened)return;calendarOpened=false;calendarSection.querySelector('.atlas-route-calendar-open')?.focus?.();});

  // 2. Sail now, or wait: the selected route's expected arrival for each departure month this campaign allows.
  //    Expected months at sea count headwind turn-backs: months + 0.35 × the expected time from the month you
  //    are back in port (expectedMonths, as in the port view). Best month = the departure with the earliest
  //    expected arrival; on a tie, the earlier departure.
  const departurePlan=(lane,from=state.monthIndex)=>{
    const last=Math.min(from+11,CAMPAIGN_MONTHS-1),options=[];
    for(let w=from;w<=last;w++){const c=computeTransit(lane,w);options.push({w,c,wait:w-from,arrival:w+expectedMonths(lane,w)});}
    const best=options.reduce((a,b)=>b.arrival<a.arrival-1e-9?b:a);
    const fastest=options.reduce((a,b)=>b.c.days<a.c.days?b:a);
    // The year's fastest crossing (the wind depends only on the month), which may fall after the campaign ends.
    const year=MONTHS.map((_,m)=>({m,c:computeTransit(lane,m)})).reduce((a,b)=>b.c.days<a.c.days?b:a);
    return {lane,options,now:options[0],best,fastest,year,cut:fastest.c.days>year.c.days};
  };
  const decision=document.createElement('section');decision.id='atlas-decision';decision.className='atlas-decision';decision.setAttribute('aria-labelledby','atlas-decision-heading');
  // Under the departure list, above the collapsed "Compare another departure" panel (the engine's own comparison).
  // The card sits directly under the departure buttons (on phones it was far below them); the calendar sits
  // above the collapsed "Compare another departure" panel (the engine's own comparison).
  $('routes-container')?.after?.(decision);$('atlas-planner')?.before?.(calendarSection);
  const optionColumn=(o,title,lane)=>{
    const [kind,word]=windRelation(o.c),cost=getWaitingCosts(o.wait),risks=[];
    if(o.c.isHeadwind)risks.push(`<dt>Turn-back chance</dt><dd>${pct(TURN_BACK)} (you return to port)</dd>`);
    if(o.c.isDeadZone)risks.push(`<dt>${capital(stormName(lane.from,lane.to))} chance</dt><dd>${pct(o.c.stormProbability)}${state.specialists.navigator?' (lowered to 18% by your navigator)':' (a navigator lowers it to 18%)'}</dd>`);
    const late=o.arrival>CAMPAIGN_MONTHS?' <span class="atlas-decision-late">after the campaign ends</span>':'';
    return `<div class="atlas-decision-option" data-depart="${o.w}" data-wait="${o.wait}" data-days="${o.c.days}" data-months="${o.c.months}" data-wind="${kind}" data-wages="${cost.crewWages}" data-fees="${cost.portFees}" data-arrival="${o.arrival}">`+
      `<h4>${title}</h4><dl>`+
      (o.wait?`<dt>Waiting in port</dt><dd>${monthsWord(o.wait)}</dd><dt>Cost of waiting</dt><dd>${cost.crewWages+cost.portFees} D (wages ${cost.crewWages} D + port fees ${cost.portFees} D)</dd>`:'')+
      `<dt>Wind</dt><dd>${word}</dd><dt>At sea</dt><dd>~${o.c.days} d (${monthsWord(o.c.months)} charged)</dd>`+risks.join('')+
      `<dt>Expected arrival</dt><dd>${monthNumber(o.arrival)} of ${CAMPAIGN_MONTHS}${late}</dd></dl></div>`;
  };
  // Pirate warning for the selected route this month, above the departure buttons. It shows when the engine's
  // full piracy chance on arrival (pirateChance: port risk, cargo value, difficulty, guards, standing) is at least
  // PIRATE_WARNING_AT. The 10% threshold is a display choice made by the game's owner, not an engine rule; below it
  // the card shows the chance quietly. It follows the selected route (not hover), and it is a warning, not a gate.
  const PIRATE_WARNING_AT=0.10;
  const encounterCost=lane=>{
    // sailTo's outcome table: a crate of cloves, else a lot of ivory, else a tribute of min(cash, 75) D, taken after the
    // voyage's wages (upkeep × months charged) and, if the ship is becalmed in a transition month, 20 D more.
    if(state.cargo.cloves>0)return `you lose 1 crate of ${COMMODITIES.find(c=>c.id==='cloves').name}`;
    if(state.cargo.ivory>0)return `you lose 1 lot of ${COMMODITIES.find(c=>c.id==='ivory').name}`;
    return `you pay up to ${Math.min(Math.max(0,state.cash-VESSELS[state.vesselKey].upkeep*computeTransit(lane).months),75)} D in tribute`;
  };
  const pirateWarning=document.createElement('div');pirateWarning.id='atlas-pirate-warning';pirateWarning.className='atlas-pirate-warning';pirateWarning.setAttribute('role','status');pirateWarning.setAttribute('aria-live','polite');pirateWarning.hidden=true;
  $('routes-container')?.before?.(pirateWarning);
  const paintPirateWarning=()=>{
    const lane=SEA_LANES.find(l=>l.from===state.currentPort&&l.to===state.windRouteTo);
    const p=lane&&!state.ended?pirateChance(lane.to):0;
    if(!(p>=PIRATE_WARNING_AT)){if(!pirateWarning.hidden){pirateWarning.hidden=true;pirateWarning.textContent='';delete pirateWarning.dataset.text;}delete pirateWarning.dataset.to;return;}
    const guarded=pirateChance(lane.to,{marines:true}),hired=state.specialists.marines;
    const text=`Pirates on arrival at ${PORTS[lane.to].name}: ${pctFine(p)} chance ${hired?'with your armed marines':'with your current crew'}${hired?'':`, ${pctFine(guarded)} with armed marines (Care for ship and crew)`}. If they strike, ${encounterCost(lane)}. Marines don't reduce the chance of being turned back.`;
    Object.assign(pirateWarning.dataset,{to:lane.to,chance:String(p),guarded:String(hired?p:guarded)});
    // Unhide before writing, so screen readers announce it; rewrite only when the text changes.
    pirateWarning.hidden=false;
    if(pirateWarning.dataset.text!==text){pirateWarning.dataset.text=text;pirateWarning.innerHTML=`<span class="atlas-pirate-icon" aria-hidden="true">⚠</span> <span class="atlas-pirate-text"></span>`;pirateWarning.querySelector('.atlas-pirate-text').textContent=text;}
  };
  const paintDecision=()=>{
    const lane=SEA_LANES.find(l=>l.from===state.currentPort&&l.to===state.windRouteTo);
    if(state.ended||!lane){decision.hidden=true;decision.innerHTML='';return;}
    const plan=departurePlan(lane),{now,best,fastest}=plan;
    // The other column: the best month when it is not now; otherwise the fastest crossing, to show why it isn't earlier.
    const other=best.w!==now.w?best:fastest.w!==now.w?fastest:null;
    const otherTitle=other===best?`Wait until ${MONTHS[best.w%12]} (best month)`:`Wait for the fastest crossing${plan.cut?' left this campaign':''} (${other?MONTHS[other.w%12]:''})`;
    const gap=other?Math.round(Math.abs(other.arrival-now.arrival)*10)/10:0;
    let verdict;
    if(!other)verdict=plan.cut?`Sailing now is the earliest expected arrival and the fastest crossing left this campaign; the year’s fastest (${MONTHS[plan.year.m]}, ${plan.year.c.days} days) comes after it ends.`:`Sailing now is both the year’s fastest crossing and the earliest expected arrival this campaign allows.`;
    else if(other.arrival<now.arrival-1e-9)verdict=`In expectation, waiting until ${MONTHS[other.w%12]} arrives about ${gap} month${gap===1?'':'s'} earlier than sailing now.`;
    else verdict=`In expectation, sailing now arrives ${gap?`about ${gap} month${gap===1?'':'s'} earlier`:'no later'} than waiting for ${MONTHS[other.w%12]}${other.c.days<now.c.days?`, although that crossing is ${now.c.days-other.c.days} days faster: the faster wind isn’t always the earlier arrival`:''}.`;
    decision.hidden=false;decision.dataset.to=lane.to;decision.dataset.best=String(best.w);
    decision.innerHTML=`<h3 id="atlas-decision-heading">Sail now or wait: ${PORTS[lane.from].name} → ${PORTS[lane.to].name}</h3>`+
      `<div class="atlas-decision-grid">${optionColumn(now,`Sail now (${MONTHS[now.w%12]})`,lane)}${other?optionColumn(other,otherTitle,lane):''}</div>`+
      `<p class="atlas-decision-verdict" data-verdict>${verdict}</p>`+
      (()=>{const p=pirateChance(lane.to),guards=state.specialists.marines?' with your marines':` (${pctFine(pirateChance(lane.to,{marines:true}))} with armed marines)`;
        if(!(p>0))return '';
        // At or above the warning threshold the card repeats the warning; below it, a quiet line (no icon, no announcement).
        return p>=PIRATE_WARNING_AT?`<p class="atlas-decision-pirates" data-chance="${p}" data-level="warning"><span aria-hidden="true">⚠</span> Pirates on arrival, either way: ${pctFine(p)}${guards}.</p>`:`<p class="atlas-decision-pirates-quiet" data-chance="${p}" data-level="quiet">Pirates on arrival, either way: ${pctFine(p)}${guards}.</p>`;})()+
      `<p class="atlas-chart-note">Best month: the departure month with the earliest expected arrival this campaign (next 12 months, to month ${CAMPAIGN_MONTHS}). Expected time counts headwind turn-backs: each crossing’s months plus a ${pct(TURN_BACK)} chance of paying them again and retrying. Storms damage the hull but don’t change arrival. Nothing here changes your game.</p>`;
  };

  // 3. After each voyage: what happened, set against the season and the engine's expectation. Facts come from
  //    engine state and the draws decoded above (lastVoyage), never from the log text. Luck is named as luck.
  const why=document.createElement('p');why.id='atlas-voyage-why';why.className='atlas-voyage-note atlas-voyage-why';why.setAttribute('role','status');why.setAttribute('aria-live','polite');why.hidden=true;
  voyageNote.after(why);
  const explainVoyage=v=>{
    const lane=SEA_LANES.find(l=>l.from===v.from&&l.to===v.to),[,word]=windRelation(v.calc),plan=departurePlan(lane,v.departed);
    const s=[];
    s.push(v.turnedBack
      ?`You set out ${compassWord(lane.bearing)} from ${PORTS[v.from].name} in ${MONTHS[v.departed%12]}, in ${seasonWord(v.departed)}: a headwind, and a gale turned you back after ${monthsWord(v.calc.months)}.`
      :`You sailed ${compassWord(lane.bearing)} from ${PORTS[v.from].name} in ${MONTHS[v.departed%12]}, in ${seasonWord(v.departed)}: ${word.toLowerCase()}, ${v.calc.days} days at sea.`);
    const f=plan.fastest,y=plan.year,b=plan.best;
    if(v.calc.days===y.c.days)s.push(`That was this route’s fastest crossing of the year.`);
    else if(f.w===v.departed)s.push(`That was the fastest crossing left this campaign; the year’s fastest (${MONTHS[y.m]}, ${y.c.days} days) comes after it ends.`);
    else s.push(`The ${seasonWord(f.w).replace(/^the /,'')} crossing (${MONTHS[f.w%12]}) takes ${f.c.days} days${plan.cut?' (the fastest left this campaign)':''}, but waiting for it would have delayed departure by ${monthsWord(f.w-v.departed)}.`);
    s.push(b.w===v.departed?`Leaving when you did gave the earliest expected arrival.`:`In expectation, leaving in ${MONTHS[b.w%12]} would have arrived about ${Math.round((plan.now.arrival-b.arrival)*10)/10} months earlier.`);
    const predictable=[],luck=[];
    if(v.calc.isHeadwind){
      predictable.push(`a headwind crossing always costs hull and carries a ${pct(TURN_BACK)} turn-back chance`);
      luck.push(v.turnedBack?`the turn-back draw went against you`:`the turn-back draw went your way`);
      if(v.damage>0)luck.push(`the size of the hull damage (−${v.damage}%${v.hullAfter<=5?', hull at its minimum':''})`);
    }
    if(v.calc.isDeadZone){
      predictable.push(`a transition month carries a ${pct(v.calc.stormProbability)} ${stormName(v.from,v.to)} chance`);
      luck.push(v.storm?`the ${stormName(v.from,v.to)} came (${v.damage>0?`hull −${v.damage}%`:'no further hull loss'}${v.hullAfter<=5?', hull at its minimum':''})`:`no ${stormName(v.from,v.to)} came`);
    }
    if(predictable.length)s.push(`Predictable: ${predictable.join('; ')}. Luck: ${luck.join(', and ')}.`);
    return s.join(' ');
  };
  const paintWhy=()=>{
    const v=lastVoyage&&lastVoyage.month===state.monthIndex&&lastVoyage.port===state.currentPort&&lastVoyage.calc?lastVoyage:null;
    if(!v||state.ended){why.hidden=true;why.textContent='';delete why.dataset.from;return;}
    why.hidden=false;why.dataset.from=v.from;why.dataset.to=v.to;why.dataset.departed=String(v.departed);
    const text=explainVoyage(v);if(why.textContent!==text)why.textContent=text;
  };
  {
    // Extend the voyage record with what the explanation needs, read from engine state around the call.
    const sail=globalThis.sailTo;
    globalThis.sailTo=function(dest,...rest){
      const from=state.currentPort,lane=SEA_LANES.find(l=>l.from===from&&l.to===dest);
      if(!lane||state.ended)return sail.call(this,dest,...rest);
      const departed=state.monthIndex,calc=computeTransit(lane),hull=state.hull;
      sail.call(this,dest,...rest);
      if(lastVoyage&&lastVoyage.from===from&&lastVoyage.to===dest)Object.assign(lastVoyage,{departed,calc,turnedBack:state.currentPort===from,damage:hull-state.hull});
      paintWhy();
    };
  }

  // 4. Home port on the setup screen: the real coastline, the five ports as buttons and the game's wind for a
  //    month. The month only previews the wind: every campaign starts in January (a later engine change may
  //    let you choose). Choosing a port sets the engine's own home-port control.
  // Glossary: say that the pirate warning's threshold is a display choice, not a game rule.
  document.querySelector('[data-atlas-entry="storm-names"]')?.insertAdjacentHTML?.('afterend','<div data-glossary-entry data-atlas-entry="pirate-warning"><dt class="font-semibold text-white">Pirate warning</dt><dd>Before you sail, the Atlas warns of pirates when the chance of meeting them on arrival is at least 10%, with the chance if you hire armed marines and what an encounter would cost. The 10% line is a display choice for this page, not a rule of the game: below it, the chance is still shown on the sail-or-wait card.</dd></div>');
  const setupSelect=$('input-start-port');
  if(setupSelect&&setupSelect.closest){
    const land=document.querySelector('#ocean-svg g[fill="#243950"]');
    const picker=document.createElement('section');picker.id='atlas-home-map';picker.className='atlas-home-map';picker.setAttribute('aria-labelledby','atlas-home-map-heading');
    picker.innerHTML=`<h3 id="atlas-home-map-heading">Choose your home port on the map</h3>`+
      `<label class="atlas-home-month">Wind preview <select id="atlas-home-month">${MONTHS.map((m,i)=>`<option value="${i}">${m}</option>`).join('')}</select></label>`+
      `<p class="atlas-chart-note" id="atlas-home-wind"></p>`+
      `<svg viewBox="0 0 800 450" role="group" aria-labelledby="atlas-home-map-heading" class="atlas-home-svg"><rect width="800" height="450" class="atlas-home-sea"/>${land?land.outerHTML:''}<g id="atlas-home-wind-arrows" aria-hidden="true"></g><g id="atlas-home-ports"></g></svg>`+
      `<p class="atlas-chart-note">Preview only: every campaign starts in January. The month here changes the wind shown, not your start.</p>`;
    (setupSelect.closest('div')?.parentElement||setupSelect.closest('div'))?.after?.(picker);
    const paintHome=()=>{
      const m=+$('atlas-home-month').value,w=getWindState(m),chosen=setupSelect.value;
      $('atlas-home-wind').textContent=`${MONTHS[m]} (preview): ${w.isDeadZone?'transition between monsoons':w.regime.replace('SW','southwest').replace('NE','northeast').replace('Monsoon','monsoon')}, ${w.knots} kt, blowing toward ${w.bearing}°.`;
      const arrows=[];for(let y=70;y<450;y+=95)for(let x=60;x<800;x+=120)arrows.push(`<g transform="translate(${x} ${y}) rotate(${w.bearing})"><path d="M0 12V-12M-5 -6L0 -12L5 -6" class="atlas-home-arrow"/></g>`);
      $('atlas-home-wind-arrows').innerHTML=arrows.join('');
      $('atlas-home-ports').innerHTML=Object.values(PORTS).map(p=>`<g class="atlas-home-port" role="button" tabindex="0" data-port="${p.id}" aria-pressed="${p.id===chosen}" aria-label="${p.name}${p.id===chosen?' (your home port)':''}" transform="translate(${p.x} ${p.y})"><circle r="16" class="atlas-home-hit"/><circle r="7" class="atlas-home-dot"/><text y="-13" x="${p.x>700?14:0}" text-anchor="${p.x>700?'end':'middle'}">${p.name}</text></g>`).join('');
    };
    const choose=id=>{if(!PORTS[id])return;setupSelect.value=id;setupSelect.dispatchEvent(new Event('change',{bubbles:true}));paintHome();$('atlas-home-ports').querySelector(`[data-port="${id}"]`)?.focus?.();};
    picker.addEventListener('click',event=>{const id=event.target?.closest?.('.atlas-home-port')?.dataset?.port;if(id)choose(id);});
    picker.addEventListener('keydown',event=>{if(event.key!=='Enter'&&event.key!==' ')return;const id=event.target?.closest?.('.atlas-home-port')?.dataset?.port;if(id){event.preventDefault();choose(id);}});
    $('atlas-home-month').addEventListener('change',paintHome);setupSelect.addEventListener('change',paintHome);
    paintHome();
  }

  const decisionsRenderOriginal=renderAll;renderAll=function(){decisionsRenderOriginal();paintCalendar();paintDecision();paintPirateWarning();paintWhy();};
  const decisionsCompareOriginal=renderWindComparison;renderWindComparison=function(){decisionsCompareOriginal();paintDecision();paintPirateWarning();};
  }
  {
  // ---------------------------------------------------------------------------------------------
  // Campaign replay on the audit page (2026-11-24). Display only.
  // During play the adapter records one step per voyage or wait, from engine state read around each call and
  // the draws #32 decodes for the storm and pirate markers (lastVoyage); never from the log text. Trades are
  // recorded from the change in cargo and cash around buyCargoQty and sellCargoQty. On the audit page the
  // steps play back on the map, slowly, only when asked; nothing here draws randomness or changes state.
  // ---------------------------------------------------------------------------------------------
  const history={steps:[],trades:[],all:[],end:null,startMonth:0,startPort:null,startCash:0};
  const reset=()=>{Object.assign(history,{steps:[],trades:[],all:[],end:null,startMonth:state.monthIndex,startPort:state.currentPort,startCash:state.cash});};
  const startOriginal=startSimulation;startSimulation=function(...args){const r=startOriginal.apply(this,args);reset();paintReplay();return r;};
  // Trades: what changed in the hold and the purse, kept until the next voyage or wait leaves port.
  for(const [name,verb] of [['buyCargoQty','bought'],['sellCargoQty','sold']]){
    const original=globalThis[name];
    globalThis[name]=function(id,...rest){
      const held=state.cargo[id],cash=state.cash,log=state.logs.length;const r=original.call(this,id,...rest);
      const qty=Math.abs(state.cargo[id]-held);if(qty){const t={verb,id,qty,cash:state.cash-cash,port:state.currentPort,month:state.monthIndex,log};history.trades.push(t);history.all.push(t);}
      return r;
    };
  }
  {
    const sail=globalThis.sailTo;
    globalThis.sailTo=function(dest,...rest){
      const from=state.currentPort,lane=SEA_LANES.find(l=>l.from===from&&l.to===dest);
      if(!lane||state.ended)return sail.call(this,dest,...rest);
      const pre={month:state.monthIndex,cash:state.cash,hull:state.hull,log:state.logs.length,calc:computeTransit(lane)},trades=history.trades.splice(0);
      sail.call(this,dest,...rest);
      if(state.monthIndex===pre.month){history.trades.unshift(...trades);return;}   // nothing happened
      const v=lastVoyage&&lastVoyage.from===from&&lastVoyage.to===dest?lastVoyage:null;
      history.steps.push({kind:'voyage',from,to:dest,month:pre.month,months:state.monthIndex-pre.month,days:pre.calc.days,wind:windRelation(pre.calc)[0],
        turnedBack:state.currentPort===from,storm:v?!!v.storm:null,pirates:v?!!v.pirates:null,pirateOutcome:v?.pirateOutcome||'',
        hullBefore:pre.hull,hullAfter:state.hull,cashBefore:pre.cash,cashAfter:history.end&&history.end.log>=pre.log?history.end.cashBefore:state.cash,log:pre.log,trades});
      paintReplay();
    };
  }
  {
    const wait=globalThis.waitInPort;
    globalThis.waitInPort=function(...rest){
      if(state.ended)return wait.apply(this,rest);
      const pre={month:state.monthIndex,cash:state.cash,port:state.currentPort,log:state.logs.length},trades=history.trades.splice(0);
      wait.apply(this,rest);
      if(state.monthIndex===pre.month){history.trades.unshift(...trades);return;}
      history.steps.push({kind:'wait',from:pre.port,to:pre.port,month:pre.month,months:state.monthIndex-pre.month,cashBefore:pre.cash,cashAfter:history.end&&history.end.log>=pre.log?history.end.cashBefore:state.cash,log:pre.log,trades});
      paintReplay();
    };
  }

  // The panel: above the dated log, never printed and never in the PDF export.
  const reduce=()=>!!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const panel=document.createElement('section');panel.id='atlas-replay';panel.className='atlas-replay';panel.hidden=true;
  panel.setAttribute('aria-labelledby','atlas-replay-heading');panel.setAttribute('data-html2canvas-ignore','true');
  $('audit-log-table')?.parentElement?.before?.(panel);
  const land=document.querySelector('#ocean-svg g[fill="#243950"]');
  const goodName=id=>COMMODITIES.find(c=>c.id===id)?.name||id;
  // The engine's charter line still says "Chinese Treasure Junk"; the Atlas calls that ship a Chinese ocean-going junk.
  const shown=line=>line.replace(/Chinese Treasure Junk/g,'Chinese ocean-going junk');
  // Consecutive trades of the same kind, good, port and month at the same price, grouped. Exact: totals are sums.
  const groupTrades=trades=>{const out=[];for(const t of trades){const last=out.at(-1);
    if(last&&last.verb===t.verb&&last.id===t.id&&last.port===t.port&&last.month===t.month&&last.each===t.qty&&last.eachCash===t.cash){last.qty+=t.qty;last.cash+=t.cash;last.n++;last.rows.push(t.log);}
    else out.push({verb:t.verb,id:t.id,port:t.port,month:t.month,qty:t.qty,cash:t.cash,each:t.qty,eachCash:t.cash,n:1,unit:Math.abs(t.cash)/t.qty,rows:[t.log]});}return out;};
  const groupText=g=>`${g.verb==='bought'?'Bought':'Sold'} ${g.qty}× ${goodName(g.id)} at ${PORTS[g.port].name}, ${g.unit.toLocaleString()} D each, ${Math.abs(g.cash).toLocaleString()} D${g.n>1?` (${g.n} trades)`:''}`;
  const tradeText=t=>groupTrades(t).map(g=>`${g.verb} ${g.qty} ${goodName(g.id)} (${g.unit.toLocaleString()} D each, ${Math.abs(g.cash).toLocaleString()} D${g.n>1?`, ${g.n} trades`:''})`).join('; ');
  const stepText=(s,i)=>{
    if(s.kind==='end')return `End of campaign (liquidation): ${s.sold.length?`sold ${s.sold.map(x=>`${x.qty}× ${goodName(x.id)} for ${x.value.toLocaleString()} D`).join(', ')} at ${PORTS[s.port].name}`:'no cargo left to sell'}${s.debt?`; repaid the ${s.debt.toLocaleString()} D loan`:''}. Final cash ${s.cashAfter.toLocaleString()} D.`;
    const when=`Month ${s.month+1} (${MONTHS[s.month%12]})`,parts=[];
    if(s.trades.length)parts.push(`At ${PORTS[s.from].name}: ${tradeText(s.trades)}.`);
    if(s.kind==='wait')parts.push(`Waited ${s.months===1?'a month':`${s.months} months`} in ${PORTS[s.from].name}.`);
    else{
      parts.push(s.turnedBack?`Set out for ${PORTS[s.to].name}; a headwind gale turned the ship back to ${PORTS[s.from].name} after ${s.months} month${s.months===1?'':'s'}.`
        :`Sailed ${PORTS[s.from].name} → ${PORTS[s.to].name}: ${s.days} days, ${s.wind==='transition'?'a transition month':`a ${s.wind}`}.`);
      if(s.storm===null)parts.push('Storms and pirates: not recorded.');
      else{if(s.storm)parts.push(`${capital(stormName(s.from,s.to))} on the crossing (hull ${s.hullBefore}% → ${s.hullAfter}%).`);if(s.pirates)parts.push(`Pirates on arrival: ${(s.pirateOutcome||'an encounter').replace(/[!.\s]+$/,'')}.`);}
    }
    parts.push(`Cash ${s.cashAfter.toLocaleString()} D.`);
    return `Step ${i+1} of ${history.steps.length}. ${when}: ${parts.join(' ')}`;
  };
  let index=0,progress=1,playing=false,frame=null,speed=1,lastTime=0;
  const STEP_MS=1500;
  const frames=()=>history.end?[...history.steps,history.end]:history.steps;
  const svgPoint=(s,t)=>{
    if(s.kind==='wait')return [PORTS[s.from].x,PORTS[s.from].y];
    if(s.kind==='end')return [PORTS[s.port].x,PORTS[s.port].y];
    const points=lanePoints(s.from,s.to);
    // A turn-back goes halfway out and comes back.
    const along=s.turnedBack?(t<0.5?t:1-t):t;
    return pointAlong(points,along);
  };
  const paintFrame=()=>{
    const s=frames()[index];if(!s)return;
    const t=reduce()?1:progress,[x,y]=svgPoint(s,t);
    const svg=panel.querySelector('svg');if(!svg)return;
    panel.querySelector('#atlas-replay-ship')?.setAttribute('transform',`translate(${x.toFixed(1)},${y.toFixed(1)})`);
    const route=panel.querySelector('#atlas-replay-route');
    if(route)route.setAttribute('d',s.kind!=='voyage'?'':lanePath(lanePoints(s.from,s.to)));
    const marks=[];
    if(s.kind==='voyage'&&s.storm&&t>=0.3){const [sx,sy]=pointAlong(lanePoints(s.from,s.to),0.3);marks.push(`<g class="atlas-hazard" data-kind="storm" transform="translate(${sx.toFixed(1)},${sy.toFixed(1)})"><title>${capital(stormName(s.from,s.to))}</title>${glyph.storm}</g>`);}
    if(s.kind==='voyage'&&s.pirates&&t>=0.8){const [px,py]=pointAlong(lanePoints(s.from,s.to),0.8);marks.push(`<g class="atlas-hazard" data-kind="pirates" transform="translate(${px.toFixed(1)},${py.toFixed(1)})"><title>Pirates</title>${glyph.pirates}</g>`);}
    const layer=panel.querySelector('#atlas-replay-marks');if(layer)layer.innerHTML=marks.join('');
    // Past the last month the label says so (the engine's own log tags its liquidation lines "M24 • Jan").
    const month=s.kind==='end'?CAMPAIGN_MONTHS:s.month+Math.min(s.months,Math.floor(t*s.months+1e-9));
    const cash=Math.round(s.cashBefore+(s.cashAfter-s.cashBefore)*t).toLocaleString();
    const clock=panel.querySelector('#atlas-replay-month');if(clock)clock.textContent=month>=CAMPAIGN_MONTHS?`End of campaign · ${cash} D`:`Month ${month+1} · ${MONTHS[month%12]} · ${cash} D`;
  };
  const announce=(speak=true)=>{
    const s=frames()[index];if(!s)return;
    const line=panel.querySelector('#atlas-replay-line');const text=speak?stepText(s,index):'';
    if(line&&line.textContent!==text)line.textContent=text;
    panel.dataset.step=String(index);panel.dataset.logRow=String(s.log);
    // Highlight the matching row of the dated log (the engine lists it oldest first, one row per entry).
    const rows=$('audit-log-table')?.children||[];
    for(let r=0;r<rows.length;r++){const on=r===s.log;rows[r].classList?.toggle?.('atlas-replay-current',on);if(on)rows[r].setAttribute?.('aria-current','step');else rows[r].removeAttribute?.('aria-current');}
    for(const li of panel.querySelectorAll('.atlas-replay-steps li'))li.toggleAttribute?.('data-current',+li.dataset.step===index);
    for(const row of panel.querySelectorAll('.atlas-replay-log [data-row]')){
      const on=+row.dataset.row===s.log;row.toggleAttribute?.('data-current',on);
      // Scroll only the panel's own log list (never the page) so the current row stays in view.
      const list=row.parentElement;
      if(on&&speak&&list&&list.clientHeight){const top=row.offsetTop,bottom=top+row.offsetHeight;if(top<list.scrollTop)list.scrollTop=top;else if(bottom>list.scrollTop+list.clientHeight)list.scrollTop=bottom-list.clientHeight;}
    }
  };
  // The dated log's highlight, removed (it is restored by the next announce).
  const clearHighlight=()=>{const rows=$('audit-log-table')?.children||[];for(let r=0;r<rows.length;r++){rows[r].classList?.remove?.('atlas-replay-current');rows[r].removeAttribute?.('aria-current');}};
  const stop=()=>{playing=false;if(frame!==null)globalThis.cancelAnimationFrame?.(frame);frame=null;const b=panel.querySelector('[data-replay="play"]');if(b){b.textContent='Play';b.setAttribute('aria-pressed','false');}};
  const go=i=>{index=Math.max(0,Math.min(frames().length-1,i));progress=1;announce();paintFrame();};
  const tick=now=>{
    if(!playing)return;
    const dt=lastTime?now-lastTime:0;lastTime=now;progress=Math.min(1,progress+dt*speed/STEP_MS);paintFrame();
    if(progress>=1){if(index>=frames().length-1){stop();return;}index++;progress=0;announce();}
    frame=globalThis.requestAnimationFrame(tick);
  };
  const play=()=>{
    if(reduce()||!history.steps.length)return;   // reduced motion: static frames only, moved with the step buttons
    if(index>=frames().length-1&&progress>=1)index=0;
    playing=true;lastTime=0;if(progress>=1){progress=0;}announce();
    const b=panel.querySelector('[data-replay="play"]');if(b){b.textContent='Pause';b.setAttribute('aria-pressed','true');}
    frame=globalThis.requestAnimationFrame(tick);
  };
  panel.addEventListener('click',event=>{
    const act=event.target?.closest?.('[data-replay]')?.dataset?.replay;if(!act)return;
    if(act==='play'){playing?stop():play();}
    else if(act==='back'){stop();go(index-1);}
    else if(act==='forward'){stop();go(index+1);}
    else if(act==='restart'){stop();go(0);}
  });
  panel.addEventListener('change',event=>{if(event.target?.id==='atlas-replay-speed')speed=+event.target.value||1;});
  // The dated log for the screen: each recorded trade row joins its neighbours when groupTrades would; every other row is
  // the engine's line as it is (with the Atlas vessel name), and the liquidation rows sit under "End of campaign".
  function groupedLog(){
    const logs=[...state.logs].reverse(),byRow=new Map(history.all.map(t=>[t.log,t])),out=[];
    const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;');
    for(let r=0;r<logs.length;){
      const t=byRow.get(r);
      if(t){const run=[t];let k=r+1;while(byRow.get(k)&&logs[k]===logs[r]&&groupTrades([...run,byRow.get(k)]).length===1){run.push(byRow.get(k));k++;}
        const g=groupTrades(run)[0];
        out.push(run.length>1?`<li data-row="${r}" data-group="${run.length}" data-qty="${g.qty}" data-total="${Math.abs(g.cash)}"><details><summary>${esc(groupText(g))}</summary><ol>${run.map(x=>`<li>${esc(shown(logs[x.log]))}</li>`).join('')}</ol></details></li>`:`<li data-row="${r}">${esc(shown(logs[r]))}</li>`);
        r=k;continue;}
      const end=history.end&&r>=history.end.log;
      out.push(`<li data-row="${r}"${end?' data-end="true"':''}>${esc(end?`End of campaign (liquidation): ${shown(logs[r]).replace(/^\[M\d+ • \w+\] /,'')}`:shown(logs[r]))}</li>`);r++;
    }
    return `<ol class="atlas-replay-loglist">${out.join('')}</ol>`;
  }
  function paintReplay(){
    if(!state.ended){panel.hidden=true;stop();return;}
    const steps=history.steps,recorded=steps.reduce((n,s)=>n+s.months,0),missing=state.monthIndex-history.startMonth-recorded;
    panel.hidden=false;stop();index=0;progress=1;
    const still=reduce();
    panel.innerHTML=`<h3 id="atlas-replay-heading">Replay the campaign</h3>`+
      `<p class="atlas-chart-note">${steps.length} steps, one per voyage or month waited, recorded while you played. ${still?'Reduced motion is on, so each step is a still frame: use Back and Forward.':'Press Play to watch them on the map, about 1.5 seconds a step.'} The matching row of the dated log below is highlighted.${missing>0?` ${missing} month${missing===1?' was':'s were'} not recorded and ${missing===1?'is':'are'} not shown.`:''}</p>`+
      (steps.length?`<div class="atlas-replay-controls" role="group" aria-label="Replay controls">`+
        `<button type="button" data-replay="restart">Restart</button><button type="button" data-replay="back" aria-label="Previous step">◀ Back</button>`+
        `<button type="button" data-replay="play" aria-pressed="false"${still?' disabled':''}>Play</button>`+
        `<button type="button" data-replay="forward" aria-label="Next step">Forward ▶</button>`+
        `<label>Speed <select id="atlas-replay-speed"${still?' disabled':''}><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label></div>`+
        `<p id="atlas-replay-month" class="atlas-replay-month" aria-hidden="true"></p>`+
        `<svg viewBox="0 0 800 450" class="atlas-replay-svg" role="img" aria-label="Map of the replayed voyage; the step is described below"><rect width="800" height="450" class="atlas-home-sea"/>${land?land.outerHTML:''}`+
        `<path id="atlas-replay-route" class="atlas-replay-route" d=""/><g id="atlas-replay-marks"></g>`+
        Object.values(PORTS).map(p=>`<g transform="translate(${p.x} ${p.y})" class="atlas-home-port"><circle r="6" class="atlas-home-dot"/><text y="-12" x="${p.x>700?14:0}" text-anchor="${p.x>700?'end':'middle'}">${p.name}</text></g>`).join('')+
        `<g id="atlas-replay-ship" aria-hidden="true"><circle r="9" class="atlas-replay-ship"/></g></svg>`+
        `<p id="atlas-replay-line" class="atlas-replay-line" role="status" aria-live="polite"></p>`+
        `<details class="atlas-replay-all atlas-replay-log" open><summary>Log, with repeated trades grouped</summary>${groupedLog()}</details>`+
        `<details class="atlas-replay-all"><summary>All steps (text)</summary><ol class="atlas-replay-steps">${frames().map((s,i)=>s.kind==='end'?`<li data-step="${i}" data-kind="end">${stepText(s,i)}</li>`:`<li data-step="${i}" data-kind="${s.kind}" data-from="${s.from}" data-to="${s.to}" data-month="${s.month}" data-months="${s.months}" data-turned-back="${!!s.turnedBack}" data-storm="${s.storm}" data-pirates="${s.pirates}" data-log="${s.log}">${stepText(s,i).replace(/^Step \d+ of \d+\. /,'')}</li>`).join('')}</ol></details>`:
        `<p>No steps were recorded in this campaign.</p>`);
    if(steps.length){announce(false);paintFrame();}   // highlight the first step, but announce nothing until asked
  }
  // The end frame: what finishCampaign liquidates and settles, from the cargo and cash around it and the engine's own
  // prices (getLivePortPrice, as finishCampaign uses them).
  // The PDF export (html2canvas) renders the dated log from the screen: export it without the replay's highlight,
  // then put the highlight back.
  if(typeof exportAuditPDF==='function'){const exportOriginal=exportAuditPDF;exportAuditPDF=async function(...args){clearHighlight();try{return await exportOriginal.apply(this,args);}finally{if(state.ended&&frames().length)announce(false);}};}
  const replayFinishOriginal=finishCampaign;finishCampaign=function(...args){
    const port=state.currentPort,cargo={...state.cargo},cash=state.cash,debt=state.debt,log=state.logs.length,ended=state.ended;
    const r=replayFinishOriginal.apply(this,args);
    if(!ended&&state.ended)history.end={kind:'end',port,from:port,to:port,month:CAMPAIGN_MONTHS,months:0,log,cashBefore:cash,cashAfter:state.cash,debt,
      sold:COMMODITIES.filter(c=>cargo[c.id]>0).map(c=>({id:c.id,qty:cargo[c.id],value:cargo[c.id]*getLivePortPrice(c,port,Math.min(23,state.monthIndex))}))};
    paintReplay();return r;};
  reset();
  }
})();
