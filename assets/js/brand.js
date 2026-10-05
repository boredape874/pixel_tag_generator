// 헤더의 BE_STUDIO 워드마크: 이 도구의 5x5 픽셀 폰트로 직접 그림
'use strict';
function drawBrandmark(){
  const cv=document.getElementById('brandmark');if(!cv)return;
  const font=FONTS.get('b55'),text='BE_STUDIO',gap=1,z=3;
  const gs=Array.from(text).map(ch=>font.glyph(ch)).filter(Boolean);
  const w=gs.reduce((a,g)=>a+g.w,0)+gap*(gs.length-1),h=5,pad=1;
  const W=w+pad*2,H=h+pad*2+1,mask=new Uint8Array(W*H);
  let x=pad;for(const g of gs){for(let r=0;r<g.h;r++)for(let c=0;c<g.w;c++)if(g.bits[r*g.w+c])mask[(r+pad)*W+x+c]=1;x+=g.w+gap}
  cv.width=W*z;cv.height=H*z;const ctx=cv.getContext('2d');
  const at=(xx,yy)=>xx>=0&&yy>=0&&xx<W&&yy<H&&mask[yy*W+xx];
  const px=(xx,yy,col)=>{ctx.fillStyle=col;ctx.fillRect(xx*z,yy*z,z,z)};
  // 외곽선 → 아래 그림자 → 위 밝은 금색 / 아래 진한 금색 2톤 글자
  ctx.clearRect(0,0,cv.width,cv.height);
  for(let yy=0;yy<H;yy++)for(let xx=0;xx<W;xx++){if(at(xx,yy))continue;
    if(at(xx-1,yy)||at(xx+1,yy)||at(xx,yy-1)||at(xx,yy+1)||at(xx-1,yy-1)||at(xx+1,yy-1)||at(xx-1,yy+1)||at(xx+1,yy+1))px(xx,yy,'#2a1a05')}
  for(let yy=0;yy<H;yy++)for(let xx=0;xx<W;xx++)if(at(xx,yy-1)&&!at(xx,yy))px(xx,yy,'#7a4a0a');
  for(let yy=0;yy<H;yy++)for(let xx=0;xx<W;xx++)if(at(xx,yy))px(xx,yy,yy-pad<3?'#ffe08a':'#f2a91d');
}
drawBrandmark();
