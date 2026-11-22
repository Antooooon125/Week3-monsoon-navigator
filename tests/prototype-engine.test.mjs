import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const original=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const prototype=readFileSync(new URL('../prototype.html',import.meta.url),'utf8');
const scripts=html=>[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim());
const engine=scripts(original)[0];
const baselineHarness=readFileSync(new URL('../tools/baseline-harness.js',import.meta.url),'utf8');
const baselineSnapshot=JSON.parse(readFileSync(new URL('./fixtures/baseline-transit.json',import.meta.url),'utf8'));
// A deliberately minimal DOM double: validates engine transitions and display
// adapters, not browser layout, focus navigation, CSS, or PDF pagination.
function load({atlas=false,random=.99}={}){
  const elements=new Map();let draws=0;
  class Element {
    set id(value){this._id=value;if(value)elements.set(value,this);}get id(){return this._id;}
    constructor(id=''){this.id=id;this.className='';this.innerHTML='';this.textContent='';this.value='';this.style={};this.dataset={};this.attributes={};this.children=[];this.disabled=false;this.hidden=false;}
    get classList(){const e=this;return {add(...v){e.className=[...new Set([...e.className.split(' '),...v])].join(' ');},remove(...v){e.className=e.className.split(' ').filter(x=>!v.includes(x)).join(' ');},contains(v){return e.className.split(' ').includes(v);},toggle(v){this.contains(v)?this.remove(v):this.add(v);}};}
    get parentElement(){return this._parent??=new Element();} get firstElementChild(){return this._first??=new Element();}get lastElementChild(){return this._last??=new Element();}
    querySelector(s){return this._queries??=new Map(),this._queries.has(s)?this._queries.get(s):(this._queries.set(s,new Element()),this._queries.get(s));}
    querySelectorAll(){return [];}closest(){return this.parentElement;}
    setAttribute(k,v){this.attributes[k]=String(v);}getAttribute(k){return this.attributes[k];}
    append(...els){this.children.push(...els);}prepend(...els){this.children.unshift(...els);}after(){}before(){}remove(){}replaceWith(){}insertAdjacentHTML(){}addEventListener(type,listener){this.listeners??={};this.listeners[type]=listener;}focus(){}scrollIntoView(){}
  }
  const get=id=>{if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id);};
  const document={getElementById:get,createElement:()=>new Element(),createElementNS:()=>new Element(),querySelector:s=>get(s),querySelectorAll:s=>s==='.diff-btn'?['easy','normal','hard','survival'].map(k=>get('diff-'+k)):[],body:new Element(),addEventListener(){},activeElement:new Element(),hidden:false};
  for(const match of original.matchAll(/id="([^"]+)"[^>]*?(?:class="([^"]*)")?[^>]*>/g))get(match[1]);
  get('input-name').value='Fictional Student';get('input-id').value='TEST-001';get('input-target-profit').value='1200';get('input-hypothesis').value='My dhow will carry pepper with favorable monsoon winds.';get('input-start-port').value='aden';
  const math=Object.create(Math);math.random=()=>{draws++;return random;};
  const context=createContext({document,Math:math,console,Date,Set,Map,matchMedia:()=>({matches:false}),window:{print(){}},location:{reload(){}}});
  runInContext(engine,context);if(atlas)runInContext(scripts(prototype)[1],context);
  return {run:code=>runInContext(code,context),snapshot:()=>JSON.parse(runInContext('JSON.stringify(state,(key,value)=>value instanceof Set?[...value]:value)',context)),draws:()=>draws,elements,context};
}

test('prototype embeds the original engine verbatim and needs no remote executable resources',()=>{
  assert.equal(scripts(prototype)[0],engine);assert.equal(scripts(prototype).length,2);
  assert.doesNotMatch(prototype,/<script[^>]+src=/);assert.doesNotMatch(prototype,/@import\s+url/);
  assert.match(prototype,/id="atlas-style"/);assert.match(prototype,/id="atlas-utilities"/);
});

test('the repository transit baseline reports MATCH for the original and the prototype',()=>{
  for(const atlas of [false,true]){
    const game=load({atlas});game.run(baselineHarness);
    const rows=JSON.parse(game.run('JSON.stringify(transitTable())'));
    assert.deepEqual(rows,baselineSnapshot.rows);
    console.log(`MATCH: ${rows.length} rows equal the snapshot taken at ${baselineSnapshot.revision.slice(0,7)} (${atlas?'prototype':'original'}).`);
  }
});

test('upstream clock, whole-word hypothesis and profit-target fixes remain in the prototype',()=>{
  // Updated for main ba2f279: Play Only is the default mode and skips the student form,
  // so the profit-target validation is exercised in Student Mode.
  const game=load({atlas:true});
  game.run('document.getElementById("input-hypothesis").value="junk money pepper";checkHypothesisConcepts()');
  assert.match(game.elements.get('hyp-concept-badge').textContent,/2\/3/);
  game.run('selectGameMode("student");document.getElementById("input-target-profit").value="99";startSimulation()');
  assert.equal(game.snapshot().logs.length,0);assert.match(game.elements.get('setup-error').textContent,/at least 100 D/);
  game.run('document.getElementById("input-target-profit").value="100";startSimulation();previewClockMonth(6)');
  assert.equal(game.elements.get('svg-clock-needle').getAttribute('transform'),'rotate(0)');
  game.run('state.monthIndex=6;renderAll()');
  assert.equal(game.elements.get('svg-clock-needle').getAttribute('transform'),'rotate(180)');
});

test('adapter initialization does not mutate model state or consume randomness',()=>{
  const baseline=load(),atlas=load({atlas:true});assert.deepEqual(atlas.snapshot(),baseline.snapshot());assert.equal(atlas.draws(),0);
});

test('both ships, all difficulties, market, waits, sailing and settlement match the original',()=>{
  for(const vessel of ['dhow','junk'])for(const difficulty of ['easy','normal','hard','survival']){
    const baseline=load(),atlas=load({atlas:true});
    for(const command of [`selectVessel('${vessel}')`,`selectDifficulty('${difficulty}')`,'startSimulation()',"buyCargoQty('pepper',1)","buyCargoQty('teak',99)","sellCargoQty('teak',1)",'waitInPort()','previewClockMonth(6)',"sailTo('calicut')","sellCargoQty('pepper',99)",'hireSpecialist("navigator")','finishCampaign()']){
      baseline.run(command);atlas.run(command);assert.deepEqual(atlas.snapshot(),baseline.snapshot(),`${vessel}/${difficulty}: ${command}`);assert.equal(atlas.draws(),baseline.draws(),command);
    }
  }
});

test('Aden to Calicut timing retains the July/January teaching example',()=>{
  const game=load({atlas:true});game.run('state.currentPort="aden"');
  const values=JSON.parse(game.run('JSON.stringify([computeTransit(SEA_LANES.find(l=>l.from==="aden"&&l.to==="calicut"),6),computeTransit(SEA_LANES.find(l=>l.from==="aden"&&l.to==="calicut"),0)])'));
  assert.deepEqual(values.map(v=>[v.days,v.months]),[[14,1],[53,2]]);
});

test('forecast changes presentation selection without spending cash, advancing time or consuming RNG',()=>{
  const game=load({atlas:true});game.run('startSimulation()');const before=game.snapshot(),draws=game.draws();game.run('previewClockMonth(6)');const after=game.snapshot();
  delete before.previewMonthOffset;delete after.previewMonthOffset;assert.deepEqual(after,before);assert.equal(game.draws(),draws);
  assert.equal(game.context.document.body.dataset.season,'ne');
});

test('display re-renders and theme changes preserve economic state and random draw count',()=>{
  const game=load({atlas:true});game.run('startSimulation()');const before=game.snapshot(),draws=game.draws();game.run('renderAll();renderAll();document.body.dataset.theme="dark";renderAll()');assert.deepEqual(game.snapshot(),before);assert.equal(game.draws(),draws);
});

test('adverse outcomes and turnbacks preserve baseline RNG and model results',()=>{
  for(const random of [0,.2,.5,.99]){
    const baseline=load({random}),atlas=load({atlas:true,random});
    for(const command of ['startSimulation()','state.cargo.teak=2;state.cargo.porcelain=3;state.cargo.textiles=2;state.cargo.cloves=1',"sailTo('calicut')",'state.monthIndex=3',"sailTo(state.currentPort==='aden'?'calicut':'malacca')",'repairHull()','finishCampaign()']){baseline.run(command);atlas.run(command);assert.deepEqual(atlas.snapshot(),baseline.snapshot(),`${random}: ${command}`);assert.equal(atlas.draws(),baseline.draws());}
  }
});

test('last-month forecast and campaign audit remain available',()=>{
  const game=load({atlas:true});game.run('startSimulation();state.monthIndex=23;renderAll()');assert.equal(game.run('getForecastMonthIndex()'),null);game.run('waitInPort()');assert.equal(game.snapshot().ended,true);assert.equal(game.context.document.body.dataset.plate,'audit');
});

test('Play Only is the default: it starts without the student form and ignores a typed target',()=>{
  // Added for main ba2f279 (Play Only / Student Mode).
  const game=load({atlas:true});
  assert.equal(game.snapshot().mode,'play');
  game.run('document.getElementById("input-target-profit").value="99";startSimulation()');
  const s=game.snapshot();assert.ok(s.logs.length>0,'Play Only starts even with a target below 100 D');
  assert.equal(s.studentName,'');assert.equal(s.targetProfit,1200);
});

test('offline PDF export: gated to Student Mode with a reflection, then the browser print fallback',async()=>{
  // Replaces the ungated b607af9 test: on main ba2f279 export needs Student Mode, an ended
  // campaign and a reflection of at least 15 characters (canExportStudentAudit).
  const play=load({atlas:true});let playPrints=0;play.context.window.print=()=>playPrints++;
  play.run('startSimulation();finishCampaign()');await play.run('exportAuditPDF()');
  assert.equal(playPrints,0,'Play Only never prints the audit');
  // The DOM double does not read the static disabled attribute, so the Play Only button state is checked in the browser review, not here.
  const game=load({atlas:true});let prints=0;game.context.window.print=()=>prints++;
  game.run('selectGameMode("student");startSimulation();finishCampaign()');
  game.run('document.getElementById("input-reflection").value="short";syncReflection()');
  await game.run('exportAuditPDF()');assert.equal(prints,0,'a reflection under 15 characters keeps export locked');
  assert.equal(game.elements.get('btn-export-pdf').disabled,true);
  game.run('document.getElementById("input-reflection").value="Headwinds cost two extra months at sea.";syncReflection()');
  assert.equal(game.elements.get('btn-export-pdf').disabled,false);
  await game.run('exportAuditPDF()');assert.equal(prints,1);assert.equal(game.elements.get('btn-export-pdf').disabled,false);
});

test('spectral tracers follow the actual wind when a different departure is previewed',()=>{
  const game=load({atlas:true});game.run('startSimulation();previewClockMonth(6)');
  const firstLine=()=>{
    const markup=game.elements.get('svg-wind-field').innerHTML;
    const match=markup.match(/x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"/);
    return match.slice(1).map(Number);
  };
  let [x1,y1,x2,y2]=firstLine();assert.ok(x2<x1&&y2>y1,'January wind must still point southwest');
  game.run('state.monthIndex=6;renderAll()');[x1,y1,x2,y2]=firstLine();assert.ok(x2>x1&&y2<y1,'July wind must point northeast');
});

test('dismissing a first event preserves the model, and repeated events stay in the log',()=>{
  const game=load({atlas:true,random:0});game.run('startSimulation();sailTo("calicut")');
  const card=game.elements.get('atlas-event');assert.equal(card.hidden,false);assert.equal(card.dataset.kind,'turnback');
  const before=game.snapshot(),draws=game.draws();game.elements.get('atlas-event-close').listeners.click();game.run('renderAll()');
  assert.equal(card.hidden,true);assert.deepEqual(game.snapshot(),before);assert.equal(game.draws(),draws);
  game.run('state.monthIndex=1;sailTo("calicut")');assert.equal(card.hidden,true);assert.ok(game.snapshot().logs.some(entry=>entry.includes('TURNED BACK')));
});

test('the hold display reconciles bought cargo weight with vessel capacity',()=>{
  const game=load({atlas:true});game.run('startSimulation();buyCargoQty("pepper",1)');
  assert.equal(game.run('getUsedTonnage()'),2);
  assert.equal(game.elements.get('atlas-hold-manifest').getAttribute('aria-label'),'2 of 120 tons loaded; 118 tons available.');
  assert.match(game.elements.get('cargo-shelves').innerHTML,/1 lots <span aria-hidden="true">\/<\/span> 2 t/);
});

test('builder: breakpoint utilities come after every base utility, and the font import is removed whole',()=>{
  // F13: "grid-cols-1 sm:grid-cols-2" collapsed when a breakpoint rule preceded its base rule.
  const css=prototype.match(/<style id="atlas-utilities">([\s\S]*?)<\/style>/)[1];
  const firstMedia=css.indexOf('@media');assert.ok(firstMedia>0);
  assert.doesNotMatch(css.slice(firstMedia).replace(/@media\([^)]*\)\{[^{}]*\{[^{}]*\}\}/g,''),/\.[a-z0-9\:-]+\{/i,'a base rule follows a breakpoint rule');
  assert.ok(css.indexOf('.grid-cols-1{')>=0&&css.indexOf('.grid-cols-1{')<css.indexOf(String.raw`.sm\:grid-cols-2{`));
  assert.doesNotMatch(prototype,/display=swap'\);/,'remnant of the Google Fonts @import');
});

test('Play Only audit text names no target or prediction; Student Mode keeps them',()=>{
  // F14: the Atlas audit lead was written before game modes existed.
  const play=load({atlas:true});play.run('startSimulation();finishCampaign()');
  assert.doesNotMatch(play.elements.get('atlas-audit-summary').textContent,/target/);
  assert.doesNotMatch(play.elements.get('atlas-audit-prompt').textContent,/prediction/);
  assert.equal(play.elements.get('atlas-audit-eyebrow').textContent,'Results / voyage evidence');
  assert.doesNotMatch(play.elements.get('atlas-steps').innerHTML,/Predict|Audit/);
  const student=load({atlas:true});student.run('selectGameMode("student");startSimulation();finishCampaign()');
  assert.match(student.elements.get('atlas-audit-summary').textContent,/against your 1,200 D profit target/);
  assert.match(student.elements.get('atlas-audit-prompt').textContent,/prediction/);
  assert.equal(student.elements.get('atlas-audit-eyebrow').textContent,'Audit / prediction and evidence');
});

test('one print action, credits and drawing provenance as resolved for the KVIS deployment',()=>{
  const game=load({atlas:true});
  assert.equal(game.elements.get('btn-print-audit').textContent,'Print / Save as PDF');
  assert.ok(game.elements.get('btn-export-pdf').classList.contains('hidden'),'duplicate export button hidden');
  assert.match(game.elements.get('atlas-export-note').textContent,/print dialog/);
  game.run('startSimulation()');
  assert.match(game.elements.get('ship-credit').textContent,/^Original schematic illustration; reference photograph: /);
  assert.equal(game.elements.get('atlas-classic-link').href,'classic.html');
});

test('packaging: no relative links or images that would miss beside the deployed page',()=>{
  // B2: href="README.md" resolved to projects/03/README.md on the KVIS site (404).
  assert.doesNotMatch(prototype,/href="README\.md"/);
  assert.doesNotMatch(prototype,/harbor-atlas\.jpg/);
  assert.doesNotMatch(prototype,/playable visual prototype/);
});

