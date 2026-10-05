// 픽셀 렌더링: 글자 배치, 그라데이션, 외곽선, 배경 모양·장식
'use strict';
/* ───────── 렌더링 ───────── */
const DIRS={none:null,right:[1,0],below:[0,1],br:[1,1],above:[0,-1],left:[-1,0]};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function hex2rgb(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
const newLayer=(w,h)=>({w,h,d:new Uint8ClampedArray(Math.max(0,w*h*4))});
function grad(cfg,w,h){
  const cols=cfg.colors.map(hex2rgb),n=cols.length,a=Math.round(255*(1-cfg.alpha/100));
  const W=Math.max(1,w-1),H=Math.max(1,h-1),cx=(w-1)/2,cy=(h-1)/2,md=Math.hypot(cx,cy)||1;
  return(x,y,ci,cn)=>{
    if(n===1)return[...cols[0],a];
    if(cfg.dir==='c'&&ci!=null){if(cfg.hard)return[...cols[ci%n],a];const t=cn>1?ci/(cn-1):0,f=t*(n-1),i=Math.min(n-2,Math.floor(f)),u=f-i,A=cols[i],B=cols[i+1];return[Math.round(A[0]+(B[0]-A[0])*u),Math.round(A[1]+(B[1]-A[1])*u),Math.round(A[2]+(B[2]-A[2])*u),a]}
    let t;switch(cfg.dir){case'h':t=x/W;break;case'v':t=y/H;break;case'd1':t=(x+y)/(W+H);break;case'd2':t=(x+(H-y))/(W+H);break;default:t=Math.hypot(x-cx,y-cy)/md}
    t=clamp(t,0,1);
    if(cfg.hard)return[...cols[Math.min(n-1,Math.floor(t*n))],a];
    const f=t*(n-1),i=Math.min(n-2,Math.floor(f)),u=f-i,A=cols[i],B=cols[i+1];
    return[Math.round(A[0]+(B[0]-A[0])*u),Math.round(A[1]+(B[1]-A[1])*u),Math.round(A[2]+(B[2]-A[2])*u),a];
  };
}
function paint(L,mask,fn){for(let y=0;y<L.h;y++)for(let x=0;x<L.w;x++){const i=y*L.w+x;if(!mask[i])continue;const c=fn(x,y);L.d.set(c,i*4)}}
function over(dst,src,ox,oy){
  for(let y=0;y<src.h;y++){const ty=y+oy;if(ty<0||ty>=dst.h)continue;
    for(let x=0;x<src.w;x++){const tx=x+ox;if(tx<0||tx>=dst.w)continue;
      const si=(y*src.w+x)*4,sa=src.d[si+3];if(!sa)continue;
      const di=(ty*dst.w+tx)*4,a=sa/255,da=dst.d[di+3]/255,oa=a+da*(1-a);
      for(let c=0;c<3;c++)dst.d[di+c]=(src.d[si+c]*a+dst.d[di+c]*da*(1-a))/oa;
      dst.d[di+3]=oa*255;}}
}
function stack(...ls){const o=newLayer(ls[0].w,ls[0].h);for(const l of ls)over(o,l,0,0);return o}
function cropLayer(L){
  let x0=L.w,y0=L.h,x1=-1,y1=-1;
  for(let y=0;y<L.h;y++)for(let x=0;x<L.w;x++)if(L.d[(y*L.w+x)*4+3]){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  if(x1<0)return newLayer(0,0);
  const o=newLayer(x1-x0+1,y1-y0+1);
  for(let y=0;y<o.h;y++)o.d.set(L.d.subarray(((y+y0)*L.w+x0)*4,((y+y0)*L.w+x1+1)*4),y*o.w*4);
  return o;
}
function dilate(m,w,h,sd,square){
  let cur=m;const n=Math.max(sd.l,sd.r,sd.t,sd.b);
  for(let i=1;i<=n;i++){
    const nx=cur.slice(),L=sd.l>=i,R=sd.r>=i,T=sd.t>=i,B=sd.b>=i;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(!cur[y*w+x])continue;
      if(L&&x>0)nx[y*w+x-1]=1;if(R&&x<w-1)nx[y*w+x+1]=1;if(T&&y>0)nx[(y-1)*w+x]=1;if(B&&y<h-1)nx[(y+1)*w+x]=1;
      if(square){if(L&&T&&x>0&&y>0)nx[(y-1)*w+x-1]=1;if(R&&T&&x<w-1&&y>0)nx[(y-1)*w+x+1]=1;if(L&&B&&x>0&&y<h-1)nx[(y+1)*w+x-1]=1;if(R&&B&&x<w-1&&y<h-1)nx[(y+1)*w+x+1]=1}}
    cur=nx;}
  return cur;
}
const alphaMask=L=>{const m=new Uint8Array(L.w*L.h);for(let i=0;i<m.length;i++)m[i]=L.d[i*4+3]?1:0;return m};
function shadowOf(src,dir,dist,cfg){
  const o=newLayer(src.w,src.h),[dx,dy]=dir,col=hex2rgb(cfg.color),am=1-cfg.alpha/100;
  for(let y=0;y<src.h;y++)for(let x=0;x<src.w;x++){
    const si=(y*src.w+x)*4;if(!src.d[si+3])continue;
    const tx=x+dx*dist,ty=y+dy*dist;if(tx<0||ty<0||tx>=src.w||ty>=src.h)continue;
    const di=(ty*src.w+tx)*4;
    if(cfg.auto){o.d[di]=src.d[si]>>2;o.d[di+1]=src.d[si+1]>>2;o.d[di+2]=src.d[si+2]>>2;o.d[di+3]=src.d[si+3]*am}
    else{o.d[di]=col[0];o.d[di+1]=col[1];o.d[di+2]=col[2];o.d[di+3]=255*am}
  }
  return o;
}
function getFont(id){return FONTS.get(id)||null}
function layoutText(){
  const t=S.text,prim=getFont(t.font)||FONTS.get('b57'),fb=t.fallback?getFont(t.fallback):null;
  const lines=t.value.split('\n').map(line=>{
    const gs=[],chs=[];
    for(const ch of Array.from(line)){const g=(t.smallcaps&&/[a-z]/.test(ch)&&SMALLCAPS.glyph(ch.toUpperCase()))||prim.glyph(ch)||(fb&&fb.glyph(ch))||(/\s/.test(ch)?null:QMARK);if(g){gs.push(g);chs.push(ch)}}
    let x=0,asc=0,desc=0;const pos=[];
    gs.forEach((g,i)=>{pos.push(x);x+=g.w+(t.bold?1:0)+(i<gs.length-1?t.spacing:0);asc=Math.max(asc,g.base);desc=Math.max(desc,g.h-g.base)});
    return{gs,chs,pos,w:Math.max(0,x),asc,desc};
  });
  const W=Math.max(1,...lines.map(l=>l.w));
  const wv=t.wave||0;
  let H=0;lines.forEach((l,i)=>{H+=l.asc+l.desc+2*wv+(i?t.lineGap:0)});H=Math.max(1,H);
  const a=new Uint8Array(W*H),ci=new Int16Array(W*H).fill(-1);let y=0,cc=0;const chars=[];
  lines.forEach((l,i)=>{
    if(i)y+=t.lineGap;
    const ox=t.align==='left'?0:t.align==='right'?W-l.w:Math.floor((W-l.w)/2);
    l.gs.forEach((g,k)=>{const gx=ox+l.pos[k],gy=y+wv+l.asc-g.base+(wv?Math.round(Math.sin(k*1.1)*wv):0);let inked=false;
      for(let r=0;r<g.h;r++)for(let c=0;c<g.w;c++)if(g.bits[r*g.w+c]){const px=gx+c,py=gy+r;if(py<0||py>=H)continue;
        inked=true;a[py*W+px]=1;ci[py*W+px]=cc;if(t.bold&&px+1<W){a[py*W+px+1]=1;ci[py*W+px+1]=cc}}
      if(inked){chars[cc]=l.chs[k];cc++}});
    y+=l.asc+l.desc+2*wv;
  });
  if(!t.crop)return{w:W,h:H,a,ci,cn:cc,chars};
  let x0=W,y0=H,x1=-1,y1=-1;
  for(let yy=0;yy<H;yy++)for(let x=0;x<W;x++)if(a[yy*W+x]){if(x<x0)x0=x;if(x>x1)x1=x;if(yy<y0)y0=yy;if(yy>y1)y1=yy}
  if(x1<0)return{w:0,h:0,a:new Uint8Array(0)};
  const w=x1-x0+1,h=y1-y0+1,b=new Uint8Array(w*h),bc=new Int16Array(w*h);
  for(let yy=0;yy<h;yy++)for(let x=0;x<w;x++){b[yy*w+x]=a[(yy+y0)*W+x+x0];bc[yy*w+x]=ci[(yy+y0)*W+x+x0]}
  return{w,h,a:b,ci:bc,cn:cc,chars};
}
function buildText(){
  const T=layoutText();if(!T.w)return newLayer(0,0);
  const sh=S.textShadow,ol=S.textOutline,dir=DIRS[sh.pos],dist=dir?sh.dist:0,o=ol.size;
  const m=o+dist+1,W=T.w+2*m,H=T.h+2*m;
  const tm=new Uint8Array(W*H);for(let y=0;y<T.h;y++)for(let x=0;x<T.w;x++)tm[(y+m)*W+x+m]=T.a[y*T.w+x];
  const g=grad(S.textColor,T.w,T.h),textL=newLayer(W,H);const tt=S.text,symC=[...hex2rgb(tt.symColor),Math.round(255*(1-S.textColor.alpha/100))];
  paint(textL,tm,(x,y)=>{const k=(y-m)*T.w+(x-m),c=T.ci[k];if(tt.symOn&&c>=0&&!/[\p{L}\p{N}]/u.test(T.chars[c]||'a'))return symC;return g(x-m,y-m,c,T.cn)});
  const oc=[...hex2rgb(ol.color),Math.round(255*(1-ol.alpha/100))],sides={l:o,r:o,t:o,b:o};
  const outline=base=>{const L=newLayer(W,H);if(o>0){const dm=dilate(base,W,H,sides,ol.square);for(let i=0;i<dm.length;i++)if(base[i])dm[i]=0;paint(L,dm,()=>oc)}return L};
  let res;
  if(ol.wrap){
    const shL=dir?shadowOf(textL,dir,dist,sh):newLayer(W,H);
    const base=tm.slice(),sm=alphaMask(shL);for(let i=0;i<base.length;i++)base[i]|=sm[i];
    res=stack(outline(base),shL,textL);
  }else{
    const upper=stack(outline(tm),textL);
    res=dir?stack(shadowOf(upper,dir,dist,sh),upper):upper;
  }
  return cropLayer(res);
}
function endExtra(h){
  const s=S.shape;if(s.ends==='none')return{l:0,r:0};
  const k=s.endSlope,d=s.ends==='point'?Math.ceil((h-1)/(2*k)+0.5)-1:Math.floor((h-1)/k);
  return{l:s.endSide!=='right'?d:0,r:s.endSide!=='left'?d:0};
}
function shapeMask(w,h,ex){
  const s=S.shape,m=new Uint8Array(w*h).fill(1),rad=s.asym?[s.tl,s.tr,s.br,s.bl]:[s.r,s.r,s.r,s.r],lim=Math.floor(Math.min(w,h)/2);
  const skipL=ex.l>0,skipR=ex.r>0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const cs=[[x,y,0],[w-1-x,y,1],[w-1-x,h-1-y,2],[x,h-1-y,3]];
    for(const[cx,cy,i]of cs){if((i===0||i===3)&&skipL||(i===1||i===2)&&skipR)continue;
      const r=Math.min(rad[i],lim);if(r<=0||cx>=r||cy>=r)continue;
      let cut;if(s.chamfer)cut=cx+cy<r;else{const dx=cx+0.5-r,dy=cy+0.5-r;cut=dx*dx+dy*dy>(r-0.5)*(r-0.5)}
      if(cut){m[y*w+x]=0;break}}
  }
  const mid=(h-1)/2,k=s.endSlope;
  for(let y=0;y<h;y++){
    for(let x=0;x<ex.l;x++){const cut=s.ends==='point'?Math.abs(y-mid)>(x+0.5)*k:x<Math.floor((h-1-y)/k);if(cut)m[y*w+x]=0}
    for(let x=0;x<ex.r;x++){const cut=s.ends==='point'?Math.abs(y-mid)>(x+0.5)*k:x<Math.floor(y/k);if(cut)m[y*w+w-1-x]=0}
  }
  if(s.notch>0){for(let y=0;y<h;y++)for(let x=0;x<s.notch&&x<w;x++)if(x<s.notch-Math.abs(y-mid)){if(!skipL&&s.notchSide!=='right')m[y*w+x]=0;if(!skipR&&s.notchSide!=='left')m[y*w+w-1-x]=0}}
  return m;
}
function erode(m,w,h,n){
  let cur=m;
  for(let i=0;i<n;i++){const nx=new Uint8Array(w*h);
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const k=y*w+x;if(cur[k]&&cur[k-1]&&cur[k+1]&&cur[k-w]&&cur[k+w])nx[k]=1}
    cur=nx;}
  return cur;
}
function hash2(x,y){let h=(x*374761393+y*668265263)|0;h=(h^(h>>>13))*1274126177|0;return(h^(h>>>16))>>>0}
function patternHit(t,x,y,n){
  switch(t){
    case'stripes':return Math.floor((x+y)/n)%2===0;
    case'stripesR':return Math.floor((x-y+1e4*n)/n)%2===0;
    case'hlines':return Math.floor(y/n)%2===0;
    case'vlines':return Math.floor(x/n)%2===0;
    case'checker':return(Math.floor(x/n)+Math.floor(y/n))%2===0;
    case'dots':{const q=n*2,r=Math.floor(y/q)%2?n:0;return y%q===0&&(x+r)%q===0}
    case'grid':return x%(n*2)===0||y%(n*2)===0;
    case'diamonds':{const q=n*2;return Math.abs(x%q-n)+Math.abs(y%q-n)===n}
    case'zigzag':{const q=n*2;return(y%q)===Math.abs((x%q)-n)}
    case'bricks':{const bh=n+1,row=Math.floor(y/bh),off=row%2?n*2:0;return y%bh===0||(x+off)%(n*4)===0}
    case'sparkle':return hash2(x,y)%1000<12*n;
    case'noise':return hash2(x,y)%100<10*n;
    case'grain':return(y+(hash2(Math.floor(x/(n*3)),0)%3))%(n+2)===0&&hash2(x,y)%4!==0;
  }
  return false;
}
function buildAll(){
  const tg=buildText(),left=[],right=[];
  for(const it of S.icons.list){const L=iconLayer(it);if(L)(it.side==='right'?right:left).push(L)}
  const chip=S.icons.chip&&S.bg.enabled&&(left.length+right.length)>0;
  const items=[...(chip?[]:left),tg,...(chip?[]:right)].filter(l=>l.w&&l.h);
  const gap=S.icons.gap,cw=items.reduce((s,l)=>s+l.w,0)+gap*Math.max(0,items.length-1),ch=Math.max(0,...items.map(l=>l.h));
  const content=newLayer(cw,ch);let x=0;for(const l of items){over(content,l,x,Math.floor((ch-l.h)/2));x+=l.w+gap}
  if(!S.bg.enabled)return content;
  const main=boxify(content);
  if(!chip)return main;
  // 아이콘 칩: 아이콘을 같은 스타일의 정사각형 상자에 따로 담아 태그 왼쪽에 붙임
  const p=S.pad,pt=p.asym?p.t:p.y,pb=p.asym?p.b:p.y,bh=ch+pt+pb,saved=S;
  const mkChip=ic=>{
    const t=Math.max(1,Math.floor((bh-ic.h)/2)),b=Math.max(1,bh-ic.h-t),sd=Math.max(1,Math.round((t+b)/2));
    const o={shape:{...saved.shape,ends:'none',ribbon:0,tail:'none',notch:0,topper:'none',wings:0},bgSplit:{...saved.bgSplit,at:0},bgCaps:{...saved.bgCaps,size:0},pad:{asym:true,l:sd,r:sd,t,b,x:0,y:0,minW:0}};
    if(saved.icons.chipBgOn){o.bg={...saved.bg,colors:[saved.icons.chipBgColor],hard:false,alpha:0};o.bgPattern={...saved.bgPattern,type:'none'};o.bgGloss={strength:0}}
    S=Object.assign({},saved,o);try{return boxify(ic)}finally{S=saved}
  };
  const all=[...left.map(mkChip),main,...right.map(mkChip)],cg=S.icons.chipGap,W=all.reduce((a,l)=>a+l.w,0)+cg*(all.length-1),H=Math.max(...all.map(l=>l.h)),out=newLayer(W,H);
  let ox=0;for(const l of all){over(out,l,ox,Math.floor((H-l.h)/2));ox+=l.w+cg}
  return out;
}
function boxify(content){
  const cw=content.w,ch=content.h;
  const p=S.pad;let pl=p.asym?p.l:p.x,pr=p.asym?p.r:p.x;const pt=p.asym?p.t:p.y,pb=p.asym?p.b:p.y;
  const bh=ch+pt+pb,ex=endExtra(bh);let bw=cw+pl+pr+ex.l+ex.r;
  if(p.minW>0&&bw<p.minW){const e=p.minW-bw;pl+=Math.floor(e/2);pr+=Math.ceil(e/2);bw=p.minW}
  if(bw<=0||bh<=0)return content;
  const bo=S.bgOutline,os=bo.asym?{l:bo.l,r:bo.r,t:bo.t,b:bo.b}:{l:bo.size,r:bo.size,t:bo.size,b:bo.size};
  const sd=S.bgShadow,dir=DIRS[sd.pos],dist=dir?sd.dist:0,gw=S.bgGlow.size;
  const rb=S.shape.ribbon,drop=rb?Math.max(1,Math.floor(bh/4)):0,tn=S.shape.tail!=='none'?S.shape.tailSize:0;
  const tpH=S.shape.topper!=='none'?3:0,wn=S.shape.wings,M=Math.max(os.l,os.r,os.t,os.b)+dist+gw+rb+drop+tn+tpH+wn*2+2,W=bw+2*M,H=bh+2*M;
  const sm=shapeMask(bw,bh,ex),fill=newLayer(bw,bh);paint(fill,sm,grad(S.bg,bw,bh));
  const sp=S.bgSplit;
  if(sp.at>0){const x0=Math.round(bw*sp.at/100),g2=grad(sp,bw,bh),mid=(bh-1)/2;
    const m2=sm.map((v,i)=>{if(!v)return 0;const xx=i%bw,yy=(i/bw)|0;return xx>=x0+(sp.slant?Math.round(mid-yy):0)?1:0});
    const L=newLayer(bw,bh);paint(L,m2,g2);over(fill,L,0,0)}
  const pat=S.bgPattern;
  if(pat.type!=='none'){const pc=[...hex2rgb(pat.color),Math.round(255*(1-pat.alpha/100))],pm=sm.map((v,i)=>v&&patternHit(pat.type,i%bw,(i/bw)|0,pat.size)?1:0);const L=newLayer(bw,bh);paint(L,pm,()=>pc);over(fill,L,0,0)}
  const gl=S.bgGloss.strength/100;
  if(gl>0){const half=Math.floor(bh/2);for(let y=0;y<half;y++)for(let x=0;x<bw;x++){if(!sm[y*bw+x])continue;const i=(y*bw+x)*4;for(let c=0;c<3;c++)fill.d[i+c]=fill.d[i+c]+(255-fill.d[i+c])*gl}}
  const inS=(x,y)=>x>=0&&y>=0&&x<bw&&y<bh&&sm[y*bw+x];
  const bd=S.bgBand;
  if(bd.size>0){const mk=(s2,col)=>{const bc=[...hex2rgb(col),Math.round(255*(1-bd.alpha/100))];
      const bm=sm.map((v,i)=>{if(!v)return 0;const xx=i%bw,yy=(i/bw)|0;for(let k=1;k<=bd.size;k++)if(!inS(xx,yy+s2*k))return 1;return 0});
      const L=newLayer(bw,bh);paint(L,bm,()=>bc);over(fill,L,0,0)};
    if(bd.pos!=='top')mk(1,bd.color);if(bd.pos!=='bottom')mk(-1,bd.pos==='both'?bd.topColor:bd.color)}
  const ln=S.bgLine;
  if(ln.size>0){const lc=[...hex2rgb(ln.color),Math.round(255*(1-ln.alpha/100))],lm=new Uint8Array(bw*bh);
    for(let k=0;k<ln.size;k++){const yy=ln.from==='top'?ln.offset+k:bh-1-ln.offset-k;if(yy<0||yy>=bh)continue;for(let xx=0;xx<bw;xx++)if(inS(xx,yy))lm[yy*bw+xx]=1}
    const L=newLayer(bw,bh);paint(L,lm,()=>lc);over(fill,L,0,0)}
  const e=S.bgEmboss,et=e.asym?e.top:e.size,eb=e.asym?e.bottom:e.size,str=e.strength/100;
  if(et>0||eb>0){
    for(let y=0;y<bh;y++)for(let x=0;x<bw;x++){if(!sm[y*bw+x])continue;
      let hi=false,lo=false;
      for(let k=1;k<=et;k++)if(!inS(x,y-k)||(e.sides&&!inS(x-k,y)))hi=true;
      if(!hi)for(let k=1;k<=eb;k++)if(!inS(x,y+k)||(e.sides&&!inS(x+k,y)))lo=true;
      if(!hi&&!lo)continue;const i=(y*bw+x)*4;
      const up=hi!==!!e.invert;
      for(let c=0;c<3;c++)fill.d[i+c]=up?fill.d[i+c]+(255-fill.d[i+c])*str:fill.d[i+c]*(1-str);}
  }
  const csh=S.bgCornerShade;
  if(csh.on){const ct=[...hex2rgb(csh.top),255],cb=[...hex2rgb(csh.bottom),255];
    for(let y=0;y<bh;y++)for(let x=0;x<bw;x++){if(!sm[y*bw+x])continue;
      const cut=(xx,yy)=>xx>=0&&yy>=0&&xx<bw&&yy<bh&&!sm[yy*bw+xx];
      if(cut(x-1,y)||cut(x+1,y)||cut(x,y-1)||cut(x,y+1))fill.d.set(y<bh/2?ct:cb,(y*bw+x)*4)}}
  const stp=S.bgStrip;
  if(stp.size>0){const sc=[...hex2rgb(stp.color),Math.round(255*(1-stp.alpha/100))],L=newLayer(bw,bh),smk=new Uint8Array(bw*bh);
    for(let y=0;y<bh;y++)for(let k=0;k<stp.size;k++){const xx=ex.l+k;if(inS(xx,y))smk[y*bw+xx]=1}
    paint(L,smk,()=>sc);over(fill,L,0,0)}
  const rv=S.bgRivets;
  if(rv.on){const r0=S.shape.asym?0:Math.floor(S.shape.r/2),i0=rv.inset+r0,rc=[...hex2rgb(rv.color),Math.round(255*(1-rv.alpha/100))];
    for(const[xx,yy]of[[i0+ex.l,i0],[bw-1-i0-ex.r,i0],[i0+ex.l,bh-1-i0],[bw-1-i0-ex.r,bh-1-i0]])if(inS(xx,yy))fill.d.set(rc,(yy*bw+xx)*4)}
  const bi=S.bgInner;
  if(bi.size>0){const a=erode(sm,bw,bh,bi.inset),b=erode(a,bw,bh,bi.size),rm=a.map((v,i)=>v&&!b[i]?1:0),ic=[...hex2rgb(bi.color),Math.round(255*(1-bi.alpha/100))];const L=newLayer(bw,bh);paint(L,rm,()=>ic);over(fill,L,0,0)}
  const cp=S.bgCaps;
  if(cp.size>0){const cc=[...hex2rgb(cp.color),Math.round(255*(1-cp.alpha/100))],cm=new Uint8Array(bw*bh);
    for(let y=1;y<bh-1;y++)for(let k=0;k<cp.size;k++){const xl=ex.l+cp.inset+k,xr=bw-1-ex.r-cp.inset-k;if(inS(xl,y))cm[y*bw+xl]=1;if(inS(xr,y))cm[y*bw+xr]=1}
    const L=newLayer(bw,bh);paint(L,cm,()=>cc);over(fill,L,0,0)}
  const gm=new Uint8Array(W*H);for(let y=0;y<bh;y++)for(let x=0;x<bw;x++)gm[(y+M)*W+x+M]=sm[y*bw+x];
  // 리본 꼬리: 본체 아래로 접혀 들어가는 양옆 조각
  const tm=new Uint8Array(W*H);
  if(rb>0){const tw=rb+2,nd=Math.min(rb,Math.floor(bh/2)),mid=(bh-1)/2;
    for(let y=0;y<bh;y++){const gy=M+drop+y;
      for(let k=0;k<tw;k++){const cut=k<nd-Math.abs(y-mid);if(cut)continue;
        tm[gy*W+(M-rb+k)]=1;tm[gy*W+(M+bw-1+rb-k)]=1}}}
  // 말풍선 꼬리
  const tlm=new Uint8Array(W*H);
  if(tn>0){const r0=Math.max(2,S.shape.asym?0:S.shape.r)+ex.l,ts=S.shape.tail;
    for(let k=0;k<tn;k++){const gy=M+bh+k,half=tn-1-k;let x0,x1;
      if(ts==='bl'){x0=M+r0;x1=x0+half}else if(ts==='br'){x1=M+bw-1-r0;x0=x1-half}else{const cx=M+Math.floor((bw-1)/2);x0=cx-half;x1=cx+half}
      for(let xx=x0;xx<=x1;xx++)tlm[gy*W+xx]=1}}
  // 명판 장식: 위쪽 성벽·왕관, 양옆 날개
  const dcm=new Uint8Array(W*H);
  if(tpH){let tw=Math.max(5,Math.min(bw-2,9));if(tw%2===0)tw--;const x0=M+Math.floor((bw-tw)/2),mid=Math.floor(tw/2),cr=S.shape.topper==='crown';
    for(let r=0;r<3;r++)for(let k=0;k<tw;k++){let on=r>0;
      if(r===0)on=cr?(k===0||k===mid||k===tw-1):k%2===0;
      if(cr&&r===1)on=k<=1||k>=tw-2||Math.abs(k-mid)<=1;
      if(on)dcm[(M-3+r)*W+x0+k]=1}}
  if(wn>0){for(let r=0;r<2*wn&&r<bh-1;r++){const len=2*wn-2*Math.floor(r/2),gy=M+1+r;
    for(let k=1;k<=len;k++){dcm[gy*W+M-k]=1;dcm[gy*W+M+bw-1+k]=1}}}
  const base=gm.map((v,i)=>v||tm[i]||tlm[i]||dcm[i]?1:0);
  const dm=dilate(base,W,H,os,bo.square);const om=dm.map((v,i)=>v&&!base[i]?1:0);
  const outL=newLayer(W,H),oc=[...hex2rgb(bo.color),Math.round(255*(1-bo.alpha/100))];paint(outL,om,()=>oc);
  const out=newLayer(W,H);
  if(gw>0){const gc=hex2rgb(S.bgGlow.color),ga=1-S.bgGlow.alpha/100;let prev=dm;
    for(let i=1;i<=gw;i++){const nx=dilate(prev,W,H,{l:1,r:1,t:1,b:1},i%2===0),ring=nx.map((v,j)=>v&&!prev[j]?1:0),a=Math.round(255*ga*(1-(i-1)/gw));
      const L=newLayer(W,H);paint(L,ring,()=>[...gc,a]);over(out,L,0,0);prev=nx}}
  if(dir){const sb=newLayer(W,H);paint(sb,dm,()=>[0,0,0,255]);over(out,shadowOf(sb,dir,dist,{...sd,auto:false}),0,0)}
  over(out,outL,0,0);
  const cn=S.bgCorners;
  if(cn.size>0){let x0=W,y0=H,x1=-1,y1=-1;for(let i=0;i<dm.length;i++)if(dm[i]){const xx=i%W,yy=(i/W)|0;if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(yy<y0)y0=yy;if(yy>y1)y1=yy}
    const cc=[...hex2rgb(cn.color),Math.round(255*(1-cn.alpha/100))],L=newLayer(W,H),put=(xx,yy)=>{if(xx>=0&&yy>=0&&xx<W&&yy<H)L.d.set(cc,(yy*W+xx)*4)};
    const dg=cn.mode==='diag';for(let k=0;k<cn.size;k++){if(!dg){put(x0+k,y0);put(x0,y0+k);put(x1-k,y1);put(x1,y1-k)}put(x1-k,y0);put(x1,y0+k);put(x0+k,y1);put(x0,y1-k)}
    over(out,L,0,0)}
  if(tpH||wn>0){const gb=grad(S.bg,bw,bh),L=newLayer(W,H);paint(L,dcm,(xx,yy)=>gb(clamp(xx-M,0,bw-1),clamp(yy-M,0,bh-1)));over(out,L,0,0)}
  if(tn>0){const gb=grad(S.bg,bw,bh),L=newLayer(W,H);paint(L,tlm,(xx)=>gb(clamp(xx-M,0,bw-1),bh-1));over(out,L,0,0)}
  if(rb>0){const c=grad(S.bg,bw,bh)(bw-1,bh-1),tc2=[c[0]*0.62|0,c[1]*0.62|0,c[2]*0.62|0,c[3]];const L=newLayer(W,H);paint(L,tm,()=>tc2);over(out,L,0,0)}
  over(out,fill,M,M);over(out,content,M+ex.l+pl,M+pt);
  return cropLayer(out);
}
