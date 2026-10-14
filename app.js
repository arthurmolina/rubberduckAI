import { DUCK_IDS, DUCK_META, CATEGORIES, getWeights } from './ducks.js';
import { getLocale, detectLanguage } from './i18n.js';

// --- State ---
const state = {
  duck: null,
  lang: detectLanguage(),
  messageCount: 0,
  lastCategory: null,
  lastResponseIndex: null,
};

// --- DOM ---
const screenSelect  = document.getElementById('screen-select');
const screenChat    = document.getElementById('screen-chat');
const duckGrid      = document.getElementById('duck-grid');
const messages      = document.getElementById('messages');
const input         = document.getElementById('input');
const btnSend       = document.getElementById('btn-send');
const btnBack       = document.getElementById('btn-back');
const btnLang       = document.getElementById('btn-lang');
const btnTheme      = document.getElementById('btn-theme');
const chatDuckName  = document.getElementById('chat-duck-name');
const chatAvatar    = document.getElementById('chat-avatar');
const typingEl      = document.getElementById('typing-indicator');
const typingAvatar  = document.getElementById('typing-avatar');

// --- i18n helpers ---
function t(key) {
  return getLocale(state.lang).ui[key] ?? key;
}

function duckLocale() {
  return getLocale(state.lang).ducks[state.duck];
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-list]').forEach(el => {
    const items = t(el.dataset.i18nList);
    if (Array.isArray(items)) {
      el.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }
  });
  input.placeholder = t('placeholder');
  btnLang.textContent = t('langToggle');
  document.title = t('title');
  document.documentElement.lang = state.lang;
}

// --- Duck grid ---
function renderDuckGrid() {
  const locale = getLocale(state.lang);
  duckGrid.innerHTML = '';
  DUCK_IDS.forEach(id => {
    const meta = DUCK_META[id];
    const info = locale.ducks[id];
    const card = document.createElement('button');
    card.className = 'duck-card';
    card.dataset.duck = id;
    card.style.setProperty('--duck-color', meta.color);
    card.style.setProperty('--duck-bg', meta.bg);
    card.innerHTML = `
      <img class="duck-card__img" src="${meta.img}" alt="${info.name}">
      <strong class="duck-card__name">${info.name}</strong>
      <span class="duck-card__tagline">${info.tagline}</span>
    `;
    card.addEventListener('click', () => selectDuck(id));
    duckGrid.appendChild(card);
  });
}

// --- Navigation ---
function selectDuck(id) {
  state.duck = id;
  state.messageCount = 0;
  state.lastCategory = null;
  state.lastResponseIndex = null;

  const meta = DUCK_META[id];
  const info = duckLocale();

  document.body.dataset.duck = id;
  document.documentElement.style.setProperty('--accent', meta.color);
  document.documentElement.style.setProperty('--accent-bg', meta.bg);

  chatAvatar.innerHTML = `<img src="${meta.img}" alt="${info.name}">`;
  typingAvatar.innerHTML = `<img src="${meta.img}" alt="${info.name}">`;
  chatDuckName.textContent = info.name;
  btnBack.textContent = t('back');

  messages.innerHTML = '';
  messages.appendChild(typingEl); // keep typing indicator in DOM
  typingEl.hidden = true;

  showScreen('chat');
  appendDuckBubble(info.welcome);
  input.focus();
}

function goBack() {
  showScreen('select');
  state.duck = null;
  document.body.removeAttribute('data-duck');
  document.documentElement.style.removeProperty('--accent');
  document.documentElement.style.removeProperty('--accent-bg');
}

function showScreen(name) {
  screenSelect.hidden = name !== 'select';
  screenChat.hidden   = name !== 'chat';
}

// --- Messages ---
function addUserMessage(text) {
  const el = document.createElement('div');
  el.className = 'message message--user';
  el.textContent = text;
  messages.insertBefore(el, typingEl);
  scrollToBottom();
}

function addDuckMessage(text) {
  const delay = 700 + Math.random() * 900;
  typingEl.hidden = false;
  scrollToBottom();
  setTimeout(() => {
    typingEl.hidden = true;
    appendDuckBubble(text);
  }, delay);
}

function appendDuckBubble(text) {
  const el = document.createElement('div');
  el.className = 'message message--duck';
  el.innerHTML = `
    <span class="message__avatar"><img src="${DUCK_META[state.duck].img}" alt="duck"></span>
    <span class="message__bubble"></span>
  `;
  el.querySelector('.message__bubble').textContent = text;
  messages.insertBefore(el, typingEl);
  scrollToBottom();
}

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

// --- Response logic ---
function getResponse() {
  const pools   = duckLocale().responses;
  const weights = getWeights(state.messageCount);

  // Pick category by weight, avoiding the last used one
  const eligible = CATEGORIES.map((cat, i) => ({
    cat,
    weight: cat === state.lastCategory ? 0 : weights[i],
  }));
  const total = eligible.reduce((s, e) => s + e.weight, 0);

  let rand = Math.random() * total;
  let category = eligible.at(-1).cat;
  for (const e of eligible) {
    rand -= e.weight;
    if (rand <= 0) { category = e.cat; break; }
  }

  // Pick response, avoiding last index if same category
  const pool = pools[category];
  let idx;
  if (pool.length === 1) {
    idx = 0;
  } else {
    const sameCategory = category === state.lastCategory;
    do { idx = Math.floor(Math.random() * pool.length); }
    while (sameCategory && idx === state.lastResponseIndex);
  }

  state.lastCategory      = category;
  state.lastResponseIndex = idx;
  return pool[idx];
}

// --- Send ---
function send() {
  const text = input.value.trim();
  if (!text || !state.duck || !typingEl.hidden) return;
  input.value = '';
  adjustTextarea();
  addUserMessage(text);
  state.messageCount++;
  addDuckMessage(getResponse());
}

// --- Textarea auto-resize ---
function adjustTextarea() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 120) + 'px';
}

// --- Events ---
btnSend.addEventListener('click', send);

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

input.addEventListener('input', adjustTextarea);

btnBack.addEventListener('click', goBack);

btnLang.addEventListener('click', () => {
  state.lang = state.lang === 'pt-BR' ? 'en-US' : 'pt-BR';
  localStorage.setItem('rubberduck-lang', state.lang);
  applyI18n();
  renderDuckGrid();
  if (state.duck) {
    chatDuckName.textContent = duckLocale().name;
    btnBack.textContent = t('back');
  }
});

// --- Theme ---
const THEMES = ['system', 'light', 'dark'];
const THEME_ICONS = { system: '⊙', light: '☀', dark: '☾' };

function applyTheme(theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.dataset.theme = theme;
  }
  btnTheme.textContent = THEME_ICONS[theme];
  btnTheme.setAttribute('aria-label', theme);
  localStorage.setItem('rubberduck-theme', theme);
}

function loadTheme() {
  const saved = localStorage.getItem('rubberduck-theme');
  return THEMES.includes(saved) ? saved : 'system';
}

btnTheme.addEventListener('click', () => {
  const current = loadTheme();
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  applyTheme(next);
});

// --- Init ---
applyTheme(loadTheme());
applyI18n();
renderDuckGrid();
showScreen('select');
