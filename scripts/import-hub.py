"""Integrate the current Hub into native topic components; never execute source scripts."""
from html.parser import HTMLParser
from html import escape
from pathlib import Path
import json,re,hashlib,argparse
ROOT=Path(__file__).resolve().parent.parent
args=argparse.ArgumentParser(description='Re-import a supplied original Hub snapshot into canonical topic data. Review resulting content changes before building.')
args.add_argument('source',type=Path,help='Path to the supplied original HTML; its scripts are never executed')
SOURCE=args.parse_args().source.resolve()
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Node:
 def __init__(self,tag='',attrs=(),parent=None):self.tag=tag;self.a=dict(attrs);self.children=[];self.parent=parent
 def classes(self):return self.a.get('class','').split()
 def text(self):return ''.join(x.text() if isinstance(x,Node) else x for x in self.children)
 def walk(self):
  yield self
  for x in self.children:
   if isinstance(x,Node):yield from x.walk()
class Parser(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.root=Node('root');self.stack=[self.root]
 def handle_starttag(self,t,a):
  n=Node(t,a,self.stack[-1]);self.stack[-1].children.append(n)
  if t not in VOID:self.stack.append(n)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==t:self.stack=self.stack[:i];break
 def handle_startendtag(self,t,a):self.handle_starttag(t,a);self.handle_endtag(t)
 def handle_data(self,d):self.stack[-1].children.append(d)
from hub_repairs import repair_tree, repair_text, topic_note
p=Parser();p.feed(SOURCE.read_text());repair_log=repair_tree(p.root,Node);nodes=list(p.root.walk());byid={x.a['id']:x for x in nodes if x.a.get('id')}
# Latest presentation preference omits CLM team-size proposals. The source archive is unchanged.
for n in nodes:
 n.children=[x.replace('small team (2–3 people)','small team').replace('Starting hypothesis: 2–3 builders (ML engineering + domain expertise).','Historical staffing figure omitted in this view; engineering and domain expertise remain relevant.') if isinstance(x,str) else x for x in n.children]
data=json.loads((ROOT/'sources/migration-inventory.json').read_text())
sections={c['id']:byid[c['id']] for c in data['corpus']}
idchap={}
for sid,node in sections.items():
 for n in node.walk():
  if n.a.get('id'):idchap[n.a['id']]=sid
report={'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'chapters':[],'repairs':repair_log,'scope':'Content migration and source inspection; no rendered/native verification'}
chapters=[]
SVG_CASE={'viewbox':'viewBox','lineargradient':'linearGradient','radialgradient':'radialGradient','clippath':'clipPath','fedropshadow':'feDropShadow','stddeviation':'stdDeviation','flood-color':'flood-color','markerwidth':'markerWidth','markerheight':'markerHeight','refx':'refX','refy':'refY','gradientunits':'gradientUnits','gradienttransform':'gradientTransform','preserveaspectratio':'preserveAspectRatio','textlength':'textLength'}
for sid,node in sections.items():
 tabs={};groups=[];headings=[];network=[];counts={'expansions':0,'citations':0,'portfolioLinks':0,'illustrations':0};slug_counts={}
 for n in node.walk():
  buttons=[x for x in n.children if isinstance(x,Node) and 'tab-btn' in x.classes()]
  if buttons:
   gid='group-'+buttons[0].a['data-tab'];gs=[]
   for b in buttons:
    tid=b.a['data-tab'];anc=[];q=n.parent
    while q:
     if 'tab-panel' in q.classes():anc.insert(0,q.a['id'])
     q=q.parent
    tabs[tid]={'id':tid,'group':gid,'title':b.text().strip(),'ancestors':anc,'stage':b.a.get('data-stage')};gs.append(tid)
   groups.append({'id':gid,'tabs':gs,'default':next((b.a['data-tab'] for b in buttons if 'active' in b.classes()),gs[0])})
 for n in node.walk():
  if re.fullmatch('h[2-5]',n.tag):
   title=n.text().strip();slug=re.sub('[^a-z0-9]+','-',title.lower()).strip('-')[:90] or 'topic';slug_counts[slug]=slug_counts.get(slug,0)+1
   hid=n.a.get('id') or 'topic-'+slug+('-%d'%slug_counts[slug] if slug_counts[slug]>1 else '')
   n.a['id']=hid;idchap[hid]=sid;parents=[];q=n.parent
   while q:
    if 'tab-panel' in q.classes():parents.insert(0,q.a['id'])
    q=q.parent
   headings.append({'id':hid,'title':title,'tabs':parents})
 def attrs(a):return ''.join(' '+k+'="'+escape(str(v),quote=True)+'"' for k,v in a.items())
 def content(n,svg=False):return ''.join(render(x,svg) if isinstance(x,Node) else escape(x) for x in n.children)
 def render(n,svg=False):
  t=n.tag;a=n.a;cl=n.classes();ident=a.get('id','');onclick=a.get('onclick','')
  if t in ['script','style','iframe','object','embed','link','meta']:return ''
  if 'section-num' in cl:return ''
  if ident in ['pfDetailPanel','nwDetail','nwTip']:return ''
  if sid=='sec-classifier' and ident in ['clf-tool','clf-history']:
   intro='<p>The advisory scoping tool keeps unknown inputs unresolved, retains your inputs and exports the same result you see. History is local to your browser.</p><a class="btn primary" href="#/scope">Scope a task</a>'
   return '<div class="native-panel" data-native-panel="'+ident+'" id="native-'+ident+'">'+intro+'</div>'
  if t=='form':return content(n)
  if t=='select':return '<p class="historical-choices"><span class="micro-label">Original choices · historical</span><br>'+escape(' / '.join(x.text().strip() for x in n.children if isinstance(x,Node) and x.tag=='option'))+'</p>'
  if t in ['input','textarea']:return ''
  if ident=='lifecycleFlow':
   stages=[(v['id'],v['title']) for v in tabs.values() if v['stage']]
   return '<div class="native-lifecycle" aria-label="Lifecycle exploration"><p>Inspect a stage and its proposed responsibilities. This route does not grant approval.</p><ol>'+''.join('<li><button data-action="chapter-tab" data-value="'+k+'" data-native-control="'+k+'" aria-pressed="false"><span>'+str(i+1)+'</span>'+escape(v)+'</button></li>' for i,(k,v) in enumerate(stages))+'</ol><button class="text-link" data-action="chapter-tab" data-value="lc-gates">Inspect proposed gates and governance →</button></div>'
  if ident=='networkWrap':
   network[:]=[{k[5:]:v for k,v in q.a.items() if k.startswith('data-')} for q in n.walk() if 'nw-node' in q.classes()]
   return '<div class="native-network"><p>Explore proposed capability relationships. A shared dependency is an opportunity to investigate; it does not establish readiness or measured benefit.</p>'+''.join('<button class="native-network-entry" data-action="network-detail" data-value="'+str(i)+'">'+escape(q.get('name','Capability'))+' <span>Inspect relationships →</span></button>' for i,q in enumerate(network))+'</div>'
  if 'tab-btn' in cl:
   tid=a['data-tab'];return '<button type="button" class="native-tab" data-action="chapter-tab" data-value="'+tid+'" data-native-control="'+tid+'" aria-controls="native-'+tid+'" aria-pressed="false">'+escape(tabs[tid]['title'])+'</button>'
  if any(isinstance(x,Node) and 'tab-btn' in x.classes() for x in n.children):
   first=next(x for x in n.children if isinstance(x,Node) and 'tab-btn' in x.classes());return '<div class="native-tabs" role="group" aria-label="Chapter topics" data-native-group="'+tabs[first.a['data-tab']]['group']+'">'+content(n)+'</div>'
  if 'tab-panel' in cl:return '<section class="native-panel" data-native-panel="'+ident+'" id="native-'+ident+'">'+topic_note(ident)+content(n)+'</section>'
  if 'this.classList.toggle' in onclick:
   counts['expansions']+=1
   title_node=next((x for x in n.walk() if any(c in x.classes() for c in ['p-title','expandable-header','arch-name','card-title'])),None)
   if not title_node:title_node=next((x for x in n.walk() if x.tag in ['h3','h4','strong']),None)
   title=title_node.text().strip() if title_node else n.text().strip()[:90]
   return '<details class="native-disclosure" data-disclosure="'+sid+'-exp-'+str(counts['expansions'])+'"><summary>'+escape(title)+'</summary><div>'+content(n)+'</div></details>'
  if 'showPfDetail' in onclick:
   m=re.search(r"showPfDetail\(['\"]([^'\"]+)",onclick)
   if m:counts['portfolioLinks']+=1;return '<button class="native-portfolio" data-action="portfolio-detail" data-value="'+m.group(1)+'">'+content(n)+'</button>'
  if t=='button' and not onclick:return ''
  if 'navigateTo' in onclick:
   m=re.search(r"navigateTo\(['\"]([^'\"]+)",onclick)
   if m:return '<a class="source-link" href="#/topic/'+m.group(1)+'">'+content(n)+'</a>'
  if t=='button':return ''
  if t=='a' or 'data-ref' in a:
   href=a.get('href','');at={'class':'native-link'}
   if 'data-ref' in a:counts['citations']+=1;href='#/topic/sec-refs/ref-'+a['data-ref']
   elif 'scrollIntoView' in onclick:
    m=re.search(r"getElementById\(['\"]([^'\"]+)",onclick)
    if m:href='#/topic/'+sid+'/'+m.group(1)
   elif href.startswith('#') and href[1:] in idchap:href='#/topic/'+idchap[href[1:]]+'/'+href[1:]
   if not re.match(r'^(https?://|#/topic/|mailto:)',href):return content(n)
   at['href']=href
   if href.startswith('http'):at.update(target='_blank',rel='noopener noreferrer')
   return '<a'+attrs(at)+'>'+content(n)+'</a>'
  if t=='svg':
   if 'expandable-chevron' in cl:return ''
   counts['illustrations']+=1;at={'class':'native-diagram','viewBox':a.get('viewbox','0 0 24 24'),'role':'img','aria-label':'Topic illustration. Its accompanying explanation states the scope.'}
   return '<div class="native-diagram-scroll" tabindex="0" role="region" aria-label="Topic diagram"><svg'+attrs(at)+'>'+content(n,True)+'</svg></div>'
  if svg:
   if t not in ['g','path','rect','circle','ellipse','line','polyline','polygon','text','tspan','defs','marker','filter','fedropshadow','lineargradient','radialgradient','stop','clippath','title','desc']:return ''
   safe={SVG_CASE.get(k,k):v for k,v in a.items() if not k.startswith('on') and k not in ['class','style'] and not k.startswith('data-')}
   # References and IDs remain internal to a single chapter; prefix avoids application collisions.
   if safe.get('id'):safe['id']='legacy-'+sid+'-'+safe['id']
   for k,v in list(safe.items()):
    safe[k]=re.sub(r'url\(#([^)]*)\)',lambda m:'url(#legacy-'+sid+'-'+m.group(1)+')',v)
   tag=SVG_CASE.get(t,t);return '<'+tag+attrs(safe)+'>'+content(n,True)+'</'+tag+'>'
  if t=='img':return '' # no remote content loads; source archive preserves originals
  allowed={'div','span','p','h2','h3','h4','h5','strong','b','em','i','ul','ol','li','blockquote','code','pre','br','hr','table','thead','tbody','tr','th','td','caption','small','sup','sub','dl','dt','dd','section','label'}
  if t not in allowed:return content(n)
  at={}
  if ident:at['id']='native-'+ident
  if re.fullmatch('h[2-5]',t):at['tabindex']='-1'
  for key in ['colspan','rowspan','scope']: 
   if key in a:at[key]=a[key]
  cls=[]
  for c in cl:
   if re.fullmatch(r'[A-Za-z][\w-]*',c):cls.append('n-'+c)
  if cls:at['class']=' '.join(cls)
  html='<'+t+attrs(at)+'>'+content(n)+('' if t in VOID else '</'+t+'>')
  if t=='table':html='<div class="native-table" tabindex="0" role="region" aria-label="Reference table">'+html+'</div>'
  return html
 html=content(node)
 anchors={}
 for q in node.walk():
  if not q.a.get('id'):continue
  parents=[];parent=q.parent
  while parent:
   if 'tab-panel' in parent.classes():parents.insert(0,parent.a['id'])
   parent=parent.parent
  anchors[q.a['id']]=parents
 chapter={'anchors':anchors,'id':sid,'title':next(c['title'] for c in data['corpus'] if c['id']==sid),'html':html,'tabs':tabs,'groups':groups,'headings':headings,'network':network}
 canonical_counts=counts.copy()
 chapter['panels']={tid:('<section class="native-panel" id="native-'+tid+'">'+topic_note(tid)+content(byid[tid])+'</section>') for tid in tabs if tid in byid}
 if sid=='sec-classifier':
  for retired in ['clf-tool','clf-history']:chapter['panels'][retired]=render(byid[retired])
 # Deep links to numbered source records in the supplied reference table.
 if sid=='sec-refs':
  row=[0]
  def source_row(m):
   row[0]+=1
   return '<tr id="native-ref-'+str(row[0])+'" tabindex="-1">'+m.group(1)
  chapter['html']=re.sub(r'<tr>(\s*<td)',source_row,html)
 # Exclude retired result placeholders from the active table of contents.
 chapter['headings']=[h for h in chapter['headings'] if 'id="native-'+h['id']+'"' in chapter['html']]
 chapters.append(chapter);report['chapters'].append({'id':sid,'tabs':len(tabs),'headings':len(chapter['headings']),**canonical_counts,'networkDetails':len(network)})
# Portfolio records are a data object extracted as text and parsed by the build's isolated VM.
source=SOURCE.read_text();m=re.search(r'window\.pfUseCases=(\{[\s\S]*?\n\});',source)
if not m:raise RuntimeError('Portfolio data missing')
(ROOT/'src/chapters.json').write_text(json.dumps({'chapters':chapters,'portfolioLiteral':repair_text(m.group(1)),'sourceSha256':report['sourceSha256']},ensure_ascii=False,indent=2)+'\n')
(ROOT/'reports/MIGRATION_V19.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'chapters':len(chapters),'tabs':sum(len(x['tabs']) for x in chapters),'sourceSha256':report['sourceSha256']}))
