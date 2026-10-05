// 프로젝트: 태그 여러 개 관리·일괄 편집, 프로젝트 저장/불러오기, mcpack 내보내기/불러오기
'use strict';
const PROJECT_KEY='pixel-tag-generator:project';
const clone=o=>JSON.parse(JSON.stringify(o));
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const uuid4=()=>crypto.randomUUID?crypto.randomUUID():'10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
let PROJECT=null;
const BASE=new Map(); // 불러온 글리프 시트: page(대문자 hex) → {cell, canvas}

function projectDefaults(){return{v:1,name:'내 태그 프로젝트',cur:null,tags:[],sel:[],batchMode:'style',
  pack:{name:'My Pixel Tags',desc:'픽셀 태그 생성기로 만든 글리프 팩',uuid:uuid4(),muuid:uuid4(),version:[1,0,0],autoBump:true,exported:false,page:'E1',cell:0,align:'center'},
  base:{},map:{}}}
const curTag=()=>PROJECT&&PROJECT.tags.find(t=>t.id===PROJECT.cur);
const selTags=()=>PROJECT.tags.filter(t=>PROJECT.sel.includes(t.id));
const tagLabel=t=>(t.state.text&&t.state.text.value||'').split('\n')[0].trim()||(t.state.icons&&t.state.icons.list.length?'(아이콘)':'(빈 태그)');
function syncCur(){const t=curTag();if(t)t.state=clone(S)}
function loadState(st){S=merge(defaults(),clone(st));S.icons.list=S.icons.list.filter(hasIcon)}
function renderState(st){const saved=S;S=merge(defaults(),clone(st));S.icons.list=S.icons.list.filter(hasIcon);try{return buildAll()}finally{S=saved}}

function projectInit(){
  try{const raw=localStorage.getItem(PROJECT_KEY);if(raw)PROJECT=Object.assign(projectDefaults(),JSON.parse(raw))}catch(e){}
  if(!PROJECT||!PROJECT.tags.length){PROJECT=projectDefaults();const id=newId();PROJECT.tags.push({id,state:clone(S)});PROJECT.cur=id}
  PROJECT.pack=Object.assign(projectDefaults().pack,PROJECT.pack);
  PROJECT.sel=PROJECT.sel.filter(id=>PROJECT.tags.some(t=>t.id===id));
  if(!curTag())PROJECT.cur=PROJECT.tags[0].id;
  loadState(curTag().state);
  for(const [pg,b] of Object.entries(PROJECT.base||{}))restoreBase(pg,b);
}
async function restoreBase(pg,b){try{const img=new Image();img.src=b.data;await img.decode();const c=document.createElement('canvas');c.width=c.height=b.cell*16;c.getContext('2d').drawImage(img,0,0);BASE.set(pg,{cell:b.cell,canvas:c})}catch(e){}}
let saveTimer=0;
function projectSave(fromRender){
  if(!PROJECT){try{localStorage.setItem('pixel-tag-generator:state',JSON.stringify(S))}catch(e){}return}
  syncCur();
  const row=document.querySelector(`.tagrow[data-id="${PROJECT.cur}"]`);
  if(fromRender&&row&&LAST){const old=row.querySelector('.thumb'),c=tagThumb(LAST);old.replaceWith(c);row.querySelector('.nm').textContent=tagLabel(curTag())}
  clearTimeout(saveTimer);saveTimer=setTimeout(()=>{try{localStorage.setItem(PROJECT_KEY,JSON.stringify(PROJECT))}catch(e){console.warn('프로젝트 자동 저장 실패',e)}},300);
}
function tagThumb(L){const z=L.h?Math.max(1,Math.min(3,Math.floor(28/L.h))):1,c=layerCanvas(L,z),w=document.createElement('span');w.className='thumb';w.append(c);return w}

/* ── 태그 목록 조작 ── */
function selectTag(id){if(id===PROJECT.cur)return;syncCur();PROJECT.cur=id;loadState(curTag().state);rebuild();renderProject();projectSave()}
function addTag(st,label){syncCur();const id=newId(),i=PROJECT.tags.findIndex(t=>t.id===PROJECT.cur);
  PROJECT.tags.splice(i+1,0,{id,state:st});PROJECT.cur=id;loadState(st);rebuild();renderProject();projectSave();if(label)toast(label)}
function newTag(){const st=clone(S);st.text.value='TAG';addTag(st)}
function dupTag(){addTag(clone(S),'복제했습니다')}
function deleteTags(){
  const targets=PROJECT.sel.length>=2?selTags():[curTag()];
  if(targets.length>=PROJECT.tags.length)return toast('태그는 최소 1개 있어야 합니다');
  if(!confirm(targets.length>1?`선택한 태그 ${targets.length}개를 삭제할까요?`:`'${tagLabel(targets[0])}' 태그를 삭제할까요?`))return;
  const ids=new Set(targets.map(t=>t.id)),i=PROJECT.tags.findIndex(t=>t.id===PROJECT.cur);
  PROJECT.tags=PROJECT.tags.filter(t=>!ids.has(t.id));PROJECT.sel=PROJECT.sel.filter(id=>!ids.has(id));
  if(ids.has(PROJECT.cur))PROJECT.cur=PROJECT.tags[Math.min(i,PROJECT.tags.length-1)].id;
  loadState(curTag().state);rebuild();renderProject();projectSave();
}
function moveTag(d){const a=PROJECT.tags,i=a.findIndex(t=>t.id===PROJECT.cur),j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];renderProject();projectSave()}

/* ── 일괄 편집 ── */
const TEXT_KEYS=['textColor','textShadow','textOutline'],
  BG_KEYS=['bg','pad','shape','bgOutline','bgEmboss','bgShadow','bgInner','bgPattern','bgGloss','bgGlow','bgSplit','bgBand','bgLine','bgStrip','bgCornerShade','bgRivets','bgCaps','bgCorners'];
function applyToSelected(){
  syncCur();const src=clone(S),mode=PROJECT.batchMode,targets=selTags().filter(t=>t.id!==PROJECT.cur);
  if(!targets.length)return toast('현재 태그 말고 다른 태그를 하나 이상 선택하세요');
  for(const t of targets){const st=merge(defaults(),clone(t.state));
    if(mode==='text'||mode==='style'){for(const k of TEXT_KEYS)st[k]=clone(src[k]);const v=st.text.value;st.text=clone(src.text);st.text.value=v}
    if(mode==='bg'||mode==='style'){for(const k of BG_KEYS)st[k]=clone(src[k])}
    if(mode==='style')st.icons=clone(src.icons);
    t.state=st}
  renderProject();projectSave();toast(`선택한 ${targets.length}개 태그에 적용했습니다`);
}
function onPresetPick(pr){
  const sel=selTags();
  if(sel.length<2){S=applyPreset(pr,S);rebuild();return}
  syncCur();
  for(const t of sel){const v=t.state.text.value;const st=applyPreset(pr,merge(defaults(),clone(t.state)));st.text.value=v;t.state=st}
  loadState(curTag().state);rebuild();renderProject();projectSave();toast(`선택한 ${sel.length}개 태그에 적용했습니다 (글자는 각자 유지)`);
}
function onTextStylePick(ts){
  const sel=selTags();
  if(sel.length<2){applyTextStyle(ts);rebuild();return}
  syncCur();const saved=S;
  for(const t of sel){S=merge(defaults(),clone(t.state));applyTextStyle(ts);t.state=clone(S)}
  S=saved;loadState(curTag().state);rebuild();renderProject();projectSave();toast(`선택한 ${sel.length}개 태그에 적용했습니다`);
}

/* ── 파일 도우미 ── */
function b64(buf){const u=new Uint8Array(buf);let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)}
function unb64(s){const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}
function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}
const canvasBytes=c=>new Promise(r=>c.toBlob(async b=>r(new Uint8Array(await b.arrayBuffer())),'image/png'));
const safeName=s=>(s||'tags').replace(/[\\/:*?"<>|]/g,'').trim()||'tags';

async function projectBundle(){
  syncCur();const fontIds=new Set(),iconIds=new Set();
  for(const t of PROJECT.tags){fontIds.add(t.state.text.font);fontIds.add(t.state.text.fallback);for(const it of t.state.icons.list)if(!/^(bi|sp):/.test(it.id))iconIds.add(it.id)}
  const fonts=((await idbAll('fonts'))||[]).filter(r=>fontIds.has(r.id)).map(r=>({...r,files:r.files.map(f=>({...f,buf:b64(f.buf)}))}));
  const icons=((await idbAll('icons'))||[]).filter(r=>iconIds.has(r.id)).map(r=>({...r,buf:b64(r.buf)}));
  return{format:'pixel-tag-project',v:1,project:PROJECT,fonts,icons};
}
async function saveProjectFile(){const bundle=await projectBundle();download(new Blob([JSON.stringify(bundle)],{type:'application/json'}),safeName(PROJECT.name)+'.ptproj.json');toast('프로젝트를 저장했습니다')}
async function importBundle(bundle){
  for(const r of bundle.fonts||[]){if(FONTS.has(r.id))continue;const rec={...r,files:r.files.map(f=>({...f,buf:unb64(f.buf)}))};try{await loadUserFont(rec);await idbPut('fonts',rec)}catch(e){console.warn(e)}}
  for(const r of bundle.icons||[]){if(ICONS.has(r.id))continue;const rec={...r,buf:unb64(r.buf)};try{await decodeIcon(rec);await idbPut('icons',rec)}catch(e){console.warn(e)}}
  const incoming=Object.assign(projectDefaults(),bundle.project);
  if(confirm(`'${incoming.name}' 프로젝트(태그 ${incoming.tags.length}개)를 불러옵니다.\n확인: 지금 프로젝트를 바꿉니다\n취소: 지금 프로젝트에 태그만 추가합니다`)){
    PROJECT=incoming;PROJECT.pack=Object.assign(projectDefaults().pack,PROJECT.pack);BASE.clear();for(const [pg,b] of Object.entries(PROJECT.base||{}))await restoreBase(pg,b);
  }else{syncCur();for(const t of incoming.tags)PROJECT.tags.push({id:newId(),state:t.state})}
  if(!curTag())PROJECT.cur=PROJECT.tags[0].id;
  loadState(curTag().state);rebuild();renderProject();projectSave();toast('프로젝트를 불러왔습니다');
}
async function addBasePage(pg,img){
  const cell=Math.max(1,Math.round(img.width/16)),c=document.createElement('canvas');c.width=c.height=cell*16;c.getContext('2d').drawImage(img,0,0,c.width,c.height);
  BASE.set(pg,{cell,canvas:c});PROJECT.base[pg]={cell,data:c.toDataURL('image/png')};
  if(typeof GLYPH!=='undefined')GLYPH.sheets.set(pg+'@'+cell,c);
}
async function importFiles(files){
  let tagsAdded=0,pages=[];
  for(const f of files){
    try{
      const name=f.name.toLowerCase(),buf=await f.arrayBuffer();
      if(/\.(mcpack|zip)$/.test(name)){const r=await importPack(buf,f.name);tagsAdded+=r.tags;pages.push(...r.pages);continue}
      if(name.endsWith('.json')){const obj=JSON.parse(new TextDecoder().decode(buf));
        if(obj.format==='pixel-tag-project'){await importBundle(obj);continue}
        // 단일 태그 설정 파일 → 새 태그로
        addTag(merge(defaults(),obj));tagsAdded++;continue}
      if(/^image\//.test(f.type)||/\.png$/.test(name)){
        const m=name.match(/glyph_([0-9a-f]{2})\.png$/i),bmp=await createImageBitmap(new Blob([buf]));
        if(m&&bmp.width===bmp.height&&bmp.width%16===0){await addBasePage(m[1].toUpperCase(),bmp);pages.push(m[1].toUpperCase());continue}
        const rec={id:newId(),name:f.name,buf};await decodeIcon(rec);await idbPut('icons',rec);
        const st=defaults();st.text.value='';st.bg.enabled=false;st.icons.list=[{id:rec.id,side:'left'}];addTag(st);tagsAdded++;continue}
      toast(f.name+': 지원하지 않는 파일입니다');
    }catch(e){console.error(e);toast(f.name+': 불러오지 못했습니다 ('+e.message+')')}
  }
  if(pages.length||tagsAdded){renderProject();projectSave();toast([pages.length?`글리프 시트 ${pages.join(', ')}`:'',tagsAdded?`태그 ${tagsAdded}개`:''].filter(Boolean).join(' · ')+' 불러옴')}
}
async function importPack(buf,fname){
  const z=zipRead(buf),names=[...z.keys()],res={tags:0,pages:[]};
  const proj=names.find(n=>/(^|\/)pixel_tag_project\.json$/.test(n));
  if(proj&&confirm(`${fname}은 이 도구로 만든 팩입니다. 태그까지 편집할 수 있게 프로젝트로 불러올까요?\n취소: 글리프 시트만 불러옵니다`)){
    await importBundle(JSON.parse(new TextDecoder().decode(await z.get(proj)())));return res}
  const man=names.find(n=>/(^|\/)manifest\.json$/.test(n));
  if(man){try{const m=JSON.parse(new TextDecoder().decode(await z.get(man)()).replace(/^﻿/,''));
    if(m.header&&confirm(`팩 '${m.header.name}'(${(m.header.version||[]).join('.')})의 UUID를 이어서 쓸까요?\n확인하면 다음 내보내기가 이 팩의 새 버전이 됩니다.`)){
      PROJECT.pack.name=m.header.name||PROJECT.pack.name;PROJECT.pack.desc=m.header.description||PROJECT.pack.desc;PROJECT.pack.uuid=m.header.uuid||PROJECT.pack.uuid;
      PROJECT.pack.muuid=(m.modules&&m.modules[0]&&m.modules[0].uuid)||PROJECT.pack.muuid;PROJECT.pack.version=Array.isArray(m.header.version)?m.header.version.slice(0,3):PROJECT.pack.version;PROJECT.pack.exported=true}
  }catch(e){console.warn('manifest',e)}}
  for(const n of names){const m=n.match(/(^|\/)font\/glyph_([0-9a-f]{2})\.png$/i);if(!m)continue;
    const bmp=await createImageBitmap(new Blob([await z.get(n)()]));if(bmp.width!==bmp.height||bmp.width%16)continue;
    const pg=m[2].toUpperCase();await addBasePage(pg,bmp);res.pages.push(pg)}
  if(!res.pages.length&&!man)throw new Error('팩에서 manifest.json이나 font/glyph_XX.png를 찾지 못했습니다');
  return res;
}

/* ── mcpack 내보내기 ── */
const pageAdd=(pg,n)=>(parseInt(pg,16)+n).toString(16).toUpperCase().padStart(2,'0');
async function exportMcpack(){
  syncCur();const pk=PROJECT.pack;
  const items=PROJECT.tags.map(t=>({t,L:renderState(t.state)})).filter(o=>o.L.w&&o.L.h);
  if(!items.length)return toast('내보낼 태그가 없습니다');
  const maxDim=Math.max(...items.map(o=>Math.max(o.L.w,o.L.h)));
  const cell=pk.cell||[16,32,64,128,256].find(c=>c>=maxDim)||256;
  if(maxDim>cell)return toast(`가장 큰 태그(${maxDim}px)가 칸(${cell}px)보다 큽니다. 칸 크기를 키우세요`);
  const sc=Math.max(1,Math.min(...items.map(o=>Math.floor(Math.min(cell/o.L.w,cell/o.L.h)))));
  // 시트 준비: 불러온 시트는 같은 칸 크기로 맞춰 그대로 두고 빈 칸에만 채움
  const sheets=new Map(),getSheet=pg=>{if(!sheets.has(pg)){const c=document.createElement('canvas');c.width=c.height=cell*16;const b=BASE.get(pg);
    if(b){const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(b.canvas,0,0,c.width,c.height)}sheets.set(pg,c)}return sheets.get(pg)};
  for(const pg of BASE.keys())getSheet(pg);
  const isFree=(c,i)=>{const d=c.getContext('2d').getImageData((i%16)*cell,(i>>4)*cell,cell,cell).data;for(let k=3;k<d.length;k+=4)if(d[k])return false;return true};
  let pg=pk.page.toUpperCase(),idx=0;const map={},lines=[];
  for(const {t,L} of items){
    let c=getSheet(pg);
    while(true){if(idx>255){pg=pageAdd(pg,1);idx=0;c=getSheet(pg)}if(isFree(c,idx))break;idx++}
    const w=L.w*sc,hh=L.h*sc,oy=pk.align==='top'?0:pk.align==='bottom'?cell-hh:Math.floor((cell-hh)/2);
    const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(layerCanvas(L,sc),(idx%16)*cell,(idx>>4)*cell+oy);
    const code=pg+idx.toString(16).toUpperCase().padStart(2,'0');map[t.id]=code;
    lines.push(`${code}\t${String.fromCharCode(parseInt(code,16))}\t${tagLabel(t)}`);idx++;
  }
  if(pk.autoBump&&pk.exported){pk.version=[pk.version[0],pk.version[1],(pk.version[2]|0)+1]}
  const manifest={format_version:2,header:{name:pk.name,description:pk.desc,uuid:pk.uuid,version:pk.version.slice(0,3),min_engine_version:[1,20,0]},
    modules:[{type:'resources',uuid:pk.muuid,version:pk.version.slice(0,3)}]};
  const icon=document.createElement('canvas');icon.width=icon.height=128;const ix=icon.getContext('2d');ix.fillStyle='#1c1f25';ix.fillRect(0,0,128,128);
  const first=items[0].L,iz=Math.max(1,Math.floor(Math.min(112/first.w,112/first.h)));ix.imageSmoothingEnabled=false;
  ix.drawImage(layerCanvas(first,iz),Math.floor((128-first.w*iz)/2),Math.floor((128-first.h*iz)/2));
  PROJECT.map=map;pk.exported=true;
  const files=[{name:'manifest.json',data:JSON.stringify(manifest,null,2)},{name:'pack_icon.png',data:await canvasBytes(icon)}];
  for(const [p,c] of [...sheets.entries()].sort())files.push({name:`font/glyph_${p}.png`,data:await canvasBytes(c)});
  files.push({name:'glyphs.txt',data:'# 코드\t문자\t태그\n'+lines.join('\n')+'\n'});
  files.push({name:'pixel_tag_project.json',data:JSON.stringify(await projectBundle())});
  download(zipWrite(files),safeName(pk.name)+'.mcpack');
  renderProject();projectSave();
  toast(`${items.length}개 태그를 ${[...sheets.keys()].join(', ')} 시트로 내보냈습니다 (v${pk.version.join('.')}, 칸 ${cell}px)`);
}
async function copyCharList(){
  const lines=PROJECT.tags.filter(t=>PROJECT.map[t.id]).map(t=>`${tagLabel(t)}: ${String.fromCharCode(parseInt(PROJECT.map[t.id],16))}`);
  if(!lines.length)return toast('먼저 mcpack을 내보내세요');
  try{await navigator.clipboard.writeText(lines.join('\n'));toast(`문자 ${lines.length}개를 복사했습니다`)}catch(e){toast('복사하지 못했습니다')}
}

/* ── 화면 ── */
function renderProject(){
  const box=document.getElementById('projectCard');if(!box||!PROJECT)return;
  const pk=PROJECT.pack,sel=new Set(PROJECT.sel);
  const nameIn=h('input',{type:'text',value:PROJECT.name,style:'flex:1',onchange:e=>{PROJECT.name=e.target.value||PROJECT.name;projectSave()}});
  const list=h('div',{class:'taglist'},...PROJECT.tags.map(t=>{
    const L=renderState(t.state);
    const ck=h('input',{type:'checkbox',checked:sel.has(t.id),onclick:e=>e.stopPropagation(),onchange:e=>{if(e.target.checked)PROJECT.sel.push(t.id);else PROJECT.sel=PROJECT.sel.filter(i=>i!==t.id);renderProject();projectSave()}});
    return h('div',{class:'tagrow'+(t.id===PROJECT.cur?' cur':''),'data-id':t.id,onclick:()=>selectTag(t.id)},ck,tagThumb(L),h('span',{class:'nm'},tagLabel(t)),
      PROJECT.map[t.id]?h('span',{class:'code',title:'mcpack 내보내기 때 받은 글리프 문자 코드'},'\\u'+PROJECT.map[t.id]):null)}));
  const allCk=h('input',{type:'checkbox',checked:sel.size===PROJECT.tags.length,onchange:e=>{PROJECT.sel=e.target.checked?PROJECT.tags.map(t=>t.id):[];renderProject();projectSave()}});
  const batch=sel.size>=2?h('div',{class:'batch'},
    h('div',null,`${sel.size}개 선택됨 · 프리셋·글자 스타일을 누르면 선택한 태그 모두에 적용됩니다(글자는 각자 유지).`),
    h('div',{class:'row'},h('div',{class:'seg'},...[['style','스타일 전체'],['text','글자 꾸밈'],['bg','배경']].map(([v,l])=>h('button',{type:'button',class:PROJECT.batchMode===v?'on':'',onclick:()=>{PROJECT.batchMode=v;renderProject();projectSave()}},l))),
      h('button',{type:'button',class:'primary',onclick:applyToSelected},'현재 태그 → 선택에 적용'))):null;
  const ver=h('input',{type:'text',value:pk.version.join('.'),style:'width:70px;text-align:center',onchange:e=>{const v=e.target.value.split('.').map(n=>parseInt(n,10));if(v.length===3&&v.every(n=>n>=0)){pk.version=v;projectSave()}else e.target.value=pk.version.join('.')}});
  const packCfg=h('details',{class:'fold',style:'margin-top:10px'},h('summary',null,'mcpack 설정'),
    row('팩 이름',h('input',{type:'text',value:pk.name,style:'flex:1',onchange:e=>{pk.name=e.target.value||pk.name;projectSave()}})),
    row('설명',h('input',{type:'text',value:pk.desc,style:'flex:1',onchange:e=>{pk.desc=e.target.value;projectSave()}})),
    row('버전',ver,h('label',{class:'ck'},h('input',{type:'checkbox',checked:pk.autoBump,onchange:e=>{pk.autoBump=e.target.checked;projectSave()}}),'내보낼 때마다 자동으로 올리기')),
    row('시작 페이지',h('input',{type:'text',value:pk.page,maxlength:2,style:'width:52px;text-align:center',onchange:e=>{const v=e.target.value.replace(/[^0-9a-f]/gi,'').toUpperCase();if(v.length===2){pk.page=v;projectSave()}else e.target.value=pk.page}}),
      h('span',{class:'hint',style:'margin:0'},'glyph_'+pk.page+'.png부터 채움')),
    row('칸 크기',h('div',{class:'seg'},...[[0,'자동'],[16,'16'],[32,'32'],[64,'64'],[128,'128']].map(([v,l])=>h('button',{type:'button',class:pk.cell===v?'on':'',onclick:()=>{pk.cell=v;renderProject();projectSave()}},l)))),
    row('세로 위치',h('div',{class:'seg'},...[['top','위'],['center','가운데'],['bottom','아래']].map(([v,l])=>h('button',{type:'button',class:pk.align===v?'on':'',onclick:()=>{pk.align=v;renderProject();projectSave()}},l)))),
    BASE.size?h('p',{class:'hint'},`불러온 글리프 시트: ${[...BASE.keys()].join(', ')} — 기존 칸은 그대로 두고 빈 칸에만 태그를 넣습니다. `,h('a',{href:'#',onclick:e=>{e.preventDefault();if(confirm('불러온 글리프 시트를 비울까요?')){BASE.clear();PROJECT.base={};renderProject();projectSave()}}},'비우기')):null,
    h('p',{class:'hint'},'UUID가 프로젝트에 고정돼 있어서, 다시 내보내면 같은 팩의 새 버전이 됩니다. BE는 버전이 같으면 예전 팩을 계속 쓰니 버전을 꼭 올리세요.'),
    h('p',{class:'hint'},'BE는 글리프 한 칸을 글자 높이에 맞춰 그리므로, 가로로 긴 태그는 칸 크기 비율만큼 작게 보입니다.'));
  box.replaceChildren(
    h('h2',null,'프로젝트 · 태그 목록'),
    h('div',{class:'row'},nameIn),
    h('div',{class:'actions'},
      h('button',{type:'button',onclick:saveProjectFile},'프로젝트 저장'),
      h('button',{type:'button',onclick:()=>document.getElementById('fImport').click()},'불러오기'),
      h('button',{type:'button',class:'danger',onclick:()=>{if(!confirm('새 프로젝트를 시작할까요? 지금 프로젝트는 저장해 두지 않으면 사라집니다.'))return;
        const st=defaults();PROJECT=projectDefaults();const id=newId();PROJECT.tags.push({id,state:st});PROJECT.cur=id;BASE.clear();loadState(st);rebuild();renderProject();projectSave()}},'새 프로젝트')),
    h('div',{class:'row',style:'margin-top:10px'},h('label',{class:'ck'},allCk,`태그 ${PROJECT.tags.length}개`),
      h('div',{class:'seg',style:'margin-left:auto'},
        h('button',{type:'button',onclick:newTag,title:'현재 스타일로 새 태그'},'+ 새 태그'),h('button',{type:'button',onclick:dupTag},'복제'),
        h('button',{type:'button',onclick:()=>moveTag(-1),title:'위로'},'↑'),h('button',{type:'button',onclick:()=>moveTag(1),title:'아래로'},'↓'),
        h('button',{type:'button',class:'danger',onclick:deleteTags},'삭제'))),
    list,batch,
    h('div',{class:'actions',style:'margin-top:10px'},
      h('button',{type:'button',class:'primary',onclick:exportMcpack},'mcpack 내보내기'),
      h('button',{type:'button',onclick:copyCharList},'문자 목록 복사')),
    packCfg,
    h('p',{class:'hint'},'불러오기: 프로젝트(.ptproj.json), mcpack·zip(글리프 시트, 이 도구로 만든 팩은 태그까지), glyph_XX.png, 이미지(새 태그), 태그 설정 JSON')
  );
}
document.getElementById('fImport').onchange=e=>{const fs=[...e.target.files];e.target.value='';if(fs.length)importFiles(fs)};
document.addEventListener('dragover',e=>{if(e.dataTransfer&&[...e.dataTransfer.types].includes('Files'))e.preventDefault()});
document.addEventListener('drop',e=>{if(e.defaultPrevented||!e.dataTransfer||!e.dataTransfer.files.length)return;
  const fs=[...e.dataTransfer.files].filter(f=>/\.(mcpack|zip|json)$/i.test(f.name));if(!fs.length)return;e.preventDefault();importFiles(fs)});
