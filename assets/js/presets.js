// 태그·글자 스타일 프리셋
'use strict';
/* ───────── 프리셋 ───────── */
const X=(...o)=>Object.assign({},...o);
function ST(text,icon,bgc,ol,extra){return Object.assign({text:{value:text},bg:{colors:bgc,enabled:true},bgOutline:{color:ol},icons:{list:[{id:'bi:'+icon,side:'left'}]},pad:{x:3,y:2}},extra||{})}
function KEY(k){return{text:{value:k},bg:{colors:['#f2f2f2','#c9c9c9'],enabled:true},textColor:{colors:['#3a3a3a']},bgOutline:{color:'#2a2a2a'},
  bgEmboss:{asym:true,top:1,bottom:2,strength:35,sides:true},shape:{r:1},pad:{asym:true,l:3,r:3,t:2,b:3}}}
function IT(text,gn,ol){const g=byGrad(gn);return{text:{value:text},bg:{colors:g.c,dir:g.d,hard:g.hard,enabled:true},bgOutline:{color:ol},
  textOutline:{size:1,color:ol},shape:{r:1,chamfer:true},bgEmboss:{size:0},bgBand:{size:1,pos:'bottom',color:'#000000',alpha:65}}}
const tc=c=>({textColor:{colors:Array.isArray(c)?c:[c]}});
function PG(text,gn,ol,extra){const g=byGrad(gn),e=Object.assign({},extra||{});e.bg=Object.assign({colors:g.c,dir:g.d,hard:g.hard,enabled:true},e.bg||{});return Object.assign({text:{value:text},bgOutline:{color:ol}},e)}
function P(text,bgc,ol,extra){return Object.assign({text:{value:text},bg:{colors:bgc,enabled:true},bgOutline:{color:ol}},extra||{})}
const PRESETS=[
  P('ADMIN',['#e5484d','#b4232a'],'#5a0f12'),
  P('MOD',['#3e8ee8','#1f5fb8'],'#0e2c57'),
  P('DEV',['#8e5cf0','#5b30c0'],'#2a1460'),
  P('BUILDER',['#f59f2a','#c86b0e'],'#5c2f04'),
  P('HELPER',['#3cc36b','#1f8f48'],'#0c4220'),
  P('VIP',['#2b2b33','#17171c'],'#000000',{textColor:{colors:['#ffe27a','#f2a91d'],dir:'v'},textShadow:{pos:'br',auto:true}}),
  P('MVP+',['#33d2e0','#1499b0'],'#06414b',{textShadow:{pos:'below',auto:true}}),
  P('SUPPORT',['#f06aa8','#c23b7a'],'#561733'),
  P('LIVE',['#ff2b2b'],'#7a0000',{shape:{r:3},bgEmboss:{size:0}}),
  P('MEMBER',['#8b9099','#5f646d'],'#2b2e33'),
  P('SALE',['#ffd43b','#f2b705'],'#6b4e00',{textColor:{colors:['#3b2a00']},shape:{r:0,notch:3},pad:{x:5}}),
  P('STAFF',['#1d2430','#2c3748'],'#7aa2ff',{textColor:{colors:['#9fc1ff','#ffffff'],dir:'v'},shape:{r:2,chamfer:true}}),
  P('LEGEND',['#141414'],'#000000',{textColor:{colors:['#ff5c5c','#ffb14a','#ffe95c','#5cff7a','#5cc8ff','#b07cff'],dir:'h',hard:true},bgEmboss:{size:0}}),
  P('NEW',['#c8f560','#86c21f'],'#2f4a05',{textColor:{colors:['#1c2b03']},bgEmboss:{size:1,strength:35}}),
  PG('OWNER','불타는 금','#3d1a00',tc('#3d1a00')),
  PG('CO-OWNER','루비','#3d0008'),
  PG('MANAGER','사파이어','#0a1a4a'),
  PG('SR.MOD','바다','#0b2a66'),
  PG('JR.MOD','하늘','#1b4f8a',tc('#0b3a6b')),
  PG('TRIAL','슬레이트','#1a1f26'),
  P('YOUTUBE',['#ff0000'],'#5c0000',{shape:{r:3},bgEmboss:{size:0}}),
  P('TWITCH',['#a970ff','#772ce8'],'#2d0c5c'),
  P('TIKTOK',['#111111'],'#000000',{textColor:{colors:['#25f4ee','#fe2c55'],dir:'h',hard:true},bgEmboss:{size:0}}),
  P('DISCORD',['#7289ff','#5865f2'],'#1e2475'),
  PG('BOOSTER','솜사탕','#8a3a7a',tc('#7a2a6b')),
  PG('PARTNER','민트','#0b4a3a',tc('#0b4a3a')),
  PG('VIP+','황금','#5c3d00',Object.assign(tc('#4a3000'),{shape:{r:2,chamfer:true}})),
  PG('MVP++','불사조','#3d0a2a',{textShadow:{pos:'br',auto:true}}),
  PG('ELITE','자수정','#2a0d5c'),
  PG('HERO','레드스톤','#2a0000'),
  PG('KING','불타는 금','#4a1400',Object.assign(tc('#4a1400'),{shape:{r:0,notch:3},pad:{x:5}})),
  PG('QUEEN','벚꽃','#8a2a55',Object.assign(tc('#8a2a55'),{shape:{r:0,notch:3},pad:{x:5}})),
  PG('GOD','홀로그램','#ffffff',tc('#2a1a4a')),
  PG('ENDER','엔더','#0a0010'),
  PG('NETHER','네더','#1a0000',{textColor:{colors:byGrad('불꽃').c,dir:'v'}}),
  PG('DIAMOND','다이아','#0b4a4a',tc('#0b4a4a')),
  PG('EMERALD','에메랄드','#063d2c'),
  PG('GOLD','황금','#5c3d00',tc('#4a3000')),
  PG('IRON','은빛','#2b2f36',tc('#2b2f36')),
  PG('NETHERITE','네더라이트','#140f11',tc('#e8d9c9')),
  PG('BETA','라벤더','#4a2a8a',tc('#2a0d5c')),
  PG('EVENT','열대','#0b3a3a',Object.assign(tc('#0b3a3a'),{shape:{r:0,notch:2},pad:{x:4}})),
  PG('WINNER','대각선 금','#5c3d00',Object.assign(tc('#4a3000'),{textShadow:{pos:'below',auto:true}})),
  P('BANNED',['#2a2a2a'],'#000000',{textColor:{colors:['#ff4d4d']},shape:{r:2,chamfer:true}}),
  P('AFK',['#6b6b6b'],'#2a2a2a',{textColor:{colors:['#d0d0d0']},bgEmboss:{size:0}}),
  PG('NEWBIE','레몬','#7a5c00',tc('#4a3a00')),
  PG('PRO','우주','#0b0f3a',{textShadow:{pos:'br',auto:true}}),
  PG('STAR','중심 금빛','#5c3d00',tc('#4a3000')),
  PG('OCEAN','심해','#050b20'),
  PG('SUNSET','석양','#3a0f3a'),
  PG('CHROME','크롬','#3a4048',tc('#1f242b')),
  PG('LEADER','황금','#4a3000',X(tc('#4a3000'),{shape:{r:0,ends:'point'}})),
  PG('CLAN','엔더','#0a0010',{shape:{r:0,ends:'point'},bgInner:{size:1,inset:1,color:'#e8b8ff',alpha:55}}),
  PG('MAGIC','홀로그램','#3a2a5c',X(tc('#2a1a4a'),{shape:{r:0,ends:'point',endSlope:2}})),
  PG('ARENA','레드스톤','#2a0000',{shape:{r:0,ends:'point',endSlope:2}}),
  PG('HOT','용암','#2a0000',{textColor:{colors:['#ffffff','#ffe066'],dir:'v'},shape:{r:0,ends:'point',endSide:'left'}}),
  PG('SHOP','민트','#0b4a3a',X(tc('#0b4a3a'),{shape:{r:2,ends:'point',endSide:'right'}})),
  PG('TEAM','사파이어','#0a1a4a',{shape:{r:0,ends:'slant'}}),
  PG('SPEED','하늘','#1b4f8a',X(tc('#0b3a6b'),{shape:{r:0,ends:'slant',endSlope:2},bgPattern:{type:'hlines',size:1,color:'#ffffff',alpha:75}})),
  PG('RAID','핏빛','#1a0000',{shape:{r:0,ends:'slant'},bgPattern:{type:'stripes',size:2,color:'#000000',alpha:80}}),
  PG('KNIGHT','크롬','#3a4048',X(tc('#1f242b'),{shape:{r:2,ends:'slant',endSide:'left'}})),
  PG('LV.99','우주','#0b0f3a',{shape:{r:20},bgGloss:{strength:30},bgEmboss:{size:0}}),
  PG('MEDAL','동메달','#3a1a06',X(tc('#3a1a06'),{shape:{r:20},bgGloss:{strength:35},bgEmboss:{size:0}})),
  PG('ICE','얼음','#0d3a66',X(tc('#0d3a66'),{shape:{r:20},bgGloss:{strength:40},bgEmboss:{size:0}})),
  PG('BOSS','핏빛','#1a0000',{shape:{r:3,chamfer:true},bgInner:{size:1,inset:1,color:'#ffb3b3',alpha:55},bgGloss:{strength:15}}),
  PG('GUILD','네더라이트','#140f11',X(tc('#e8d9c9'),{shape:{r:2,chamfer:true},bgInner:{size:1,inset:1,color:'#e8d9c9',alpha:60}})),
  PG('TICKET','레몬','#7a5c00',X(tc('#4a3a00'),{shape:{r:0,notch:3},pad:{x:5},bgInner:{size:1,inset:1,color:'#7a5c00',alpha:40}})),
  P('WARNING',['#ffd43b'],'#1a1a1a',X(tc('#ffffff'),{textOutline:{size:1,color:'#1a1a1a'},bgPattern:{type:'stripes',size:2,color:'#1a1a1a',alpha:0},bgEmboss:{size:0},shape:{r:0}})),
  P('CANDY',['#ffffff'],'#8a2a55',X(tc('#ffffff'),{textOutline:{size:1,color:'#8a2a55'},bgPattern:{type:'stripesR',size:2,color:'#ff5c8a',alpha:0},bgEmboss:{size:0},shape:{r:20}})),
  PG('PIXEL','파스텔','#5a4a6a',X(tc('#3a2a4a'),{bgPattern:{type:'checker',size:2,color:'#ffffff',alpha:70},bgEmboss:{size:0}})),
  PG('GALAXY','우주','#0b0f3a',{bgPattern:{type:'dots',size:2,color:'#ffffff',alpha:40},shape:{r:3}}),
  PG('MATRIX','숲','#06210f',{textColor:{colors:['#c8ffb0']},bg:{colors:['#0b2a12','#04140a']},bgPattern:{type:'grid',size:2,color:'#3cff6a',alpha:80},bgEmboss:{size:0},shape:{r:0}}),
  P('GUEST',['#000000'],'#ffffff',X(tc('#ffffff'),{bgEmboss:{size:0},shape:{r:2}},{bg:{colors:['#000000'],alpha:100,enabled:true}})),
  P('RANK',['#000000'],'#ffcf3c',{textColor:{colors:byGrad('황금').c,dir:'v'},bg:{colors:['#000000'],alpha:100,enabled:true},bgOutline:{asym:true,l:1,r:1,t:0,b:0,color:'#ffcf3c'},bgEmboss:{size:0},shape:{r:0}}),
  P('SHADOW',['#2b2f36','#16181c'],'#000000',{bgShadow:{pos:'br',dist:2,alpha:40},shape:{r:2}}),
  PG('POP','네온 핑크','#5c0a4d',{bgShadow:{pos:'below',dist:2,color:'#5c0a4d',alpha:0},shape:{r:3},bgGloss:{strength:20},bgEmboss:{size:0}}),
  // 중세 계급
  PG('PEASANT','모래','#6b5a3a',tc('#4a3a1a')),
  PG('SQUIRE','카멜','#4a2f14',{shape:{r:1}}),
  PG('BARON','구리','#3a1a0a',{bgInner:{size:1,inset:1,color:'#ffd2a6',alpha:50}}),
  PG('DUKE','청금석','#0a1640',{bgInner:{size:1,inset:1,color:'#ffd84a',alpha:20},shape:{r:2,chamfer:true}}),
  PG('LORD','딥 퍼플','#1a0640',{bgInner:{size:1,inset:1,color:'#ffd84a',alpha:20},bgGloss:{strength:15}}),
  PG('EMPEROR','불타는 금','#4a1400',X(tc('#4a1400'),{shape:{r:0,ribbon:3},bgGlow:{size:2,color:'#ffd84a',alpha:50}})),
  // 성장 단계
  PG('ROOKIE','라임','#3a5a0a',tc('#2a4a05')),
  PG('NOVICE','모노 그린','#0f4a24'),
  PG('VETERAN','올리브','#2a2a0a',{bgPattern:{type:'bricks',size:2,color:'#000000',alpha:80}}),
  PG('EXPERT','모노 블루','#0a2a6b',{shape:{r:2,chamfer:true}}),
  PG('MASTER','흑요석','#000000',{bgInner:{size:1,inset:1,color:'#b76bff',alpha:30},textColor:{colors:byGrad('자수정').c,dir:'v'}}),
  PG('ULTRA','베이퍼웨이브','#2a0a4a',{bgGlow:{size:2,color:'#ff71ce',alpha:45},shape:{r:3}}),
  PG('INFINITY','오로라','#0f1d3d',{bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:20},bgGlow:{size:2,color:'#47c8ff',alpha:50}}),
  PG('ULTIMATE','지옥불','#2a0000',{bgGlow:{size:3,color:'#ff6a1f',alpha:40},shape:{r:0,ends:'point'}}),
  // 후원
  PG('DONOR','꿀','#6b4a00',X(tc('#4a3000'),{bgPattern:{type:'diamonds',size:2,color:'#ffffff',alpha:70}})),
  PG('PATREON','코랄','#5c1a1a',{shape:{r:0,ribbon:2}}),
  PG('VIP+','황금','#4a3000',X(tc('#4a3000'),{bgSplit:{at:72,colors:['#ff5c5c','#b31e1e'],dir:'v',slant:true}})),
  PG('MVP+','다이아','#0b3a4a',X(tc('#0b3a4a'),{bgSplit:{at:72,colors:['#2f6fde','#173f8a'],dir:'v',slant:true}})),
  PG('ELITE+','자수정','#2a0d5c',{bgSplit:{at:76,colors:['#ffd84a','#c98a00'],dir:'v'}}),
  // 운영진
  PG('SR.ADMIN','핏빛','#1a0000',{bgBand:{size:1,pos:'bottom',color:'#ffd84a',alpha:20},bgInner:{size:1,inset:1,color:'#ffb3b3',alpha:60}}),
  PG('CAPTAIN','사파이어','#0a1a4a',{bgBand:{size:1,pos:'bottom',color:'#ffd84a',alpha:10},bgEmboss:{size:0}}),
  PG('QA','모노 그린','#0f4a24',{shape:{r:0,ends:'slant'},textOutline:{size:1,color:'#0f4a24'}}),
  PG('MEDIA','사이버펑크','#1a0a3a',{textOutline:{size:1,color:'#1a0a3a'},bgSplit:{at:50,colors:['#2b86c5','#123a6b'],dir:'v',slant:true}}),
  // 마크 블록 테마
  PG('SCULK','스컬크','#02090d',{textColor:{colors:['#9ffcff','#3ef0ff'],dir:'v'},bgPattern:{type:'sparkle',size:4,color:'#3ef0ff',alpha:30}}),
  PG('CHERRY','체리 나무','#8a2a55',X(tc('#7a1f45'),{bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:20}})),
  PG('COPPER','구리','#3a1a0a',{bgSplit:{at:55,colors:byGrad('산화 구리').c,dir:'v',slant:true}}),
  PG('LAPIS','청금석','#0a1640',{bgPattern:{type:'sparkle',size:4,color:'#ffd84a',alpha:20}}),
  PG('OBSIDIAN','흑요석','#000000',{bgPattern:{type:'noise',size:2,color:'#7a4fa8',alpha:60}}),
  PG('SLIME','슬라임','#1f4a14',X(tc('#1f4a14'),{shape:{r:20},bgGloss:{strength:40},bgEmboss:{size:0}})),
  PG('HONEY','꿀','#6b4a00',X(tc('#4a3000'),{bgPattern:{type:'diamonds',size:3,color:'#d98a00',alpha:30},shape:{r:3}})),
  PG('QUARTZ','석영','#6b625a',X(tc('#3a342e'),{bgPattern:{type:'vlines',size:3,color:'#ffffff',alpha:50}})),
  PG('PRISMARINE','프리즈마린','#0f3a3a',{bgPattern:{type:'grid',size:2,color:'#c8fff0',alpha:65}}),
  PG('MAGMA','마그마','#2a0800',{bgPattern:{type:'noise',size:2,color:'#2a0800',alpha:55}}),
  PG('WARPED','뒤틀린 숲','#062a2a',{bgPattern:{type:'zigzag',size:2,color:'#5cffd8',alpha:60}}),
  PG('CRIMSON','진홍 숲','#2a0610',{bgPattern:{type:'zigzag',size:2,color:'#ffb3b3',alpha:65}}),
  PG('END','엔드 스톤','#5c5530',X(tc('#3a2a5c'),{bgPattern:{type:'noise',size:1,color:'#ffffff',alpha:40}})),
  PG('SNOW','눈','#5c7a9a',X(tc('#3a5a8a'),{bgBand:{size:1,pos:'top',color:'#ffffff',alpha:0},bgPattern:{type:'sparkle',size:3,color:'#9fc8f0',alpha:30}})),
  PG('BAMBOO','대나무','#3a4a0a',X(tc('#2a3a05'),{bgPattern:{type:'vlines',size:4,color:'#5a7a1a',alpha:60}})),
  // 리본·메달
  PG('CHAMPION','황금','#4a3000',X(tc('#4a3000'),{shape:{r:0,ribbon:3},bgGlow:{size:1,color:'#ffd84a',alpha:50}})),
  PG('1ST','황금','#4a3000',X(tc('#4a3000'),{shape:{r:0,ribbon:2}})),
  PG('2ND','은빛','#2b2f36',X(tc('#2b2f36'),{shape:{r:0,ribbon:2}})),
  PG('3RD','동메달','#3a1a06',X(tc('#3a1a06'),{shape:{r:0,ribbon:2}})),
  // 발광
  P('NEON',['#0b0f2a'],'#5cf0ff',{textColor:{colors:byGrad('네온 블루').c,dir:'v'},bgGlow:{size:2,color:'#2a8cff',alpha:40},bgEmboss:{size:0},shape:{r:2}}),
  P('GLOW',['#1a0a1a'],'#ff71ce',{textColor:{colors:['#ffd0f4','#ff71ce'],dir:'v'},bgGlow:{size:3,color:'#ff71ce',alpha:50},bgEmboss:{size:0},shape:{r:20}}),
  PG('RETRO','레트로 80','#2a0640',{shape:{r:0,ends:'slant'},bgPattern:{type:'hlines',size:1,color:'#000000',alpha:85}}),
  PG('DOOM','불길한','#000000',{textColor:{colors:['#ff4d4d','#8a0000'],dir:'v'},bgGlow:{size:2,color:'#ff0000',alpha:55},shape:{r:2,chamfer:true}}),
  PG('ANGEL','천국','#b38a00',X(tc('#7a5c00'),{bgGlow:{size:2,color:'#ffffff',alpha:30},shape:{r:20}})),
  // 희귀도
  P('COMMON',['#e8e8e8','#b8b8b8'],'#4a4a4a',X(tc('#3a3a3a'),{shape:{r:1}})),
  PG('UNCOMMON','희귀 초록','#0f4a0f',{shape:{r:1}}),
  PG('RARE','희귀 파랑','#0a2a6b',{shape:{r:1}}),
  PG('EPIC','희귀 보라','#3a0a5c',{shape:{r:1},bgGlow:{size:1,color:'#e07cff',alpha:50}}),
  PG('LEGENDARY','희귀 주황','#5c3000',X(tc('#4a2600'),{shape:{r:1},bgGlow:{size:2,color:'#ffd27c',alpha:45}})),
  PG('MYTHIC','희귀 분홍','#5c0a4a',{shape:{r:1},bgGlow:{size:2,color:'#ff9ce6',alpha:45},bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:30}}),
  P('DIVINE',['#ffffff','#e8fbff'],'#3aa0e8',{textColor:{colors:byGrad('무지개 글자마다').c,dir:'c',hard:true},textOutline:{size:1,color:'#1a1a1a'},bgGlow:{size:2,color:'#ffffff',alpha:30},shape:{r:1}}),
  PG('SPECIAL','계단 빨강','#3d0610',{shape:{r:1},bgPattern:{type:'diamonds',size:2,color:'#ffffff',alpha:80}}),
  // 게임 모드
  PG('SURVIVAL','E32 풀','#0f2414',{bgPattern:{type:'noise',size:1,color:'#000000',alpha:85}}),
  PG('SKYBLOCK','PICO 바다','#0a1430',X(tc('#ffffff'),{textOutline:{size:1,color:'#1d2b53'},bgBand:{size:2,pos:'bottom',color:'#63c74d',alpha:0}})),
  PG('BEDWARS','계단 빨강','#2a0008',{bgRivets:{on:true,inset:1,color:'#ffffff',alpha:40}}),
  PG('PVP','핏빛','#1a0000',{shape:{r:0,ends:'point'},textShadow:{pos:'br',auto:true}}),
  PG('CREATIVE','파스텔','#5a4a6a',{textColor:{colors:byGrad('무지개 글자마다').c,dir:'c',hard:true},textOutline:{size:1,color:'#3a2a4a'}}),
  PG('PRISON','돌','#1f1f1f',{bgPattern:{type:'vlines',size:2,color:'#2a2a2a',alpha:30},shape:{r:0}}),
  PG('FACTIONS','E32 흙','#2a1410',{shape:{r:2,chamfer:true},bgInner:{size:1,inset:1,color:'#ead4aa',alpha:60}}),
  PG('ONEBLOCK','E32 풀','#0f2414',X({shape:{r:0}},{bgSplit:{at:0},bgBand:{size:3,pos:'bottom',color:'#8a5a2a',alpha:0}})),
  // 재질
  PG('STONE','돌','#2a2a2a',{bgPattern:{type:'noise',size:2,color:'#5a5a5a',alpha:50},shape:{r:1}}),
  PG('WOOD','나무','#3a2410',{bgPattern:{type:'grain',size:2,color:'#6b4422',alpha:30},shape:{r:1}}),
  PG('METAL','E32 금속','#262b44',X(tc('#262b44'),{bgRivets:{on:true,inset:1,color:'#3a4466',alpha:0},bgPattern:{type:'hlines',size:1,color:'#ffffff',alpha:85},shape:{r:1}})),
  PG('GLASS','유리','#ffffff',X(tc('#ffffff'),{textOutline:{size:1,color:'#3a7aa8'},bg:{alpha:45},bgGloss:{strength:30},bgOutline:{alpha:30},bgEmboss:{size:0},shape:{r:2}})),
  PG('IVORY','상아','#8a7a5a',X(tc('#5a4a2a'),{bgInner:{size:1,inset:1,color:'#c8b88a',alpha:30}})),
  PG('RUNE','흑요석','#000000',{textColor:{colors:['#9cf5ff','#47c8ff'],dir:'v'},bgInner:{size:1,inset:1,color:'#47c8ff',alpha:50},bgGlow:{size:1,color:'#47c8ff',alpha:50},shape:{r:2,chamfer:true}}),
  // 버튼 상태
  PG('BUTTON','돌','#000000',X(tc('#ffffff'),{textShadow:{pos:'br',auto:true},bgEmboss:{size:1,strength:35,sides:true},shape:{r:0}})),
  PG('PRESSED','돌','#000000',X(tc('#e0e0e0'),{bgEmboss:{size:1,strength:35,sides:true,invert:true},shape:{r:0}})),
  // 팔레트 계열
  PG('PICO','PICO 불꽃','#1d2b53',{textOutline:{size:1,color:'#1d2b53'}}),
  PG('PIXEL+','색조이동 파랑','#1a1040',{bgEmboss:{size:1,strength:30}}),
  PG('HUE','색조이동 빨강','#2a1040',{shape:{r:0,ends:'slant'}}),
  PG('STEP','계단 보라','#200a4a',{shape:{r:2}}),
  // 글자 효과 시연
  PG('Owner','계단 금','#3d2a00',X(tc('#3d2a00'),{text:{value:'Owner',smallcaps:true}})),
  PG('Admin','계단 빨강','#2a0008',{text:{value:'Admin',smallcaps:true}}),
  P('RAINBOW',['#1a1a24','#0b0b12'],'#000000',{textColor:{colors:byGrad('무지개 글자마다').c,dir:'c',hard:true},bgEmboss:{size:0}}),
  PG('WAVE','바다','#0b2a66',{text:{value:'WAVE',wave:1},textColor:{colors:['#ffffff','#a8e6ff'],dir:'c'}}),
  PG('PARTY','사이버펑크','#1a0a3a',{text:{value:'PARTY',wave:1},textColor:{colors:byGrad('무지개 글자마다').c,dir:'c',hard:true},textOutline:{size:1,color:'#1a0a3a'}}),
  PG('JR.ADMIN','계단 빨강','#3d0610',{shape:{r:2}}),
  PG('DEVELOPER','색조이동 보라','#2a0a4a',{bgPattern:{type:'grid',size:2,color:'#ffffff',alpha:85}}),
  PG('DEFAULT','돌','#2a2a2a',X(tc('#e0e0e0'),{bgEmboss:{size:0},shape:{r:1}})),
  // 채팅 접두사 (배경 없이 마크 색 코드)
  P('[VIP]',['#000000'],'#000000',{text:{value:'[VIP]'},textColor:{colors:['#55ff55']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[VIP+]',['#000000'],'#000000',{text:{value:'[VIP+]',symOn:true,symColor:'#ffaa00'},textColor:{colors:['#55ff55']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[MVP]',['#000000'],'#000000',{text:{value:'[MVP]'},textColor:{colors:['#55ffff']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[MVP+]',['#000000'],'#000000',{text:{value:'[MVP+]',symOn:true,symColor:'#ff5555'},textColor:{colors:['#55ffff']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[MVP++]',['#000000'],'#000000',{text:{value:'[MVP++]',symOn:true,symColor:'#ff5555'},textColor:{colors:['#ffaa00']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[ELITE++]',['#000000'],'#000000',{text:{value:'[ELITE++]',symOn:true,symColor:'#55ffff'},textColor:{colors:['#ff55ff']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[LEGEND++]',['#000000'],'#000000',{text:{value:'[LEGEND++]',symOn:true,symColor:'#55ff55'},textColor:{colors:['#ffaa00']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[GOD+]',['#000000'],'#000000',{text:{value:'[GOD+]',symOn:true,symColor:'#aa00aa'},textColor:{colors:['#ffff55']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[OWNER]',['#000000'],'#000000',{text:{value:'[OWNER]'},textColor:{colors:['#ff5555']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[ADMIN]',['#000000'],'#000000',{text:{value:'[ADMIN]'},textColor:{colors:['#ff5555']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[MOD]',['#000000'],'#000000',{text:{value:'[MOD]'},textColor:{colors:['#00aa00']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[HELPER]',['#000000'],'#000000',{text:{value:'[HELPER]'},textColor:{colors:['#5555ff']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[BUILD]',['#000000'],'#000000',{text:{value:'[BUILD]'},textColor:{colors:['#00aaaa']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[YT]',['#000000'],'#000000',{text:{value:'[YT]',symOn:true,symColor:'#ff5555'},textColor:{colors:['#ffffff']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[MEMBER]',['#000000'],'#000000',{text:{value:'[MEMBER]'},textColor:{colors:['#aaaaaa']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  P('[NEW]',['#000000'],'#000000',{text:{value:'[NEW]',symOn:true,symColor:'#555555'},textColor:{colors:['#ffff55']},bg:{enabled:false},textShadow:{pos:'br',auto:true}}),
  // 말풍선
  P('HI!',['#ffffff'],'#1a1a1a',X(tc('#1a1a1a'),{shape:{r:2,tail:'bl',tailSize:3},bgEmboss:{size:0}})),
  P('NEW!',['#ffe066','#ffc61a'],'#5c3d00',X(tc('#4a3000'),{shape:{r:2,tail:'bc',tailSize:3},bgEmboss:{size:0}})),
  PG('TIP','하늘','#1b4f8a',X(tc('#0b3a6b'),{shape:{r:2,tail:'br',tailSize:3},bgEmboss:{size:0}})),
  P('LOL',['#2b2f36'],'#000000',{shape:{r:3,tail:'bl',tailSize:2},bgEmboss:{size:0},textColor:{colors:byGrad('무지개 글자마다').c,dir:'c',hard:true}}),
  PG('GG','네온 그린','#0f4a0f',X(tc('#0f3a0a'),{shape:{r:20,tail:'bc',tailSize:2},bgGloss:{strength:25},bgEmboss:{size:0}})),
  P('...',['#ffffff'],'#5a5a5a',X(tc('#5a5a5a'),{shape:{r:20,tail:'bl',tailSize:2},bgEmboss:{size:0}})),
  // 레벨·순위·이벤트
  PG('LV.10','경험치','#1f4a05',X(tc('#1f3a05'),{shape:{r:1},bgBand:{size:1,pos:'bottom',color:'#1f4a05',alpha:40}})),
  PG('LV.50','마나','#0a1040',{shape:{r:1},bgBand:{size:1,pos:'bottom',color:'#000000',alpha:50}}),
  PG('#1','계단 금','#3d2a00',X(tc('#3d2a00'),{shape:{r:20},bgGlow:{size:1,color:'#ffd84a',alpha:40}})),
  PG('TOP10','황금','#4a3000',X(tc('#4a3000'),{shape:{r:0,ribbon:2}})),
  PG('2X XP','경험치','#1f4a05',X(tc('#1f3a05'),{shape:{r:0,ends:'point'},bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:30}})),
  PG('-50%','체력','#3a0000',{shape:{r:0,notch:3},pad:{x:5},bgPattern:{type:'stripes',size:2,color:'#000000',alpha:85}}),
  PG('VS','체력','#2a0000',{shape:{r:0,ends:'slant'},bgSplit:{at:50,colors:byGrad('마나').c,dir:'v',slant:true}}),
  P('OP',['#aa0000','#5c0000'],'#000000',{textColor:{colors:['#ffff55']},textShadow:{pos:'br',auto:true},shape:{r:2,chamfer:true}}),
  P('NPC',['#aaaaaa','#777777'],'#2a2a2a',X(tc('#ffffff'),{textShadow:{pos:'br',auto:true},shape:{r:0}})),
  P('BOT',['#5555ff','#2a2aaa'],'#10105c',{bgRivets:{on:true,inset:1,color:'#ffffff',alpha:40},shape:{r:1}}),
  PG('HP','체력','#2a0000',{bgPattern:{type:'vlines',size:2,color:'#000000',alpha:85},shape:{r:1}}),
  PG('MP','마나','#0a1040',{bgPattern:{type:'vlines',size:2,color:'#000000',alpha:85},shape:{r:1}}),
  // 계절·기념일
  PG('SPRING','봄','#8a3a5a',X(tc('#6b2a4a'),{bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:20}})),
  PG('SUMMER','여름','#0a3a6b',{textOutline:{size:1,color:'#0a3a6b'},shape:{r:3}}),
  PG('AUTUMN','가을','#3a0f05',{bgPattern:{type:'grain',size:2,color:'#8a2a14',alpha:60}}),
  PG('WINTER','겨울','#3a5a8a',X(tc('#2a4a7a'),{bgBand:{size:1,pos:'top',color:'#ffffff',alpha:0},bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:10}})),
  PG('SPOOKY','할로윈','#1a0a2a',{textOutline:{size:1,color:'#1a0a2a'},shape:{r:2,chamfer:true}}),
  PG('XMAS','크리스마스','#1a0a0a',{textOutline:{size:1,color:'#1a0a0a'},bgBand:{size:1,pos:'top',color:'#ffffff',alpha:0}}),
  PG('LOVE','발렌타인','#5c0a2a',{shape:{r:20},bgGloss:{strength:25},bgEmboss:{size:0}}),
  PG('2027','새해','#5c2a00',X(tc('#4a2000'),{bgPattern:{type:'sparkle',size:4,color:'#ffffff',alpha:15},bgGlow:{size:1,color:'#ffd84a',alpha:40}})),
  // 마크 감성
  PG('GRASS','마크 잔디','#1f1408',{textOutline:{size:1,color:'#1f1408'},shape:{r:0},bgEmboss:{size:0}}),
  PG('TNT','마크 TNT','#3a0000',X(tc('#1a1a1a'),{shape:{r:0},bgEmboss:{size:0}})),
  PG('SKY','마크 하늘','#2a4a8a',X(tc('#ffffff'),{textShadow:{pos:'br',auto:true},bgEmboss:{size:0},shape:{r:0}})),
  PG('FOOD','허기','#3a1a05',{shape:{r:2},bgPattern:{type:'dots',size:2,color:'#ffffff',alpha:75}}),
  // 상태 태그 (내장 아이콘)
  ST('LOCKED','lock',['#e5484d','#a61e1e'],'#4a0a0a'),
  ST('UNLOCKED','unlock',['#3cc36b','#1f8f48'],'#0c4220'),
  ST('ONLINE','dot',['#2b2f36','#16181c'],'#000000',{icons:{list:[{id:'bi:dot',side:'left'}],colorMode:'custom',color:'#55ff55'}}),
  ST('OFFLINE','dot',['#2b2f36','#16181c'],'#000000',X(tc('#aaaaaa'),{icons:{list:[{id:'bi:dot',side:'left'}],colorMode:'custom',color:'#ff5555'}})),
  ST('SLEEPING','moon',['#3b4fd8','#1a1f5c'],'#0b0d24',{icons:{list:[{id:'bi:moon',side:'left'}],colorMode:'custom',color:'#ffe066'}}),
  ST('MUTED','mute',['#8b9099','#5f646d'],'#2b2e33'),
  ST('BANNED','ban',['#2a2a2a','#111111'],'#000000',X(tc('#ff4d4d'),{})),
  ST('FROZEN','snow',byGrad('얼음').c,'#0d3a66',X(tc('#0d3a66'),{})),
  ST('VERIFIED','check',['#3e8ee8','#1f5fb8'],'#0e2c57'),
  ST('FLAGGED','flag',['#f59f2a','#c86b0e'],'#5c2f04'),
  ST('EVENT','star',byGrad('자수정').c,'#2a0d5c',{icons:{list:[{id:'bi:star',side:'left'}],colorMode:'custom',color:'#ffe066'}}),
  ST('SYSTEM','gear',byGrad('슬레이트').c,'#1a1f26'),
  ST('STREAMER','camera',['#a970ff','#772ce8'],'#2d0c5c'),
  ST('ALERT','warn',['#ffd43b','#f2b705'],'#6b4e00',X(tc('#3b2a00'),{})),
  ST('TRIAL','clock',byGrad('카멜').c,'#4a2f14'),
  ST('SPECTATE','eye',byGrad('잉크').c,'#05080f'),
  ST('VETERAN','shield',byGrad('E32 금속').c,'#262b44',X(tc('#262b44'),{})),
  ST('SUPPORTER','heart',byGrad('플라밍고').c,'#5c0a2a',{icons:{list:[{id:'bi:heart',side:'left'}],colorMode:'custom',color:'#ffffff'}}),
  ST('ROYAL','crown',byGrad('딥 퍼플').c,'#1a0640',{icons:{list:[{id:'bi:crown',side:'left'}],colorMode:'custom',color:'#ffd84a'}}),
  ST('WARRIOR','sword',byGrad('핏빛').c,'#1a0000'),
  ST('LOBBY','house',byGrad('숲').c,'#0f3a1a'),
  ST('CHAT','chat',byGrad('하늘').c,'#1b4f8a',X(tc('#0b3a6b'),{})),
  ST('TOP','trophy',byGrad('황금').c,'#4a3000',X(tc('#4a3000'),{})),
  ST('RANKUP','up',byGrad('경험치').c,'#1f4a05',X(tc('#1f3a05'),{})),
  ST('COINS','coin',byGrad('계단 금').c,'#3d2a00',X(tc('#3d2a00'),{})),
  ST('MUSIC','note',byGrad('베이퍼웨이브').c,'#2a0a4a'),
  ST('BOOST','bolt',byGrad('번개').c,'#5c3d00',X(tc('#3d2a00'),{})),
  ST('FIRE','fire',byGrad('용암').c,'#2a0000',{icons:{list:[{id:'bi:fire',side:'left'}],colorMode:'custom',color:'#ffe066'}}),
  ST('DEAD','skull',['#2a2a2a','#111111'],'#000000',X(tc('#dddddd'),{})),
  ST('GEMS','gem',byGrad('다이아').c,'#0b4a4a',X(tc('#0b4a4a'),{})),
  ST('NOTICE','bell',byGrad('토파즈').c,'#5c3000',X(tc('#4a2600'),{})),
  ST('PLAYER','user',byGrad('돌').c,'#2a2a2a'),
  ST('KEYS','key',byGrad('꿀').c,'#6b4a00',X(tc('#4a3000'),{})),
  ST('ADD','plus',byGrad('모노 그린').c,'#0f4a24'),
  ST('NEW','sparkle',byGrad('네온 핑크').c,'#5c0a4d'),
  ST('DENIED','cross',byGrad('모노 레드').c,'#3d0610'),
  // 키 버튼 태그
  KEY('E'),KEY('Q'),KEY('F'),KEY('TAB'),KEY('ESC'),KEY('SHIFT'),KEY('CTRL'),KEY('SPACE'),KEY('1'),KEY('F5'),
  // 아이템 분류 태그
  IT('WEAPON','핏빛','#1a0000'),IT('ARMOR','E32 금속','#262b44'),IT('TOOL','나무','#3a2410'),IT('MATERIAL','돌','#2a2a2a'),
  IT('CONSUMABLE','슬라임','#1f4a14'),IT('QUEST','토파즈','#5c3000'),IT('CURRENCY','계단 금','#3d2a00'),IT('ARTIFACT','자수정','#2a0d5c'),
  IT('RELIC','흑요석','#000000'),IT('PET','복숭아','#5c2a1a'),IT('MOUNT','카멜','#4a2f14'),IT('COSMETIC','솜사탕','#5a2a6a'),
  // 소셜·링크 태그
  P('STORE',['#3cc36b','#1f8f48'],'#0c4220',{shape:{r:20},bgGloss:{strength:20},bgEmboss:{size:0}}),
  P('VOTE',['#ffd43b','#f2b705'],'#6b4e00',X(tc('#3b2a00'),{shape:{r:20},bgGloss:{strength:20},bgEmboss:{size:0}})),
  P('WIKI',['#e8e8e8','#b8b8b8'],'#4a4a4a',X(tc('#2a2a2a'),{shape:{r:20},bgEmboss:{size:0}})),
  P('APPLY',['#3e8ee8','#1f5fb8'],'#0e2c57',{shape:{r:20},bgGloss:{strength:20},bgEmboss:{size:0}}),
  P('KICK',['#53fc18','#2fb80a'],'#0a3a00',X(tc('#0a1a00'),{shape:{r:2},bgEmboss:{size:0}})),
  P('RULES',['#2b2f36','#16181c'],'#000000',{shape:{r:20},bgEmboss:{size:0},bgInner:{size:1,inset:1,color:'#ffffff',alpha:70}})
];

/* ───── MCModels 랭크 팩에서 많이 쓰는 스타일 계열 (구조만 참고, 직접 구현) ───── */
function mixHex(a,b,t){const x=hex2rgb(a),y=hex2rgb(b);return'#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')}
function shade(hex,f){const c=hex2rgb(hex),t=f>0?255:0,a=Math.abs(f);return'#'+c.map(v=>Math.round(v+(t-v)*a).toString(16).padStart(2,'0')).join('')}
const ico=(icon,col,chip)=>({list:[{id:'bi:'+icon,side:'left'}],colorMode:'custom',color:col,chip:!!chip,gap:2});
// 1. 슬랩: 단색 직사각형 + 아래 그림자 띠 + 밝은 톤 아이콘 (상태 태그)
const fSlab=(t,c,icon)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:0},bgEmboss:{size:0},shape:{r:0},pad:{x:2,y:1},
  bgBand:{size:1,pos:'bottom',color:shade(c,-0.35),alpha:0},textColor:{colors:['#ffffff']},textShadow:{pos:'below',auto:false,color:shade(c,-0.45),alpha:0},icons:ico(icon,shade(c,0.6))});
// 2. 칩 랭크: 아이콘 칩 + 둥근 1px 태그, 위쪽 하이라이트
const CHIP_ICON={crown:'#ffd23a',trophy:'#ffd23a',coin:'#ffd23a',heart:'#ffffff',star:'#ffffff'};
const fChip=(t,c,icon)=>({text:{value:t,font:'b55'},bg:{colors:[c]},bgOutline:{size:1,color:shade(c,-0.62),square:false},bgEmboss:{size:0},shape:{r:0},pad:{x:3,y:2},
  bgBand:{size:1,pos:'both',color:shade(c,-0.3),topColor:mixHex(c,'#ffc060',0.4),alpha:0},bgShadow:{pos:'below',dist:1,color:'#000000',alpha:55},
  textColor:{colors:['#f6f6f6','#d2d2da'],dir:'v',hard:true},textShadow:{pos:'below',auto:false,color:shade(c,-0.42),alpha:0},
  icons:{...ico(icon,CHIP_ICON[icon]||shade(c,0.75),true),chipGap:2,twoTone:true}});
// 3. 플랫 볼드: 테두리 없는 단색 판 + 굵은 흰 글자, 여백 최소
const fFlat=(t,c,txt)=>({text:{value:t,bold:true},bg:{colors:[c]},bgOutline:{size:0},bgEmboss:{size:0},shape:{r:0},pad:{x:1,y:1},textColor:{colors:[txt||'#ffffff']}});
// 4. 프리미엄 캡슐: 고정 너비, 짧은 뾰족 끝, 안쪽 밝은 테두리
const fCapsule=(t,c)=>({text:{value:t,bold:true,font:'b57'},bg:{colors:[c,shade(c,-0.28)],dir:'v',hard:true},bgOutline:{size:1,color:shade(c,-0.82),square:true},
  bgInner:{size:1,inset:0,color:mixHex(c,'#ff9a9a',0.3),alpha:0},bgEmboss:{size:0},shape:{r:2,chamfer:true},pad:{x:3,y:2,minW:56},
  textColor:{colors:['#ffffff','#dcdce4'],dir:'v',hard:true},textShadow:{pos:'br',auto:false,color:shade(c,-0.85),alpha:0}});
// 5. 판타지 판: 모든 랭크 같은 붉은 판 + 금색 모서리 장식, 랭크는 글자색으로 구분, 아이콘 칩
const fFantasy=(t,cols,icon)=>({text:{value:t},bg:{colors:['#9a2418','#6b130c'],dir:'v'},bgPattern:{type:'noise',size:1,color:'#3a0805',alpha:70},
  bgOutline:{size:1,color:'#1f0503'},bgCorners:{size:2,color:'#ffd27a',alpha:0},bgInner:{size:1,inset:0,color:'#e8943a',alpha:0},bgEmboss:{size:0},
  bgBand:{size:1,pos:'bottom',color:'#4a0c06',alpha:0},bgShadow:{pos:'below',dist:1,color:'#000000',alpha:50},
  shape:{r:0},pad:{x:3,y:2,minW:58},textColor:{colors:cols,dir:'v',hard:true},textOutline:{size:1,color:'#1f0503'},icons:{...ico(icon,cols[0],true),twoTone:true}});
// 6. 모던 2톤: 위 절반이 밝은 두 단 색 + 어두운 테두리
const fModern=(t,c)=>({text:{value:t},bg:{colors:[shade(c,0.3),c],dir:'v',hard:true},bgOutline:{size:1,color:shade(c,-0.45)},bgEmboss:{size:0},
  shape:{r:1},pad:{x:2,y:1},textColor:{colors:['#ffffff']},textShadow:{pos:'below',auto:false,color:shade(c,-0.4),alpha:0}});
// 7. 채팅 소형: 채팅 줄 높이(9px)에 맞춘 납작한 태그, 밝은 톤 글자
const fChat=(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:0},bgEmboss:{size:0},shape:{r:0},pad:{x:1,y:1},textColor:{colors:[shade(c,0.75)]}});
// 8. 아이템·희귀도: 깎은 모서리 + 양끝 세로선 + 외곽선 글자
const fItem=(t,c,txt)=>({text:{value:t},bg:{colors:[shade(c,0.1),shade(c,-0.12)],dir:'v'},bgOutline:{size:1,color:shade(c,-0.65)},shape:{r:1,chamfer:true},
  bgEmboss:{size:1,strength:25},bgCaps:{size:1,inset:1,color:shade(c,-0.4),alpha:0},pad:{x:3,y:1},textColor:{colors:[txt||shade(c,0.8)]},textOutline:{size:1,color:shade(c,-0.65)}});

const PRESET_GROUPS=[
  {name:'상태 슬랩',items:[
    ['LOCKED','#d6283a','lock'],['UNLOCKED','#2fbd2f','unlock'],['OFFLINE','#555a60','dot'],['ONLINE','#3ab53a','dot'],
    ['BRONZE','#b8652e','trophy'],['SILVER','#8f969f','trophy'],['GOLD','#e0a81c','trophy'],['EMERALD','#24b862','gem'],['DIAMOND','#22a8c0','gem'],['CRYSTAL','#b844c8','gem'],
    ['FROZEN','#2a6fd0','snow'],['WARNED','#e08a1a','warn'],['MUTED','#6b4a6b','mute'],['BANNED','#a8202a','ban'],['SUSPENDED','#a01a5a','cross'],
    ['FLAGGED','#d0402a','flag'],['REPORTED','#c8742a','bell'],['EVENT','#b02aa8','star'],['SEASONAL','#e0662a','sparkle'],['SYSTEM','#1f3a7a','gear'],['VERIFIED','#2f8ae0','check'],
    ['MEDIA','#2ab0d0','camera'],['SUPPORTER','#d02a7a','heart'],['VETERAN','#5a3a2a','shield'],['MANAGER','#e0902a','crown'],['TRIAL','#3a3aa8','clock'],
    ['TESTER','#2aa890','eye'],['STREAMER','#6a3ad0','camera'],['PARTNER','#2a8aa8','chat'],['AFK','#4a4f6b','moon']
  ].map(a=>fSlab(...a))},
  {name:'칩 랭크',items:[
    ['OWNER','#d8283a','crown'],['CO.OWNER','#d8283a','crown'],['FOUNDER','#d02a5a','crown'],['SR.ADMIN','#e0483a','shield'],['ADMIN','#e0483a','shield'],['JR.ADMIN','#e0483a','shield'],
    ['SR.MOD','#3a48c8','gear'],['MODERATOR','#3a48c8','gear'],['JR.MOD','#3a48c8','gear'],['SR.DEV','#20a8c8','gear'],['DEVELOPER','#20a8c8','gear'],['JR.DEV','#20a8c8','gear'],
    ['SR.HELPER','#28a83a','plus'],['HELPER','#28a83a','plus'],['JR.HELPER','#28a83a','plus'],['SR.BUILDER','#e0782a','house'],['BUILDER','#e0782a','house'],['JR.BUILDER','#e0782a','house'],
    ['LEGEND','#8a3ae0','heart'],['HERO','#c83ad0','heart'],['CHAMPION','#e04ab0','trophy'],['ELITE','#e8a020','star'],['MVP+','#7ab82a','star'],['MVP','#3aa84a','star'],
    ['VIP+','#2aa8a0','sparkle'],['VIP','#2a98c8','sparkle'],['MEMBER','#6b6f78','user'],['PLAYER','#6b6f78','user'],
    ['NETHERITE','#4a4048','gem'],['EMERALD','#2ab85a','gem'],['DIAMOND','#2ab8c8','gem'],['GOLD','#e8b020','coin'],['LAPIS','#2a58d0','gem'],['IRON','#a8acb4','shield'],['COPPER','#d8683a','coin'],
    ['DISCORD','#5865f2','chat'],['TWITCH','#9146ff','camera'],['MEDIA','#a83ad8','camera'],['YOUTUBE','#e02020','camera'],['TIKTOK','#2a2a30','note']
  ].map(a=>fChip(...a))},
  {name:'플랫 볼드',items:[
    ['ADMIN','#e04848'],['DEVELOPER','#e86070'],['MODERATOR','#1fa83a'],['SUPPORTER','#3a5ae0'],['BUILDER','#4a6ae8'],['VIP+','#f0c050','#5c3a00'],['VIP','#e8986a'],
    ['PLAYER','#6b6b6b'],['DIAMOND','#4ad0e0','#0b3a4a'],['EMERALD','#3ac04a'],['GOLD','#f0c84a','#5c3a00'],['IRON','#c0c4cc','#2a2e36'],['LAZULI','#2a5ad0'],
    ['REDSTONE','#d82a2a'],['COAL','#3a3a3a'],['YOUTUBE','#e02020'],['TWITCH','#8a4ae0'],['OWNER','#b81a2a'],['HELPER','#2a9ad8'],['MEDIA','#d84aa8']
  ].map(a=>fFlat(...a))},
  {name:'프리미엄 캡슐',items:[
    ['OWNER','#c8183a'],['MANAGER','#c8203a'],['ADMIN','#c8188a'],['MOD','#2a48c8'],['BUILDER','#5a5a60'],['HELPER','#2aa83a'],
    ['MVP','#1fa8a8'],['VIP','#b8b020'],['TWITCH','#8a20d0'],['BOOSTER','#d020a8'],['SPONSOR','#1f7ac8'],['PLAYER','#2a9a4a'],
    ['DEV','#20a8c8'],['STAFF','#d06a20'],['LEGEND','#e8a020'],['ELITE','#8a3ae0']
  ].map(a=>fCapsule(...a))},
  {name:'판타지 판',items:[
    ['MUTED',['#b8b8b8','#7a7a7a'],'ban'],['PLAYER',['#e8e8e8','#a8a8a8'],'user'],['VIP',['#8ab4ff','#3a6ae0'],'sparkle'],['PRO',['#8af08a','#2ab83a'],'star'],
    ['MVP',['#ffd27c','#ff9a1f'],'star'],['ELITE',['#e0a8ff','#a050f0'],'crown'],['BUILDER',['#ffb87c','#e0601f'],'house'],['HELPER',['#8af0ff','#20b8d8'],'plus'],
    ['MOD',['#a8ff8a','#3ad83a'],'shield'],['DEVELOPER',['#a8b8ff','#5a6af0'],'gear'],['ADMIN',['#ff8aa8','#e02a5a'],'sword'],['OWNER',['#ffb08a','#f0402a'],'crown'],
    ['STAFF',['#ff9ad8','#e03ab0'],'shield'],['NITRO',['#ff8af0','#d02ad0'],'gem'],['SUPPORTER',['#ff8ad0','#d02a8a'],'heart'],['YOUTUBE',['#ff8a8a','#e02020'],'camera'],
    ['TWITCH',['#c8a8ff','#8a50f0'],'camera'],['TIKTOK',['#8afff0','#20d0c0'],'note']
  ].map(a=>fFantasy(...a))},
  {name:'모던 2톤',items:[
    ['PLAYER','#3ab8c8'],['VIP','#3ab8c8'],['VIP+','#3ab8c8'],['VIP++','#3ab8c8'],['MVP','#3a8ae0'],['SURVIVOR','#3a8ae0'],['SAILOR','#3a8ae0'],['CAPTAIN','#3a8ae0'],
    ['EXTRA','#8a5ae0'],['ULTRA','#8a5ae0'],['SUPER','#8a5ae0'],['EXTREME','#8a5ae0'],['STONE','#c84ac8'],['IRON','#c84ac8'],['GOLD','#c84ac8'],['OBSIDIAN','#c84ac8'],
    ['REDSTONE','#e04a8a'],['EMERALD','#e04a8a'],['DIAMOND','#e04a8a'],['NETHERITE','#e04a8a'],['HELPER','#e04a5a'],['BUILDER','#e04a5a'],['MODERATOR','#e04a5a'],
    ['SUPPORT','#e04a5a'],['ADMIN','#d02a3a'],['CEO','#d02a3a'],['OWNER','#d02a3a'],['MANAGER','#d02a3a']
  ].map(a=>fModern(...a))},
  {name:'채팅 소형',items:[
    ['VIP','#3a9a3a'],['VIP+','#4a5ad0'],['PRO','#3aa83a'],['MVP','#2a98b8'],['MVP+','#2a78c8'],['ELITE','#b8782a'],['LEGEND','#c8a020'],['HELPER','#2a6ad0'],
    ['MOD','#1f8a2a'],['ADMIN','#c82a2a'],['OWNER','#a81a1a'],['BUILDER','#2a9a9a'],['DEV','#8a3ad0'],['YT','#d02020'],['STAFF','#d06a20'],['MEMBER','#5a5a5a']
  ].map(a=>fChat(...a))},
  {name:'아이템·희귀도',items:[
    ...['ACCESSORY','AMMO','ARMOR','ARTIFACT','BLUEPRINT','BOSS','CHEST','CONSUMABLE','CRAFTING','CURRENCY','DECORATION','EQUIPMENT',
       'FURNITURE','KEY','LOOT','MAGIC','PET','RELIC','RESOURCE','RUNE','SPELL','TOOL','TRINKET','WEAPON'].map(t=>fItem(t,'#9a9a9a','#f0f0f0')),
    ...[['COMMON','#9a9a9a'],['UNCOMMON','#3ab84a'],['RARE','#3a7ae0'],['EPIC','#a04ae0'],['LEGENDARY','#e8a020'],['MYTHIC','#e03a6a'],['DIVINE','#4ab8e8'],
        ['ANCIENT','#c8302a'],['ARCANE','#9a5ad8'],['BLESSED','#b8c83a'],['CELESTIAL','#8ad83a'],['CORRUPTED','#a81a3a'],['CURSED','#7a5a3a'],['ETHEREAL','#3a8ad8'],
        ['EXOTIC','#e8782a'],['FABLED','#d82a3a'],['FORBIDDEN','#8a3ab8'],['GODLIKE','#e04aa8'],['HEROIC','#5a6ae0'],['UNIQUE','#2ab84a'],['SECRET','#3aa8a8'],
        ['ULTIMATE','#a8a83a'],['TRASH','#5a5a5a'],
        ['S','#e03a3a'],['A','#3ab84a'],['B','#a04ae0'],['C','#3a7ae0'],['D','#2a8a3a'],['E','#8a8a8a'],['F','#4a4a4a']].map(a=>fItem(...a))
  ]}
];

// 9. 미스틱 돌판: 회녹색 돌판 + 오른쪽 홈 + 대각 모서리 장식 + 붙은 아이콘 칩, 랭크는 글자색으로
const fMystic=(t,c,icon)=>({text:{value:t,bold:true},bg:{colors:['#4a5a44','#3a4836'],dir:'v'},bgPattern:{type:'noise',size:1,color:'#5d6d54',alpha:40},
  bgOutline:{asym:true,l:0,r:0,t:1,b:1,color:'#cfc4a8'},bgEmboss:{size:0},shape:{r:0,notch:3,notchSide:'right'},pad:{x:3,y:3,minW:52},
  bgCorners:{size:4,color:'#d050f0',alpha:0,mode:'diag'},bgShadow:{pos:'br',dist:1,color:'#000000',alpha:35},
  textColor:{colors:[shade(c,0.35),c],dir:'v',hard:true},textOutline:{size:1,color:'#2a2018'},icons:{...ico(icon,c,true),chipGap:0,twoTone:true}});
// 10. 나무판 + 슬레이트 칩: 나뭇결 판, 아이콘은 어두운 칩에
const fWood=(t,c,icon)=>({text:{value:t},bg:{colors:['#8f5d33','#6b4224'],dir:'v'},bgPattern:{type:'grain',size:2,color:'#4a2c14',alpha:45},bgOutline:{size:1,color:'#24140a'},
  bgEmboss:{size:1,strength:20},shape:{r:0},pad:{x:3,y:2},textColor:{colors:[c]},textOutline:{size:1,color:'#24140a'},
  icons:{...ico(icon,c,true),chipGap:2,chipBgOn:true,chipBgColor:'#2a3040'}});
// 11. 장식 기호 반투명: *Name* 형태, 반투명 판 + 밝은 테두리, 아이콘 칩은 오른쪽
const fDeco=(t,c,icon)=>({text:{value:'*'+t+'*'},bg:{colors:[c],alpha:35},bgOutline:{size:1,color:shade(c,0.35)},bgEmboss:{size:0},shape:{r:1},pad:{x:2,y:1},
  textColor:{colors:[shade(c,0.55)]},textShadow:{pos:'below',auto:false,color:shade(c,-0.5),alpha:0},icons:{list:[{id:'bi:'+icon,side:'right'}],colorMode:'custom',color:shade(c,0.55),chip:true,chipGap:2}});
// 12. 스프라이트 태그: 단색 + 어두운 테두리 + 오른쪽 아래 밝은 그림자
const fSprite=(t,c)=>({text:{value:t,font:'b55'},bg:{colors:[c,shade(c,-0.38)],dir:'h'},bgOutline:{size:1,color:shade(c,-0.8),square:true},bgEmboss:{size:0},shape:{r:0},
  pad:{asym:true,l:3,r:3,t:2,b:4},bgBand:{size:2,pos:'bottom',color:shade(c,-0.45),alpha:0},bgLine:{size:1,offset:2,from:'bottom',color:shade(c,0.45),alpha:0},
  textColor:{colors:['#ffffff']},textShadow:{pos:'br',auto:false,color:shade(c,-0.85),alpha:0}});
// 13. 랭킹 명판: 금속 재질 × 1·2·3위 (성벽+날개 / 날개 / 기본)
const fPlate=(t,c,place)=>({text:{value:t},bg:{colors:[shade(c,0.45),shade(c,0.25)],dir:'v'},bgOutline:{size:1,color:shade(c,-0.6)},bgInner:{size:1,inset:0,color:shade(c,-0.15),alpha:0},
  bgEmboss:{size:0},shape:{r:0,topper:place===1?'battlement':'none',wings:place<=2?2:0},pad:{x:5,y:3,minW:44},textColor:{colors:[shade(c,-0.65)]}});
// 14. 등급 엠블럼: 팔각 보석 + 로마 숫자 (티어 × 단계)
const fEmblem=(t,c)=>({text:{value:t},bg:{colors:[shade(c,0.3),c],dir:'v',hard:true},bgOutline:{size:1,color:shade(c,-0.7)},bgInner:{size:1,inset:1,color:shade(c,0.55),alpha:45},
  bgEmboss:{size:0},shape:{r:3,chamfer:true},pad:{x:3,y:3,minW:15},textColor:{colors:[shade(c,-0.65)]}});

// 15. 배경 없음: 글자만 (마크 그림자 / 외곽선 / 그라데이션 / 대괄호 접두사)
const fNoBg=(t,cols,o)=>Object.assign({text:{value:t},bg:{enabled:false},textColor:{colors:cols,dir:'v',hard:cols.length===2},textShadow:{pos:'br',auto:true}},o||{});
const OL=c=>({textOutline:{size:1,color:c},textShadow:{pos:'none'}});
PRESET_GROUPS.push({name:'배경 없음',items:[
  fNoBg('OWNER',['#ff5555']),fNoBg('ADMIN',['#ff5555','#d83a3a']),fNoBg('MOD',['#55ff55','#2fc82f']),fNoBg('HELPER',['#55ffff','#2fc8d8']),
  fNoBg('BUILDER',['#ffaa00','#e07a00']),fNoBg('DEV',['#5555ff','#3a3ad8']),fNoBg('VIP',['#55ff55']),fNoBg('MVP',['#55ffff']),
  fNoBg('[VIP+]',['#55ff55'],{text:{value:'[VIP+]',symOn:true,symColor:'#ffaa00'}}),fNoBg('[MVP+]',['#55ffff'],{text:{value:'[MVP+]',symOn:true,symColor:'#ff5555'}}),
  fNoBg('[MVP++]',['#ffaa00'],{text:{value:'[MVP++]',symOn:true,symColor:'#ff5555'}}),fNoBg('[STAFF]',['#ff55ff'],{text:{value:'[STAFF]',symOn:true,symColor:'#aaaaaa'}}),
  fNoBg('LEGEND',['#fff3a0','#ffb02e','#ff6a1f'],{textColor:{colors:['#fff3a0','#ffb02e','#ff6a1f'],dir:'v'},...OL('#3d1a00')}),
  fNoBg('ELITE',['#f2c6ff','#b76bff'],OL('#2a0d5c')),fNoBg('DIAMOND',['#e8fffd','#5ce8e0'],OL('#0b3a4a')),fNoBg('EMERALD',['#b5ffe1','#2ed3a0'],OL('#063d2c')),
  fNoBg('RUBY',['#ffb3b8','#e5243b'],OL('#3d0008')),fNoBg('GOLD',['#fff6c2','#ffd84a'],OL('#4a3000')),
  fNoBg('RAINBOW',['#ff5555','#ffaa00','#ffff55','#55ff55','#55ffff','#5555ff','#ff55ff'],{textColor:{colors:['#ff5555','#ffaa00','#ffff55','#55ff55','#55ffff','#5555ff','#ff55ff'],dir:'c',hard:true}}),
  fNoBg('NEON',['#e9ffff','#7ff8ff'],{textOutline:{size:1,color:'#00a8ff'},textShadow:{pos:'none'}}),
  fNoBg('GHOST',['#ffffff'],{textColor:{colors:['#ffffff'],alpha:40},textShadow:{pos:'none'}}),
  fNoBg('SHADOW',['#ffffff'],{textShadow:{pos:'br',dist:2,auto:false,color:'#000000',alpha:40}}),
  fNoBg('Owner',['#f6f6f6','#d2d2da'],{text:{value:'Owner',smallcaps:true},textShadow:{pos:'below',auto:false,color:'#7a0010',alpha:0}}),
  fNoBg('WAVE',['#ffffff','#a8e6ff'],{text:{value:'WAVE',wave:1},textColor:{colors:['#ffffff','#a8e6ff'],dir:'c'},...OL('#0b2a66')})
]});
// 16. 채팅 줄 표시 (BE): 11x9, 왼쪽 밝은 2px 띠, 오른쪽 모서리만 1px 깎음, 연한 아이콘 + 아래 1px 그림자
// 17. 채팅 알약 태그: 5x5 글자, 위 밝은/아래 어두운 2단, 깎인 모서리 옆 음영, 글자 아래 그림자 (11px 줄 높이에 맞춘 9px)
function fPill(t,c){const d=c==='#92859a'?'#71647b':shade(c,-0.22),sh=c==='#92859a'?'#504b5d':shade(c,-0.48);
  return{text:{value:t,font:'b55'},bg:{colors:[c,c,c,c,c,d,d,d,d],dir:'v',hard:true},bgOutline:{size:0},bgEmboss:{size:0},shape:{asym:false,r:1,chamfer:true},
    bgCornerShade:{on:true,top:d,bottom:sh},pad:{asym:true,l:3,r:3,t:2,b:1},textColor:{colors:['#fcfcfc']},textShadow:{pos:'below',dist:1,auto:false,color:sh,alpha:0}}}
function fMarker(name,body,strip,icon,iconCol,shadow){
  const rows=BI[icon][1].split('|'),w=rows[0].length,hh=rows.length,pl=4+Math.floor((5-w)/2),pr=11-pl-w,pb=Math.max(0,9-2-(hh+1));
  return{title:name,text:{value:''},bg:{colors:[body]},bgOutline:{size:0},bgEmboss:{size:0},shape:{asym:true,tl:0,bl:0,tr:1,br:1,r:0,chamfer:true},
    bgStrip:{size:2,color:strip,alpha:0},pad:{asym:true,l:pl,r:pr,t:2,b:pb,minW:0},textColor:{colors:['#ffffff']},
    textShadow:{pos:'below',dist:1,auto:false,color:shadow||shade(body,-0.5),alpha:0},
    icons:{list:[{id:'bi:'+icon,side:'left'}],colorMode:'custom',color:iconCol||mixHex(body,'#ffffff',0.68),chip:false,gap:0}};
}
const MK_COL={green:['#4f824a','#84ce61','#c1dbc1','#284f25'],red:['#a63434','#e65151','#dfc1c1','#512626'],orange:['#ae650f','#be905c','#dfc19c','#77470f'],
  gray:['#676767','#bebebe','#e7e7e7','#434343'],blue:['#3a62a8','#6a9ae8'],purple:['#7a44a8','#b07ae0'],yellow:['#a8861a','#e0c04a'],cyan:['#2a8a98','#5ad0e0'],pink:['#a83a78','#e06ab0'],dark:['#2e2e34','#6a6a74']};
const mk=(name,col,icon)=>{const c=MK_COL[col];return fMarker(name,c[0],c[1],icon,c[2],c[3])};
PRESET_GROUPS.push({name:'채팅 BE',items:[
  ...['bubble_mega','bubble_qa',...Object.keys(SPRITES).filter(k=>!['bubble_mega','bubble_qa','bubble_blank'].includes(k)),'bubble_blank']
    .map(k=>({title:SPRITES[k][0],text:{value:''},bg:{enabled:false},textShadow:{pos:'none'},icons:{list:[{id:'sp:'+k,side:'left'}],gap:0,chip:false}})),
  ...[['PLAYER','#92859a'],['VIP','#5aa85a'],['VIP+','#4a9a8a'],['MVP','#4a98c0'],['MVP+','#3a78c0'],['ELITE','#c8962a'],['LEGEND','#c86a2a'],['HELPER','#3aa0a0'],
      ['MOD','#4a6ac0'],['ADMIN','#c84a4a'],['OWNER','#a83040'],['BUILDER','#b8782a'],['DEV','#8a5ac0'],['STAFF','#c05a9a'],['YOUTUBE','#c83a3a'],['GUEST','#7a7a84']]
    .map(([t,c])=>fPill(t,c)),
  mk('접속','green','m_bars'),mk('경고','red','m_alert'),mk('공지','orange','m_speaker'),mk('채팅','gray','m_bubble'),
  mk('완료','green','m_check'),mk('오류','red','m_x'),mk('이벤트','yellow','m_star'),mk('후원','pink','m_heart'),mk('입장','green','m_plus'),
  mk('정보','blue','m_info'),mk('운영자','yellow','m_crown'),mk('알림','orange','m_bell'),mk('잠금','dark','m_lock'),mk('경제','yellow','m_coin'),
  mk('전투','red','m_sword'),mk('퀘스트','purple','m_quest'),mk('귓속말','purple','m_mail'),mk('팀','blue','m_user'),mk('상점','cyan','m_bag'),
  mk('깃발','orange','m_flag'),mk('이동','cyan','m_arrow'),mk('시스템','gray','m_info'),mk('확성기','red','m_speaker'),mk('파티','cyan','m_bubble')
]});
PRESET_GROUPS[0].items.push(...[
  ['ADMIN','#d0782a','gear'],['OWNER','#c81a2a','crown'],['HELPER','#5ab82a','plus'],['DEV','#1f6a7a','gear'],['TEAM','#8a3ad0','star'],['MOD','#1fa8b0','shield'],
  ['STAFF','#2a6ad8','shield'],['BUILDER','#d0782a','hammer'],['NPC','#e0a020','chat'],['PATRON','#a050e0','heart'],['CREATOR','#d02a8a','play'],['BOOSTER','#e050c0','bolt'],
  ['PLAYER','#6b6b6b','user'],['VIP','#3a9ae0','sparkle'],['PREMIUM','#2aa84a','gem'],['PRO','#d02a2a','star'],['MVP','#a02ab0','crown'],['ELITE','#d0601a','sword'],
  ['COMMON','#8a8a8a','dot'],['UNCOMMON','#3ab83a','dot'],['RARE','#3a4ae0','gem'],['EPIC','#9a2ad0','gem'],['LEGENDARY','#e0901a','star'],['MYTHIC','#c81a3a','fire'],
  ['LIMITED','#1fa8a8','clock'],['VISITOR','#7a7a7a','eye'],['RESIDENT','#3aa84a','house'],['TRUSTED','#1f6a8a','check']
].map(a=>fSlab(...a)));
PRESET_GROUPS.push(
  {name:'미스틱 돌판',items:[
    ['MEMBER','#e8e8e8','pick'],['VIP','#3ad0c0','sword'],['VIP+','#3ad070','gem'],['PRO','#3ad0a0','shield'],['MVP','#f0c030','trophy'],['ELITE','#c050f0','star'],
    ['HERO','#9a5af0','sword'],['SUPPORTER','#90d030','heart'],['LEGENDARY','#f09a2a','sword'],['NITRO','#f05ac8','gem'],['YOUTUBE','#f03a3a','play'],['TIKTOK','#3ae0e0','note'],
    ['TWITCH','#a060f0','camera'],['STAFF','#f070c0','user'],['DEVELOPER','#3a9af0','wrench'],['BUILDER','#f0702a','hammer'],['ARTIST','#3ad060','brush'],['MOD','#3a7af0','wrench'],
    ['ADMIN','#f04a5a','shield'],['OWNER','#f02a3a','crown']
  ].map(a=>fMystic(...a))},
  {name:'나무판 칩',items:[
    ['MUTED','#c8c8c8','ban'],['PLAYER','#d8d8d8','dot'],['VIP','#4a8af0','sparkle'],['PRO','#3ad04a','star'],['MVP','#f0c030','crown'],['ELITE','#b04af0','star'],
    ['HELPER','#3ac8f0','plus'],['NITRO','#f04ae0','gem'],['BUILDER','#3ad070','hammer'],['SUPPORTER','#3ad0a0','heart'],['STAFF','#f05a3a','user'],['MOD','#f0702a','shield'],
    ['DEVELOPER','#3a8af0','wrench'],['ADMIN','#f03a4a','sword'],['OWNER','#f02a2a','crown'],['TIKTOK','#3ae8f0','note'],['YOUTUBE','#f03030','play'],['TWITCH','#b060f0','camera']
  ].map(a=>fWood(...a))},
  {name:'장식 기호',items:[
    ['Admin','#e04848','crown'],['Owner','#e02a3a','crown'],['Manager','#d0602a','gear'],['Mod','#2a8ae0','shield'],['Helper','#2ab84a','plus'],['Dev','#2ab8c8','wrench'],
    ['Builder','#e0882a','hammer'],['Team','#2a6ad8','star'],['Support','#2ab8a0','heart'],['Elite','#e0882a','star'],['Mvp','#2ab8c8','sparkle'],['Vip','#a0c82a','sparkle'],
    ['Player','#8a8a9a','user'],['Media','#c84ae0','camera'],['Twitch','#9a4ae0','camera'],['Youtube','#e02a2a','play']
  ].map(a=>fDeco(...a))},
  {name:'스프라이트 태그',items:[
    ['OWNER','#d81a2a'],['SR.ADMIN','#c8106a'],['ADMIN','#d81aa8'],['STAFF','#7a1ad8'],['MANAGER','#3a2ad8'],['SR.DEV','#1a5ad8'],['DEV','#1a8ad0'],['SR.MOD','#1aa880'],
    ['MOD','#1aa83a'],['PARTNER','#8ab81a'],['DONATOR','#c8b81a'],['HELPER','#e0781a'],['ARTIST','#a01ad8'],['BUILDER','#3ab81a'],['PRO','#1a7ab8'],['NITRO','#e050b0'],
    ['PLAYER','#4a6a8a'],['MVP+','#2ab8c8'],['MVP','#1ab86a'],['VIP+','#e0a01a'],['VIP','#e0501a'],['MEMBER','#4a6a7a'],['VISITOR','#6a6a5a'],['MUTED','#5a4a4a'],
    ['KING','#e0801a'],['QUEEN','#e05a7a'],['LORD','#d06a9a'],['KNIGHT','#6a8a8a'],['WARRIOR','#b83a1a'],['SOLDIER','#2a7ab0'],['PEASANT','#a8a82a'],
    ['YOUTUBE','#d81a1a'],['TWITCH','#8a3ae0'],['TIKTOK','#1ab8c8'],['LEGEND','#c86a8a'],['HERO','#7a1a3a'],['CHAMPION','#8a5a4a'],['ELITE','#c84a2a'],
    ['MYTHIC','#b82a2a'],['LEGENDARY','#d8802a'],['EPIC','#c84ac8'],['RARE','#2a8ad8'],['UNCOMMON','#7ab82a'],['COMMON','#4a6a7a'],
    ['NETHERITE','#3a2a2a'],['DIAMOND','#2ab8c8'],['EMERALD','#1ab86a'],['GOLD','#e0a81a'],['COPPER','#d8602a'],['IRON','#8a8a7a']
  ].map(a=>fSprite(...a))},
  {name:'랭킹 명판',items:[['GOLD','#e0a020'],['NETHERITE','#4a4448'],['DIAMOND','#4ac0d8'],['COPPER','#c86a3a'],['IRON','#a8b0c0'],['SAND','#b8a070']]
    .flatMap(([n,c])=>[['1ST',1],['2ND',2],['3RD',3]].map(([t,pl])=>fPlate(t,c,pl)))},
  {name:'등급 엠블럼',items:[['#c0703a'],['#a8b0b8'],['#f0b030'],['#3a6ad8'],['#3ac060'],['#2ab8b0'],['#9a4ae0'],['#e0304a']]
    .flatMap(([c])=>['I','II','III','IV','V'].map(t=>fEmblem(t,c)))}
);
function applyPreset(pr,base){
  const keep={font:base.text.font,fallback:base.text.fallback,list:base.icons.list,out:base.out,bold:base.text.bold};
  const s=merge(defaults(),pr);
  for(const k of ['text','textColor','textShadow','textOutline','pad','bg','bgShadow','bgOutline','bgEmboss','shape','bgInner','bgPattern','bgGloss','bgGlow','bgSplit','bgBand','bgRivets','bgCaps','bgCorners','bgLine','bgStrip','bgCornerShade']) if(pr[k]) s[k]=merge(defaults()[k],pr[k]);
  const kf=FONTS.get(keep.font);s.text.font=(pr.text&&pr.text.font&&(!kf||kf.kind==='builtin'))?pr.text.font:keep.font;s.text.fallback=keep.fallback;s.out=keep.out;
  s.icons.list=[...keep.list.filter(it=>!it.id.startsWith('bi:')&&!it.id.startsWith('sp:')),...((pr.icons&&pr.icons.list)||[]).map(it=>({...it}))];
  return s;
}
function renderPresets(){
  const base=[...PRESET_GROUPS,{name:'기존 프리셋',items:PRESETS}];
  const groups=[{name:'전체',items:base.flatMap(g=>g.items)},...base],gi=clamp(S.out.presetGroup|0,0,groups.length-1);
  const tabs=document.getElementById('pgroups');tabs.replaceChildren(...groups.map((g,i)=>h('button',{type:'button',class:i===gi?'on':'',onclick:()=>{S.out.presetGroup=i;renderPresets();update()}},`${g.name} ${g.items.length}`)));
  const box=document.getElementById('presets');box.replaceChildren();
  const saved=S;
  for(const pr of groups[gi].items){
    S=applyPreset(pr,saved);S.text.font=(pr.text&&pr.text.font)||'b57';S.icons.list=S.icons.list.filter(it=>it.id.startsWith('bi:')||it.id.startsWith('sp:'));
    const L=buildAll();S=saved;
    const c=layerCanvas(L,2);
    box.append(h('button',{type:'button',title:pr.title||pr.text.value,onclick:()=>onPresetPick(pr)},c));
  }
}

/* 글자 스타일: 글자 색·그림자·외곽선만 바꿈 */
function TS(n,grad,shadow,outline,extra){const g=byGrad(grad)||{c:[grad],d:'v',hard:false};
  return Object.assign({n,textColor:{colors:g.c,dir:g.d,hard:g.hard},textShadow:shadow||{},textOutline:outline||{}},extra||{})}
const SH_MC={pos:'br',auto:true},SH_BELOW={pos:'below',auto:true};
const TSTYLES=[
  TS('기본 흰색','#ffffff'),
  TS('마크 그림자','#ffffff',SH_MC),
  TS('검은 외곽선','#ffffff',null,{size:1,color:'#000000'}),
  TS('외곽선+그림자','#ffffff',{pos:'below',auto:false,color:'#000000',alpha:50},{size:1,color:'#1a1a1a'}),
  TS('황금 광택','황금',SH_BELOW,{size:1,color:'#4a3000'}),
  TS('은빛','은빛',null,{size:1,color:'#2b2f36'}),
  TS('동메달','동메달',null,{size:1,color:'#3a1a06'}),
  TS('불꽃','불꽃',null,{size:1,color:'#4a0a00'}),
  TS('용암','용암',SH_BELOW,{size:1,color:'#2a0000'}),
  TS('얼음','얼음',null,{size:1,color:'#0d3a66'}),
  TS('독','독',SH_BELOW,{size:1,color:'#1d3d0a'}),
  TS('자수정','자수정',null,{size:1,color:'#2a0d5c'}),
  TS('벚꽃','벚꽃',null,{size:1,color:'#8a2a55'}),
  TS('네온','#e9ffff',null,{size:1,color:'#00c8ff'}),
  TS('네온 핑크','네온 핑크',null,{size:1,color:'#5c0a4d'}),
  TS('사이버','사이버',null,{size:1,color:'#10002b'}),
  TS('오로라','오로라',null,{size:1,color:'#0f1d3d'}),
  TS('무지개','무지개',null,{size:1,color:'#000000'}),
  TS('파스텔','파스텔',null,{size:1,color:'#6b5b7a'}),
  TS('긴 그림자','#ffffff',{pos:'br',dist:2,auto:false,color:'#000000',alpha:45}),
  TS('레트로','#ffcc00',{pos:'br',auto:false,color:'#d1426b'}),
  TS('스티커','#ff5c8a',{pos:'br',auto:false,color:'#000000',alpha:55},{size:1,color:'#ffffff',wrap:false}),
  TS('입체 블록','#ffe066',{pos:'below',dist:2,auto:true},{size:1,color:'#000000',wrap:true}),
  TS('굵은 테두리','#ffffff',null,{size:2,color:'#000000'}),
  TS('어두운 글자','#1c1c1c',null,{size:1,color:'#ffffff',alpha:30}),
  TS('줄무늬 금','줄무늬 금',null,{size:1,color:'#3d2a00'}),
  TS('글자마다 무지개','무지개 글자마다',null,{size:1,color:'#000000'}),
  TS('글자마다 무지개 그림자','무지개 글자마다',SH_MC),
  Object.assign(TS('글자마다 파스텔','파스텔',null,{size:1,color:'#5a4a6a'}),{textColor:{colors:byGrad('파스텔').c,dir:'c',hard:true}}),
  Object.assign(TS('글자마다 금은','#ffffff',null,{size:1,color:'#1a1a1a'}),{textColor:{colors:['#ffd84a','#e0e6ee'],dir:'c',hard:true}}),
  Object.assign(TS('글자마다 불꽃','#ffffff',null,{size:1,color:'#2a0000'}),{textColor:{colors:byGrad('불꽃').c,dir:'c'}}),
  TS('PICO 불꽃','PICO 불꽃',null,{size:1,color:'#1d2b53'}),
  TS('색조이동 파랑','색조이동 파랑',null,{size:1,color:'#1a1040'}),
  TS('계단 금','계단 금',SH_BELOW,{size:1,color:'#3d2a00'}),
  TS('E32 금속','E32 금속',null,{size:1,color:'#181425'}),
  TS('희귀 보라','희귀 보라',SH_MC),
  TS('흐린 유리','유리',null,{size:1,color:'#3a7aa8',alpha:40}),
  TS('그림자만','#ffffff',{pos:'br',dist:1,auto:false,color:'#000000',alpha:0}),
  TS('마크 금색 §6','#ffaa00',SH_MC),TS('마크 하늘 §b','#55ffff',SH_MC),TS('마크 연두 §a','#55ff55',SH_MC),TS('마크 빨강 §c','#ff5555',SH_MC),
  TS('마크 분홍 §d','#ff55ff',SH_MC),TS('마크 노랑 §e','#ffff55',SH_MC),TS('마크 회색 §7','#aaaaaa',SH_MC),TS('마크 파랑 §9','#5555ff',SH_MC),
  TS('경험치','경험치',SH_BELOW,{size:1,color:'#1f3a05'}),TS('할로윈','할로윈',null,{size:1,color:'#1a0a2a'}),TS('크리스마스','크리스마스',null,{size:1,color:'#ffffff'}),
  TS('여름','여름',null,{size:1,color:'#0a3a6b'})
];
function applyTextStyle(ts){
  const d=defaults();
  for(const k of ['textColor','textShadow','textOutline'])S[k]=merge(d[k],ts[k]);
}
function renderTextStyles(){
  const box=document.getElementById('tstyles');box.replaceChildren();
  const saved=S;
  for(const ts of TSTYLES){
    S=merge(defaults(),{text:{value:'Abc',font:'b57'},bg:{enabled:false}});
    applyTextStyle(ts);const L=buildAll();S=saved;
    box.append(h('button',{type:'button',title:ts.n,onclick:()=>onTextStylePick(ts)},layerCanvas(L,2)));
  }
}
