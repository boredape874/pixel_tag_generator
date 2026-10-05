// 설정 상태와 기본값
'use strict';
/* ───────── 상태 ───────── */
function defaults(){return{
  text:{value:'ADMIN',font:'b57',fallback:'',bold:false,spacing:1,lineGap:2,align:'center',crop:true,smallcaps:false,wave:0,symOn:false,symColor:'#ff5555'},
  textColor:{colors:['#ffffff'],alpha:0,dir:'v',hard:false},
  textShadow:{pos:'none',dist:1,auto:true,color:'#3f3f3f',alpha:0},
  textOutline:{size:0,color:'#000000',alpha:0,wrap:false,square:true},
  out:{scale:4,previewBg:'checker',presetGroup:0},
  pad:{asym:false,x:3,y:2,l:3,r:3,t:2,b:2,minW:0},
  bg:{enabled:true,colors:['#e5484d','#b4232a'],alpha:0,dir:'v',hard:false},
  bgShadow:{pos:'none',dist:1,color:'#000000',alpha:60},
  bgOutline:{asym:false,size:1,l:1,r:1,t:1,b:1,color:'#5a0f12',alpha:0,square:false},
  bgEmboss:{asym:false,size:1,top:1,bottom:1,strength:25,sides:false,invert:false},
  bgRivets:{on:false,inset:1,color:'#ffffff',alpha:30},
  bgCaps:{size:0,inset:1,color:'#000000',alpha:40},
  bgCorners:{size:0,color:'#ffd84a',alpha:0,mode:'all'},
  shape:{asym:false,r:2,tl:2,tr:2,br:2,bl:2,chamfer:false,notch:0,ends:'none',endSide:'both',endSlope:1,ribbon:0,tail:'none',tailSize:3,notchSide:'both',topper:'none',wings:0},
  bgInner:{size:0,inset:1,color:'#ffffff',alpha:50},
  bgPattern:{type:'none',size:2,color:'#ffffff',alpha:80},
  bgGloss:{strength:0},
  bgGlow:{size:0,color:'#ffd84a',alpha:40},
  bgSplit:{at:0,colors:['#ffffff'],alpha:0,dir:'v',hard:false,slant:false},
  bgBand:{size:0,pos:'bottom',color:'#000000',topColor:'#ffffff',alpha:60},
  bgLine:{size:0,offset:2,from:'bottom',color:'#ffffff',alpha:50},
  bgStrip:{size:0,color:'#ffffff',alpha:0},
  bgCornerShade:{on:false,top:'#000000',bottom:'#000000'},
  icons:{gap:2,list:[],colorMode:'auto',color:'#ffffff',chip:false,chipGap:1,chipBgOn:false,chipBgColor:'#2a3040',twoTone:false}
}}
function merge(base,over){if(!over||typeof over!=='object')return base;for(const k of Object.keys(base)){if(!(k in over))continue;const b=base[k],o=over[k];if(Array.isArray(b))base[k]=Array.isArray(o)?o.slice():b;else if(b&&typeof b==='object')base[k]=merge(b,o);else if(typeof o===typeof b)base[k]=o}return base}
let S=defaults();
try{const raw=localStorage.getItem('pixel-tag-generator:state');if(raw)S=merge(defaults(),JSON.parse(raw))}catch(e){}
const get=p=>p.split('.').reduce((o,k)=>o[k],S);
const set=(p,v)=>{const ks=p.split('.'),last=ks.pop();ks.reduce((o,k)=>o[k],S)[last]=v};
