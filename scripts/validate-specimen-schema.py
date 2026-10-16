"""Formal JSON Schema validation, separate from semantic validation.
Requires jsonschema in the chosen Python environment. No network/install step.
"""
import json
from pathlib import Path
from copy import deepcopy
from jsonschema import Draft202012Validator
root=Path(__file__).resolve().parent.parent
schema=json.loads((root/'schemas/specimen.schema.json').read_text())
Draft202012Validator.check_schema(schema)
validator=Draft202012Validator(schema)
fixture=json.loads((root/'fixtures/useful-work.safe.json').read_text())
validator.validate(fixture)
failures=[]
for label,mutate in [
 ('unknown material family',lambda f:f['objects'][0].update(family='policy-widget')),
 ('missing write authority',lambda f:f['task'].pop('writeAuthority')),
 ('unsupported schema version',lambda f:f.update(schemaVersion='2')),
]:
 f=deepcopy(fixture);mutate(f)
 errors=list(validator.iter_errors(f))
 if not errors: raise AssertionError(label+' escaped schema validation')
 failures.append(label)
print(json.dumps({'validator':'JSON Schema Draft 2020-12','schemaValid':True,'fixtureValid':True,'injectedFailuresRejected':failures}))
