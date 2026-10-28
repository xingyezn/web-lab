(()=>{'use strict';const toast=document.getElementById('toast');let timer;function say(t){clearTimeout(timer);toast.textContent=t;timer=setTimeout(()=>toast.textContent='',3500)}
const menu=document.getElementById('menu-toggle'),side=document.getElementById('sidebar'),shade=document.getElementById('nav-shade');function closeMenu(){side.classList.remove('is-open');shade.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');side.removeAttribute('role');side.removeAttribute('aria-modal')}menu?.addEventListener('click',()=>{const open=!side.classList.contains('is-open');side.classList.toggle('is-open',open);shade.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));if(open)side.querySelector('a').focus()});shade?.addEventListener('click',closeMenu);side.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&side.classList.contains('is-open')){closeMenu();menu.focus()}});window.addEventListener('resize',()=>{if(innerWidth>740)closeMenu()});
const items=JSON.parse(document.getElementById('copy-data')?.textContent||'{}'),manual=document.getElementById('manual-copy'),area=document.getElementById('manual-text');function legacy(t){const old=document.activeElement,f=document.createElement('textarea');f.value=t;f.style.cssText='position:fixed;left:0;top:0;opacity:0;width:1px;height:1px';document.body.append(f);f.focus();f.select();let ok=false;try{ok=document.execCommand('copy')}catch{}f.remove();old?.focus({preventScroll:true});return ok}async function copy(b){const t=items[b.dataset.copy];if(typeof t!=='string')return;b.disabled=true;let ok=false;try{if(navigator.clipboard)try{await navigator.clipboard.writeText(t);ok=true}catch{}if(!ok)ok=legacy(t);if(ok){say('已复制');const old=b.innerHTML;b.textContent='已复制';setTimeout(()=>b.innerHTML=old,1400)}else{area.value=t;manual.showModal();area.focus();area.select()}}finally{b.disabled=false}}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-copy]');if(b){copy(b);return}const a=e.target.closest('a[data-download]');if(a&&location.protocol==='file:'){e.preventDefault();try{window.caseDownloads=window.caseDownloads||{};const key=a.dataset.download;if(!window.caseDownloads[key])await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=a.dataset.offline;s.onload=resolve;s.onerror=reject;document.body.append(s)});const f=window.caseDownloads[key],bytes=Uint8Array.from(atob(f.data),c=>c.charCodeAt(0)),url=URL.createObjectURL(new Blob([bytes],{type:f.mime})),link=document.createElement('a');link.href=url;link.download=a.download;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),15000)}catch{say('下载未完成，请在材料包中打开对应文件。')}}const im=e.target.closest('a[data-image]');if(im){e.preventDefault();const dialog=document.getElementById('image-view');document.getElementById('large-image').src=im.href;document.getElementById('large-image').alt=im.dataset.caption;document.getElementById('image-title').textContent=im.dataset.caption;dialog.showModal()}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));document.getElementById('manual-select')?.addEventListener('click',()=>{area.focus();area.select()});
const search=document.getElementById('case-search'),rows=[...document.querySelectorAll('[data-resource]')],filters=[...document.querySelectorAll('[data-filter]')];let group='全部';function filter(){let count=0;const q=(search?.value||'').trim().toLowerCase();rows.forEach(r=>{const visible=(group==='全部'||r.dataset.group===group)&&r.dataset.search.toLowerCase().includes(q);r.hidden=!visible;if(visible)count++});const empty=document.getElementById('no-results');if(empty)empty.hidden=count>0;const result=document.getElementById('result-count');if(result)result.textContent='共 '+count+' 个案例'}search?.addEventListener('input',filter);filters.forEach(b=>b.addEventListener('click',()=>{group=b.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filter()}));document.getElementById('clear-search')?.addEventListener('click',()=>{search.value='';group='全部';filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='全部')));filter();search.focus()});
})();


// Share the published gallery from any case page, including local previews.
(() => {
  'use strict';
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  const siteUrl = 'https://xingyezn.github.io/web-lab/ai-edu-case-gallery/';
  const scriptUrl = document.currentScript.src;
  const qrUrl = new URL('site-qr.png', scriptUrl).href;
  const actions = document.createElement('div');
  actions.className = 'share-actions';
  const officialLink = topbar.querySelector('.external');
  if (officialLink) actions.append(officialLink);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'share-trigger';
  trigger.setAttribute('aria-label', '分享网站，查看二维码');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', 'site-share');
  trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h2v2h-2z M21 15v6h-6 M12 3v3 M3 12h3 M12 12h4 M12 18v3"/></svg><span>分享<span class="share-label-extra">网站</span></span>';
  actions.append(trigger);
  topbar.append(actions);

  const dialog = document.createElement('dialog');
  dialog.id = 'site-share';
  dialog.className = 'share-dialog';
  dialog.setAttribute('aria-labelledby', 'site-share-title');
  dialog.setAttribute('aria-describedby', 'site-share-description');
  dialog.innerHTML = `
    <div class="dialog-top">
      <h2 id="site-share-title">分享AI应用案例库</h2>
      <button type="button" class="share-close" autofocus>关闭</button>
    </div>
    <p id="site-share-description">用微信或手机相机扫码，打开案例网站。</p>
    <div class="share-qr"><img src="${qrUrl}" width="492" height="492" alt="AI应用案例库网站二维码，下方可复制同一网址"></div>
    <label class="share-url-label" for="site-share-url">网站链接</label>
    <input id="site-share-url" class="share-url" type="url" readonly value="${siteUrl}" spellcheck="false">
    <div class="share-buttons">
      <button type="button" class="primary" id="site-share-copy">复制链接</button>
      <a class="button" href="${qrUrl}" download="AI应用案例库-分享二维码.png">保存二维码</a>
    </div>
    <p class="share-status" role="status" aria-live="polite"></p>`;
  document.body.append(dialog);

  const link = dialog.querySelector('.share-url');
  const copy = dialog.querySelector('#site-share-copy');
  const status = dialog.querySelector('.share-status');
  let resetTimer;
  trigger.addEventListener('click', () => {
    clearTimeout(resetTimer);
    copy.textContent = '复制链接';
    status.textContent = '';
    dialog.showModal();
  });
  dialog.querySelector('.share-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => trigger.focus({preventScroll: true}));
  link.addEventListener('click', () => link.select());

  copy.addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(siteUrl);
      copied = true;
    } catch {
      link.focus();
      link.select();
      try { copied = document.execCommand('copy'); } catch {}
    }
    if (copied) {
      copy.textContent = '已复制';
      status.textContent = '链接已复制，可以粘贴分享。';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { copy.textContent = '复制链接'; }, 1800);
    } else {
      status.textContent = '已选中网址，请长按复制，或按Ctrl+C复制。';
    }
  });
})();
