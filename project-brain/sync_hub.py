#!/usr/bin/env python3
"""Fail-closed Hub source inventory. No AI approvals, no conversation access."""
import hashlib, json, pathlib, re, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
SRC=ROOT/"src"/"data.js"
CHAPTERS=ROOT/"src"/"chapters.json"
OUT=ROOT/"project-brain"/"generated"/"hub_manifest.json"
def digest(b): return hashlib.sha256(b).hexdigest()
def extract(pattern,s): return sorted(set(re.findall(pattern,s)))
def main():
    if not SRC.is_file() or not CHAPTERS.is_file(): raise SystemExit("Hub source missing")
    raw=SRC.read_bytes(); text=raw.decode("utf-8")
    chapter_ids=extract(r"\bid:'(sec-[^']+)'",text)
    source_ids=extract(r"\bid:'(strategy|ai-act-current|amlr|operating-model|ui-knowledge|hub-snapshot|mentor-context|user-status|synthetic|classifier-audit)'",text)
    objects=extract(r"\b(?:INS|CTX|METHOD|OBS|REQ|MAP|TEST|EVID|REUSE|DATA|CLM-BO)-[A-Za-z0-9@._-]+",text)
    if len(chapter_ids)<13: raise SystemExit(f"Chapter count regression: {len(chapter_ids)}")
    try: chapters=json.loads(CHAPTERS.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e: raise SystemExit(f"Invalid chapters.json: {e}")
    # Preserve exact authored chapter content as source; do not infer its authority.
    result={"schema_version":"1.0","source_files":{"src/data.js":{"sha256":digest(raw)},"src/chapters.json":{"sha256":digest(CHAPTERS.read_bytes())}},"chapter_ids":chapter_ids,"source_ids":source_ids,"object_ids":objects,"chapter_document_type":type(chapters).__name__,"claim_level_sync":"not_verified","authority":"authored_hub_content_not_institutional_approval","conversation_capture":"not_available_to_github_actions"}
    OUT.parent.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps(result,indent=2,sort_keys=True)+"\n",encoding="utf-8")
    print(f"Inventory: {len(chapter_ids)} chapters, {len(source_ids)} sources, {len(objects)} object IDs")
if __name__=="__main__": main()
