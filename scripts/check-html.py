"""Check static HTML relationships. This is not browser, layout or accessibility evidence."""
from html.parser import HTMLParser
from collections import Counter
from pathlib import Path
import sys, json

VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Check(HTMLParser):
 def __init__(self):
  super().__init__();self.stack=[];self.ids=Counter();self.references=[];self.issues=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids[a['id']]+=1
  for key in ['aria-controls','aria-labelledby','aria-describedby','for']:
   for target in a.get(key,'').split():self.references.append((key,target))
  ancestors=[t for t,_ in self.stack]
  if tag in ['a','button'] and any(t in ancestors for t in ['a','button']):self.issues.append({'kind':'nested-interactive','tag':tag})
  if tag=='summary' and 'summary' in ancestors:self.issues.append({'kind':'nested-summary'})
  if tag not in VOID:self.stack.append((tag,a))
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==tag:self.stack=self.stack[:i];break
 def handle_startendtag(self,tag,attrs):self.handle_starttag(tag,attrs);self.handle_endtag(tag)
 def finish(self):
  for key,count in self.ids.items():
   if count>1:self.issues.append({'kind':'duplicate-id','id':key,'count':count})
  for attr,target in self.references:
   if target not in self.ids:self.issues.append({'kind':'missing-'+attr,'target':target})
  return self.issues

source=Path(sys.argv[1]);states=json.loads(source.read_text());issues=[]
for state in states:
 p=Check();p.feed(state['html'])
 for issue in p.finish():issues.append({'route':state['route'],**issue})
version=json.loads((Path(__file__).resolve().parent.parent/'package.json').read_text())['version']
result={'version':version,'kind':'Static HTML parser checks; no layout, browser, native-interaction or accessibility-conformance evidence','parser':'Python standard-library HTMLParser','states':len(states),'issues':issues}
dest=Path(sys.argv[2]) if len(sys.argv)>2 else Path(__file__).resolve().parent.parent/'reports/HTML_STRUCTURE_V20.json'
dest.write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2));sys.exit(1 if issues else 0)
