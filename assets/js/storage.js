// IndexedDB: 업로드한 폰트·아이콘 보관
'use strict';
/* ───────── IndexedDB ───────── */
let dbp=null;
function db(){if(!dbp)dbp=new Promise((res,rej)=>{try{const r=indexedDB.open('pixel-tag-generator',1);r.onupgradeneeded=()=>{const d=r.result;d.createObjectStore('fonts',{keyPath:'id'});d.createObjectStore('icons',{keyPath:'id'})};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}});return dbp}
async function idbTx(store,mode,fn){try{const d=await db();return await new Promise((res,rej)=>{const tx=d.transaction(store,mode);const out=fn(tx.objectStore(store));tx.oncomplete=()=>res(out&&out.result);tx.onerror=()=>rej(tx.error)})}catch(e){console.warn('저장소 사용 불가',e);return null}}
const idbPut=(s,v)=>idbTx(s,'readwrite',st=>{st.put(v)});
const idbDel=(s,k)=>idbTx(s,'readwrite',st=>{st.delete(k)});
const idbAll=s=>idbTx(s,'readonly',st=>st.getAll());
