import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const original = readFileSync(resolve(root, 'index.html'), 'utf8');
const adapter = readFileSync(resolve(root, 'prototype/atlas.js'), 'utf8');
let styles = readFileSync(resolve(root, 'prototype/atlas.css'), 'utf8');
// KVIS deployments may inline the reviewed foundation block from a separate
// checkout. No runtime dependency on that checkout or on the shared sheet remains.
const args = process.argv.slice(2);
const options = new Map();
for (let i = 0; i < args.length; i += 2) {
  if (!['--shared-theme', '--shared-theme-revision'].includes(args[i]) ||
      !args[i + 1] || args[i + 1].startsWith('--') || options.has(args[i])) {
    throw new Error('Use --shared-theme <file> --shared-theme-revision <40-character commit>');
  }
  options.set(args[i], args[i + 1]);
}
let sharedStyle = '';
if (options.size) {
  const filename = options.get('--shared-theme');
  const revision = options.get('--shared-theme-revision');
  if (!filename || !/^[a-f0-9]{40}$/.test(revision || '')) {
    throw new Error('Both shared-theme arguments are required, including an immutable source commit');
  }
  const theme = readFileSync(resolve(filename), 'utf8');
  const blocks = [...theme.matchAll(/\/\* KVIS foundations:begin \*\/\n([\s\S]*?)\/\* KVIS foundations:end \*\//g)];
  if (blocks.length !== 1 || !blocks[0][1].trim() || /<\/style/i.test(blocks[0][1])) {
    throw new Error('Expected exactly one nonempty KVIS foundations block');
  }
  const foundation = blocks[0][1];
  for (const name of ['f-display', 'f-body', 'f-mono', 'kvis-space-2', 'kvis-space-4',
    'kvis-space-6', 'kvis-control-min-size', 'kvis-focus-width', 'kvis-focus-offset']) {
    if (!foundation.includes(`--${name}:`)) throw new Error(`Missing foundation token --${name}`);
  }
  // Atlas keeps its embedded font-family aliases, its focus offset, and every
  // colour/layout rule. Shared declarations supply the roles and behaviour.
  let fontRoles = 0;
  styles = styles.replace(/--f-(display|body|mono):([^;]+);/g, (_, role, family) => {
    fontRoles++;
    return `--kvis-font-${role}:${family};`;
  });
  if (fontRoles !== 3) throw new Error('Expected three Atlas font-role declarations');
  styles = styles.replace(':root{', ':root{--kvis-focus-offset:3px;');
  const focus = 'button:focus-visible,a:focus-visible,[tabindex]:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible{outline:3px solid var(--accent);outline-offset:3px}';
  if (styles.split(focus).length !== 2) throw new Error('Atlas focus rule changed; review the shared mapping');
  styles = styles.replace(focus, '');
  styles = styles.replace(/min-(height|width):44px/g, 'min-$1:var(--kvis-control-min-size)')
    .replace(/gap:8px(?=[;}])/g, 'gap:var(--kvis-space-2)')
    .replace(/gap:24px(?=[;}])/g, 'gap:var(--kvis-space-6)')
    .replace(/padding:24px!important/g, 'padding:var(--kvis-space-6)!important')
    .replace(/padding:16px!important/g, 'padding:var(--kvis-space-4)!important');
  const checksum = createHash('sha256').update(foundation).digest('hex');
  sharedStyle = `<style id="atlas-foundations" data-source-revision="${revision}" data-foundations-sha256="${checksum}">${foundation}</style>\n`;
}
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
let utility = '*{box-sizing:border-box}body{margin:0}button,input,select,textarea{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed}h1,h2,h3,h4,p,figure{margin:0}ul{padding:0;list-style:none}a{color:inherit}img,svg{max-width:100%}table{border-spacing:0}th,td{vertical-align:top} [class*="space-y-"]>*+*{margin-top:var(--stack)}[class*="space-x-"]>*+*{margin-left:var(--inline-gap)}\n';
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
// Real coastlines: Natural Earth 1:50m Land (public domain), projected and simplified by
// scripts/coastline.mjs into prototype/coastline.json. They replace the hand-drawn land shapes
// in the page body; the engine script is untouched.
const coastline=JSON.parse(readFileSync(resolve(root,'prototype/coastline.json'),'utf8'));
const landGroup=/(<g fill="#243950"[^>]*>)[\s\S]*?(<\/g>)/;
if(!landGroup.test(original))throw new Error('Land group not found in index.html');
const landPaths=coastline.paths.map(d=>`<path d="${d}" />`).join('');
// The ITCZ panel draws on the same land, so the adapter gets the same fit: x = a·lon + b, y = c·lat + d.
const projection=JSON.stringify({x:coastline.projection.x,y:coastline.projection.y});
if(adapter.split('__ATLAS_PROJECTION__').length!==2)throw new Error('the adapter must hold __ATLAS_PROJECTION__ exactly once');
const adapterBuilt=adapter.replace('__ATLAS_PROJECTION__',projection);
const landNote=`<!-- Coastlines: ${coastline.source.dataset} ${coastline.source.version} (public domain), axis-wise linear fit to the five ports, Douglas-Peucker ${coastline.simplification.toleranceMapUnits} map units -->`;
let output=original
  .replace(landGroup,(_,open,close)=>`${open}${landNote}${landPaths}${close}`)
  .replace(/<script\b[^>]*\bsrc=[^>]*><\/script>\s*/g,'')
  .replace(/@import url\((['"]).*?\1\);?/g,'')
  // The adapter removes the harbour illustration; drop its CSS so the page references no image file.
  .replace(/\s*\.harbor-art \{[^}]*\}/,'')
  .replace('<html lang="en" class="dark">','<html lang="en">')
  .replace(/<title>.*?<\/title>/,'<title>Monsoon Navigator — An Atlas of Moving Worlds</title>')
  .replace('</head>',`<meta name="description" content="Plan a merchant voyage through the seasonal Indian Ocean. Monsoon Navigator, presented as An Atlas of Moving Worlds.">\n<style id="atlas-fonts">${fontLicences}\n${fontCSS}</style>\n${sharedStyle}<style id="atlas-utilities">${utility}</style>\n<style id="atlas-style">${styles}</style>\n</head>`)
  .replace('</body>',`<script id="atlas-adapter">${adapterBuilt}</script>\n</body>`);
writeFileSync(resolve(root,'prototype.html'),output);
console.log('Built prototype.html; original simulation script preserved verbatim.');
