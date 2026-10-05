// Bedrock 글리프 시트 내보내기
'use strict';
/* ───────── BE 글리프 시트 내보내기 ───────── */
const GLYPH={page:'E1',index:0,cell:16,align:'center',sheets:new Map()};
function glyphSheet(){const key=GLYPH.page.toUpperCase()+'@'+GLYPH.cell;let c=GLYPH.sheets.get(key);
  if(!c){c=document.createElement('canvas');c.width=c.height=GLYPH.cell*16;GLYPH.sheets.set(key,c)}return c}
const glyphChar=()=>String.fromCharCode((parseInt(GLYPH.page,16)<<8)+GLYPH.index);
const glyphCode=()=>'\\u'+(((parseInt(GLYPH.page,16)<<8)+GLYPH.index).toString(16).toUpperCase().padStart(4,'0'));
function glyphPut(){
  if(!LAST.w)return toast('넣을 이미지가 없습니다');
  const cell=GLYPH.cell,sc=Math.max(1,Math.floor(Math.min(cell/LAST.w,cell/LAST.h)));
  if(LAST.w>cell||LAST.h>cell)return toast(`이미지(${LAST.w}×${LAST.h})가 칸(${cell}px)보다 큽니다. 칸 크기를 키우세요`);
  const c=glyphSheet(),x=c.getContext('2d'),cx=(GLYPH.index%16)*cell,cy=(GLYPH.index>>4)*cell,w=LAST.w*sc,hh=LAST.h*sc;
  const oy=GLYPH.align==='top'?0:GLYPH.align==='bottom'?cell-hh:Math.floor((cell-hh)/2);
  x.clearRect(cx,cy,cell,cell);x.imageSmoothingEnabled=false;x.drawImage(layerCanvas(LAST,sc),cx,cy+oy);
  toast(`${GLYPH.page}${GLYPH.index.toString(16).toUpperCase().padStart(2,'0')} 칸에 넣었습니다 (${sc}배)`);
  GLYPH.index=Math.min(255,GLYPH.index+1);rebuild();
}
function glyphCard(){
  const pageIn=h('input',{type:'text',value:GLYPH.page,maxlength:2,style:'width:52px;text-align:center',oninput:e=>{const v=e.target.value.replace(/[^0-9a-f]/gi,'').toUpperCase();if(v.length===2){GLYPH.page=v;rebuild()}}});
  const idxIn=h('input',{type:'text',value:GLYPH.index.toString(16).toUpperCase().padStart(2,'0'),maxlength:2,style:'width:52px;text-align:center',onchange:e=>{const v=parseInt(e.target.value,16);if(!isNaN(v)&&v>=0&&v<=255){GLYPH.index=v;rebuild()}}});
  const sheet=glyphSheet(),pv=document.createElement('canvas'),z=Math.max(1,Math.floor(256/sheet.width));pv.width=sheet.width*z;pv.height=sheet.height*z;
  const px=pv.getContext('2d');px.imageSmoothingEnabled=false;px.drawImage(sheet,0,0,pv.width,pv.height);
  const cz=GLYPH.cell*z;px.strokeStyle='rgba(91,143,240,.9)';px.lineWidth=1;px.strokeRect((GLYPH.index%16)*cz+.5,(GLYPH.index>>4)*cz+.5,cz-1,cz-1);
  pv.style.cssText='display:block;max-width:100%;image-rendering:pixelated;background:repeating-conic-gradient(var(--chk1) 0 25%,var(--chk2) 0 50%) 0 0/8px 8px;border-radius:6px;cursor:crosshair';
  pv.onclick=e=>{const r=pv.getBoundingClientRect(),gx=Math.floor((e.clientX-r.left)/r.width*16),gy=Math.floor((e.clientY-r.top)/r.height*16);GLYPH.index=clamp(gy*16+gx,0,255);rebuild()};
  const segCell=h('div',{class:'seg'},...[16,32,64].map(v=>h('button',{type:'button',class:GLYPH.cell===v?'on':'',onclick:()=>{GLYPH.cell=v;rebuild()}},v+'px')));
  const segAl=h('div',{class:'seg'},...[['top','위'],['center','가운데'],['bottom','아래']].map(([v,l])=>h('button',{type:'button',class:GLYPH.align===v?'on':'',onclick:()=>{GLYPH.align=v;rebuild()}},l)));
  return card('BE 글리프 내보내기',
    row('페이지',pageIn,h('span',{class:'hint',style:'margin:0'},'glyph_'+GLYPH.page+'.png')),
    row('칸 번호',idxIn,h('span',{class:'hint',style:'margin:0'},'문자 '+glyphCode())),
    row('칸 크기',segCell),row('세로 위치',segAl),
    row('BE 채팅 줄',h('button',{type:'button',onclick:()=>{const p=S.pad;if(p.asym){p.t++;p.b++}else p.y++;rebuild();toast("위아래 1px씩 늘렸습니다")}},'위아래 1px씩 늘리기'),
      h('span',{class:'hint',style:'margin:0'},'BE 기본 채팅 줄은 11px입니다. 9px 표시는 11px로 늘리면 줄 사이 틈이 메워집니다.')),
    pv,
    h('div',{class:'actions',style:'margin-top:8px'},
      h('button',{type:'button',class:'primary',onclick:glyphPut},'현재 태그를 이 칸에 넣기'),
      h('button',{type:'button',onclick:async()=>{try{await navigator.clipboard.writeText(glyphChar());toast(glyphCode()+' 문자를 복사했습니다')}catch(e){toast('복사하지 못했습니다: '+glyphCode())}}},'문자 복사')),
    h('div',{class:'actions',style:'margin-top:6px'},
      h('button',{type:'button',onclick:()=>{sheet.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='glyph_'+GLYPH.page+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/png')}},'시트 PNG 저장'),
      h('button',{type:'button',onclick:()=>document.getElementById('fSheet').click()},'기존 시트 불러오기'),
      h('button',{type:'button',class:'danger',onclick:()=>{if(confirm('이 시트를 비울까요?')){sheet.getContext('2d').clearRect(0,0,sheet.width,sheet.height);rebuild()}}},'비우기')),
    h('p',{class:'hint'},'리소스팩 font/ 폴더에 glyph_'+GLYPH.page+'.png로 넣고, 채팅·이름표·폼 제목에 복사한 문자를 쓰면 됩니다. 시트는 이 창을 닫으면 사라지니 저장해 두세요.'),
    h('p',{class:'hint'},'칸 16px 기준으로 이미지는 왼쪽에 붙이고 세로는 가운데에 둡니다. 칸이 클수록 정수배로 확대해 넣습니다. 실제 게임에서 크기·위치는 꼭 확인하세요.')
  );
}
document.addEventListener('change',async e=>{if(e.target.id!=='fSheet')return;const f=e.target.files[0];if(!f)return;
  try{const bmp=await createImageBitmap(f);const m=f.name.match(/glyph_([0-9a-f]{2})/i);if(m)GLYPH.page=m[1].toUpperCase();
    GLYPH.cell=Math.max(1,Math.round(bmp.width/16));const c=glyphSheet();c.width=c.height=GLYPH.cell*16;c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);rebuild();toast('시트를 불러왔습니다')}
  catch(err){toast('시트를 읽지 못했습니다')}e.target.value=''});
