"""Follow-up audit corrections. Raw historical source bytes remain unchanged."""
import re

REPLACEMENTS = {
 'Already NPAC-approved and operational.': 'Conditional approval was reported on 27 August 2024. Closure of the conditions and current operation are not established.',
 'Demonstrates the division can conceive, build, approve, and operate AI in production.': 'It is a dated delivery precedent, not evidence of current CLM production permission.',
 'SensAIa transcription as upstream data source (already NPAC-approved).': 'SensAIa transcription as a reported upstream source (conditional approval reported in 2024; current permission and operation unverified).',
 'GCP Cloud Run, NPAC-approved)': 'GCP Cloud Run, with reported conditional approval in 2024 and unverified current operation)',
 'NPAC-approved 27 Aug 2024': 'conditionally approved 27 Aug 2024; closure and current operation unverified',
 'No governance overhead.': 'Experimentation still needs the applicable information, tool and ownership controls.',
 'Every system that connects to the layer increases its value for every existing consumer. This is not a cost that grows linearly. It is an investment that compounds.': 'A useful connection can serve further tasks when its meaning, quality, applicability and permitted consumption are maintained. Other connections can add cost or irrelevant information. Compare accepted outcomes with integration, review and maintenance effort.',
 'Each new connection makes the layer more valuable': 'A suitable, maintained connection may support another task; value is not automatic',
 'KYC outreach effort in KYC outreach': 'KYC outreach effort',
 'All 15 analysts in my team, potentially 60+ across CLM.': 'Colleagues in the team, with possible wider CLM use.',
 'All SEB-Approved': 'Proposed stack; workload approval not established',
 'Generated automatically from classification. No additional documentation required.': 'A generated draft can organise known inputs. The applicable authority determines what further documentation and review are required.',
 'One-click export of a 12-section model card pre-filled from classification data. Matches SEB’s model card repository template. Includes monitoring plan, legal basis, and governance requirements.': 'The integrated tool exports the scope record and a review brief. It preserves supplied inputs and review questions; it does not infer a legal basis, monitoring approval or a match to the current SEB model-card template.',
 'After classifying a use case in the “Classify Now” tab, click “📄 Generate Model Card” in the result panel. This produces a structured document pre-filled with classification data, governance requirements, and monitoring obligations. Export as JSON for NAMIS attachment or copy into SEB’s model card repository.': 'Open “Scope a task”, describe the actual work, then export the scope JSON or review brief. Both use the same effective advisory result. The brief leaves evidence and formal decisions unresolved; use the applicable current template and review route before submitting institutional documentation.',
 'The Model Card follows SEB’s template': 'The original model-card proposal referenced SEB’s template',
 'now in force as of 2 August 2026': 'scheduled under the amended timeline: Annex III from 2 December 2027 and regulated-product systems from 2 August 2028',
 'now in force as of 2 Aug 2026': 'scheduled under the amended timeline: Annex III from 2 December 2027 and regulated-product systems from 2 August 2028',
 'high-risk obligations now in force (from 2 August 2026)': 'high-risk obligations on the amended timeline (Annex III: 2 December 2027; regulated-product systems: 2 August 2028), subject to actual classification',
 'EU AI Act high-risk obligations are now live as of 2 August 2026, so these controls are deployment obligations, not future theory.': 'EU AI Act obligations apply progressively. The amended high-risk dates are 2 December 2027 for Annex III and 2 August 2028 for regulated-product systems. Actual classification, transitional provisions and current internal requirements need the responsible review.',
 'From 2 August 2026 onward, Tier 3 systems must comply with:': 'The source’s internal working tiers do not establish statutory classification. For a system actually classified as high-risk, assess the following requirements against the amended application dates and applicable transitional provisions:',
 'General provisions Dec 2025,': 'Provisions apply progressively; the original general application date is not a universal deadline.',
 'Article 52 (transparency)': 'Article 50 (transparency)',
 'AI in creditworthiness and risk assessment classified as high-risk. CLM risk-scoring and CDD tools likely in scope.': 'Annex III 5(b) concerns natural-person creditworthiness or credit scoring, with a financial-fraud exception. This does not establish a KYC/CDD classification; assess the actual intended purpose and applicable provisions.',
 'Current implementation threshold.': 'Check the amended application dates and actual intended purpose.',
 'AI in creditworthiness/risk assessment = high-risk. KAICY and CDD tools likely in scope.': 'Natural-person creditworthiness is a specific Annex III purpose. This does not determine the legal classification of Kaicy or CDD; that remains a task-specific review.',
 'EU AI Act enforcement (Aug 2026)': 'EU AI Act staged application; amended high-risk dates in 2027/2028',
 'EU AI Act enforcement Aug 2026.': 'EU AI Act provisions apply progressively; high-risk dates were amended to 2027/2028.',
 'AI agents propose data changes to client records, the changes follow a strict source tiering hierarchy. AI-generated data is never written directly to golden fields — it always goes through a human-gated proposal mechanism.': 'AI agents propose data changes to client records, the proposed control boundary keeps inference separate from authoritative records. AI output is a candidate; a separately authorised and verified process determines any record change. This is a design requirement, not evidence of a guard in the current extraction code.',
}

SECTION_NAMES = {1:'CLM direction',2:'Operating model',3:'People & adoption',4:'Delivery lifecycle',5:'Risk & compliance',6:'Architecture & work patterns',7:'Technology & platforms',8:'Portfolio & dependencies',9:'Industry insights',10:'Data products',11:'Intelligence Model',12:'Advisory scoping'}

def revise_text(text):
 for old,new in REPLACEMENTS.items():text=text.replace(old,new)
 return re.sub(r'\bSection\s+(1[0-2]|[1-9])\b',lambda m:SECTION_NAMES[int(m.group(1))],text,flags=re.I)

def revise_block(tag,text,row=''):
 if tag=='p' and 'A system is always high-risk if it profiles individuals' in text:
  return 'Article 6(3)’s profiling proviso concerns systems already referred to in Annex III. Personal-data processing or profiling alone does not establish that a KYC preparation tool falls within that Annex. Human review alone also does not settle the classification. Document the actual intended purpose, applicable provisions and the responsible classification decision.'
 if tag=='li' and 'Art. 6(2) / Annex III, Area 5' in text:
  return 'Assess the actual intended purpose under Article 6 and Annex III. Natural-person creditworthiness is specifically listed; KYC/CDD preparation and personal-data processing do not by themselves establish that classification. The profiling proviso applies to systems referred to in Annex III.'
 if tag=='p' and 'KAICY processes personal data for AML/KYC risk assessment. Under ACAA, it classifies' in text:
  return 'The source proposed an ACAA Category 3 treatment for Kaicy. Current ACAA authority and a decision for the configured workload were not supplied. Treat the following factors as review questions, not an assigned category or an EU AI Act classification.'
 if tag=='p' and 'This means KAICY triggers Governance Tier 3 requirements' in text:
  return 'The following documentation and control topics are useful inputs to the responsible review. The source’s proposed tier does not establish which formal route or requirements apply to the actual workload.'
 if tag=='p' and 'This is the conservative, defensible position' in text and 'KAICY' in text:
  return 'The NPA wording reported in the source described preparation with human review. It does not establish the current ACAA category, legal classification, operating permission or control implementation. Obtain the relevant current decisions for the actual configuration.'
 if tag=='li' and 'DPIA almost certainly required for KAICY' in text:
  return 'Assess whether a DPIA is required for the actual processing purpose, data, scale and risks with the responsible privacy function. The supplied source reports a DPIA condition in the 2024 SensAIa approval; that precedent is not a current DPIA determination or evidence that the condition was closed for this workload.'
 if tag=='p' and 'A step-by-step operational checklist' in text and 'SensAI' in text:
  return 'A proposed checklist for considering Kaicy production, informed by a source-reported conditional SensAIa approval dated 27 August 2024. Closure of those conditions, present operation and applicability to this workload are not established.'
 if tag=='p' and 'Currently, the most advanced CLM-relevant AI application' in text:
  return 'The source discussed Kaicy and a SensAIa transcription precedent. Delivery authorship, comparative maturity, current operation and formal classification are not established by the supplied primary evidence. SensAIa’s reported conditional approval was dated 27 August 2024; current scope and closure of its conditions need confirmation.'
 if tag=='td' and text in ['Aug 2026','Aug 2027']:
  if any(k in row for k in ['Annex III','creditworthiness','product safety','Annex I']):
   return '2 December 2027' if any(k in row for k in ['Annex III','creditworthiness']) else '2 August 2028'
 if tag=='td' and text in ['Feb 2025','Aug 2025','Feb 2026']:
  if 'AI Act enters into force' in row:return '1 August 2024'
  if 'Prohibited practices' in row:return '2 February 2025'
  if 'GPAI model obligations' in row:return '2 August 2025'
 if tag=='td' and text=='High-risk obligations fully active':return 'Annex III high-risk application; check transitional provisions'
 return None

def legal_note(tid):
 if tid not in ['ctx-regulatory','model-detail','risk-euai','risk-acaa','risk-qa']:return ''
 return '<aside class="topic-qualification"><strong>Legal scope checked · 15 October 2026</strong><p>The amended high-risk dates are 2 December 2027 for Annex III and 2 August 2028 for regulated-product systems. KYC/CDD and personal-data processing do not by themselves establish high-risk classification. Internal working tiers and statutory categories are different.</p><a href="#/source/ai-act-current">Read the official sources and scope</a></aside>'
