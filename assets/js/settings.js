// 설정 파일 내보내기·불러오기
'use strict';
/* ───────── 설정 파일 ───────── */
function exportJson(){const b=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='pixel-tag-settings.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
document.getElementById('fJson').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const keep=S.icons.list;S=merge(defaults(),JSON.parse(await f.text()));S.icons.list=S.icons.list.filter(hasIcon);if(!S.icons.list.length)S.icons.list=keep;rebuild();toast('설정을 불러왔습니다')}catch(err){toast('설정 파일을 읽지 못했습니다')}e.target.value=''};
