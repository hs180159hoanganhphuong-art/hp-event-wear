(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const steps=['color','mockup','size','fitting'],S=window.HP_STATE;
const prev=$('#stepPrev'),next=$('#stepNext'),pos=$('#stepPos');
if(!prev||!window.HP_STATE)return;
let cur=-1,lastColor='',lastForm='';
// Phôi áo: chọn màu theo ảnh phôi thật
const B=window.HP_BLANKS,fs=$('#formSelect'),mc=$('#mockColor'),sw=$('#blankSwatches');
function applyDefaults(){const d=window.HP_BLANK_DEFAULTS[fs.value];if(!d)return;
  ['front','back'].forEach(s=>[['Scale','s'],['X','x'],['Y','y']].forEach(([k,j])=>{const el=$('#'+s+k);el.value=d[s][j];fire(el,'input')}))}
function syncSw(){const b=window.HP_BLANK_NEAREST(fs.value,mc.value);mc.value=b.hex;lastColor=b.hex;
  S.set('color',{...S.get('color',{}),family:fs.value==='polo'?'polo':'tee',hex:b.hex,name:b.name});
  sw.innerHTML=(B[fs.value]||[]).map(x=>`<button type="button" class="sw${x.id===b.id?' active':''}" data-hex="${x.hex}" title="${x.name}" aria-label="${x.name}" style="background:${x.hex}"></button>`).join('');
  $('#blankName').textContent=b.name;
  $$('.sw',sw).forEach(el=>el.onclick=()=>{mc.value=el.dataset.hex;fire(mc,'input');syncSw()});}
fs.addEventListener('change',()=>{lastForm=fs.value;applyDefaults();syncSw()});

const fire=(el,t)=>el.dispatchEvent(new Event(t,{bubbles:true}));
function enter(id){
  if(id==='mockup'){const c=S.get('color',{}),f=S.get('form','');
    if(c.hex&&c.hex!==lastColor){mc.value=c.hex;lastColor=c.hex}
    if(f&&f!==lastForm&&B[f]){lastForm=f;fs.value=f;fire(fs,'change')}else{fire(mc,'input');syncSw()}}
  if(id==='size'){const f=S.get('form','');if(f)$('#sizeFormType').value=f}
  if(id==='fitting'&&window.HP_FIT_SYNC)window.HP_FIT_SYNC();
}
function show(i,scroll){
  i=Math.max(0,Math.min(steps.length-1,i));const id=steps[i];
  $$('.step-panel').forEach(p=>p.classList.toggle('active',p.dataset.step===id));
  $$('.progress-item').forEach((p,k)=>{p.classList.toggle('active',k===i);p.classList.toggle('done',k<i)});
  prev.disabled=i===0;next.hidden=i===steps.length-1;pos.textContent='Bước '+(i+1)+'/'+steps.length;
  if(i!==cur){cur=i;enter(id);history.replaceState(null,'','#'+id)}
  if(scroll)$('#studioWizard').scrollIntoView({behavior:'smooth',block:'start'});
}
const fromHash=()=>Math.max(0,steps.indexOf(location.hash.slice(1)));
prev.onclick=()=>show(cur-1,true);next.onclick=()=>show(cur+1,true);
$$('.progress-item').forEach((b,k)=>b.onclick=()=>show(k,false));
window.addEventListener('hashchange',()=>show(fromHash(),true));
// Bước 1: chọn form -> màu đề xuất + tất cả màu
const FN={oversize:'Oversize',boxy:'Boxy',babytee:'Baby Tee',polo:'Polo'};
let pf='',dom='#B8521D';
const hexRgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16)),dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]),sat=h=>{const c=hexRgb(h),m=Math.max(...c);return m?(m-Math.min(...c))/m:0};
const pcard=(x,tag)=>`<button type="button" class="pick-card" data-hex="${x.hex}" data-name="${x.name}"><div class="sw-big" style="background:${x.hex}"></div>${tag?`<small class="rec-tag">${tag}</small>`:''}<b>${x.name}</b></button>`;
function target(){const t=($('#conceptText').value||'').toLowerCase();let r=hexRgb(dom);
  if(/trẻ|năng động|festival|concert|thể thao|chạy/.test(t))r=[230,80,30];
  if(/công nghệ|\bai\b|tech/.test(t))r=[30,100,200];
  if(/thiện nguyện|xanh|môi trường/.test(t))r=[25,130,80];
  if(/doanh nghiệp|hội nghị|professional|chuyên nghiệp/.test(t))r=[25,45,70];return r}
function ranked(){const t=target();return B[pf].map(x=>({...x,d:dist(hexRgb(x.hex),t)})).sort((a,b)=>a.d-b.d)}
function mark(){const c=S.get('color',{}),ok=S.get('form','')===pf;
  $$('#colorFlow .pick-card').forEach(b=>b.classList.toggle('active',ok&&b.dataset.hex===c.hex));
  const x=ok&&(B[pf]||[]).find(b=>b.hex===c.hex);
  $('#colorPicked').innerHTML=x?`<img src="${x.front}" alt="${x.name}"><span>Đã chọn: <b>${FN[pf]} · ${x.name}</b><br><small class="muted">Bấm "Tiếp theo" để lên mockup.</small></span>`:''}
function choose(hex,name){S.set('form',pf);S.set('color',{family:pf==='polo'?'polo':'tee',name,hex});mark()}
function renderColors(){const l=ranked(),best=l[0],used=new Set([best.id]);
  const safe=l.find(x=>!used.has(x.id)&&/trắng|đen|kem|navy|xám/i.test(x.name));if(safe)used.add(safe.id);
  const bold=l.slice(0,8).filter(x=>!used.has(x.id)).sort((a,b)=>sat(b.hex)-sat(a.hex))[0];
  $('#colorRecs').innerHTML=[[best,'Phù hợp nhất'],[safe,'An toàn'],[bold,'Nổi bật']].filter(p=>p[0]).map(p=>pcard(p[0],p[1])).join('');
  $('#allColors').innerHTML=B[pf].map(x=>pcard(x)).join('');$('#allCount').textContent='('+B[pf].length+' màu)';
  $$('#colorFlow .pick-card').forEach(b=>b.onclick=()=>choose(b.dataset.hex,b.dataset.name));mark();return best}
function pickForm(f){const same=pf===f;pf=f;
  $$('.form-opt').forEach(b=>b.classList.toggle('active',b.dataset.form===f));
  $('#pickedForm').textContent=FN[f];$('#formHint').hidden=true;$('#colorFlow').hidden=false;
  const best=renderColors();if(!same||S.get('form','')!==f)choose(best.hex,best.name);
  $('#colorFlow').scrollIntoView({behavior:'smooth',block:'nearest'})}
$$('.form-opt').forEach(b=>b.onclick=()=>pickForm(b.dataset.form));
$('#runColor').onclick=()=>pf&&renderColors();
$('#conceptImage').onchange=e=>{const f=e.target.files[0];if(f&&window.HP_DOMINANT)window.HP_DOMINANT(f,h=>{dom=h;const t=$('#dominantColor');t.textContent=h;t.style.background=h;t.style.color=parseInt(h.slice(1),16)>0xaaaaaa?'#111':'#fff';if(pf)renderColors()})};

applyDefaults();syncSw();
show(fromHash(),!!location.hash);

// Tải mockup
const load=src=>new Promise((ok,err)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=err;i.src=src});
async function side(s){
  const W=1000,H=1250,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  x.fillStyle='#f4f2ef';x.fillRect(0,0,W,H);
  const bl=window.HP_BLANK_LOOKUP($('#formSelect').value,$('#mockColor').value,s);
  if(bl)x.drawImage(await load(bl),0,0,W,H);else{  const svg=window.HP_SHIRT_SVG($('#formSelect').value,$('#mockColor').value,s).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="880" height="1100" ');  x.drawImage(await load('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)),60,75,880,1100);}
  const a=$('#'+s+'Art');
  if(a&&!a.hidden&&a.naturalWidth){const w=W*parseFloat(a.style.width)/100;x.drawImage(a,W*parseFloat(a.style.left)/100,H*parseFloat(a.style.top)/100,w,w*a.naturalHeight/a.naturalWidth)}
  return c;
}
const save=(c,n)=>c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/png');
$('#dlFront').onclick=async()=>save(await side('front'),'hp-mockup-mat-truoc.png');
$('#dlBack').onclick=async()=>save(await side('back'),'hp-mockup-mat-sau.png');
$('#dlBoth').onclick=async()=>{const f=await side('front'),b=await side('back'),c=document.createElement('canvas');c.width=2000;c.height=1250;const x=c.getContext('2d');x.drawImage(f,0,0);x.drawImage(b,1000,0);save(c,'hp-mockup-truoc-sau.png')};
})();
