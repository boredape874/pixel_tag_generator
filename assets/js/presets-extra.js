// 추가 스타일 41종 × 대표 랭크 20개 (성격별 탭 7개)
'use strict';
const lum=hx=>{const[r,g,b]=hex2rgb(hx);return(0.299*r+0.587*g+0.114*b)/255};
const inkOn=c=>lum(c)>0.62?shade(c,-0.75):'#ffffff';
function hueShift(hx,deg){
  const[r,g,b]=hex2rgb(hx).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;
  let hh=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));hh=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60}
  hh=((hh+deg)%360+360)%360;const C=(1-Math.abs(2*l-1))*s,X2=C*(1-Math.abs((hh/60)%2-1)),m=l-C/2;
  const[a,b2,c2]=hh<60?[C,X2,0]:hh<120?[X2,C,0]:hh<180?[0,C,X2]:hh<240?[0,X2,C]:hh<300?[X2,0,C]:[C,0,X2];
  return'#'+[a,b2,c2].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('');
}
const CORE_RANKS=[['OWNER','#d8283a','crown'],['ADMIN','#e04848','shield'],['MANAGER','#e0782a','gear'],['MOD','#3a7ae0','sword'],['HELPER','#2ab84a','plus'],
  ['BUILDER','#e0a02a','hammer'],['DEV','#2ab8c8','wrench'],['STAFF','#c84ab8','user'],['VIP','#3ab84a','sparkle'],['VIP+','#2fa88a','sparkle'],
  ['MVP','#3ab8d8','star'],['MVP+','#2a78c8','star'],['ELITE','#8a4ae0','gem'],['LEGEND','#e8782a','fire'],['HERO','#c83ad0','sword'],
  ['GOD','#f0c030','bolt'],['YOUTUBE','#e02020','play'],['TWITCH','#9146ff','camera'],['MEMBER','#7a8090','user'],['GUEST','#8a8a8a','eye']];
const NO_ICON={icons:{list:[]}};
const dk=c=>shade(c,-0.6), lt=(c,t)=>mixHex(c,'#ffffff',t);

const STYLE_TABS=[
 ['네온·발광',[
  ['네온',(t,c)=>({text:{value:t},bg:{colors:['#0e1016']},bgOutline:{size:1,color:shade(c,0.2)},bgGlow:{size:2,color:c,alpha:45},bgEmboss:{size:0},shape:{r:2},pad:{x:3,y:2},
    textColor:{colors:[lt(c,0.55)]},textOutline:{size:1,color:shade(c,-0.35)}})],
  ['네온 튜브',(t,c)=>({text:{value:t},bg:{colors:[c],alpha:100},bgOutline:{size:1,color:lt(c,0.3)},bgGlow:{size:2,color:c,alpha:40},bgEmboss:{size:0},shape:{r:3},pad:{x:3,y:2},
    textColor:{colors:[lt(c,0.45)]},textShadow:{pos:'none'}})],
  ['발광 알약',(t,c)=>({text:{value:t},bg:{colors:[shade(c,0.15),c],dir:'v'},bgOutline:{size:1,color:shade(c,-0.5)},bgGlow:{size:2,color:c,alpha:50},bgGloss:{strength:20},bgEmboss:{size:0},shape:{r:20},pad:{x:4,y:2},
    textColor:{colors:['#ffffff']},textShadow:{pos:'below',auto:false,color:shade(c,-0.55),alpha:0}})],
  ['은하',(t,c)=>({text:{value:t},bg:{colors:['#1a1030','#0a0818'],dir:'v'},bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:30},bgOutline:{size:1,color:'#05040a'},bgEmboss:{size:0},shape:{r:2},
    textColor:{colors:[lt(c,0.45),c],dir:'v'},textOutline:{size:1,color:'#05040a'}})],
  ['금테 프리미엄',(t,c)=>({text:{value:t},bg:{colors:['#1d1810','#100c06'],dir:'v'},bgOutline:{size:1,color:'#e8b030'},bgCorners:{size:2,color:'#fff2a0',alpha:0},bgEmboss:{size:0},shape:{r:0},pad:{x:4,y:2},
    textColor:{colors:[lt(c,0.45),c],dir:'v',hard:true},textOutline:{size:1,color:'#000000'}})]
 ]],
 ['버튼·입체',[
  ['마크 버튼',(t,c)=>({text:{value:t},bg:{colors:[mixHex('#8b8b8b',c,0.35)]},bgOutline:{size:1,color:'#000000',square:true},bgEmboss:{size:1,strength:35,sides:true},shape:{r:0},pad:{x:4,y:2},
    textColor:{colors:['#ffffff']},textShadow:{pos:'br',auto:true}})],
  ['눌린 버튼',(t,c)=>({text:{value:t},bg:{colors:[mixHex('#6b6b6b',c,0.35)]},bgOutline:{size:1,color:'#000000',square:true},bgEmboss:{size:1,strength:35,sides:true,invert:true},shape:{r:0},pad:{x:4,y:2},
    textColor:{colors:['#e8e8c0']},textShadow:{pos:'br',auto:true}})],
  ['3D 블록',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:dk(c)},bgShadow:{pos:'br',dist:2,color:shade(c,-0.7),alpha:0},bgEmboss:{size:0},shape:{r:0},
    textColor:{colors:[inkOn(c)]},textShadow:{pos:'below',auto:false,color:shade(c,-0.45),alpha:0}})],
  ['베벨',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:'#000000',square:true},bgEmboss:{size:2,strength:30,sides:true},shape:{r:0},pad:{x:4,y:3},
    textColor:{colors:[inkOn(c)]},textShadow:{pos:'br',auto:true}})],
  ['젤리',(t,c)=>({text:{value:t},bg:{colors:[shade(c,0.25),c],dir:'v'},bgOutline:{size:1,color:shade(c,-0.45)},bgGloss:{strength:35},bgEmboss:{size:0},shape:{r:20},pad:{x:4,y:2},
    textColor:{colors:['#ffffff']},textShadow:{pos:'below',auto:false,color:shade(c,-0.5),alpha:0}})],
  ['스티커',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:2,color:'#ffffff'},bgShadow:{pos:'br',dist:1,color:'#000000',alpha:55},bgEmboss:{size:0},shape:{r:2},
    textColor:{colors:[inkOn(c)]}})]
 ]],
 ['테두리·라인',[
  ['속 빈 테두리',(t,c)=>({text:{value:t},bg:{colors:[c],alpha:100},bgOutline:{size:1,color:c},bgEmboss:{size:0},shape:{r:1},textColor:{colors:[c]},textShadow:{pos:'none'}})],
  ['이중 테두리',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:dk(c)},bgInner:{size:1,inset:1,color:lt(c,0.45),alpha:0},bgEmboss:{size:0},shape:{r:0},pad:{x:4,y:3},
    textColor:{colors:[inkOn(c)]},textShadow:{pos:'below',auto:false,color:shade(c,-0.5),alpha:0}})],
  ['대괄호',(t,c)=>({text:{value:t},bg:{colors:[c],alpha:100},bgOutline:{asym:true,l:1,r:1,t:0,b:0,color:c},bgEmboss:{size:0},shape:{r:0},pad:{x:2,y:1},
    textColor:{colors:[c]},textShadow:{pos:'br',auto:true}})],
  ['밑줄',(t,c)=>({text:{value:t},bg:{colors:[c],alpha:100},bgOutline:{size:0},bgBand:{size:1,pos:'bottom',color:c,alpha:0},bgEmboss:{size:0},shape:{r:0},pad:{x:1,y:1},
    textColor:{colors:[lt(c,0.25)]},textShadow:{pos:'br',auto:true}})],
  ['알약 테두리',(t,c)=>({text:{value:t},bg:{colors:[c],alpha:85},bgOutline:{size:1,color:c},bgEmboss:{size:0},shape:{r:20},pad:{x:4,y:2},textColor:{colors:[c]},textShadow:{pos:'none'}})],
  ['헤더 바',(t,c)=>({text:{value:t},bg:{colors:['#22252d']},bgOutline:{size:1,color:'#0e1014'},bgBand:{size:2,pos:'top',color:c,alpha:0},bgEmboss:{size:0},shape:{r:0},
    pad:{asym:true,l:3,r:3,t:3,b:2},textColor:{colors:[lt(c,0.4)]}})]
 ]],
 ['패턴·질감',[
  ['마름모',(t,c)=>({text:{value:t},bg:{colors:[c]},bgPattern:{type:'diamonds',size:2,color:shade(c,0.3),alpha:55},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},
    textColor:{colors:['#ffffff']},textOutline:{size:1,color:dk(c)}})],
  ['사선 줄무늬',(t,c)=>({text:{value:t},bg:{colors:[c]},bgPattern:{type:'stripes',size:2,color:shade(c,-0.25),alpha:45},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:1},
    textColor:{colors:['#ffffff']},textOutline:{size:1,color:dk(c)}})],
  ['체크무늬',(t,c)=>({text:{value:t},bg:{colors:[c]},bgPattern:{type:'checker',size:2,color:shade(c,0.2),alpha:55},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:0},
    textColor:{colors:['#ffffff']},textOutline:{size:1,color:dk(c)}})],
  ['이끼 돌',(t,c)=>({text:{value:t},bg:{colors:['#6e7268','#4c5048'],dir:'v'},bgPattern:{type:'noise',size:2,color:'#4a6a3a',alpha:45},bgOutline:{size:1,color:'#1a1c18'},
    bgEmboss:{size:1,strength:18},shape:{r:0},textColor:{colors:[lt(c,0.3)]},textOutline:{size:1,color:'#1a1c18'}})],
  ['얼음 결정',(t,c)=>({text:{value:t},bg:{colors:[mixHex(c,'#effcff',0.75),mixHex(c,'#8ad8f0',0.55)],dir:'v'},bgPattern:{type:'sparkle',size:3,color:'#ffffff',alpha:15},
    bgOutline:{size:1,color:mixHex(c,'#0d3a66',0.6)},bgEmboss:{size:0},shape:{r:1},textColor:{colors:[shade(c,-0.5)]}})],
  ['금속판',(t,c)=>({text:{value:t},bg:{colors:[mixHex('#e2e6ec',c,0.15),mixHex('#8b9bb4',c,0.2)],dir:'v'},bgRivets:{on:true,inset:1,color:'#3a4466',alpha:0},
    bgPattern:{type:'hlines',size:1,color:'#ffffff',alpha:85},bgOutline:{size:1,color:'#262b44'},bgEmboss:{size:0},shape:{r:1},pad:{x:4,y:2},textColor:{colors:[shade(c,-0.45)]}})],
  ['테이프',(t,c)=>({text:{value:t},bg:{colors:[c],alpha:25},bgPattern:{type:'stripes',size:2,color:'#ffffff',alpha:75},bgOutline:{size:0},bgEmboss:{size:0},shape:{r:0,ends:'slant'},pad:{x:3,y:2},
    textColor:{colors:[shade(c,-0.6)]}})]
 ]],
 ['모양·배너',[
  ['리본 배너',(t,c)=>({text:{value:t},bg:{colors:[shade(c,0.1),shade(c,-0.15)],dir:'v'},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:0,ribbon:2},
    textColor:{colors:['#ffffff']},textShadow:{pos:'below',auto:false,color:shade(c,-0.55),alpha:0}})],
  ['화살표',(t,c,ic)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:1,ends:'point',endSide:'right'},
    textColor:{colors:[inkOn(c)]},icons:ico(ic,inkOn(c))})],
  ['육각 배지',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:dk(c)},bgInner:{size:1,inset:0,color:lt(c,0.35),alpha:0},bgEmboss:{size:0},shape:{r:0,ends:'point'},
    textColor:{colors:[inkOn(c)]},textShadow:{pos:'below',auto:false,color:shade(c,-0.5),alpha:0}})],
  ['깃발',(t,c)=>({text:{value:t},bg:{colors:[c]},bgStrip:{size:2,color:shade(c,-0.3),alpha:0},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:0,notch:3,notchSide:'right'},
    pad:{asym:true,l:4,r:5,t:2,b:2},textColor:{colors:[inkOn(c)]}})],
  ['말풍선',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:2,tail:'bl',tailSize:2},textColor:{colors:[inkOn(c)]}})],
  ['군 계급장',(t,c)=>({text:{value:t,bold:true},bg:{colors:[shade(c,-0.2)]},bgOutline:{size:1,color:shade(c,-0.7)},bgInner:{size:1,inset:1,color:lt(c,0.3),alpha:0},bgEmboss:{size:0},
    shape:{r:3,chamfer:true},pad:{x:4,y:3},textColor:{colors:['#ffffff']}})]
 ]],
 ['그라데이션·분할',[
  ['가로 그라데이션',(t,c)=>({text:{value:t},bg:{colors:[c,hueShift(c,40)],dir:'h'},bgOutline:{size:1,color:dk(c)},bgEmboss:{size:0},shape:{r:1},
    textColor:{colors:['#ffffff']},textShadow:{pos:'below',auto:false,color:shade(c,-0.55),alpha:0}})],
  ['사선 분할',(t,c)=>({text:{value:t},bg:{colors:[c]},bgSplit:{at:62,colors:[shade(c,-0.3)],slant:true},bgOutline:{size:1,color:shade(c,-0.65)},bgEmboss:{size:0},shape:{r:0},
    textColor:{colors:['#ffffff']},textShadow:{pos:'br',auto:false,color:dk(c),alpha:0}})],
  ['크롬 글자',(t,c)=>({text:{value:t},bg:{colors:['#14161c']},bgOutline:{size:1,color:'#000000'},bgEmboss:{size:0},shape:{r:1},
    textColor:{colors:[lt(c,0.8),mixHex(c,'#888888',0.5),lt(c,0.6),shade(c,-0.4)],dir:'v',hard:true},textOutline:{size:1,color:'#000000'}})],
  ['글자마다 2색',(t,c)=>({text:{value:t},bg:{colors:['#1a1c22']},bgOutline:{size:1,color:'#000000'},bgEmboss:{size:0},shape:{r:1},
    textColor:{colors:[c,lt(c,0.55)],dir:'c',hard:true}})],
  ['물결 파티',(t,c)=>({text:{value:t,wave:1},bg:{colors:[shade(c,-0.55)]},bgOutline:{size:1,color:shade(c,-0.8)},bgEmboss:{size:0},shape:{r:2},
    textColor:{colors:[lt(c,0.3),hueShift(c,60),hueShift(c,120)],dir:'c',hard:true},textOutline:{size:1,color:shade(c,-0.8)}})],
  ['긴 그림자 글자',(t,c)=>({text:{value:t},bg:{colors:[c]},bgOutline:{size:1,color:shade(c,-0.55)},bgEmboss:{size:0},shape:{r:0},
    textColor:{colors:['#ffffff']},textShadow:{pos:'br',dist:2,auto:false,color:shade(c,-0.55),alpha:0}})]
 ]],
 ['소프트·다크',[
  ['유리',(t,c)=>({text:{value:t},bg:{colors:[lt(c,0.45)],alpha:50},bgLine:{size:1,offset:1,from:'top',color:'#ffffff',alpha:40},bgOutline:{size:1,color:lt(c,0.6),alpha:20},
    bgGloss:{strength:20},bgEmboss:{size:0},shape:{r:2},textColor:{colors:['#ffffff']},textOutline:{size:1,color:shade(c,-0.5)}})],
  ['파스텔',(t,c)=>({text:{value:t},bg:{colors:[lt(c,0.62)]},bgOutline:{size:0},bgEmboss:{size:0},shape:{r:2},pad:{x:3,y:2},textColor:{colors:[shade(c,-0.45)]}})],
  ['파스텔 테두리',(t,c)=>({text:{value:t},bg:{colors:[lt(c,0.7)]},bgOutline:{size:1,color:lt(c,0.15)},bgEmboss:{size:0},shape:{r:2},pad:{x:3,y:2},textColor:{colors:[shade(c,-0.4)]}})],
  ['다크 색띠',(t,c)=>({text:{value:t},bg:{colors:['#1f2229']},bgStrip:{size:2,color:c,alpha:0},bgOutline:{size:1,color:'#0e1014'},bgEmboss:{size:0},shape:{r:0},
    pad:{asym:true,l:5,r:3,t:2,b:2},textColor:{colors:[lt(c,0.35)]}})],
  ['다크 점',(t,c)=>({text:{value:t},bg:{colors:['#1f2229']},bgOutline:{size:1,color:'#0e1014'},bgEmboss:{size:0},shape:{r:2},pad:{x:3,y:2},textColor:{colors:['#e6e8ed']},
    icons:{list:[{id:'bi:dot',side:'left'}],colorMode:'custom',color:c,gap:3}})]
 ]]
];
for(const [tab,styles] of STYLE_TABS){
  const items=[];
  for(const [sname,fn] of styles)for(const [t,c,ic] of CORE_RANKS){const pr=Object.assign({},NO_ICON,fn(t,c,ic));pr.title=t+' · '+sname;items.push(pr)}
  PRESET_GROUPS.push({name:tab,items});
}
