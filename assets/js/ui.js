// UI 헬퍼와 설정 패널
'use strict';
/* ───────── UI 헬퍼 ───────── */
function h(tag,attrs,...kids){const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs||{})){if(k==='class')e.className=v;else if(k.startsWith('on'))e.addEventListener(k.slice(2),v);else if(k==='style')e.style.cssText=v;else if(k==='value')e.value=v;else if(k==='checked')e.checked=v;else if(v!==false&&v!=null)e.setAttribute(k,v===true?'':v)}for(const c of kids.flat()){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(c))}return e}
const card=(title,...kids)=>h('div',{class:'card'},h('h2',null,title),...kids);
const row=(label,...kids)=>h('div',{class:'row'},h('span',{class:'l'},label),h('div',{class:'v'},...kids));
function stepper(getV,setV,min,max){
  const inp=h('input',{type:'number',min,max,value:getV()});
  const apply=v=>{v=clamp(Math.round(isNaN(v)?min:v),min,max);setV(v);inp.value=v};
  inp.addEventListener('input',()=>{const v=parseInt(inp.value,10);if(!isNaN(v)&&v>=min&&v<=max)setV(v)});
  inp.addEventListener('change',()=>apply(parseInt(inp.value,10)));
  return h('div',{class:'stepper'},h('button',{type:'button',onclick:()=>apply(getV()-1)},'−'),inp,h('button',{type:'button',onclick:()=>apply(getV()+1)},'+'));
}
const num=(label,p,min,max,rb)=>row(label,stepper(()=>get(p),v=>{set(p,v);rb?rebuild():update()},min,max));
function seg(p,opts,rb){const w=h('div',{class:'seg'});for(const[v,l]of opts){const b=h('button',{type:'button',class:get(p)===v?'on':'',onclick:()=>{set(p,v);[...w.children].forEach(c=>c.classList.toggle('on',c===b));rb?rebuild():update()}},l);w.append(b)}return w}
const chk=(label,p,rb)=>h('label',{class:'ck'},h('input',{type:'checkbox',checked:!!get(p),onchange:e=>{set(p,e.target.checked);rb?rebuild():update()}}),label);
const color=p=>h('input',{type:'color',value:get(p),oninput:e=>{set(p,e.target.value);update()}});
function alpha(p){const lab=h('span',{style:'width:38px;text-align:right;font-size:12px;color:var(--muted)'},get(p)+'%');return row('투명도',h('input',{type:'range',min:0,max:100,value:get(p),oninput:e=>{set(p,+e.target.value);lab.textContent=e.target.value+'%';update()}}),lab)}
const DIR_OPTS=[['h','가로'],['v','세로'],['d1','↘ 대각선'],['d2','↗ 대각선'],['r','중심에서 바깥']];
const POS_OPTS=[['none','없음'],['right','오른쪽'],['below','아래'],['br','오른쪽 아래'],['above','위'],['left','왼쪽']];
const G=(n,c,d,hard)=>({n,c,d:d||'v',hard:!!hard});
const GRADS=[
  G('불꽃',['#fff3a0','#ffb02e','#ff4d1f']),G('용암',['#ffe66b','#ff6a00','#8a0d0d']),G('노을',['#ffd36b','#ff7a59','#c2367a'],'h'),
  G('황금',['#fff6c2','#ffd84a','#c98a00']),G('은빛',['#ffffff','#c9d1dc','#7d8794']),G('동메달',['#ffd2a6','#d4823f','#7a3d12']),
  G('루비',['#ffb3b8','#e5243b','#7a0a1a']),G('에메랄드',['#b5ffe1','#2ed3a0','#0f7a5c']),G('사파이어',['#b8d4ff','#2f6fe0','#0f2a7a']),
  G('자수정',['#f2c6ff','#b76bff','#5b23b0']),G('얼음',['#ffffff','#a8e6ff','#3aa0e8']),G('바다',['#7ff0ff','#2a8cf0','#1b3fa8']),
  G('숲',['#c8f58a','#4cc35a','#1d6b35']),G('독',['#e6ff6b','#8de03a','#3f8f1c']),G('벚꽃',['#ffffff','#ffc2dc','#ff7fb2']),
  G('네온 핑크',['#ff9cf0','#ff3fd0']),G('사이버',['#3ef2ff','#b44bff'],'h'),G('오로라',['#5cffb1','#47c8ff','#a46bff'],'h'),
  G('밤하늘',['#3b4fd8','#1a1f5c','#0b0d24']),G('초콜릿',['#d9a26b','#8a5228','#4a2810']),G('흑백',['#ffffff','#5a5a5a']),
  G('파스텔',['#ffd1dc','#ffe9b8','#c9f7d4','#c8e3ff','#e2d1ff'],'h'),
  G('무지개',['#ff5c5c','#ffb14a','#ffe95c','#5cff7a','#5cc8ff','#b07cff'],'h',true),
  G('무지개 부드럽게',['#ff5c5c','#ffb14a','#ffe95c','#5cff7a','#5cc8ff','#b07cff'],'h'),
  G('줄무늬 금',['#ffe066','#d9a400','#ffe066','#d9a400'],'v',true),G('체리콕',['#ff4d6d','#7a0019'],'v',true),
  G('바닐라',['#fffbe8','#f3e2b3']),G('슬레이트',['#9aa5b8','#4a5466','#262c36']),
  G('민트',['#e0fff4','#7ef2c8','#21b38a']),G('레몬',['#fffde0','#fff176','#f2c200']),G('복숭아',['#ffe5d6','#ffb08a','#ff7a6b']),
  G('라벤더',['#f3eaff','#c9a8ff','#8a63e8']),G('코랄',['#ffd0c2','#ff7f6b','#e04848']),G('청록',['#a8fff3','#1fc8b8','#0b6b73']),
  G('하늘',['#ffffff','#9fd8ff','#4aa8ff']),G('새벽',['#2b1055','#7597de']),G('석양',['#ffef9a','#ff9a3c','#ff3c6e','#6a1f8a']),
  G('열대',['#fff35c','#3cff9a','#1fb8ff'],'h'),G('솜사탕',['#ffb8e6','#b8e0ff'],'h'),G('보랏빛 밤',['#c86bff','#3b0d6b','#120326']),
  G('핏빛',['#ff6b6b','#a10000','#3d0000']),G('번개',['#ffffff','#fff35c','#ffb800'],'v',true),G('불사조',['#ffe14d','#ff5e3a','#b31e6f'],'d1'),
  G('심해',['#3de0d0','#1a5fb4','#0a1640']),G('우주',['#ff6bd5','#6b5bff','#0b0f3a'],'d1'),G('엔더',['#e8b8ff','#9c3fd6','#1a0a2a']),
  G('네더',['#ff8a3c','#a8231a','#3a0b0b']),G('다이아',['#e8fffd','#5ce8e0','#1aa6a6']),G('네더라이트',['#7a6b70','#4a3f44','#2a2326']),
  G('레드스톤',['#ff4d4d','#b30000','#5c0000']),G('이끼',['#b8d66b','#6b8f2a','#3a5214']),G('토파즈',['#ffe0a3','#ffab3c','#c26a00']),
  G('크롬',['#ffffff','#9aa3ad','#ffffff','#5a636d']),G('홀로그램',['#ff9cee','#9cf5ff','#fff59c','#b89cff'],'d1'),
  G('불타는 금',['#fff8c2','#ffcf3c','#ff6a00','#9c1f00']),G('흑백 체크',['#ffffff','#1a1a1a','#ffffff','#1a1a1a'],'h',true),
  G('신호등',['#ff4d4d','#ffd43b','#40c057'],'h',true),G('반반 청홍',['#e5243b','#1f4fb0'],'v',true),G('대각선 금',['#fff3b0','#e0a800'],'d1'),
  G('중심 금빛',['#ffffff','#ffd84a','#c98a00'],'r'),G('중심 푸른빛',['#ffffff','#5cc8ff','#1b3fa8'],'r'),G('중심 붉은빛',['#ffe0e0','#ff4d4d','#5c0000'],'r'),
  G('프리즈마린',['#9ff5e0','#4fb8a8','#2a6b6b']),G('구리',['#ffc8a8','#e07b4f','#8a3f22']),G('산화 구리',['#9fe8c8','#4fae8a','#2a6b5a']),
  G('청금석',['#7fa8ff','#2a4fc8','#122a7a']),G('석영',['#ffffff','#ece6df','#c9bfb3']),G('흑요석',['#5a3f7a','#2a1a3d','#0f0818']),
  G('슬라임',['#c8ff9f','#7ad44f','#3f8a2a']),G('꿀',['#fff0a0','#ffc23c','#d98a00']),G('마그마',['#ffdd4f','#ff6a1f','#5c1400'],'v',true),
  G('진홍 숲',['#ff6b6b','#a8233a','#4a0f1a']),G('뒤틀린 숲',['#5cffd8','#1fa8a0','#0f3d4a']),G('스컬크',['#3ef0ff','#0f5a6b','#061a24']),
  G('체리 나무',['#ffe0ee','#ffa8cc','#d9668f']),G('대나무',['#e8f59f','#a8c83c','#5a7a1a']),G('모래',['#fff4d0','#e8d39a','#c2a86a']),
  G('눈',['#ffffff','#e8f4ff','#b8d4f0']),G('엔드 스톤',['#fffbd0','#e8e0a0','#b8ae6b']),G('서리',['#e8ffff','#9fdcff','#5c8fd8'],'d1'),
  G('네온 그린',['#d8ff5c','#5cff3c']),G('네온 블루',['#5cf0ff','#2a5cff']),G('사이버펑크',['#fff35c','#ff3cac','#2b86c5'],'h'),
  G('베이퍼웨이브',['#ff71ce','#b967ff','#01cdfe'],'h'),G('레트로 80',['#ffd319','#ff901f','#ff2975','#8c1eff'],'v',true),
  G('플라밍고',['#ffd1dc','#ff8fab','#e5487a']),G('라임',['#f4ffb0','#c8f560','#7ab81a']),
  G('모노 블루',['#d0e4ff','#2f6fde'],'v',true),G('모노 레드',['#ffd0d0','#e5243b'],'v',true),G('모노 그린',['#d0ffdc','#2fb85c'],'v',true),
  G('딥 퍼플',['#8a5cff','#3a0f8a']),G('카멜',['#f0c89a','#b8834f']),G('올리브',['#c8c87a','#6b6b2a']),G('잉크',['#3a4a6b','#0f1626']),
  G('불길한',['#8a0000','#1a0000','#000000']),G('천국',['#ffffff','#fff6c2','#ffe066'],'r'),G('지옥불',['#ffef5c','#ff5c1f','#5c0000'],'r'),
  G('빙하',['#ffffff','#b8f0ff','#3aa0e8','#1b3fa8']),
  G('PICO 불꽃',['#ffec27','#ffa300','#ff004d','#7e2553']),G('PICO 바다',['#fff1e8','#29adff','#1d2b53']),G('PICO 숲',['#00e436','#008751','#1d2b53']),
  G('PICO 분홍',['#ffccaa','#ff77a8','#7e2553']),G('E32 불',['#fee761','#feae34','#f77622','#e43b44','#a22633']),G('E32 물',['#2ce8f5','#0099db','#124e89','#262b44']),
  G('E32 풀',['#63c74d','#3e8948','#265c42','#193c3e']),G('E32 금속',['#ffffff','#c0cbdc','#8b9bb4','#5a6988','#3a4466']),G('E32 흙',['#ead4aa','#e4a672','#b86f50','#733e39','#3e2731']),
  G('E32 장미',['#f6757a','#b55088','#68386c']),G('색조이동 빨강',['#ffe46b','#ff7a3c','#d6264a','#6b1a5c','#2a1040']),G('색조이동 초록',['#f0ff8a','#7ad44f','#2a9a5c','#1a5a5c','#122a40']),
  G('색조이동 파랑',['#c8fff4','#5cd8e8','#3a7ad8','#3a2a8a','#1a1040']),G('색조이동 보라',['#ffd0f0','#e87ad8','#8a3ab8','#3a1a6b']),G('색조이동 금',['#fffbd0','#ffd84a','#e8862a','#a83a2a','#4a1a2a']),
  G('계단 빨강',['#ff9c9c','#e5243b','#8a0f22','#3d0610'],'v',true),G('계단 파랑',['#a8d4ff','#2f6fde','#173f8a','#0a1a40'],'v',true),G('계단 초록',['#b8ffb0','#3cc36b','#1f6b3a','#0a2a14'],'v',true),
  G('계단 금',['#fff6c2','#ffd84a','#c98a00','#5c3d00'],'v',true),G('계단 보라',['#e8c8ff','#9c5cf0','#5b30c0','#200a4a'],'v',true),
  G('나무',['#d9a066','#a8703c','#6b4422']),G('돌',['#b0b0b0','#8a8a8a','#5a5a5a']),G('유리',['#ffffff','#d8f4ff','#a8dcf0']),G('상아',['#fffdf0','#f2e8cc','#d8c8a0']),
  G('희귀 초록',['#7cff7c','#2fb82f']),G('희귀 파랑',['#7cb8ff','#2f6fde']),G('희귀 보라',['#e07cff','#9c2fde']),G('희귀 주황',['#ffd27c','#ff9a1f']),G('희귀 분홍',['#ff9ce6','#e02fb8']),
  G('무지개 글자마다',['#ff5555','#ffaa00','#ffff55','#55ff55','#55ffff','#5555ff','#ff55ff'],'c',true),
  G('봄',['#fff0f5','#ffc8dd','#b8e8a0']),G('여름',['#fff35c','#5ce0ff','#1f7ae0']),G('가을',['#ffd27c','#e8742a','#8a2a14']),G('겨울',['#ffffff','#c8e0ff','#7a9cd8']),
  G('할로윈',['#ffa31a','#ff6a00','#5c1a8a'],'v',true),G('크리스마스',['#e5243b','#1f8f48'],'h',true),G('발렌타인',['#ffd0e0','#ff5c8a','#b3124a']),G('새해',['#fff6c2','#ffd84a','#ff5c5c']),
  G('마크 하늘',['#78a7ff','#a5c8ff','#d8e8ff']),G('마크 잔디',['#8fcc4f','#5f9e2f','#79553a','#5a3d28'],'v',true),G('마크 TNT',['#db2b1a','#ffffff','#db2b1a'],'v',true),
  G('경험치',['#c8ff5c','#80ff20','#3a8a0a']),G('체력',['#ff6b6b','#d10f0f','#6b0000']),G('마나',['#8ab4ff','#2a5cff','#10206b']),G('허기',['#e8b86b','#b8742a','#6b3a0a'])
];
const MC_COLORS=[['0','#000000'],['1','#0000aa'],['2','#00aa00'],['3','#00aaaa'],['4','#aa0000'],['5','#aa00aa'],['6','#ffaa00'],['7','#aaaaaa'],['8','#555555'],['9','#5555ff'],['a','#55ff55'],['b','#55ffff'],['c','#ff5555'],['d','#ff55ff'],['e','#ffff55'],['f','#ffffff']];
const byGrad=n=>GRADS.find(g=>g.n===n);
function gradCss(g){
  if(g.c.length===1)return g.c[0];
  const ang={h:'90deg',v:'180deg',d1:'135deg',d2:'45deg'}[g.d]||'180deg';
  const stops=g.hard?g.c.map((c,i)=>`${c} ${i/g.c.length*100}% ${(i+1)/g.c.length*100}%`).join(','):g.c.join(',');
  return g.d==='r'?`radial-gradient(${stops})`:`linear-gradient(${ang},${stops})`;
}
function swatches(p){
  return h('div',{class:'swatches'},...GRADS.map(g=>h('button',{type:'button',title:g.n,style:`background:${gradCss(g)}`,
    onclick:()=>{const cfg=get(p);cfg.colors=g.c.slice();cfg.dir=g.d==='c'&&p!=='textColor'?'h':g.d;cfg.hard=g.hard;rebuild()}})));
}
function colorSection(p){
  const cfg=get(p);
  return[
    row('그라데이션',swatches(p)),
    row('마크 색 코드',h('div',{class:'swatches'},...MC_COLORS.map(([code,c])=>h('button',{type:'button',title:'§'+code+' '+c,style:`background:${c}`,onclick:()=>{const cfg=get(p);cfg.colors=[c];rebuild()}})))),
    row('색 개수',stepper(()=>cfg.colors.length,v=>{while(cfg.colors.length<v)cfg.colors.push(cfg.colors[cfg.colors.length-1]);cfg.colors.length=v;rebuild()},1,8)),
    row('색',...cfg.colors.map((c,i)=>h('input',{type:'color',value:c,oninput:e=>{cfg.colors[i]=e.target.value;update()}}))),
    alpha(p+'.alpha'),
    cfg.colors.length>1&&row('방향',seg(p+'.dir',p==='textColor'?[...DIR_OPTS,['c','글자마다']]:DIR_OPTS)),
    cfg.colors.length>1&&h('div',{class:'row'},chk('단색 구간 (그라디언트 없음)',p+'.hard'))
  ];
}
function fontOptions(sel,allowNone){
  const s=h('select',null);
  if(allowNone)s.append(h('option',{value:''},'사용 안 함'));
  for(const f of FONTS.values())s.append(h('option',{value:f.id},f.name+(f.kind==='ttf'?' · 폰트 파일':f.kind==='glyph'?' · 글리프':'')));
  s.value=FONTS.has(sel)||(allowNone&&sel==='')?sel:(allowNone?'':'b57');
  return s;
}

/* ───────── 패널 ───────── */
function rebuild(){
  const panel=document.getElementById('panel');panel.replaceChildren();
  const t=S.text;
  const fsel=fontOptions(t.font,false);fsel.onchange=()=>{t.font=fsel.value;update()};
  const fbsel=fontOptions(t.fallback,true);fbsel.onchange=()=>{t.fallback=fbsel.value;update()};
  panel.append(card('텍스트',
    h('textarea',{rows:2,oninput:e=>{t.value=e.target.value;update()}},t.value),
    row('폰트',fsel),
    row('대체 폰트',fbsel),
    h('p',{class:'hint',style:'margin-top:-2px'},'주 폰트에 없는 글자는 대체 폰트로 그립니다. 예: 주 폰트는 한글 폰트, 대체 폰트는 기본 5x7.'),
    h('div',{class:'row'},chk('굵게','text.bold'),chk('빈 공간 자르기','text.crop'),chk('스몰캡스 (소문자를 작은 대문자로)','text.smallcaps')),
    num('물결','text.wave',0,3)
  ));
  panel.append(fontManager());
  panel.append(card('텍스트 배치',
    num('자간','text.spacing',-2,10),
    num('줄 간격','text.lineGap',-4,16),
    row('정렬',seg('text.align',[['left','왼쪽'],['center','가운데'],['right','오른쪽']]))
  ));
  panel.append(card('글자 색',...colorSection('textColor'),
    h('div',{class:'row'},chk('기호만 다른 색 (+ [ ] ! 등)','text.symOn',true)),
    S.text.symOn&&row('기호 색',color('text.symColor'))));
  const ts=S.textShadow;
  panel.append(card('글자 그림자',
    row('위치',seg('textShadow.pos',POS_OPTS,true)),
    ts.pos!=='none'&&[num('거리','textShadow.dist',1,8),h('div',{class:'row'},chk('자동 색 (글자색의 25% 밝기)','textShadow.auto',true)),
      !ts.auto&&row('색',color('textShadow.color')),alpha('textShadow.alpha')]
  ));
  const to=S.textOutline;
  panel.append(card('글자 외곽선',
    num('두께','textOutline.size',0,8,true),
    to.size>0&&[row('색',color('textOutline.color')),alpha('textOutline.alpha'),
      h('div',{class:'row'},chk('그림자까지 감싸기','textOutline.wrap'),chk('모서리 채우기','textOutline.square'))]
  ));
  const bg=S.bg;
  panel.append(card('배경',
    h('div',{class:'row'},chk('배경 사용','bg.enabled',true)),
    bg.enabled&&colorSection('bg')
  ));
  if(bg.enabled){
    const p=S.pad;
    panel.append(card('배경 여백',
      h('div',{class:'row'},chk('네 방향 따로','pad.asym',true)),
      p.asym?[num('왼쪽','pad.l',0,40),num('오른쪽','pad.r',0,40),num('위','pad.t',0,40),num('아래','pad.b',0,40)]
            :[num('가로','pad.x',0,40),num('세로','pad.y',0,40)],
      num('고정 너비','pad.minW',0,200),
      h('p',{class:'hint'},'0이면 글자 길이에 맞춤. 값을 넣으면 그 너비(px)보다 좁은 태그는 가운데 정렬로 늘립니다. 랭크 태그 너비를 통일할 때 씁니다.')
    ));
    const sh=S.shape;
    panel.append(card('배경 모양',
      h('div',{class:'row'},chk('모서리마다 따로','shape.asym',true),chk('45° 모서리 깎기','shape.chamfer')),
      sh.asym?[num('왼쪽 위','shape.tl',0,20),num('오른쪽 위','shape.tr',0,20),num('오른쪽 아래','shape.br',0,20),num('왼쪽 아래','shape.bl',0,20)]
             :num('모서리','shape.r',0,20),
      num('양옆 홈','shape.notch',0,20,true),
      S.shape.notch>0&&row('홈 위치',seg('shape.notchSide',[['both','양쪽'],['left','왼쪽'],['right','오른쪽']])),
      row('위쪽 장식',seg('shape.topper',[['none','없음'],['battlement','성벽'],['crown','왕관']])),
      num('양옆 날개','shape.wings',0,4),
      num('리본 꼬리','shape.ribbon',0,8),
      row('말풍선 꼬리',seg('shape.tail',[['none','없음'],['bl','왼쪽 아래'],['bc','가운데 아래'],['br','오른쪽 아래']],true)),
      S.shape.tail!=='none'&&num('꼬리 크기','shape.tailSize',1,10),
      row('끝 모양',seg('shape.ends',[['none','평평'],['point','뾰족 (화살표)'],['slant','기울임 (평행사변형)']],true)),
      sh.ends!=='none'&&[row('적용',seg('shape.endSide',[['both','양쪽'],['left','왼쪽'],['right','오른쪽']])),
        row('경사',seg('shape.endSlope',[[1,'완만'],[2,'가파름'],[3,'더 가파름']]))]
    ));
    const bi=S.bgInner,bp=S.bgPattern;
    panel.append(card('배경 장식',
      num('안쪽 테두리','bgInner.size',0,6,true),
      bi.size>0&&[num('안쪽 거리','bgInner.inset',0,10),row('색',color('bgInner.color')),alpha('bgInner.alpha')],
      row('무늬',seg('bgPattern.type',[['none','없음'],['stripes','사선'],['stripesR','역사선'],['hlines','가로줄'],['vlines','세로줄'],['checker','체크'],['dots','점'],['grid','격자'],['diamonds','마름모'],['zigzag','지그재그'],['bricks','벽돌'],['sparkle','반짝이'],['noise','노이즈'],['grain','나뭇결']],true)),
      bp.type!=='none'&&[num('무늬 크기','bgPattern.size',1,8),row('색',color('bgPattern.color')),alpha('bgPattern.alpha')],
      num('윗부분 광택 %','bgGloss.strength',0,80),
      h('div',{class:'row'},chk('깎인 모서리 옆 음영','bgCornerShade.on',true)),
      S.bgCornerShade.on&&row('음영 색 (위·아래)',color('bgCornerShade.top'),color('bgCornerShade.bottom')),
      num('왼쪽 색 띠','bgStrip.size',0,6,true),
      S.bgStrip.size>0&&[row('색',color('bgStrip.color')),alpha('bgStrip.alpha')],
      h('div',{class:'row'},chk('네 모서리 리벳','bgRivets.on',true)),
      num('양끝 세로선','bgCaps.size',0,3,true),
      S.bgCaps.size>0&&[num('세로선 안쪽 거리','bgCaps.inset',0,6),row('색',color('bgCaps.color')),alpha('bgCaps.alpha')],
      num('모서리 장식','bgCorners.size',0,6,true),
      S.bgCorners.size>0&&[row('장식 위치',seg('bgCorners.mode',[['all','네 모서리'],['diag','오른쪽 위·왼쪽 아래']])),row('색',color('bgCorners.color')),alpha('bgCorners.alpha')],
      S.bgRivets.on&&[num('리벳 안쪽 거리','bgRivets.inset',0,6),row('색',color('bgRivets.color')),alpha('bgRivets.alpha')],
      num('띠 두께','bgBand.size',0,6,true),
      S.bgBand.size>0&&[row('띠 위치',seg('bgBand.pos',[['bottom','아래'],['top','위'],['both','위아래']],true)),row(S.bgBand.pos==='both'?'아래 띠 색':'색',color('bgBand.color')),
        S.bgBand.pos==='both'&&row('위 띠 색',color('bgBand.topColor')),alpha('bgBand.alpha')],
      num('가로 강조선','bgLine.size',0,3,true),
      S.bgLine.size>0&&[row('기준',seg('bgLine.from',[['bottom','아래에서'],['top','위에서']])),num('떨어진 줄 수','bgLine.offset',0,10),row('색',color('bgLine.color')),alpha('bgLine.alpha')]
    ));
    panel.append(card('두 색 나누기',
      row('나눌 위치 %',stepper(()=>S.bgSplit.at,v=>{const was=S.bgSplit.at;S.bgSplit.at=v;(was===0)!==(v===0)?rebuild():update()},0,95)),
      h('p',{class:'hint'},'0이면 꺼짐. 오른쪽 부분을 다른 색으로 칠합니다. VIP|+ 같은 두 칸 배지에 씁니다.'),
      S.bgSplit.at>0&&[h('div',{class:'row'},chk('사선 경계','bgSplit.slant')),...colorSection('bgSplit')]
    ));
    panel.append(card('외부 발광',
      num('크기','bgGlow.size',0,6,true),
      S.bgGlow.size>0&&[row('색',color('bgGlow.color')),alpha('bgGlow.alpha')]
    ));
    const bo=S.bgOutline;
    panel.append(card('배경 외곽선',
      h('div',{class:'row'},chk('네 방향 따로','bgOutline.asym',true),chk('모서리 채우기','bgOutline.square')),
      bo.asym?[num('왼쪽','bgOutline.l',0,10),num('오른쪽','bgOutline.r',0,10),num('위','bgOutline.t',0,10),num('아래','bgOutline.b',0,10)]
             :num('두께','bgOutline.size',0,10),
      row('색',color('bgOutline.color')),alpha('bgOutline.alpha')
    ));
    const em=S.bgEmboss;
    panel.append(card('배경 엠보스',
      h('div',{class:'row'},chk('위아래 따로','bgEmboss.asym',true),chk('좌우도 포함','bgEmboss.sides')),
      em.asym?[num('위 밝게','bgEmboss.top',0,10),num('아래 어둡게','bgEmboss.bottom',0,10)]:num('두께','bgEmboss.size',0,10),
      num('세기 %','bgEmboss.strength',0,100),
      h('div',{class:'row'},chk('눌린 버튼 (밝기 반대로)','bgEmboss.invert'))
    ));
    panel.append(card('배경 그림자',
      row('위치',seg('bgShadow.pos',POS_OPTS,true)),
      S.bgShadow.pos!=='none'&&[num('거리','bgShadow.dist',1,8),row('색',color('bgShadow.color')),alpha('bgShadow.alpha')]
    ));
  }
  panel.append(iconManager());
  panel.append(glyphCard());
  panel.append(card('설정 파일',
    h('div',{class:'actions'},
      h('button',{type:'button',onclick:exportJson},'설정 내보내기'),
      h('button',{type:'button',onclick:()=>document.getElementById('fJson').click()},'설정 불러오기'),
      h('button',{type:'button',class:'danger',onclick:()=>{const keep={font:S.text.font,fallback:S.text.fallback,list:S.icons.list};S=defaults();S.text.font=keep.font;S.text.fallback=keep.fallback;S.icons.list=keep.list;rebuild()}},'초기화')),
    h('p',{class:'hint'},'설정 파일에는 폰트·아이콘 파일 자체는 들어가지 않습니다.')
  ));
  const oc=document.getElementById('outCtl');oc.replaceChildren(row('배율',seg('out.scale',[1,2,4,8,16,32].map(v=>[v,v+'×']))));
  document.getElementById('pvbg').replaceChildren(seg('out.previewBg',[['checker','체크무늬'],['dark','어둡게'],['light','밝게'],['chat','하늘']]));
  update();
}
function fontManager(){
  const users=[...FONTS.values()].filter(f=>f.kind!=='builtin');
  return card('폰트 관리',
    h('div',{class:'actions'},
      h('button',{type:'button',onclick:()=>document.getElementById('fFont').click()},'폰트 파일 추가'),
      h('button',{type:'button',onclick:()=>document.getElementById('fGlyph').click()},'글리프 PNG 추가')),
    users.length?users.map(fontItem):h('p',{class:'hint'},'아직 올린 폰트가 없습니다.'),
    h('p',{class:'hint'},'폰트 파일: TTF·OTF·WOFF 픽셀 폰트(갈무리, 둥근모꼴 등). 원래 픽셀 크기로 맞추면 깔끔하게 나옵니다. 추가할 때 크기를 자동으로 찾습니다.'),
    h('p',{class:'hint'},'글리프 PNG: Bedrock 리소스팩의 font/glyph_XX.png. 여러 장을 한 번에 고르면 하나의 폰트로 묶입니다. 파일 이름의 XX(16진수)가 유니코드 상위 바이트입니다. 예: glyph_AC.png는 가~깋.')
  );
}
function fontItem(f){
  const ch=()=>{syncFontRec(f);update()};
  const nm=h('input',{type:'text',value:f.name,onchange:e=>{f.name=e.target.value||f.name;syncFontRec(f);rebuild()}});
  return h('div',{class:'fontitem'},
    h('div',{class:'top'},nm,h('span',{class:'badge'},f.kind==='ttf'?'폰트 파일':`글리프 ${f.pages.size}장`),
      h('button',{type:'button',class:'danger',onclick:async()=>{if(!confirm(`'${f.name}' 폰트를 삭제할까요?`))return;FONTS.delete(f.id);await idbDel('fonts',f.id);if(S.text.font===f.id)S.text.font='b57';if(S.text.fallback===f.id)S.text.fallback='';rebuild()}},'삭제')),
    f.kind==='ttf'&&row('크기 px',stepper(()=>f.size,v=>{f.size=v;ch()},4,96),h('button',{type:'button',onclick:()=>{f.size=autoSize(f);ch();rebuild()}},'자동')),
    row('진하기 기준',stepper(()=>f.threshold,v=>{f.threshold=v;ch()},1,255)),
    row('기준선 보정',stepper(()=>f.baseAdj,v=>{f.baseAdj=v;ch()},-32,32)),
    h('div',{class:'row'},h('label',{class:'ck'},h('input',{type:'checkbox',checked:f.trim,onchange:e=>{f.trim=e.target.checked;ch()}}),'글자 좌우 여백 자르기'))
  );
}
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
document.getElementById('fFont').onchange=async e=>{
  for(const file of e.target.files){
    try{
      const rec={id:uid(),kind:'ttf',name:file.name.replace(/\.[^.]+$/,''),threshold:128,baseAdj:0,trim:true,files:[{name:file.name,buf:await file.arrayBuffer()}]};
      const f=await loadUserFont(rec);f.size=autoSize(f);f.rec.size=f.size;await idbPut('fonts',rec);
      S.text.font=f.id;toast(`'${f.name}' 추가됨 (크기 ${f.size}px)`);
    }catch(err){console.error(err);toast(`${file.name}: 폰트를 읽지 못했습니다`)}
  }
  e.target.value='';rebuild();
};
document.getElementById('fGlyph').onchange=async e=>{
  const files=[...e.target.files];if(!files.length)return;
  const out=[];
  for(const file of files){const m=file.name.match(/glyph_([0-9a-f]{2})/i);
    let page=m?parseInt(m[1],16):NaN;
    if(isNaN(page)){const v=prompt(`${file.name}의 페이지 번호(16진수 두 자리, 예: AC)를 입력하세요`,'00');if(v==null)continue;page=parseInt(v,16);if(isNaN(page))continue}
    out.push({name:file.name,page,buf:await file.arrayBuffer()});}
  if(!out.length)return;
  try{
    const rec={id:uid(),kind:'glyph',name:out.length===1?out[0].name.replace(/\.png$/i,''):`글리프 폰트 (${out.length}장)`,threshold:128,baseAdj:0,trim:true,files:out};
    const f=await loadUserFont(rec);await idbPut('fonts',rec);S.text.font=f.id;toast(`'${f.name}' 추가됨`);
  }catch(err){console.error(err);toast('글리프 PNG를 읽지 못했습니다')}
  e.target.value='';rebuild();
};
