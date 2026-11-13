(() => {
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const state = {
    get(k, fallback=''){ try { const v=localStorage.getItem('hp_'+k); return v===null?fallback:JSON.parse(v); } catch{return fallback;} },
    set(k,v){ try{ localStorage.setItem('hp_'+k,JSON.stringify(v)); }catch{} }
  };
  window.HP_STATE=state;
  const navToggle=$('.mobile-toggle'), nav=$('.nav'); if(navToggle&&nav) navToggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',o);navToggle.textContent=o?'✕':'☰';document.body.style.overflow=o?'hidden':'';});
  const pages=[
    ['Trang chủ','index.html','H&P Event Wear áo sự kiện đồng phục AI Studio'],['Giới thiệu','about.html','câu chuyện H&P tầm nhìn sứ mệnh'],
    ['Tin tức','news.html','H&P Đồng Hành hậu trường mẹo chọn áo'],['H&P AI Studio','ai-studio.html','AI chọn màu mockup size fitting'],
    ['AI Chọn Màu','ai-studio.html#color','gợi ý màu áo concept logo ấn phẩm'],['AI Lên Mockup','ai-studio.html#mockup','upload PNG AI PSD mockup áo trước sau'],
    ['AI Chọn Size','ai-studio.html#size','chiều cao cân nặng ngang vai vòng ngực size'],['AI Fitting','ai-studio.html#fitting','thử áo ảnh bản thân fitting form'],
    ['Liên hệ','contact.html','báo giá zalo fanpage email Thanh Xuân Hà Nội']
  ];
  const sInput=$('.search-input'), sBox=$('.search-results');
  if(sInput&&sBox){
    const render=q=>{q=q.trim().toLowerCase(); if(!q){sBox.classList.remove('show');return;} const arr=pages.filter(p=>(p[0]+' '+p[2]).toLowerCase().includes(q)).slice(0,7);sBox.innerHTML=arr.length?arr.map(p=>`<a class="search-item" href="${p[1]}"><b>${p[0]}</b><small>${p[2]}</small></a>`).join(''):'<div class="search-item"><small>Không tìm thấy nội dung phù hợp.</small></div>';sBox.classList.add('show')};
    sInput.addEventListener('input',e=>render(e.target.value)); sInput.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=$('.search-item[href]',sBox);if(a)location.href=a.href}}); document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))sBox.classList.remove('show')});
  }
  // Article listing & detail
  const articleGrid=$('#articleGrid'); if(articleGrid&&window.HP_ARTICLES){ articleGrid.innerHTML=HP_ARTICLES.map(a=>`<article class="card news-card"><img src="${a.image}" alt="${a.title}"><div class="body"><span class="tag">${a.category}</span><div class="news-meta">${a.date}</div><h3>${a.title}</h3><p class="muted">${a.excerpt}</p><a class="orange" href="article.html?id=${a.id}"><b>Đọc bài →</b></a></div></article>`).join(''); }
  const articleBody=$('#articleBody'); if(articleBody&&window.HP_ARTICLES){const id=new URLSearchParams(location.search).get('id')||HP_ARTICLES[0].id;const a=HP_ARTICLES.find(x=>x.id===id)||HP_ARTICLES[0];document.title=a.title+' | H&P Event Wear';articleBody.innerHTML=`<span class="tag">${a.category}</span><h1 style="font-size:clamp(38px,5vw,62px);margin-top:16px">${a.title}</h1><div class="news-meta">${a.date} · H&P Event Wear</div><img src="${a.image}" alt="${a.title}">${a.content.map(p=>`<p>${p}</p>`).join('')}<div class="card" style="margin-top:34px"><h3>Wear the Moment. Keep the Memory.</h3><p class="muted">Bạn đang chuẩn bị áo cho sự kiện? Hãy thử H&P AI Studio hoặc liên hệ để nhận báo giá.</p><div class="actions"><a class="btn btn-primary" href="ai-studio.html">Trải nghiệm AI Studio</a><a class="btn btn-dark" href="contact.html">Nhận báo giá</a></div></div>`;}

  // Utility: dominant color
  function rgbToHex(r,g,b){return '#'+[r,g,b].map(x=>Math.round(x).toString(16).padStart(2,'0')).join('').toUpperCase()}
  function dominantFromFile(file, cb){const img=new Image();img.onload=()=>{const c=document.createElement('canvas'),ctx=c.getContext('2d');c.width=80;c.height=80;ctx.drawImage(img,0,0,80,80);const d=ctx.getImageData(0,0,80,80).data;let r=0,g=0,b=0,n=0;for(let i=0;i<d.length;i+=16){if(d[i+3]<100)continue;r+=d[i];g+=d[i+1];b+=d[i+2];n++}cb(n?rgbToHex(r/n,g/n,b/n):'#B8521D')};img.src=URL.createObjectURL(file)}
  window.HP_DOMINANT=dominantFromFile;const paletteTee=[['Tím','#B76CE2'],['Hồng pastel','#F59AB6'],['Hồng','#EC6FA8'],['Hồng đậm','#F50068'],['Cam đỏ','#EE3D12'],['Đỏ đô','#B50028'],['Navy','#052B60'],['Xanh royal','#0A2EAC'],['Xanh dương','#087EE7'],['Xanh lá','#087B4F'],['Nâu','#9B5C3D'],['Đỏ','#E60032'],['Trắng','#FFFFFF'],['Kem','#FFF7D7'],['Xám','#444444'],['Vàng','#F8C400'],['Đen','#111111']];
  const palettePolo=[['Trắng','#FFFFFF'],['Đen','#111111'],['Navy','#18314F'],['Xanh royal','#1747B0'],['Đỏ đô','#9C1730'],['Olive','#657147'],['Xám xanh','#92A5BD'],['Mint','#8FB9A2'],['Xanh trời','#5FC3F1'],['Xám','#696969'],['Xanh dương','#138ED1'],['Xanh neon','#86E83C'],['Xanh lá','#0D874B'],['Cam','#F36C21'],['Vàng nhạt','#F9E07E'],['Vàng','#FFD02C'],['Đỏ','#D3131C'],['Be','#C9A77B']];
  window.HP_PALETTES={tee:paletteTee,polo:palettePolo};

  // AI Color
  const colorResults=$('#colorResults');
  if(colorResults){
    let dom='#B8521D'; const up=$('#conceptImage'), domOut=$('#dominantColor'); if(up) up.addEventListener('change',()=>{const f=up.files[0];if(!f)return;dominantFromFile(f,h=>{dom=h;if(domOut){domOut.textContent=h;domOut.style.background=h;domOut.style.color=(parseInt(h.slice(1),16)>0xaaaaaa?'#111':'#fff')}})});
    const hexRgb=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; const dist=(a,b)=>Math.sqrt(a.reduce((s,x,i)=>s+(x-b[i])**2,0));
    const recommend=()=>{const concept=($('#conceptText')?.value||'').toLowerCase();let target=hexRgb(dom);if(/trẻ|năng động|festival|concert|thể thao|chạy/.test(concept))target=[230,80,30]; if(/công nghệ|ai|tech/.test(concept))target=[30,100,200]; if(/thiện nguyện|xanh|môi trường/.test(concept))target=[25,130,80]; if(/doanh nghiệp|hội nghị|professional|chuyên nghiệp/.test(concept))target=[25,45,70]; const renderGroup=(label,pal,family)=>{const ranked=pal.map(x=>({...x,name:x[0],hex:x[1],d:dist(hexRgb(x[1]),target)})).sort((a,b)=>a.d-b.d);const picks=[ranked[0],ranked[Math.floor(ranked.length/3)],ranked[ranked.length-2]].filter((v,i,a)=>a.findIndex(x=>x.hex===v.hex)===i);return `<div class="stack"><h3>${label}</h3><div class="color-grid">${picks.map((x,i)=>`<button class="color-card" data-family="${family}" data-name="${x.name}" data-hex="${x.hex}"><div class="swatch" style="background:${x.hex}"></div><b>${i===0?'Phù hợp nhất':i===1?'An toàn':'Nổi bật'} · ${x.name}</b><small>${x.hex}</small></button>`).join('')}</div></div>`}; colorResults.innerHTML=renderGroup('Oversize / Boxy / Baby Tee',paletteTee,'tee')+renderGroup('Polo',palettePolo,'polo'); $$('.color-card',colorResults).forEach(c=>c.onclick=()=>{$$('.color-card',colorResults).forEach(x=>x.classList.remove('active'));c.classList.add('active');state.set('color',{family:c.dataset.family,name:c.dataset.name,hex:c.dataset.hex});$('#colorNext')?.classList.remove('disabled')});};
    $('#runColor')?.addEventListener('click',recommend); recommend();
  }

  // Shirt SVG + mockup
  function shirtSvg(form,color,side='front'){
    const bl=window.HP_BLANK_LOOKUP&&window.HP_BLANK_LOOKUP(form,color,side);if(bl)return '<img src="'+bl+'" alt="Phôi '+form+' '+side+'" draggable="false">';
    const collar=form==='polo'; const boxy=form==='boxy'; const baby=form==='babytee';
    const w=400,h=500; let bodyTop=120, bodyBottom=baby?390:445, left=boxy?90:105,right=boxy?310:295; if(baby){left=125;right=275;bodyTop=125} const sleeveY=145, sleeveEnd=baby?215:245;
    const path=`M ${left} ${bodyTop} L 150 90 Q 200 115 250 90 L ${right} ${bodyTop} L 370 ${sleeveY+35} L 330 ${sleeveEnd} L ${right} ${sleeveY+10} L ${right} ${bodyBottom} L ${left} ${bodyBottom} L ${left} ${sleeveY+10} L 70 ${sleeveEnd} L 30 ${sleeveY+35} Z`;
    return `<svg viewBox="0 0 ${w} ${h}" aria-label="${form} ${side}"><path d="${path}" fill="${color}" stroke="rgba(0,0,0,.12)" stroke-width="3"/><path d="M150 90 Q200 155 250 90" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="7"/>${collar?'<path d="M150 92 L176 132 L200 118 L224 132 L250 92" fill="rgba(255,255,255,.08)" stroke="rgba(0,0,0,.2)" stroke-width="3"/><rect x="191" y="119" width="18" height="72" rx="5" fill="rgba(0,0,0,.08)"/>':''}<path d="M${left} ${bodyBottom} L ${right} ${bodyBottom}" stroke="rgba(0,0,0,.14)" stroke-width="4"/></svg>`;
  }
  window.HP_SHIRT_SVG=shirtSvg;
  const mockBoards=$$('.mockup-board'); if(mockBoards.length){const saved=state.get('color',{family:'tee',name:'Kem',hex:'#F4F0E6'});const formSelect=$('#formSelect'), colorInput=$('#mockColor'); if(colorInput)colorInput.value=saved.hex||'#F4F0E6'; const updateShirts=()=>{const f=formSelect.value,c=colorInput.value; $$('.shirt-svg').forEach(el=>el.innerHTML=shirtSvg(f,c,el.dataset.side));state.set('form',f);state.set('color',{...(state.get('color',{})),hex:c})}; formSelect.value=state.get('form','oversize');updateShirts();formSelect.addEventListener('change',updateShirts);colorInput.addEventListener('input',updateShirts);
    function setupArt(side){const input=$('#'+side+'File'), art=$('#'+side+'Art'), board=$('#'+side+'Board'), scale=$('#'+side+'Scale'), xpos=$('#'+side+'X'), ypos=$('#'+side+'Y'); let drag=null; const apply=()=>{art.style.width=scale.value+'%';art.style.left=xpos.value+'%';art.style.top=ypos.value+'%';art.dataset.x=xpos.value;art.dataset.y=ypos.value}; [scale,xpos,ypos].forEach(x=>x.addEventListener('input',apply)); apply(); input.addEventListener('change',()=>{const f=input.files[0];if(!f)return; if(f.type==='image/png'){const img=new Image();img.onload=()=>{if(Math.max(img.naturalWidth,img.naturalHeight)<2000)$('#qualityModal')?.classList.add('show');const cv=document.createElement('canvas');const max=1000,ratio=Math.min(1,max/Math.max(img.width,img.height));cv.width=img.width*ratio;cv.height=img.height*ratio;cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);const data=cv.toDataURL('image/png');art.src=data;art.hidden=false;state.set(side+'Art',data)};img.src=URL.createObjectURL(f)} else {art.hidden=true;state.set(side+'ArtName',f.name);$('#qualityModalText').textContent='Trình duyệt không thể preview trực tiếp file .AI/.PSD. Hệ thống vẫn ghi nhận file để xử lý phía server khi tích hợp backend.';$('#qualityModal')?.classList.add('show')}}); art.addEventListener('pointerdown',e=>{e.preventDefault();drag={x:e.clientX,y:e.clientY,l:parseFloat(xpos.value),t:parseFloat(ypos.value)};art.setPointerCapture(e.pointerId)});art.addEventListener('pointermove',e=>{if(!drag)return;const r=board.getBoundingClientRect();xpos.value=Math.max(0,Math.min(85,drag.l+(e.clientX-drag.x)/r.width*100));ypos.value=Math.max(0,Math.min(85,drag.t+(e.clientY-drag.y)/r.height*100));apply()});art.addEventListener('pointerup',()=>drag=null)} setupArt('front');setupArt('back'); $('#closeQuality')?.addEventListener('click',()=>$('#qualityModal').classList.remove('show'));$('#continueQuality')?.addEventListener('click',()=>$('#qualityModal').classList.remove('show'));
  }

  // AI Size
  const sizeForm=$('#sizeForm'); if(sizeForm){const formSel=$('#sizeFormType');formSel.value=state.get('form','oversize');sizeForm.addEventListener('submit',e=>{e.preventDefault();const form=formSel.value,h=+$('#height').value,w=+$('#weight').value,shoulder=+$('#shoulder').value||0,chest=+$('#chest').value||0,waist=+$('#waist').value||0,pref=$('#fitPref').value;let size='M',note='Form vừa';if(form==='polo'){size=w<45&&h<160?'S':w<55&&h<165?'M':w<65&&h<170?'L':w<75&&h<180?'XL':w<85&&h<185?'XXL':'3XL'} else if(form==='boxy'){size=w<70&&h<166?'M':w<85&&h<171?'L':'XL'} else if(form==='babytee'){size=w<50?'S':w<60?'M':'L'} else {size=w<50?'S':w<65?'M':w<80?'L':'XL';if(h>183&&size!=='XL')size={S:'M',M:'L',L:'XL'}[size]||size} if(pref==='wide'){const order=form==='polo'?['S','M','L','XL','XXL','3XL']:form==='boxy'?['M','L','XL']:form==='babytee'?['S','M','L']:['S','M','L','XL'];const i=order.indexOf(size);if(i>=0&&i<order.length-1)size=order[i+1];note='Rộng thoải mái'}if(pref==='slim')note='Ôm gọn';let optional=[shoulder,chest,waist,$('#gender').value?1:0,pref?1:0].filter(Boolean).length;let confidence=Math.min(96,78+optional*3);state.set('size',size);state.set('form',form);$('#sizeResult').innerHTML=`<div class="size-choice primary"><span class="tag">Đề xuất chính</span><h2 style="margin-top:12px">Size ${size}</h2><p>${note}</p><div class="confidence"><span style="width:${confidence}%"></span></div><small>Độ tin cậy ${confidence}%</small></div><div class="size-choice"><h3>Vì sao?</h3><p class="muted">Dựa trên ${h} cm, ${w} kg và ${optional} thông tin bổ sung. Kết quả đối chiếu theo bảng size H&P của form ${form}.</p></div>`;$('#sizeNext')?.classList.remove('disabled')})}

  // AI Fitting: ghép áo từ mockup (phôi + logo khách đã ghép) lên ảnh khách
  const fitInput=$('#fitImage'); if(fitInput){
    const canvas=$('#fitCanvas'),ctx=canvas.getContext('2d');let photo=null;
    const controls={scale:$('#fitScale'),x:$('#fitX'),y:$('#fitY'),opacity:$('#fitOpacity')};
    const FN={oversize:'Oversize',boxy:'Boxy',babytee:'Baby Tee',polo:'Polo'},MULT={oversize:1.6,boxy:1.5,babytee:1.4,polo:1.5};
    let color,form,size,blank=null,shirt=null,shirtKey='',building='';const imgs={};
    const load=src=>imgs[src]||(imgs[src]=new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=src}));
    const art=()=>{const a=document.getElementById('frontArt');return a&&!a.hidden&&a.naturalWidth?a:null};
    const key=()=>{const a=art();return blank.id+'|'+(a?a.src.length+a.style.cssText:'')};
    async function build(k){try{const cut=await load(blank.cut),c=document.createElement('canvas');c.width=1000;c.height=1250;const x=c.getContext('2d');x.drawImage(cut,0,0);
      const a=art();if(a){x.globalCompositeOperation='source-atop';const w=1000*parseFloat(a.style.width)/100;x.drawImage(a,1000*parseFloat(a.style.left)/100,1250*parseFloat(a.style.top)/100,w,w*a.naturalHeight/a.naturalWidth)}
      shirt=c;shirtKey=k}catch(e){}building='';draw()}
    const sync=()=>{color=state.get('color',{hex:'#111111'}).hex||'#111111';form=state.get('form','oversize');size=state.get('size','M');
      blank=window.HP_BLANK_CUT?window.HP_BLANK_CUT(form,color):null;$('#fitForm').textContent=FN[form]||form;$('#fitColor').textContent=blank?blank.name:color;$('#fitSize').textContent=size;draw()};
    window.HP_FIT_SYNC=sync;
    function draw(){if(!photo)return;canvas.width=photo.naturalWidth;canvas.height=photo.naturalHeight;ctx.drawImage(photo,0,0);if(!blank)return;
      const k=key();if(shirtKey!==k&&building!==k){building=k;build(k)}if(!shirt)return;
      const bb=blank.bb,f=canvas.width*(+controls.scale.value/100)/(bb[2]-bb[0]),cx=canvas.width*(+controls.x.value/100),cy=canvas.height*(+controls.y.value/100);
      ctx.globalAlpha=+controls.opacity.value/100;ctx.drawImage(shirt,cx-(bb[0]+bb[2])/2*f,cy-bb[1]*f,1000*f,1250*f);ctx.globalAlpha=1}
    // Auto Fit: dò vai người trong ảnh (nền studio) rồi đặt áo vào đúng vị trí
    function autoFit(){const set=(s,x,y)=>{const cl=(c,v)=>Math.round(Math.min(+c.max,Math.max(+c.min,v)));controls.scale.value=cl(controls.scale,s);controls.x.value=cl(controls.x,x);controls.y.value=cl(controls.y,y);controls.opacity.value=96};
      const W=photo.naturalWidth,H=photo.naturalHeight,s=Math.min(1,320/W),w=Math.max(8,Math.round(W*s)),h=Math.max(8,Math.round(H*s)),t=document.createElement('canvas');t.width=w;t.height=h;const c=t.getContext('2d');c.drawImage(photo,0,0,w,h);const d=c.getImageData(0,0,w,h).data;
      const px=(x,y)=>{const i=(y*w+x)*4;return[d[i],d[i+1],d[i+2]]},bs=[];for(let x=0;x<w;x++)bs.push(px(x,0),px(x,1));for(let y=0;y<h;y++)bs.push(px(0,y),px(w-1,y));
      const med=k=>{const a=bs.map(p=>p[k]).sort((p,q)=>p-q);return a[a.length>>1]},bg=[med(0),med(1),med(2)],cnt=new Array(h).fill(0),sx=new Array(h).fill(0);
      for(let y=0;y<h;y++)for(let x=0;x<w;x++){const p=px(x,y);if(Math.max(Math.abs(p[0]-bg[0]),Math.abs(p[1]-bg[1]),Math.abs(p[2]-bg[2]))>40){cnt[y]++;sx[y]+=x}}
      const y0=cnt.findIndex(n=>n>=Math.max(3,w*.02));if(y0<0)return set(42,50,24);const span=h-y0;let hw=0;for(let y=y0;y<y0+span*.1;y++)hw=Math.max(hw,cnt[y]);
      let ys=-1;for(let y=Math.round(y0+span*.08);y<h;y++)if(cnt[y]>1.6*hw){ys=y;break}if(ys<0)return set(42,50,24);
      let sw=0,n=0,sm=0;for(let y=ys;y<Math.min(h,ys+span*.06);y++){sw=Math.max(sw,cnt[y]);n+=cnt[y];sm+=sx[y]}
      set(sw*(MULT[form]||1.5)/w*100,sm/n/w*100,(ys-.3*(ys-y0))/h*100)}
    fitInput.addEventListener('change',()=>{const f=fitInput.files[0];if(!f)return;photo=new Image();photo.onload=()=>{canvas.width=photo.naturalWidth;canvas.height=photo.naturalHeight;autoFit();draw()};photo.src=URL.createObjectURL(f)});
    Object.values(controls).forEach(c=>c.addEventListener('input',draw));
    $('#autoFit')?.addEventListener('click',()=>{if(photo){autoFit();draw()}});
    $('#downloadFit')?.addEventListener('click',()=>{if(!photo){alert('Vui lòng tải ảnh của bạn lên trước khi tải xuống.');return}const a=document.createElement('a');a.href=canvas.toDataURL('image/jpeg',.92);a.download='hp-ai-fitting-preview.jpg';a.click()});
    sync();
  }
})();
