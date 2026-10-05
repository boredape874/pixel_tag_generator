// 아이콘: 업로드, 내장 픽셀 아이콘, 스프라이트
'use strict';
/* ───────── 아이콘 ───────── */
const ICONS=new Map();
/* 내장 7x7 픽셀 아이콘 (직접 그림) */
const BI={
  lock:['자물쇠','..###..|.#...#.|.#...#.|#######|###.###|###.###|#######'],
  unlock:['열린 자물쇠','..###..|.#...#.|.#.....|#######|###.###|###.###|#######'],
  check:['체크','.......|......#|.....##|#...##.|##.##..|.###...|..#....'],
  cross:['엑스','#.....#|##...##|.##.##.|..###..|.##.##.|##...##|#.....#'],
  star:['별','...#...|...#...|#######|.#####.|..###..|.##.##.|.#...#.'],
  heart:['하트','.##.##.|#######|#######|#######|.#####.|..###..|...#...'],
  crown:['왕관','#..#..#|##.#.##|#######|#######|.#####.|.......|.#####.'],
  sword:['검','.....##|....###|...###.|#.###..|##.#...|.##....|#.#....'],
  shield:['방패','#######|#######|#######|#######|.#####.|..###..|...#...'],
  gem:['보석','.#####.|#######|.#####.|..###..|...#...'],
  fire:['불꽃','...#...|..##...|..###.#|.#####.|##.####|###.###|.#####.'],
  skull:['해골','.#####.|#######|#..#..#|#######|.##.##.|.#####.|.#.#.#.'],
  flag:['깃발','#####..|######.|######.|#####..|#......|#......|#......'],
  gear:['톱니','..#.#..|.#####.|###.###|##...##|###.###|.#####.|..#.#..'],
  warn:['경고','...#...|..###..|..#.#..|.##.##.|.#####.|##.#.##|#######'],
  mute:['음소거','..#....|.##.#.#|###..#.|###.#.#|.##....|..#....'],
  eye:['눈','..###..|.#...#.|#..#..#|.#...#.|..###..'],
  clock:['시계','.#####.|#..#..#|#..#..#|#..##.#|#.....#|#.....#|.#####.'],
  coin:['동전','.#####.|##...##|#.###.#|#.###.#|#.###.#|##...##|.#####.'],
  note:['음표','..#####|..#...#|..#...#|..#...#|###.###|###.###'],
  bolt:['번개','...###.|..###..|.###...|######.|..###..|.###...|.#.....'],
  plus:['더하기','...#...|...#...|...#...|#######|...#...|...#...|...#...'],
  dot:['점','..###..|.#####.|.#####.|.#####.|..###..'],
  snow:['눈송이','#..#..#|.#.#.#.|..###..|#######|..###..|.#.#.#.|#..#..#'],
  ban:['금지','.#####.|##...##|#...#.#|#..#..#|#.#...#|##...##|.#####.'],
  camera:['카메라','.##....|#######|##.#.##|#.###.#|##.#.##|#######'],
  user:['사람','..###..|..###..|..###..|.......|.#####.|#######|#######'],
  house:['집','...#...|..###..|.#####.|#######|.#####.|.##.##.|.##.##.'],
  chat:['말풍선','#######|#.....#|#.#.#.#|#.....#|#######|.#.....|#......'],
  moon:['달','..###..|.##....|##.....|##.....|##.....|.##....|..###..'],
  trophy:['트로피','#######|#.###.#|#.###.#|.#####.|..###..|...#...|.#####.'],
  bell:['종','...#...|..###..|.#####.|.#####.|.#####.|#######|...#...'],
  up:['위 화살표','...#...|..###..|.#####.|#######|..###..|..###..|..###..'],
  sparkle:['반짝','...#...|..###..|#######|..###..|...#...'],
  key:['열쇠','.###...|#...#..|#...###|#...#.#|.###...'],
  hammer:['망치','#######|#######|...#...|...#...|...#...|...#...|...#...'],
  play:['재생','#......|##.....|###....|####...|###....|##.....|#......'],
  wrench:['렌치','.#...#.|.##.##.|..###..|...#...|...#...|..###..|..###..'],
  brush:['붓','.....##|....###|...###.|..##...|.##....|##.....|#......'],
  pick:['곡괭이','.####..|#...##.|....##.|...#.#.|..#..#.|.#.....|#......'],
  m_bars:['작은 신호','....#|..#.#|#.#.#|#.#.#'],m_alert:['작은 느낌표','###|###|.#.|...|.#.'],m_speaker:['작은 확성기','...##|#.###|#.##.|#.###|...##'],
  m_bubble:['작은 말풍선','#####|#####|#####|.#...'],m_check:['작은 체크','....#|...#.|#.#..|.#...'],m_x:['작은 엑스','#...#|.#.#.|..#..|.#.#.|#...#'],
  m_star:['작은 별','..#..|#####|.###.|.#.#.'],m_heart:['작은 하트','##.##|#####|.###.|..#..'],m_plus:['작은 더하기','..#..|..#..|#####|..#..|..#..'],
  m_info:['작은 정보','.#.|...|##.|.#.|###'],m_crown:['작은 왕관','#.#.#|#####|#####'],m_bell:['작은 종','..#..|.###.|.###.|#####|..#..'],
  m_lock:['작은 자물쇠','.###.|.#.#.|#####|##.##|#####'],m_coin:['작은 동전','.###.|##.##|#.#.#|##.##|.###.'],m_sword:['작은 검','....#|...#.|#.#..|.#...|#.#..'],
  m_flag:['작은 깃발','####.|#####|####.|#....|#....'],m_mail:['작은 편지','#####|##.##|#.#.#|#####'],m_user:['작은 사람','..#..|.###.|.....|#####'],
  m_bag:['작은 가방','.###.|.#.#.|#####|#####|#####'],m_quest:['작은 물음표','###.|...#|.##.|....|.#..'],m_arrow:['작은 화살표','..#..|...#.|#####|...#.|..#..']
};
/* 여러 색 스프라이트 아이콘: 채팅 말풍선 등 (팔레트 문자 → 색) */
function spriteLayer(rows,pal){const w=rows[0].length,hh=rows.length,L=newLayer(w,hh);
  rows.forEach((r,y)=>{for(let x=0;x<w;x++){const c=pal[r[x]];if(c)L.d.set([...hex2rgb(c),255],(y*w+x)*4)}});return L}
const BUBBLE=['.WWWWWWWWWWW.','WWWWWWWWWWWWW','WWWWWWWWWWWWW','WWWWWWWWWWWWW','WWWWWWWWWWWWW','WWWWWWWWWWWWW','WWWWWWWWWWWWW','zWWWWWWWWWWWz','.zWWWzzzzzzz.','..zz.........'];
const BUBBLE_PAL={W:'#fcfcfc',z:'#d0d0d0'};
function bubbleWith(inner,pal){const rows=BUBBLE.slice();inner.forEach((r,i)=>{const y=1+i;rows[y]=rows[y].split('').map((ch,x)=>r[x]&&r[x]!=='.'&&r[x]!==' '?r[x]:ch).join('')});return spriteLayer(rows,{...BUBBLE_PAL,...pal})}
function bubbleIcon(icon,col){const m=BI[icon][1].split('|'),w=m[0].length,hh=m.length,ox=Math.floor((13-w)/2),oy=Math.max(0,Math.floor((6-hh)/2)),inner=[];
  for(let y=0;y<6;y++){let r='.'.repeat(13).split('');const my=y-oy;if(my>=0&&my<hh)for(let x=0;x<w;x++)if(m[my][x]==='#')r[ox+x]=my<Math.ceil(hh/2)?'a':'b';inner.push(r.join(''))}
  return bubbleWith(inner,{a:col,b:shade(col,-0.25)})}
const SPRITES={
  bubble_mega:['말풍선(회색 아이콘)',()=>bubbleWith(['....ab.......','....ac.aa....','....accba....','....aaccb....','....bbbcc....','...a.........'],{a:'#a8a8a8',b:'#858585',c:'#5d5d5d'})],
  bubble_qa:['말풍선(QA)',()=>bubbleWith(['.............','....oo.gg....','...OooGggG...','...O.OGGGG...','...OOOoG.G...','.............'],{o:'#f3ae50',O:'#f19037',g:'#84c659',G:'#5cb23e'})],
  bubble_blank:['말풍선(빈)',()=>bubbleWith([],{})]
};
[['star','#f0c030'],['heart','#e84a5a'],['check','#4ab84a'],['x','#e04848'],['crown','#f0b020'],['info','#3a7ae0'],['bell','#f0902a'],['coin','#e8b020'],
 ['sword','#8a8a9a'],['lock','#6a6a7a'],['user','#4a8ae0'],['bag','#2ab8c0'],['quest','#a050e0'],['mail','#a050e0'],['plus','#3ab84a'],['bars','#3ab84a'],['alert','#e04848'],['flag','#e0782a']]
  .forEach(([k,c])=>{SPRITES['bubble_'+k]=['말풍선('+BI['m_'+k][0].replace('작은 ','')+')',()=>bubbleIcon('m_'+k,c)]});
const SPRITE_CACHE=new Map();const spriteGet=n=>{if(!SPRITES[n])return null;if(!SPRITE_CACHE.has(n))SPRITE_CACHE.set(n,SPRITES[n][1]());return SPRITE_CACHE.get(n)};
const hasIcon=it=>it.id.startsWith('sp:')?!!SPRITES[it.id.slice(3)]:it.id.startsWith('bi:')?!!BI[it.id.slice(3)]:ICONS.has(it.id);
function biMaskLayer(name,col){
  const rows=BI[name][1].split('|'),w=Math.max(...rows.map(r=>r.length)),hh=rows.length,L=newLayer(w,hh);
  rows.forEach((r,y)=>{for(let x=0;x<r.length;x++)if(r[x]==='#')L.d.set(col,(y*w+x)*4)});return L;
}
function iconLayer(it){
  if(it.id.startsWith('sp:'))return spriteGet(it.id.slice(3));
  if(!it.id.startsWith('bi:')){const ic=ICONS.get(it.id);return ic?ic.layer:null}
  const name=it.id.slice(3);if(!BI[name])return null;
  const ic=S.icons,hex=ic.colorMode==='custom'?ic.color:S.textColor.colors[0],col=[...hex2rgb(hex),255];
  const L=biMaskLayer(name,col),sh=S.textShadow,dir=DIRS[sh.pos];
  if(ic.twoTone){const dk=[...hex2rgb(shade(hex,-0.28)),255],y0=Math.ceil(L.h/2);for(let y=y0;y<L.h;y++)for(let x=0;x<L.w;x++){const i=(y*L.w+x)*4;if(L.d[i+3])L.d.set(dk,i)}}
  if(!dir)return L;
  const d=sh.dist,W=L.w+Math.abs(dir[0])*d,H=L.h+Math.abs(dir[1])*d,P=newLayer(W,H);
  over(P,L,dir[0]<0?d:0,dir[1]<0?d:0);return stack(shadowOf(P,dir,d,sh),P);
}
const iconName=it=>it.id.startsWith('sp:')?(SPRITES[it.id.slice(3)]||['?'])[0]:it.id.startsWith('bi:')?(BI[it.id.slice(3)]||['?'])[0]:(ICONS.get(it.id)||{name:'?'}).name;
async function decodeIcon(rec){const bmp=await createImageBitmap(new Blob([rec.buf]));const c=document.createElement('canvas');c.width=bmp.width;c.height=bmp.height;const x=c.getContext('2d');x.drawImage(bmp,0,0);const L=newLayer(bmp.width,bmp.height);L.d.set(x.getImageData(0,0,bmp.width,bmp.height).data);ICONS.set(rec.id,{name:rec.name,layer:L})}
async function addIcons(files){
  for(const file of files){if(!file.type.startsWith('image/'))continue;
    try{const rec={id:uid(),name:file.name,buf:await file.arrayBuffer()};await decodeIcon(rec);
      const L=ICONS.get(rec.id).layer;if(L.w>256||L.h>256){ICONS.delete(rec.id);toast(`${file.name}: 256px 이하 이미지만 쓸 수 있습니다`);continue}
      await idbPut('icons',rec);S.icons.list.push({id:rec.id,side:'left'});}
    catch(err){toast(`${file.name}: 이미지를 읽지 못했습니다`)}}
  rebuild();
}
function iconManager(){
  const drop=h('div',{class:'drop',onclick:()=>document.getElementById('fIcon').click()},'아이콘 이미지를 끌어다 놓거나 눌러서 올리기');
  drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('over')});
  drop.addEventListener('dragleave',()=>drop.classList.remove('over'));
  drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('over');addIcons([...e.dataTransfer.files])});
  const list=S.icons.list.filter(hasIcon);
  const spPicker=h('div',{class:'swatches'},...Object.entries(SPRITES).map(([k,v])=>{const c=layerCanvas(spriteGet(k),2);c.style.display='block';
    return h('button',{type:'button',title:v[0],style:'width:auto;height:auto;padding:3px;background:#3a3f48;border-color:#3a3f48',onclick:()=>{S.icons.list.push({id:'sp:'+k,side:'left'});rebuild()}},c)}));
  const picker=h('div',{class:'swatches'},...Object.entries(BI).map(([k,v])=>{const c=layerCanvas(biMaskLayer(k,[255,255,255,255]),2);c.style.display='block';
    return h('button',{type:'button',title:v[0],style:'width:auto;height:auto;padding:3px;background:#3a3f48;border-color:#3a3f48',onclick:()=>{S.icons.list.push({id:'bi:'+k,side:'left'});rebuild()}},c)}));
  return card('아이콘',row('기본 아이콘',picker),row('색 있는 스프라이트',spPicker),
    row('기본 아이콘 색',seg('icons.colorMode',[['auto','글자색 따라감'],['custom','직접 지정']],true),S.icons.colorMode==='custom'&&color('icons.color')),
    h('div',{class:'row'},chk('아이콘을 따로 상자에 담기 (아이콘 칩)','icons.chip',true),chk('아이콘 아래쪽 어둡게 (2톤)','icons.twoTone')),
    S.icons.chip&&[num('칩 간격','icons.chipGap',-1,8),h('div',{class:'row'},chk('칩 배경색 따로','icons.chipBgOn',true)),S.icons.chipBgOn&&row('칩 배경색',color('icons.chipBgColor'))],
    drop,
    list.map((it,i)=>{const ly=iconLayer(it),ic={name:iconName(it),layer:ly};const th=layerCanvas(ly,Math.max(1,Math.floor(24/Math.max(ly.w,ly.h))));th.style.maxWidth='32px';th.style.maxHeight='32px';
      const sw=h('div',{class:'seg'},...[['left','왼쪽'],['right','오른쪽']].map(([v,l])=>h('button',{type:'button',class:it.side===v?'on':'',onclick:()=>{it.side=v;rebuild()}},l)));
      return h('div',{class:'iconitem'},th,h('span',{class:'nm',title:ic.name},`${ic.name} (${ic.layer.w}×${ic.layer.h})`),sw,
        h('button',{type:'button',title:'앞으로',onclick:()=>{const a=S.icons.list,k=a.indexOf(it);if(k>0){[a[k-1],a[k]]=[a[k],a[k-1]];rebuild()}}},'↑'),
        h('button',{type:'button',class:'danger',onclick:()=>{S.icons.list.splice(S.icons.list.indexOf(it),1);if(!it.id.startsWith('bi:')&&!it.id.startsWith('sp:')){ICONS.delete(it.id);idbDel('icons',it.id)}rebuild()}},'✕'))}),
    list.length>0&&num('간격','icons.gap',0,20),
    h('p',{class:'hint'},'아이콘은 픽셀 그대로(1배) 들어갑니다. 16×16 이하 픽셀 아트를 권장합니다.')
  );
}
document.getElementById('fIcon').onchange=e=>{addIcons([...e.target.files]);e.target.value=''};
