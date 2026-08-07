/* cabinet.js v4 — expanded Mail Кошелёк */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // === ACCOUNT DATA ===
  const accounts = {
    personal: {
      name: 'Кирилл Сорочук', initials: 'КС', email: 'k.sorochuk@mail.ru',
      cardClass: '', cardBrand: 'МИР', cardNumber: '•••• •••• •••• 4829',
      holder: 'КИРИЛЛ СОРОЧУК', expiry: '12/28', cardLogo: 'Mail Кошелёк',
      balance: '248 350 ₽', balanceSub: '+85 000 ₽ сегодня',
      quickActions: [
        {icon:'qa-blue',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',label:'Пополнить',goto:'transfers'},
        {icon:'qa-green',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',label:'Перевести',goto:'transfers'},
        {icon:'qa-orange',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>',label:'Почта',goto:'mail'},
        {icon:'qa-purple',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',label:'Сплит',goto:'split'}
      ],
      txs: [
        {type:'income',icon:'ЗП',name:'Зарплата ООО «Техноком»',meta:'Сегодня, 10:30 · Карта МИР',amount:'+85 000 ₽'},
        {type:'income',icon:'КЛ',name:'Оплата от «Веб-Студия»',meta:'Сегодня, 09:15 · ИП счёт',amount:'+45 000 ₽'},
        {type:'expense',icon:'ЯМ',name:'Яндекс Маркет',meta:'Вчера, 18:45 · Наушники Sony',amount:'−4 290 ₽'},
        {type:'expense',icon:'ПЯ',name:'Пятёрочка',meta:'Вчера, 12:30 · Продукты',amount:'−3 847 ₽'},
        {type:'income',icon:'МК',name:'Мария Кузнецова',meta:'Вчера, 14:20 · Перевод',amount:'+2 500 ₽'},
        {type:'expense',icon:'ЯТ',name:'Яндекс Такси',meta:'06.08, 23:15 · Поездка',amount:'−680 ₽'},
      ],
      subs: [{icon:'♪',bg:'#2688EB',name:'VK Музыка',plan:'199 ₽/мес',next:'01.09'},{icon:'▶',bg:'#FF5C5C',name:'Кинопоиск',plan:'399 ₽/мес',next:'05.09'},{icon:'✉',bg:'#6C5CE7',name:'Mail.ru Премиум',plan:'149 ₽/мес',next:'15.09'}]
    },
    biz: {
      name: 'ИП Сорочук К.А.', initials: 'ИП', email: 'ip-sorochuk@mail.ru',
      cardClass: 'card-mir--biz', cardBrand: 'МИР БИЗНЕС', cardNumber: '•••• •••• •••• 7714',
      holder: 'ИП СОРОЧУК К.А.', expiry: '06/29', cardLogo: 'Mail Кошелёк Бизнес',
      balance: '1 245 800 ₽', balanceSub: '+45 000 ₽ от «Веб-Студия»',
      quickActions: [
        {icon:'qa-blue',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',label:'Пополнить',goto:'transfers'},
        {icon:'qa-green',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',label:'Перевести',goto:'transfers'},
        {icon:'qa-orange',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>',label:'Почта',goto:'mail'},
        {icon:'qa-purple',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y1="13"/><line x1="16" y1="17" x2="8" y1="17"/><polyline points="10 9 9 9 8 10"/></svg>',label:'Налоги',goto:'analytics'}
      ],
      txs: [
        {type:'income',icon:'ВС',name:'ООО «Веб-Студия»',meta:'Сегодня, 09:15 · Оплата за услуги',amount:'+45 000 ₽'},
        {type:'income',icon:'ДЛ',name:'ООО «Дизайн-Лаб»',meta:'03.08 · Сайт под ключ',amount:'+120 000 ₽'},
        {type:'expense',icon:'НД',name:'НДФЛ Q2 2026',meta:'05.08 · Автоматический платёж',amount:'−68 400 ₽'},
        {type:'expense',icon:'ОФ',name:'Офис.ру — Аренда',meta:'01.08 · За август',amount:'+45 000 ₽'},
        {type:'expense',icon:'ХЛ',name:'Хостинг Timeweb',meta:'01.08 · VPS сервер',amount:'−2 400 ₽'},
        {type:'income',icon:'ФЛ',name:'Фриланс-Проект',meta:'28.07 · Верстка лендинга',amount:'+35 000 ₽'},
      ],
      subs: [{icon:'☁',bg:'#00C853',name:'Облако Mail.ru Бизнес',plan:'299 ₽/мес',next:'01.09'},{icon:'⚡',bg:'#FF9500',name:'1С-Онлайн',plan:'1 500 ₽/мес',next:'10.09'},{icon:'📊',bg:'#0077FF',name:'МойНалог',plan:'бесплатно',next:'—'}]
    },
    premium: {
      name: 'Анна Петрова', initials: 'АП', email: 'a.petrova@mail.ru',
      cardClass: 'card-mir--prem', cardBrand: 'МИР PREMIUM', cardNumber: '•••• •••• •••• 5523',
      holder: 'АННА ПЕТРОВА', expiry: '03/30', cardLogo: 'Mail Кошелёк Premium',
      balance: '892 100 ₽', balanceSub: 'Premium · Кешбэк до 15%',
      quickActions: [
        {icon:'qa-blue',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>',label:'Пополнить',goto:'transfers'},
        {icon:'qa-green',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',label:'Перевести',goto:'transfers'},
        {icon:'qa-orange',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>',label:'Почта',goto:'mail'},
        {icon:'qa-purple',svg:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',label:'Сплит',goto:'split'}
      ],
      txs: [
        {type:'income',icon:'ЗП',name:'Зарплата Яндекс',meta:'05.08 · Premium зарплата',amount:'+180 000 ₽'},
        {type:'expense',icon:'ВК',name:'VK Музыка Premium',meta:'05.08 · Подписка (включена в тариф)',amount:'0 ₽'},
        {type:'expense',icon:'КП',name:'Кинопоиск Premium',meta:'05.08 · Включена в тариф',amount:'0 ₽'},
        {type:'expense',icon:'ЯМ',name:'Wildberries',meta:'04.08 · Одежда и обувь',amount:'−12 450 ₽'},
        {type:'income',icon:'КБ',name:'Кешбэк Premium',meta:'04.08 · 15% от покупок',amount:'+1 868 ₽'},
        {type:'expense',icon:'ЯТ',name:'Яндекс Такси Comfort',meta:'03.08 · Комфорт тариф',amount:'−890 ₽'},
      ],
      subs: [{icon:'♪',bg:'#2688EB',name:'VK Музыка Premium',plan:'включено',next:'—'},{icon:'▶',bg:'#FF5C5C',name:'Кинопоиск Premium',plan:'включено',next:'—'},{icon:'☁',bg:'#00C853',name:'Облако 1 ТБ',plan:'включено',next:'—'},{icon:'Y',bg:'#FC0',name:'Яндекс.Плюс',plan:'включено',next:'—'}]
    }
  };

  let currentAcct = 'personal';

  function renderHome() {
    const a = accounts[currentAcct];
    const premiumBadge = currentAcct === 'premium' ? ' <span class="premium-badge">PREMIUM</span>' : '';
    let txHtml = a.txs.map(t => {
      const isIncome = t.amount.startsWith('+');
      return '<div class="tx-item"><div class="tx-item__icon ' + (isIncome ? 'tx-income' : 'tx-expense') + '">' + t.icon + '</div><div class="tx-item__info"><div class="tx-item__name">' + t.name + '</div><div class="tx-item__meta">' + t.meta + '</div></div><div class="tx-item__amount' + (isIncome ? ' tx-plus' : '') + '">' + t.amount + '</div></div>';
    }).join('');
    let subHtml = a.subs.map(s => '<div class="sub-mini"><div class="sub-mini__icon" style="background:' + s.bg + '">' + s.icon + '</div><div class="sub-mini__info"><div class="sub-mini__name">' + s.name + '</div><div class="sub-mini__next">' + s.plan + '</div></div></div>').join('');
    let qaHtml = a.quickActions.map(q => '<button class="quick-action" data-goto="' + q.goto + '"><div class="quick-action__icon ' + q.icon + '">' + q.svg + '</div><span>' + q.label + '</span></button>').join('');

    $('#acctContent').innerHTML =
      '<div class="card-mir ' + a.cardClass + '"><div class="card-mir__top"><div class="card-mir__logo">' + a.cardLogo + premiumBadge + '</div><div class="card-mir__brand">' + a.cardBrand + '</div></div><div class="card-mir__number">' + a.cardNumber + '</div><div class="card-mir__bottom"><div class="card-mir__holder">' + a.holder + '</div><div class="card-mir__expiry">' + a.expiry + '</div></div><div class="card-mir__chip"></div></div>' +
      '<div class="balance-block"><div class="balance-block__label">Общий баланс</div><div class="balance-block__amount">' + a.balance + '</div><div class="balance-block__sub">' + a.balanceSub + '</div></div>' +
      '<div class="quick-actions">' + qaHtml + '</div>' +
      '<div class="section-block"><div class="section-block__header"><h2>Последние операции</h2><button class="section-block__link" data-goto="transfers">Все</button></div><div class="tx-list">' + txHtml + '</div></div>' +
      '<div class="section-block"><div class="section-block__header"><h2>Подписки</h2><button class="section-block__link" data-goto="subs">Управлять</button></div><div class="sub-mini-list">' + subHtml + '</div></div>';

    // Rebind data-goto in newly rendered content
    $('#acctContent').querySelectorAll('[data-goto]').forEach(el => {
      el.addEventListener('click', (e) => { e.preventDefault(); closeDropdowns(); goTo(el.dataset.goto); });
    });
  }

  // Account switcher
  $$('.acct-chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.acct-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentAcct = chip.dataset.acct;
    const a = accounts[currentAcct];
    $('#profileBtn').textContent = a.initials;
    renderHome();
  }));

  // Initial render
  renderHome();

  // === SCREEN NAV ===
  const screenMap = { home:'screen-home', transfers:'screen-transfers', mail:'screen-mail', subs:'screen-subs', cards:'screen-cards', analytics:'screen-analytics', cashback:'screen-cashback', split:'screen-split', settings:'screen-settings' };

  function goTo(name) {
    const id = screenMap[name]; if (!id) return;
    $$('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id); if (target) target.classList.add('active');
    $('#content').scrollTop = 0;
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    if (name === 'analytics') animateBars();
  }

  $$('.tab').forEach(tab => tab.addEventListener('click', () => goTo(tab.dataset.tab)));
  $$('[data-goto]').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); closeDropdowns(); goTo(el.dataset.goto); }));

  // === DROPDOWNS ===
  const overlay = $('#overlay'), notifPanel = $('#notifPanel'), profilePanel = $('#profilePanel');
  function closeDropdowns() { notifPanel.classList.remove('open'); profilePanel.classList.remove('open'); overlay.classList.remove('visible'); }
  function toggleDropdown(p) { const o = p.classList.contains('open'); closeDropdowns(); if (!o) { p.classList.add('open'); overlay.classList.add('visible'); } }
  $('#notifBtn').addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(notifPanel); });
  $('#profileBtn').addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(profilePanel); });
  overlay.addEventListener('click', closeDropdowns);
  $('#readAllBtn').addEventListener('click', () => { $$('.notif--unread').forEach(n => n.classList.remove('notif--unread')); $('#notifBadge').classList.add('hidden'); toast('Все уведомления прочитаны'); });

  // === SEG TABS ===
  $$('.seg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.screen') || tab.closest('.seg-tabs').parentElement;
      parent.querySelectorAll('.seg-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      parent.querySelectorAll('.seg-page').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('seg-' + tab.dataset.seg);
      if (target) target.classList.add('active');
    });
  });

  // === CHIPS ===
  $$('.chip').forEach(c => c.addEventListener('click', () => { const i = $('#transferTo'); if (i) i.value = c.dataset.contact; $$('.chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));

  // === TRANSFER ===
  $('#transferSend').addEventListener('click', () => { const t=$('#transferTo').value,a=$('#transferAmount').value; if(!t||!a){toast('Заполните все поля');return;} showSuccess(); setTimeout(()=>toast('Перевод '+parseInt(a).toLocaleString('ru-RU')+' ₽ отправлен'),400); $('#transferTo').value='';$('#transferAmount').value='';$('#transferComment').value='';$$('.chip').forEach(c=>c.classList.remove('active')); });
  $('#requestSend').addEventListener('click', () => { const f=$('#requestFrom').value,a=$('#requestAmount').value; if(!f||!a){toast('Заполните все поля');return;} toast('Запрос '+parseInt(a).toLocaleString('ru-RU')+' ₽ отправлен'); $('#requestFrom').value='';$('#requestAmount').value=''; });
  $$('.filter-chip').forEach(c => c.addEventListener('click', () => { $$('.filter-chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); const f=c.dataset.filter; $$('#historyList .tx-item').forEach(tx => { tx.style.display=(f==='all'||tx.dataset.type===f)?'':'none'; }); }));

  // === MAIL PAY ===
  const sheet = $('#paymentSheet');
  $$('.mail-pay-btn').forEach(btn => btn.addEventListener('click', () => { const it=btn.closest('.mail-item'); $('#payService').textContent=it.dataset.service; $('#payAmount').textContent=parseInt(it.dataset.amount).toLocaleString('ru-RU')+' ₽'; $('#payDesc').textContent=it.dataset.desc; $('#payTotal').textContent=parseInt(it.dataset.amount).toLocaleString('ru-RU')+' ₽'; sheet.classList.add('open'); }));
  $('#sheetOverlay').addEventListener('click', () => sheet.classList.remove('open'));
  $('#payCancel').addEventListener('click', () => sheet.classList.remove('open'));
  $('#payConfirm').addEventListener('click', () => { sheet.classList.remove('open'); showSuccess(); });

  // === SUBS ===
  $$('.auto-renew').forEach(t => t.addEventListener('change', () => { toast(t.checked?'Автопродление «'+t.dataset.name+'» включено':'Автопродление «'+t.dataset.name+'» выключено'); }));
  $$('.cancel-sub').forEach(btn => btn.addEventListener('click', function() { if(this.dataset.confirming==='true')return; const n=this.dataset.name,o=this.innerHTML; this.dataset.confirming='true'; this.innerHTML='Вы уверены?'; this.style.background='#FFF0F0'; const once=()=>{this.innerHTML='Отменена';this.disabled=true;this.style.opacity='0.5';this.style.cursor='default';this.style.background='';const c=this.closest('.sub-card');if(c)c.style.opacity='0.5';toast('Подписка «'+n+'» отменена');}; const undo=()=>{this.innerHTML=o;this.dataset.confirming='false';this.style.background='';}; this.addEventListener('click',function h(){this.removeEventListener('click',h);once();}); setTimeout(()=>{if(this.dataset.confirming==='true')undo();},3000); }));
  $$('.catalog-connect').forEach(btn => btn.addEventListener('click', () => { const c=btn.closest('.catalog-card'); const n=c.querySelector('.catalog-card__name').textContent; btn.textContent='Готово'; btn.disabled=true; btn.style.opacity='0.5'; toast('«'+n+'» подключено'); }));

  // === CARDS ===
  let frozen=false;
  $('#freezeCardBtn').addEventListener('click',()=>{frozen=!frozen;$('#freezeCardBtn').innerHTML=frozen?'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Разморозить':'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Заморозить';toast(frozen?'Карта заморожена':'Карта разблокирована');});
  $('#cardDetailsBtn').addEventListener('click',()=>{toast('Реквизиты: 5469 3800 0000 4829');});

  // === ANALYTICS ===
  function animateBars() { $$('.chart-bar').forEach((b,i)=>{b.style.height='0';b.style.transition='none';setTimeout(()=>{b.style.transition='height 0.6s cubic-bezier(0.4,0,0.2,1)';b.style.height=b.dataset.h;},i*80);}); }
  $$('.period-tab').forEach(t => t.addEventListener('click', () => { $$('.period-tab').forEach(x => x.classList.remove('active')); t.classList.add('active'); animateBars(); }));

  // === CASHBACK ===
  $('#withdrawCashback').addEventListener('click',()=>{showSuccess();toast('4 820 ₽ выведены на карту');});

  // === SPLIT ===
  let splitN=2; function calcSplit(){const t=parseInt($('#splitTotal').value)||0;$('#splitPerPerson').textContent=(splitN>0?Math.ceil(t/splitN):0).toLocaleString('ru-RU')+' ₽';}
  $('#splitMinus').addEventListener('click',()=>{if(splitN>2){splitN--;$('#splitCount').textContent=splitN;calcSplit();}});
  $('#splitPlus').addEventListener('click',()=>{if(splitN<20){splitN++;$('#splitCount').textContent=splitN;calcSplit();}});
  $('#splitTotal').addEventListener('input',calcSplit); calcSplit();
  $('#splitSend').addEventListener('click',()=>{const t=parseInt($('#splitTotal').value)||0;if(t<=0){toast('Введите сумму');return;}showSuccess();setTimeout(()=>toast('Запросы отправлены '+splitN+' участникам'),400);});

  // === SETTINGS ===
  $('#transferLimit').addEventListener('input',()=>{$('#transferLimitVal').textContent=parseInt($('#transferLimit').value).toLocaleString('ru-RU');});
  $('#paymentLimit').addEventListener('input',()=>{$('#paymentLimitVal').textContent=parseInt($('#paymentLimit').value).toLocaleString('ru-RU');});

  // === SUCCESS / TOAST ===
  function showSuccess(){const el=$('#successOverlay');el.classList.remove('show');void el.offsetWidth;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1200);}
  function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;$('#toastContainer').appendChild(t);setTimeout(()=>{t.style.transition='opacity 0.3s';t.style.opacity='0';setTimeout(()=>t.remove(),300);},2500);}

  // === ESC ===
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape'){if(sheet.classList.contains('open')){sheet.classList.remove('open');return;}if(notifPanel.classList.contains('open')||profilePanel.classList.contains('open')){closeDropdowns();return;}window.location.href='index.html';}});

  console.log('%c Mail Кошелёк %c v4.0 — 3 accounts ','background:#0077FF;color:#fff;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:bold;','background:#222;color:#fff;padding:4px 8px;border-radius:0 4px 4px 0;');
});
