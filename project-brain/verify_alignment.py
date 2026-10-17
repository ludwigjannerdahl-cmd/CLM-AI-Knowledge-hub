#!/usr/bin/env python3
"""Check that curated ontology links still match the exact V22 authored Hub blob."""
import hashlib,json,pathlib,re
ROOT=pathlib.Path(__file__).resolve().parents[1]
def validate(root=ROOT):
    root=pathlib.Path(root)
    d=json.loads((root/"project-brain/ontology_v11_alignment.json").read_text())
    raw=(root/"src/data.js").read_bytes()
    blob=hashlib.sha1(("blob "+str(len(raw))+"\0").encode()+raw).hexdigest()
    if blob!=d["basis"]["blob_sha"]:raise ValueError("Hub source blob changed: re-harvest rather than silently reusing the alignment")
    txt=raw.decode("utf-8")
    ids=set(re.findall(r"\bid\s*:\s*['\"]([A-Z][A-Za-z0-9@._-]+)['\"]",txt))
    # Quoted object keys are also checked; never infer object existence from a title.
    for group in ("paths","layers"):
        for record in d[group]:
            for x in record["objects"]:
                if x not in ids:raise ValueError("Missing authored object "+x)
    for x in d["customer_domains"]:
        if "'"+x+"'" not in txt:raise ValueError("Missing authored data domain "+x)
    for c in d["conditions"]:
        if "'"+c["topic"][1]+"'" not in txt:raise ValueError("Missing authored topic "+c["topic"][1])
    for l in d["conditional_links"]:
        if "'"+l["authored_predicate"]+"'" not in txt:raise ValueError("Missing authored predicate "+l["authored_predicate"])
    for s in d["pending_sources"]:
        if s["content_status"]!="unread" or s["extracted_claims"]!=0:raise ValueError("No source text supports conversation claims")
    print("Pinned Hub blob matches; authored IDs/labels present; unread session has zero claims.")
if __name__=="__main__":validate()
