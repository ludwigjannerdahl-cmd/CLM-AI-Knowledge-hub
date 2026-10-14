# Classifier review and implementation boundary

The current supplied Hub classifier was inspected, independently of the V17 audit. Its deterministic rules allowed unknown categorical values to fall through into a reassuring tier. Its original/amended result paths could diverge in exports, input interpolation was unsafe, replay metadata incomplete, storage writes unguarded, and result-container replacement could leave later result rendering without the expected children.

The new engine retains useful scoping questions but returns advisory working patterns rather than a formal AI Act or model-risk tier. It is not an approval process.

| Finding | Current implementation | Verification |
| --- | --- | --- |
| Unknown-input fallback | Every required option checked against its fixed vocabulary; unknown remains incomplete | Pure-function tests across every categorical field |
| Display/export divergence | `effective(record)` provides both; original suggestion and amendments retained | Pure-function amendment/export test |
| Unsafe text interpolation | User, file and history strings escaped at HTML boundaries | Escape tests and source inspection; native injection test pending |
| Incomplete replay | Normalised full input, file metadata, schema/engine versions, ID and timestamps retained | Replay/record validation tests |
| Storage refusal | Read/write caught; session record and export remain; visible refusal state | Pure-function denial tests; browser storage scenario pending |
| Result-container transition | Complete result template replaces output; input edits clear stale active result | Source inspection; incomplete→valid and amendment→edit native tests pending |
| Legacy history | Original local stores remain separate; raw export, explicit input import and review | Source inspection; browser migration test pending |

File contents are not uploaded or analysed. Local editable history is not an institutional audit log. Formal governance classifications, approvals and delivery timelines in the old documentation are historical descriptions requiring applicable authority, not output of this engine.
