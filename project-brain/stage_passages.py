#!/usr/bin/env python3
"""Stage source-addressable Hub text, never approved policy or AI assertions."""
import hashlib, json, pathlib, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
def sha(b): return hashlib.sha256(b).hexdigest()
def esc(s): return str(s).replace("~","~0").replace("/","~1")
def walk(obj,p="",owner=None):
    if isinstance(obj,dict):
        owner=obj.get("id",owner) if isinstance(obj.get("id"),str) else owner
        for k,v in obj.items(): yield from walk(v,p+"/"+esc(k),owner)
    elif isinstance(obj,list):
        for i,v in enumerate(obj): yield from walk(v,p+"/"+str(i),owner)
    elif isinstance(obj,str) and obj.strip():
        yield {"pointer":p,"text":obj,"owner_ref":owner}
def build(root):
    root=pathlib.Path(root); file=root/"src/chapters.json"
    if not file.is_file(): raise ValueError("Full chapters.json must be present")
    raw=file.read_bytes(); doc=json.loads(raw.decode("utf-8"))
    units=list(walk(doc))
    if not units: raise ValueError("No authored text; refuse empty success")
    passages=[]
    for item in units:
        p=item["pointer"]; text=item["text"]
        passages.append({"id":"hubpassage:"+sha(("src/chapters.json#"+p).encode())[:24],
            "source_file":"src/chapters.json","source_sha256":sha(raw),"source_pointer":p,
            "author_object_id":item["owner_ref"],"text":text,"text_sha256":sha(text.encode()),
            "extraction":"verbatim_json_string","status":"unreviewed_source_excerpt",
            "claim_extracted":False,"approved":False})
    if len({x["id"] for x in passages})!=len(passages):raise ValueError("Pointer collision")
    manifest={"format":"source-addressed-hub-passages/v1","source_sha256":sha(raw),
        "passages":len(passages),"approved_claims":0,"evaluated_claims":0,
        "claim_level_synchronization":"pending_segment_and_review"}
    return manifest,passages
def main():
    root=pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else ROOT
    manifest,passages=build(root)
    out=root/"project-brain/generated";out.mkdir(parents=True,exist_ok=True)
    (out/"passage_manifest.json").write_text(json.dumps(manifest,indent=2,sort_keys=True)+"\n")
    (out/"authored_passages.jsonl").write_text("".join(json.dumps(x,sort_keys=True,ensure_ascii=False)+"\n" for x in passages))
    print("Staged",len(passages),"unreviewed passages; zero approved claims.")
if __name__=="__main__":main()
