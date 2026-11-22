import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const original = readFileSync(resolve(root, 'index.html'), 'utf8');
const adapter = readFileSync(resolve(root, 'prototype/atlas.js'), 'utf8');
const styles = readFileSync(resolve(root, 'prototype/atlas.css'), 'utf8');
const typefaces = [
  ['Archivo Atlas','Archivo-Variable.ttf','100 900','62% 125%'],
  ['Atkinson Atlas','AtkinsonHyperlegible-Regular.ttf','400','normal'],
  ['Atkinson Atlas','AtkinsonHyperlegible-Bold.ttf','700','normal'],
  ['Plex Atlas','IBMPlexMono-Regular.ttf','400','normal'],
  ['Plex Atlas','IBMPlexMono-Medium.ttf','500','normal'],
];
const fontCSS=typefaces.map(([family,file,weight,stretch])=>`@font-face{font-family:"${family}";src:url(data:font/ttf;base64,${readFileSync(resolve(root,'prototype/fonts',file)).toString('base64')}) format("truetype");font-style:normal;font-weight:${weight};font-stretch:${stretch};font-display:swap}`).join('\n');
// Preserve the full font licences in the standalone export as well as the source tree.
const fontLicences=['Archivo-OFL.txt','AtkinsonHyperlegible-OFL.txt','IBMPlexMono-OFL.txt'].map(file=>`/* ${file}\n${readFileSync(resolve(root,'prototype/fonts',file),'utf8')}\n*/`).join('\n');
// Small local utility sheet for the inherited markup. No browser CDN or build install.
const rules = new Map(Object.entries({
  hidden:'display:none!important', block:'display:block', 'inline-block':'display:inline-block', flex:'display:flex', grid:'display:grid',
  'flex-1':'flex:1 1 0%', 'flex-col':'flex-direction:column', 'flex-wrap':'flex-wrap:wrap', 'shrink-0':'flex-shrink:0',
  'items-center':'align-items:center', 'items-start':'align-items:flex-start', 'justify-between':'justify-content:space-between',
  'justify-center':'justify-content:center', 'text-left':'text-align:left','text-right':'text-align:right','text-center':'text-align:center',
  'w-full':'width:100%', 'h-full':'height:100%', 'min-h-screen':'min-height:100vh', 'h-44':'height:11rem', 'h-48':'height:12rem',
  'h-2':'height:.5rem','h-20':'height:5rem','w-20':'width:5rem','w-9':'width:2.25rem','h-9':'height:2.25rem',
  relative:'position:relative', fixed:'position:fixed', sticky:'position:sticky','inset-0':'inset:0','top-0':'top:0',
  'z-50':'z-index:50','z-30':'z-index:30','z-10':'z-index:10','overflow-hidden':'overflow:hidden',
  'overflow-y-auto':'overflow-y:auto','overflow-x-auto':'overflow-x:auto','whitespace-nowrap':'white-space:nowrap',
  'border-collapse':'border-collapse:collapse','font-bold':'font-weight:700','font-semibold':'font-weight:600',
  uppercase:'text-transform:uppercase', italic:'font-style:italic','tracking-wider':'letter-spacing:.08em',
  'tracking-tight':'letter-spacing:-.025em','leading-relaxed':'line-height:1.6', underline:'text-decoration:underline',
  'cursor-pointer':'cursor:pointer','mx-auto':'margin-inline:auto','m-auto':'margin:auto','object-cover':'object-fit:cover',
  'object-center':'object-position:center','aspect-[16/9]':'aspect-ratio:16/9','grid-cols-[1fr_auto]':'grid-template-columns:1fr auto', 'max-w-7xl':'max-width:1400px',
  'max-w-5xl':'max-width:1160px','max-w-4xl':'max-width:1050px','max-w-3xl':'max-width:900px','max-w-2xl':'max-width:760px',
  'rounded-full':'border-radius:99px','border':'border:1px solid var(--line)','border-2':'border:2px solid var(--line)',
  'border-b':'border-bottom:1px solid var(--line)','border-t':'border-top:1px solid var(--line)',
}));
for (const [name, size] of Object.entries({xs:'.875rem',sm:'.9375rem',base:'1rem',lg:'1.125rem',xl:'1.3rem','2xl':'1.75rem','3xl':'2rem'})) rules.set('text-'+name, 'font-size:'+size);
for (const n of [0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8]) {
  for (const [prefix,prop] of Object.entries({p:'padding',px:'padding-inline',py:'padding-block',pt:'padding-top',pb:'padding-bottom',pr:'padding-right',pl:'padding-left',m:'margin',mx:'margin-inline',my:'margin-block',mt:'margin-top',mb:'margin-bottom',ml:'margin-left',gap:'gap','gap-x':'column-gap','gap-y':'row-gap'})) rules.set(prefix+'-'+n,prop+':'+n*.25+'rem');
  rules.set('space-y-'+n, '--stack:'+n*.25+'rem');
  rules.set('space-x-'+n, '--inline-gap:'+n*.25+'rem');
}
for (let n=1;n<=12;n++) {rules.set('grid-cols-'+n,`grid-template-columns:repeat(${n},minmax(0,1fr))`);rules.set('col-span-'+n,`grid-column:span ${n}/span ${n}`);}
for(const name of ['rounded','rounded-md','rounded-lg','rounded-xl']) rules.set(name,'border-radius:5px');
// Include tokens from both static markup and dynamic templates, including conditional classes.
const tokens = new Set((original+adapter).match(/[a-zA-Z0-9_-]+(?::[a-zA-Z0-9_-]+)*-?\[[^\]\s]+\](?:\/\d+)?|[a-zA-Z0-9_-]+(?::[a-zA-Z0-9_./-]+)*/g));
let utility = '*{box-sizing:border-box}html{font-size:16px}body{margin:0}button,input,select,textarea{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed}h1,h2,h3,h4,p,figure{margin:0}ul{padding:0;list-style:none}a{color:inherit}img,svg{max-width:100%}table{border-spacing:0}th,td{vertical-align:top} [class*="space-y-"]>*+*{margin-top:var(--stack)}[class*="space-x-"]>*+*{margin-left:var(--inline-gap)}\n';
const media={};
const escape = s => s.replace(/[^a-zA-Z0-9_-]/g,c=>'\\'+c);
for(const token of tokens){
  const parts=token.split(':');const name=parts.pop();let value=rules.get(name);
  if(!value && /^text-\[\d+px\]$/.test(name)) value='font-size:.8125rem';
  if(!value && /^bg-(slate|cyan|amber|emerald|rose)-/.test(name)) value='background:var(--surface)';
  if(!value && /^border-(slate|cyan|amber|emerald|rose)-/.test(name)) value='border-color:var(--line)';
  if(!value && /^text-(slate|white)/.test(name)) value='color:'+(/(400|500)/.test(name)?'var(--muted)':'var(--ink)');
  if(!value && /^text-(cyan|amber|emerald|rose)-/.test(name)) value='color:var(--'+({cyan:'accent',amber:'warn',emerald:'good',rose:'bad'}[name.split('-')[1]])+')';
  if(!value && name==='opacity-60')value='opacity:.6';
  if(!value && /^opacity-/.test(name))value='opacity:'+Number(name.split('-')[1])/100;
  if(!value)continue;
  let selector='.'+escape(token),min=null;
  for(const variant of parts) {
    if({sm:640,md:768,lg:1100}[variant])min={sm:640,md:768,lg:1100}[variant];
    else if(['hover','disabled','focus','focus-visible'].includes(variant))selector+=':'+variant;
  }
  const rule=selector+'{'+value+'}';if(min)(media[min]??=[]).push(rule);else utility+=rule+'\n';
}
// Breakpoint rules come after every base rule, smallest breakpoint first, so that
// "grid-cols-1 sm:grid-cols-2" works whatever order the tokens appear in the source.
for(const min of Object.keys(media).map(Number).sort((a,b)=>a-b))utility+=media[min].map(rule=>`@media(min-width:${min}px){${rule}}\n`).join('');
let output=original
  .replace(/<script\b[^>]*\bsrc=[^>]*><\/script>\s*/g,'')
  .replace(/@import url\((['"]).*?\1\);?/g,'')
  // The adapter removes the harbour illustration; drop its CSS so the page references no image file.
  .replace(/\s*\.harbor-art \{[^}]*\}/,'')
  .replace('<html lang="en" class="dark">','<html lang="en">')
  .replace(/<title>.*?<\/title>/,'<title>Monsoon Navigator — An Atlas of Moving Worlds</title>')
  .replace('</head>',`<meta name="description" content="Plan a merchant voyage through the seasonal Indian Ocean. Monsoon Navigator, presented as An Atlas of Moving Worlds.">\n<style id="atlas-fonts">${fontLicences}\n${fontCSS}</style>\n<style id="atlas-utilities">${utility}</style>\n<style id="atlas-style">${styles}</style>\n</head>`)
  .replace('</body>',`<script id="atlas-adapter">${adapter}</script>\n</body>`);
writeFileSync(resolve(root,'prototype.html'),output);
console.log('Built prototype.html; original simulation script preserved verbatim.');
