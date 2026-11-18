// Validates content.js: shape, duplicates, per-cell counts, dictionary coverage, morphology on long words.
const fs=require('fs'),vm=require('vm');const ctx={};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[2],'utf8')+';this.D=DECK;this.SC=SCENARIOS;this.W=WORDS;this.IG=WORD_IGNORE;',ctx);
const D=ctx.D, W=ctx.W, IG=new Set(ctx.IG), errs=[], warn=[];
const STOP=new Set("i me my mine you your yours we our us he him his she her it its they them their a an the to of in on at for with and or but is am are was were be been being does did done have has had having will would can could should shall may might must this that these those there here what where when how who whom which why not no so up out about as by from if then than too very just let s ll d ve re t m into over under after before again all any some each every both more most less much many own same such only also yet still even now well get got gotten going gone came took made put say said see seen give know want need like one two three ten seven first oh hi hey yes please getting other off another myself yourself".split(" "));
const ids=new Set(), ens=new Set();
D.forEach(c=>{ ['id','tag','lvl','en','ko'].forEach(k=>{ if(!c[k]) errs.push(`missing ${k}: ${JSON.stringify(c).slice(0,60)}`); });
  if (!["A1","A2","B1","B2"].includes(c.lvl)) errs.push('bad lvl '+c.en);
  if (ids.has(c.id)) errs.push('dup id '+c.id); ids.add(c.id);
  const e=c.en.toLowerCase(); if (ens.has(e)) errs.push('dup en '+c.en); ens.add(e); });
const forms=new Map(); Object.values(W).forEach(w=>{ if(![1,2,3].includes(w.band)) errs.push('bad band '+w.w); if(!w.ko||!w.pos) errs.push('missing ko/pos '+w.w); [w.w,...w.forms].forEach(f=>forms.set(f,w)); });
const used=new Set();
D.forEach(c=>{ for (const raw of c.en.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’]/g,"'").match(/[a-z][a-z'-]*/g)||[]) { let w=raw==="can't"?"can":raw==="won't"?"will":raw.endsWith("n't")?raw.slice(0,-3):raw.replace(/'(s|ll|d|ve|re|m)$/,''); w.split('-').forEach(p=>{ if(!p||STOP.has(p)||IG.has(p)) return; const e=forms.get(p); if(!e) errs.push(`no WORDS entry for "${p}" (${c.en})`); else { used.add(e.w); if (e.w.length>=8 && !e.parts.length && !e.story) errs.push(`long word without parts/story: ${p}`); } }); } });
const cell={}; D.forEach(c=>{const k=c.tag+'|'+c.lvl; cell[k]=(cell[k]||0)+1;});
const tags=[...new Set(D.map(c=>c.tag))]; const minCell=Math.min(...tags.flatMap(t=>["A1","A2","B1","B2"].map(l=>cell[t+'|'+l]||0)));
ctx.SC.forEach(s=>{ if(!tags.includes(s.tag)) errs.push('scenario tag not in deck '+s.id); });
const withParts=Object.values(W).filter(w=>w.parts.length||w.story).length;
const noIpa = Object.values(W).filter(e=>!/^\/[^\/]+\/$/.test(e.ipa||'')); noIpa.forEach(e=>errs.push('no ipa '+e.w)); const badStress = Object.values(W).filter(e=>e.ipa && /[aeiouɑæɔəɛɪʊʌɜ].*[ˈ ].*[aeiouɑæɔəɛɪʊʌɜ]/.test(e.ipa)===false && (e.ipa.match(/[aeiouɑæɔəɪʊʌɜ]+/g)||[]).length>2 && !e.ipa.includes('ˈ')); badStress.forEach(e=>errs.push('no stress '+e.w+' '+e.ipa));
console.log(JSON.stringify({withIpa:Object.values(W).filter(e=>e.ipa).length, chunks:D.length, situations:tags.length, minPerCell:minCell, scenarios:ctx.SC.length, scenarioTags:new Set(ctx.SC.map(s=>s.tag)).size, words:Object.keys(W).length, wordsUsed:used.size, wordsWithMorphologyOrStory:withParts, errors:errs.length}));
if (errs.length) { console.log(errs.slice(0,30).join('\n')); process.exit(1); }
