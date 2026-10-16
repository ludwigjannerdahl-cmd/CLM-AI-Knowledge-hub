import {readFile,readdir,lstat,realpath} from 'node:fs/promises';
import {resolve,relative,join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
export const forbiddenPath=/(?:^|\/)(?:\.private(?:-[^/]+)?|private[-_](?:atlas|specimens?|output)|pwmfo-kyc-sop)(?:\/|$)|(?:private[-_]reference[-_]atlas|SOP.*\.(?:pdf|zip)$)/i;
export const forbiddenText=/(?:pwmfo-kyc-sop|PRIVATE_SPECIMEN_CANARY|classification\s*[:=]\s*["']?C[23]\b|"publication"\s*:\s*"private-internal")/i;
export function assertSafeAsset(name,bytes){if(/\.(?:png|jpe?g|webp|gif|woff2?|ttf|zip)$/i.test(name)||forbiddenPath.test(name)||forbiddenText.test(Buffer.from(bytes).toString('utf8')))throw Error('Private content blocked from build: '+name);}
export async function guardSource(root){
 const ctx={};vm.createContext(ctx);vm.runInContext(await readFile(join(root,'src/specimen-kernel.js'),'utf8'),ctx);
 const p=JSON.parse(await readFile(join(root,'fixtures/useful-work.safe.json'),'utf8'));ctx.CLM_SPECIMEN_KERNEL.assertPublishable(p);assertSafeAsset('fixtures/useful-work.safe.json',JSON.stringify(p));
 const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
 for(const name of files)if(forbiddenPath.test(name))throw Error('Private path is tracked or unignored: '+name);
 for(const name of ['fixtures/useful-work.safe.json','src/specimen-kernel.js','src/useful-work.js','src/useful-work.css']){
  const full=join(root,name);if((await lstat(full)).isSymbolicLink()||relative(root,await realpath(full)).startsWith('..'))throw Error('External or symlink build input blocked: '+name);
  assertSafeAsset(name,await readFile(full));
 }
 return {fixture:p.id,sha256:createHash('sha256').update(await readFile(join(root,'fixtures/useful-work.safe.json'))).digest('hex'),publication:p.publication};
}
export async function guardOutput(root,out){
 async function scan(dir){for(const f of await readdir(dir,{withFileTypes:true})){const path=join(dir,f.name),name=relative(out,path);if(f.isSymbolicLink())throw Error('Symlink in output: '+name);if(f.isDirectory())await scan(path);else assertSafeAsset(name,await readFile(path));}}
 await scan(out);return true;
}
if(process.argv[1]===new URL(import.meta.url).pathname){const root=resolve(new URL('..',import.meta.url).pathname);console.log(JSON.stringify(await guardSource(root)));await guardOutput(root,join(root,'docs'));console.log('Private specimen/atlas guard passed. This is not classification clearance for legacy Hub content.');}
