"""Scoped editorial repairs to the active projection; supplied source bytes stay intact."""
import re
from html import escape

ESTIMATE='Original SEB–Bain estimate of potential KYC outreach effort reduction: about 31%. This is a planning estimate, not an established measured outcome. Baseline, population, assumptions and exact model date are not supplied.'
REPLACEMENTS={
 '↺ Every cycle compounds the value of the layer':'Selected observations may inform later work after verification, permitted promotion and separate reuse review',
 'Joined with existing products, patterns emerge':'Verify meaning, provenance and applicability before joining information',
 'Sharper insight fuels the next interaction':'Use only within the reviewed scope; evaluate its usefulness',
 'The The original SEB–Bain':'The original SEB–Bain',
 'AI saves 31% of time → treat the estimate as a staffing commitment.':'An estimate is mistaken for realised capacity.',
 'SensAIa precedent operational in PWM&FO.':'SensAIa precedent reported; current operation and closure of approval conditions are not established.',
 'Source-first, C4-heavy, or multi-step CLM agents belong in a tighter Vertex AI / GCP lane.':'Source-first or multi-step work may require a controlled execution lane. Strategy direction does not establish workload or data-class permission.',
 'Bain savings model shows 31% time reduction':'The original SEB–Bain model estimates about 31% potential reduction in KYC outreach effort',
 'Outreach reduction measured in prototype testing':'Potential outreach effort reduction in the original SEB–Bain estimate; no measured outcome established',
 '31% outreach reduction validated.':'Original SEB–Bain outreach estimate: about 31% potential effort reduction; no measured outcome established.',
 'savings model (31% KYC time reduction)':'original SEB–Bain estimate (about 31% potential outreach effort reduction; not measured)',
 'The savings model is validated':'The savings model is an original estimate developed with Bain',
 'this validated asset':'this prototype and its estimated opportunity',
 'reduce headcount by 31%':'treat the estimate as a staffing commitment',
 '31% savings → headcount?':'How should potential capacity release be evaluated?',
 'small team (2–3 people)':'small team',
 'Can a team of two own this end-to-end?':'Can the team sustain ownership across the full lifecycle?',
 'Starting hypothesis: 2–3 builders (ML engineering + domain expertise).':'The proposed skill mix combines engineering and domain expertise; scope and ownership need to be established.',
 'whether every new delivery makes the next one cheaper and safer to build':'whether selected reviewed artifacts can support another task within an established scope, and whether the benefit exceeds review and maintenance costs',
 'every new agent becomes cheaper and safer':'later agents may reuse reviewed context when applicability, ownership and permitted consumption are established',
 'Every cycle through the client lifecycle makes the data richer. Every richer dataset makes the next interaction more valuable. This is the feedback mechanism that turns data infrastructure from a cost into a compounding asset.':'Client interactions can produce candidate observations. Verification, permitted record promotion and review for a new purpose determine what can be reused. Later usefulness depends on quality, applicability and maintenance; it must be evaluated.',
 'status: approved':'status: illustrative_approval_not_established',
 'Authority-State Ladder':'Source authority, review and evidence states',
 'Knowledge wording change':'Knowledge wording or meaning change',
 'Knowledge validation':'Knowledge validation and downstream impact assessment',
}

def repair_text(text):
 for old,new in REPLACEMENTS.items():text=text.replace(old,new)
 text=re.sub(r'\bSensAI\b','SensAIa',text)
 text=text.replace('both built by Bain','with different reported delivery histories; authorship needs source confirmation')
 text=text.replace('turns documentation into <strong>continuous assurance</strong>','supports coverage and change-review questions')
 text=re.sub(r'\b(\d+[–-]\d+|\d[\d,]*)\s+(builders|FTEs?|employees|engineers|developers)\b',r'a team of \2',text,flags=re.I)
 return text.replace('The The original SEB–Bain','The original SEB–Bain')

def repair_tree(root,Node):
 log=[]
 for n in list(root.walk()):
  if n.tag in ['script','style']:continue
  # These are complete claim paragraphs, not arbitrary text-node snippets.
  text=n.text().strip()
  replacement=None
  if n.tag=='p' and 'Making the links explicit turns documentation into' in text:
   replacement='Explicit links support coverage and change-review questions: which obligations lack a mapped control, which requirements lack test evidence, and which changes need reassessment? Links alone do not establish continuous assurance; valid evidence, actual controls and their maintained scope are still required.'
  if n.tag=='p' and 'Every cycle compounds' in text:
   replacement='Later work can benefit from reviewed context. Capture creates candidates; verification and permitted promotion establish records. Knowledge reuse requires its own applicability and ownership review. Measure accepted outcomes, review cost and maintenance before claiming a compounding benefit.'
  if n.tag in ['p','span'] and 'New data flows' in text and 'automatically' in text:
   replacement='New observations become candidates for verification and permitted promotion. They do not automatically become authoritative records or reusable knowledge.'
  if n.tag=='p' and 'each new agent' in text.lower() and ('cheaper' in text or 'safer' in text):
   replacement='A later assistant may reuse maintained knowledge and methods when they fit its purpose and permitted consumption. Reuse is conditional; lower cost, greater safety and better outcomes require evidence.'
  if n.tag in ['p','td'] and '31%' in text and any(k in text.lower() for k in ['savings model','validated','measured in prototype']):replacement=ESTIMATE
  if n.tag=='p' and 'Vertex AI with DPA' in text and ('approved' in text.lower() or 'C4' in text):
   replacement='Permission for the intended information and workload remains unresolved here. Strategic platform direction, a DPA and regional hosting do not themselves authorise use. Confirm the applicable classification vocabulary and current workload-specific rules with the responsible function.'
  if n.tag=='p' and 'GCP Vertex AI endpoints' in text and 'approved enterprise path' in text:
   replacement='This source describes a possible engineered workload route. A DPA, hosting region or strategic GCP direction does not establish C4 permission. The classification vocabulary and workload-specific authority must be confirmed; current applicability remains unresolved.'
  if n.tag=='p' and 'only environment today' in text:
   replacement='The source records a GCP/Vertex AI direction for controlled CLM workloads. Its claim that the required data, interfaces and controls coexist is a dated architecture assessment, not verification of a current working interface or workload permission.'
  if n.tag in ['p','td','li'] and re.search(r'SensAIa?',text) and re.search(r'\b(operational|production|approved)\b',text,re.I):
   replacement=re.sub(r'\b(approved and operational|approved and in production|live and operational|in production|operational)\b','reported in the source; current operation is not established',text,flags=re.I)
   if replacement==text:replacement=None
  if replacement:
   log.append({'kind':'claim-repair','before':text,'after':replacement});n.children=[replacement]
  else:
   new=[]
   for x in n.children:
    if isinstance(x,str):
     changed=repair_text(x)
     if changed!=x:log.append({'kind':'wording-repair','before':x.strip(),'after':changed.strip()})
     new.append(changed)
    else:new.append(x)
   n.children=new
 return log

def topic_note(tid):
 text=''
 if tid in ['intel-authority']:
  text='These states describe different dimensions. Source authority, review, applicability and evidence strength must be assessed separately; they are not a single ranking of truth.'
 if tid=='intel-requirements':
  text='CLM-BO-014 version 3 is an illustrative specimen. Its placeholder sources and TBD owners do not establish approval, implementation or a verified legal mapping.'
 if tid=='intel-layers':
  text='This is a CLM explanation proposal, inspired by a layered model. It is not an approved enterprise architecture. The operating plane means implementation, control and evidence; it is not a cloud platform.'
 if tid in ['tech-kaicy','arch-fenx']:
  text='Distinguish a proposed integration pattern from a working interface. The supplied dated material does not establish current Kaicy approval, production or live FenX integration.'
 if tid in ['model-bodies','ctx-seb','people-roles']:
  text='SensAIa has a reported conditional approval dated 27 August 2024. Closure of the conditions and current operation are not established by the supplied material.'
 if tid.startswith('risk-') or tid in ['model-tiers','lc-gates','clf-methodology','clf-reference','clf-governance','clf-how','clf-modeldoc','clf-build']:
  text='Governance explanations record source guidance and working interpretations. Confirm current applicability and decision authority for the actual task. This Hub does not assign a formal legal/risk classification or grant approval.'
 if tid in ['tech-platforms','tech-gcp','tech-copilot','tech-builder']:
  text='Platform capabilities and strategic lanes do not establish access or permission for an individual workload. Current classification rules, integrations and lifecycle responsibilities must be confirmed.'
 if tid in ['clf-how','clf-modeldoc','clf-build']:
  text='Original classifier design documentation, retained for its scoping questions and provenance. Its legal/tier rules and prior implementation description are not the current advisory engine. The integrated tool uses unresolved inputs and working patterns only; current formal governance requires the applicable primary authority.'
 if tid in ['dl-why','dl-products','dl-intelligence']:
  text='Strategic explanation and proposed architecture, not a deployed CLM data product. Potential reuse and economics require evidence; observations cannot automatically update authoritative records or knowledge.'
 if tid.startswith('trend-'):
  text='Contextual industry analysis from the supplied Hub. Reported dates, examples and estimates retain their original scope; they are not measured CLM results or current delivery commitments.'
 return '<aside class="topic-qualification"><strong>Reading scope</strong><p>'+escape(text)+'</p></aside>' if text else ''
