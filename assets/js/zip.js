// 최소 zip 읽기·쓰기 (mcpack = zip). 쓰기는 무압축(store), 읽기는 store·deflate 지원
'use strict';
const CRC_TABLE=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(u8){let c=0xffffffff;for(let i=0;i<u8.length;i++)c=CRC_TABLE[(c^u8[i])&255]^(c>>>8);return(c^0xffffffff)>>>0}
const utf8=s=>new TextEncoder().encode(s);

/** files: [{name, data: Uint8Array|string}] → Blob(zip) */
function zipWrite(files){
  const parts=[],central=[];let offset=0;
  const now=new Date(),dosTime=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1),
        dosDate=((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate();
  for(const f of files){
    const name=utf8(f.name),data=typeof f.data==='string'?utf8(f.data):f.data,crc=crc32(data);
    const lh=new DataView(new ArrayBuffer(30));
    lh.setUint32(0,0x04034b50,true);lh.setUint16(4,20,true);lh.setUint16(6,0x0800,true);lh.setUint16(8,0,true);
    lh.setUint16(10,dosTime,true);lh.setUint16(12,dosDate,true);lh.setUint32(14,crc,true);
    lh.setUint32(18,data.length,true);lh.setUint32(22,data.length,true);lh.setUint16(26,name.length,true);lh.setUint16(28,0,true);
    parts.push(new Uint8Array(lh.buffer),name,data);
    const ch=new DataView(new ArrayBuffer(46));
    ch.setUint32(0,0x02014b50,true);ch.setUint16(4,20,true);ch.setUint16(6,20,true);ch.setUint16(8,0x0800,true);ch.setUint16(10,0,true);
    ch.setUint16(12,dosTime,true);ch.setUint16(14,dosDate,true);ch.setUint32(16,crc,true);ch.setUint32(20,data.length,true);
    ch.setUint32(24,data.length,true);ch.setUint16(28,name.length,true);ch.setUint32(42,offset,true);
    central.push(new Uint8Array(ch.buffer),name);
    offset+=30+name.length+data.length;
  }
  const cdSize=central.reduce((a,p)=>a+p.length,0),end=new DataView(new ArrayBuffer(22));
  end.setUint32(0,0x06054b50,true);end.setUint16(8,files.length,true);end.setUint16(10,files.length,true);
  end.setUint32(12,cdSize,true);end.setUint32(16,offset,true);
  return new Blob([...parts,...central,new Uint8Array(end.buffer)],{type:'application/zip'});
}

/** ArrayBuffer(zip) → Map(name → async () => Uint8Array) */
function zipRead(buf){
  const dv=new DataView(buf),u8=new Uint8Array(buf);let e=-1;
  for(let i=buf.byteLength-22;i>=Math.max(0,buf.byteLength-65557);i--)if(dv.getUint32(i,true)===0x06054b50){e=i;break}
  if(e<0)throw new Error('zip 파일이 아닙니다');
  const count=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const out=new Map(),dec=new TextDecoder();
  for(let n=0;n<count;n++){
    if(dv.getUint32(p,true)!==0x02014b50)throw new Error('zip 목록이 손상되었습니다');
    const method=dv.getUint16(p+10,true),csize=dv.getUint32(p+20,true),nlen=dv.getUint16(p+28,true),xlen=dv.getUint16(p+30,true),
          clen=dv.getUint16(p+32,true),lho=dv.getUint32(p+42,true),name=dec.decode(u8.subarray(p+46,p+46+nlen));
    p+=46+nlen+xlen+clen;
    if(name.endsWith('/'))continue;
    out.set(name,async()=>{
      const start=lho+30+dv.getUint16(lho+26,true)+dv.getUint16(lho+28,true),raw=u8.slice(start,start+csize);
      if(method===0)return raw;
      if(method===8){const s=new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return new Uint8Array(await new Response(s).arrayBuffer())}
      throw new Error(name+': 지원하지 않는 압축 방식('+method+')');
    });
  }
  return out;
}
