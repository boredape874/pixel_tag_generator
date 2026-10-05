// 미리보기, PNG 저장, 클립보드
'use strict';
/* ───────── 미리보기·내보내기 ───────── */
let LAST=newLayer(0,0);
const pv=document.getElementById('pv'),stage=document.getElementById('stage');
function layerCanvas(L,z){const c=document.createElement('canvas');c.width=Math.max(1,L.w*z);c.height=Math.max(1,L.h*z);if(L.w&&L.h){const s=document.createElement('canvas');s.width=L.w;s.height=L.h;s.getContext('2d').putImageData(new ImageData(L.d,L.w,L.h),0,0);const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(s,0,0,c.width,c.height)}return c}
function render(){
  LAST=buildAll();
  const avail=Math.max(100,stage.clientWidth-34);
  const z=LAST.w?clamp(Math.floor(Math.min(avail/LAST.w,240/LAST.h)),1,24):1;
  pv.width=Math.max(1,LAST.w*z);pv.height=Math.max(1,LAST.h*z);
  const x=pv.getContext('2d');x.clearRect(0,0,pv.width,pv.height);
  if(LAST.w)x.drawImage(layerCanvas(LAST,z),0,0);
  const sc=S.out.scale;
  document.getElementById('meta').textContent=LAST.w?`${LAST.w} × ${LAST.h} px · 내보내기 ${LAST.w*sc} × ${LAST.h*sc} px (${sc}×)`:'비어 있음';
  const bg=S.out.previewBg;stage.className='stage'+(bg==='checker'?' checker':'');
  stage.style.background=bg==='dark'?'#1e1e22':bg==='light'?'#f2f2f2':bg==='chat'?'linear-gradient(#5d8fd8,#a9c8ef)':'';
}
let raf=0;
function update(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;render();projectSave(true)})}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2200)}
function fileName(){return (S.text.value.split('\n')[0].trim().replace(/[\\/:*?"<>|]/g,'')||'tag')+'.png'}
document.getElementById('btnSave').onclick=()=>{if(!LAST.w)return toast('내보낼 내용이 없습니다');layerCanvas(LAST,S.out.scale).toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fileName();a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/png')};
document.getElementById('btnCopy').onclick=()=>{if(!LAST.w)return toast('복사할 내용이 없습니다');layerCanvas(LAST,S.out.scale).toBlob(async b=>{try{await navigator.clipboard.write([new ClipboardItem({'image/png':b})]);toast('클립보드에 복사했습니다')}catch(e){toast('복사하지 못했습니다. PNG 저장을 사용하세요')}},'image/png')};
