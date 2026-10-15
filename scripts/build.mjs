import {readFile,writeFile,mkdir,copyFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,join} from 'node:path';
import vm from 'node:vm';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const read=p=>readFile(join(root,p),'utf8');
const out=join(root,'docs');
await rm(out,{recursive:true,force:true});
await mkdir(join(out,'assets'),{recursive:true});await mkdir(join(out,'sources'),{recursive:true});
const chapters=JSON.parse(await read('src/chapters.json'));
// Evaluate only the extracted static object literal, never the legacy page scripts.
const portfolio=JSON.parse(JSON.stringify(vm.runInNewContext('('+chapters.portfolioLiteral+')',Object.create(null),{timeout:1000})));
for(const item of Object.values(portfolio)){if(item.tier)item.tier='Original working label, unreviewed: '+item.tier;if(item.gov)item.gov='Historical scoping proposal, not current approval: '+item.gov;if(item.status)item.status='Recorded in source: '+item.status+' (current status unverified)';if(item.stat)item.stat=item.stat.replace(/SensAIa? precedent operational in PWM&FO\./g,'SensAIa precedent reported; current operation and closure of conditions are not established.');}
delete chapters.portfolioLiteral;
chapters.portfolio=portfolio;
const json=v=>JSON.stringify(v).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const scripts=['data','chapters','source-texts','scoping','model','views','app'];
const content={chapters:'window.CLM_HUB_CHAPTERS='+json(chapters)+';', 'source-texts':'window.CLM_SOURCE_TEXTS='+json(JSON.parse(await read('src/source-texts.json')))+';'};
for(const name of scripts){if(!content[name])content[name]=await read('src/'+name+'.js');await writeFile(join(out,'assets',name+'.js'),content[name]);}
const css=await read('src/styles.css');await writeFile(join(out,'assets/styles.css'),css);
await copyFile(join(root,'assets/favicon.svg'),join(out,'assets/favicon.svg'));
const html=await read('src/index.html');await writeFile(join(out,'index.html'),html);
let standalone=html.replace('<link rel="stylesheet" href="assets/styles.css">','<style>'+css+'</style>');
for(const name of scripts)standalone=standalone.replace('<script src="assets/'+name+'.js"></script>',()=>'<script>'+content[name].replace(/<\/script/gi,'<\\/script')+'</script>');
await writeFile(join(out,'OPEN_ME_FIRST.html'),standalone);
// Explicit distribution allowlist: no Mentor packet, raw source page, captured history or analytics.
for(const name of ['SEB_AI_sub_strategy_v1.0.pdf','CLM_AI_Operating_Model_Knowledge_v1.0.md','UI_Intelligence_and_Insight_Design_Knowledge_v1.1.md'])await copyFile(join(root,'sources',name),join(out,'sources',name));
await writeFile(join(out,'.nojekyll'),'');
console.log(JSON.stringify({version:'19.0.1',output:'docs',chapters:chapters.chapters.length,portfolioRecords:Object.keys(portfolio).length,standalone:true}));
