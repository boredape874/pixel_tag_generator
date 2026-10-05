// 시작
'use strict';
/* ───────── 시작 ───────── */
(async()=>{
  const fonts=await idbAll('fonts')||[];
  for(const rec of fonts){try{await loadUserFont(rec)}catch(e){console.warn('폰트 로드 실패',rec.name,e)}}
  const icons=await idbAll('icons')||[];
  for(const rec of icons){try{await decodeIcon(rec)}catch(e){}}
  S.icons.list=S.icons.list.filter(hasIcon);
  // 프리셋은 기본으로 접어 두고, 펼칠 때 처음 한 번만 그림 (펼침 상태는 이 브라우저에 기억)
  const folds=[['foldPresets',renderPresets],['foldStyles',renderTextStyles]];
  for(const [id,draw] of folds){const d=document.getElementById(id);let drawn=false;
    const show=()=>{if(d.open&&!drawn){drawn=true;draw()}};
    try{if(localStorage.getItem('pixel-tag-generator:'+id)==='1')d.open=true}catch(e){}
    d.addEventListener('toggle',()=>{show();try{localStorage.setItem('pixel-tag-generator:'+id,d.open?'1':'0')}catch(e){}});
    show()}
  rebuild();
  window.addEventListener('resize',update);
})();
window.__pixelTag={get S(){return S},FONTS,loadUserFont,makeUserFont,autoSize,rebuild,buildAll};
