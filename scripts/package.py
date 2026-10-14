"""Build a portable, deterministic review ZIP with source and static output."""
from pathlib import Path
import zipfile,hashlib,json
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'releases';OUT.mkdir(exist_ok=True)
archive=OUT/'CLM_AI_Knowledge_Hub_V19.zip'
allowed={'src','scripts','docs','reports','planning','assets','sources','tests'}
excluded={'CLM_AI_Knowledge_Hub_2026_10_14.html','PACKAGE_CHECK.json','SHA256SUMS.txt'}
files=[]
for p in ROOT.rglob('*'):
 if not p.is_file():continue
 rel=p.relative_to(ROOT)
 if rel.parts[0] not in allowed and str(rel) not in ['README.md','package.json','.gitignore']:continue
 if '__pycache__' in rel.parts or p.name in excluded or p.suffix=='.pyc':continue
 files.append(p)
files.sort()
manifest=''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.relative_to(ROOT).as_posix()+'\n' for p in files)
(ROOT/'reports/SHA256SUMS.txt').write_text(manifest)
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in files+[ROOT/'reports/SHA256SUMS.txt']:
  info=zipfile.ZipInfo('CLM_AI_Knowledge_Hub/'+p.relative_to(ROOT).as_posix(),(2026,10,14,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,p.read_bytes())
with zipfile.ZipFile(archive) as z:
 assert z.testzip() is None
 for p in files:
  assert hashlib.sha256(z.read('CLM_AI_Knowledge_Hub/'+p.relative_to(ROOT).as_posix())).digest()==hashlib.sha256(p.read_bytes()).digest()
result={'file':archive.name,'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'entries':len(files)+1,'integrity':'passed','entryHashes':'passed','renderedEvidence':False}
(ROOT/'reports/PACKAGE_CHECK.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result))
