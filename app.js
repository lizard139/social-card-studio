const STORAGE_KEY = 'social-card-studio-v1';

const RECIPES = [
  { id: 'S01', name: '强调封面', desc: '细字重大标题 + 观点区 + 摘要索引', capacity: 3, kind: 'cover' },
  { id: 'S02', name: '双向对比', desc: '两列对照 + 结论', capacity: 2, kind: 'compare' },
  { id: 'S03', name: '文件卡片', desc: '大型对象区 + 三至四项属性', capacity: 4, kind: 'file' },
  { id: 'S04', name: '界面展示', desc: '主界面 + 功能模块', capacity: 3, kind: 'interface' },
  { id: 'S05', name: '问题警示', desc: '三条错误与后果', capacity: 3, kind: 'warning' },
  { id: 'S06', name: '流程架构', desc: '三阶段输入与结果', capacity: 3, kind: 'pipeline' },
  { id: 'S07', name: '结论台账', desc: '大观点 + 三条收束', capacity: 3, kind: 'closing' },
  { id: 'S08', name: '图片主视觉', desc: '大图 + 标题 + 三指标', capacity: 3, kind: 'hero' },
  { id: 'S09', name: 'KPI 数据', desc: '四组关键指标', capacity: 4, kind: 'kpi' },
  { id: 'S10', name: '横向条形图', desc: '五至十项排行', capacity: 10, kind: 'bars' },
  { id: 'S11', name: '条目台账', desc: '四至六条量化内容', capacity: 6, kind: 'ledger' },
  { id: 'S12', name: '能力矩阵', desc: '八项能力 + 汇总数字', capacity: 8, kind: 'matrix' }
];

const THEMES = [
  { id: 'ikb', name: 'IKB Blue', color: '#002fa7' },
  { id: 'lemon-yellow', name: 'Lemon Yellow', color: '#ffd500' },
  { id: 'lemon-green', name: 'Lemon Green', color: '#c5e803' },
  { id: 'safety-orange', name: 'Safety Orange', color: '#ff6b35' }
];

const LEGACY_RECIPE_MAP = { M01: 'S01', M04: 'S07', M05: 'S11', M10: 'S04' };

const COMPONENTS = [
  { type: 'meta', name: '眉题', desc: '编号、栏目或来源信息', icon: 'hash' },
  { type: 'title', name: '主标题', desc: '页面的核心判断', icon: 'type' },
  { type: 'text', name: '说明文字', desc: '副标题与上下文', icon: 'align-left' },
  { type: 'image', name: '主视觉图片', desc: '照片、截图或证据图', icon: 'image' },
  { type: 'summary', name: '摘要卡组', desc: '三项并列信息', icon: 'columns-3' },
  { type: 'compare', name: '双栏对比', desc: 'A / B 对照结构', icon: 'columns-2' },
  { type: 'file', name: '文件对象', desc: '对象与属性信息', icon: 'file-json-2' },
  { type: 'interface', name: '界面展示', desc: '界面截图与功能模块', icon: 'panel-top' },
  { type: 'warning', name: '问题清单', desc: '错误与后果列表', icon: 'triangle-alert' },
  { type: 'steps', name: '流程步骤', desc: '三阶段处理流程', icon: 'list-ordered' },
  { type: 'stats', name: '指标摘要', desc: '三项关键数字', icon: 'sigma' },
  { type: 'kpi', name: 'KPI 数据', desc: '四组纵向指标', icon: 'chart-column' },
  { type: 'bars', name: '横向条形图', desc: '多项数值排行', icon: 'chart-bar-big' },
  { type: 'ledger', name: '条目台账', desc: '结构化条目列表', icon: 'rows-3' },
  { type: 'matrix', name: '能力矩阵', desc: '八项能力总览', icon: 'grid-2x2' },
  { type: 'conclusion', name: '结论区', desc: '页面收束与观点强调', icon: 'badge-check' }
];

const TEMPLATE_COMPONENTS = {
  S01: [['meta', 12], ['title', 12], ['text', 12], ['summary', 12]],
  S02: [['meta', 12], ['title', 12], ['compare', 12], ['conclusion', 12]],
  S03: [['meta', 12], ['title', 12], ['file', 12]],
  S04: [['meta', 12], ['title', 12], ['interface', 12]],
  S05: [['meta', 12], ['title', 12], ['warning', 12], ['conclusion', 12]],
  S06: [['meta', 12], ['title', 12], ['steps', 12], ['conclusion', 12]],
  S07: [['meta', 12], ['title', 12], ['ledger', 12], ['conclusion', 12]],
  S08: [['image', 12], ['meta', 12], ['title', 12], ['stats', 12]],
  S09: [['meta', 12], ['title', 12], ['kpi', 12]],
  S10: [['meta', 12], ['title', 12], ['bars', 12]],
  S11: [['meta', 12], ['title', 12], ['ledger', 12]],
  S12: [['meta', 12], ['title', 12], ['matrix', 12], ['conclusion', 12]]
};

// The skill's 3:4 Swiss recipes have fixed information capacity. Extra modules
// remain available through the editor's explicit custom-layout path.
const STRICT_RECIPE_ITEMS = {
  S01: { type: 'summary', min: 2, max: 4 },
  S02: { type: 'compare', min: 2, max: 2 },
  S03: { type: 'file', min: 3, max: 4 },
  S04: { type: 'interface', min: 2, max: 3 },
  S05: { type: 'warning', min: 3, max: 3 },
  S06: { type: 'steps', min: 3, max: 3 },
  S07: { type: 'ledger', min: 3, max: 3 },
  S08: { type: 'stats', min: 3, max: 3 },
  S09: { type: 'kpi', min: 3, max: 4 },
  S10: { type: 'bars', min: 5, max: 10 },
  S11: { type: 'ledger', min: 4, max: 6 },
  S12: { type: 'matrix', min: 8, max: 8 }
};

function matchesStrictRecipe(page) {
  const expected = TEMPLATE_COMPONENTS[page.recipe];
  if (!expected || page.components.length !== expected.length) return false;
  if (!page.components.every((component, index) => component.type === expected[index][0] && component.span === expected[index][1] && component.visible)) return false;
  const rule = STRICT_RECIPE_ITEMS[page.recipe];
  const count = page.components.find(component => component.type === rule.type)?.data?.items?.length || 0;
  return count >= rule.min && count <= rule.max;
}
function isStrictPage(page) { return page.layoutMode !== 'custom' && matchesStrictRecipe(page); }
function syncLayoutMode(page) {
  page.layoutMode = matchesStrictRecipe(page) ? 'template' : 'custom';
  return page.layoutMode;
}

function componentItemCount(type) {
  return ({ summary: 6, compare: 6, file: 8, interface: 6, warning: 10, steps: 10, stats: 6, kpi: 8, bars: 12, ledger: 12, matrix: 12 })[type] || 0;
}

function componentDefaults(type, page = {}) {
  const sourceItems = Array.isArray(page.items) ? page.items : [];
  const rule = STRICT_RECIPE_ITEMS[page.recipe]?.type === type ? STRICT_RECIPE_ITEMS[page.recipe] : null;
  const defaultCount = rule?.max || ({ summary: 3, compare: 2, file: 4, interface: 3, warning: 3, steps: 3, stats: 3, kpi: 4, bars: 4, ledger: 4, matrix: 6 })[type] || 3;
  const count = rule ? Math.max(rule.min, Math.min(rule.max, sourceItems.length || defaultCount)) : Math.min(componentItemCount(type) || defaultCount, Math.max(defaultCount, sourceItems.length));
  const items = Array.from({ length: count }, (_, index) => clone(sourceItems[index] || {
    title: `核心信息 ${index + 1}`, text: '用一句简短说明补充这一项。', value: String(index + 1).padStart(2, '0')
  }));
  if (type === 'meta') return { text: String(page.kicker || 'SECTION / 01') };
  if (type === 'title') return { text: String(page.title || '在这里写下核心观点') };
  if (type === 'text') return { title: String(page.subtitle || ''), text: String(page.body || '') };
  if (type === 'conclusion') return { text: String(page.body || '') };
  if (type === 'image') return { image: String(page.image || ''), imageName: String(page.imageName || ''), imagePosition: Number(page.imagePosition) || 50, imageFit: page.imageFit === 'contain' ? 'contain' : 'cover' };
  if (type === 'interface') return { title: String(page.subtitle || ''), text: String(page.body || ''), items, image: String(page.image || ''), imageName: String(page.imageName || ''), imagePosition: Number(page.imagePosition) || 50, imageFit: page.imageFit === 'contain' ? 'contain' : 'cover' };
  return { title: String(page.subtitle || ''), text: String(page.body || ''), items };
}

function componentsForRecipe(recipeId, page = {}) {
  return (TEMPLATE_COMPONENTS[recipeId] || TEMPLATE_COMPONENTS.S01).map(([type, span]) => ({ id: makeId(), type, span, visible: true, data: componentDefaults(type, page) }));
}

function normalizeComponent(component, page = {}) {
  const type = COMPONENTS.some(entry => entry.type === component?.type) ? component.type : 'text';
  const span = [4, 6, 8, 12].includes(Number(component?.span)) ? Number(component.span) : 12;
  const defaults = componentDefaults(type, page);
  const data = component?.data && typeof component.data === 'object' ? { ...defaults, ...clone(component.data) } : defaults;
  if (componentItemCount(type)) {
    const sourceItems = Array.isArray(component?.data?.items) ? component.data.items : defaults.items;
    data.items = sourceItems.slice(0, componentItemCount(type)).map((entry, index) => ({
      title: String(entry.title || `核心信息 ${index + 1}`), text: String(entry.text || ''), value: String(entry.value || String(index + 1).padStart(2, '0'))
    }));
  }
  return { id: typeof component?.id === 'string' && /^[\w-]{1,100}$/.test(component.id) ? component.id : makeId(), type, span, visible: component?.visible !== false, data };
}

const sampleDeck = {
  version: 1,
  style: 'swiss',
  theme: 'ikb',
  footerLeft: 'SOCIAL CARD STUDIO',
  pageStart: 1,
  pages: [
    {
      id: makeId(), recipe: 'S01', kicker: 'CREATOR NOTES · 2026',
      title: '把一篇文章，变成一组会被看见的图',
      subtitle: '不是把文字塞进海报，而是把观点重新编排。',
      body: '内容先于装饰，证据先于气氛。', image: '', imageName: '', imagePosition: 50, imageFit: 'cover',
      items: [
        { title: '拆出主张', text: '每页只保留一个核心意思', value: '01' },
        { title: '选择证据', text: '图片、截图或真实数据', value: '02' },
        { title: '建立节奏', text: '让整组卡片有快有慢', value: '03' }
      ]
    },
    {
      id: makeId(), recipe: 'S11', kicker: 'SYSTEM / LEDGER',
      title: '真正需要编辑的，是表达顺序',
      subtitle: '一张图只承担一个判断。',
      body: '模板解决一致性，取舍决定最后的质量。', image: '', imageName: '', imagePosition: 50, imageFit: 'cover',
      items: [
        { title: '先给结论', text: '让读者在一秒内知道这一页在说什么。', value: '01' },
        { title: '再放证据', text: '截图、图片和数据要能支持结论。', value: '02' },
        { title: '删掉解释', text: '细节留在正文，卡片保留可扫描的信息。', value: '03' },
        { title: '检查留白', text: '留白要有目的，不能只是内容不够。', value: '04' }
      ]
    },
    {
      id: makeId(), recipe: 'S04', kicker: 'INTERFACE / 03',
      title: '让素材成为证据',
      subtitle: '图不是装饰层。',
      body: '一张真正有用的图片，应该证明产品存在、过程发生，或结果已经出现。', image: '', imageName: '', imagePosition: 50, imageFit: 'cover',
      items: [
        { title: '真实', text: '优先使用自己的照片和截图', value: 'A' },
        { title: '清楚', text: '保留主体与关键界面', value: 'B' },
        { title: '克制', text: '不让文字覆盖重要信息', value: 'C' }
      ]
    },
    {
      id: makeId(), recipe: 'S07', kicker: 'CLOSING NOTE · 04',
      title: '好的模板，让取舍更清楚',
      subtitle: '',
      body: '从内容到版式，从版式到发布。', image: '', imageName: '', imagePosition: 50, imageFit: 'cover',
      items: [
        { title: '内容', text: '一句值得记住的话', value: '01' },
        { title: '版式', text: '一个准确的视觉结构', value: '02' },
        { title: '发布', text: '一轮认真核对与复盘', value: '03' }
      ]
    }
  ]
};

const $ = (id) => document.getElementById(id);
function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `sc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
let deck = loadDeck();
let selectedIndex = 0;
let zoom = 0.5;
let history = [];
let historyIndex = -1;
let saveTimer = null;
let snapshotTimer = null;
let toastTimer = null;
let draggedComponentIndex = null;
let selectedComponentId = null;
let chartDragState = null;

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
const LOCAL_ICON_PATHS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M5 14v5h14v-5"/>',
  download: '<path d="M12 4v12m0 0 5-5m-5 5-5-5"/><path d="M5 20h14"/>',
  'file-json': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h1m4 0h1m-6 4h1m4 0h1"/>',
  'undo-2': '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-1"/>',
  'redo-2': '<path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h1"/>',
  'more-horizontal': '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  'image-plus': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21M18 5v6m-3-3h6"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  'grip-vertical': '<circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5"/>',
  'eye-off': '<path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3.1 4.2M6.6 6.6C3.7 8.3 2 12 2 12s3.5 7 10 7a10 10 0 0 0 3.1-.5"/>',
  'trash-2': '<path d="M3 6h18M8 6V4h8v2m-9 0 1 15h8l1-15M10 10v7m4-7v7"/>',
  hash: '<path d="M10 3 8 21M16 3l-2 18M4 9h17M3 15h17"/>',
  type: '<path d="M4 6V4h16v2M12 4v16M8 20h8"/>',
  'align-left': '<path d="M4 6h16M4 10h12M4 14h16M4 18h9"/>',
  'columns-3': '<path d="M4 5h4v14H4zM10 5h4v14h-4zM16 5h4v14h-4z"/>',
  'columns-2': '<path d="M4 5h7v14H4zM13 5h7v14h-7z"/>',
  'file-json-2': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h1m4 0h1m-6 4h1m4 0h1"/>',
  'panel-top': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6h.01M10 6h.01"/>',
  'triangle-alert': '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v4m0 4h.01"/>',
  'list-ordered': '<path d="M10 6h11M10 12h11M10 18h11M4 4h1v4M4 12h2l-2 2h2M4 18h2l-2 2h2"/>',
  sigma: '<path d="M18 4H6l6 8-6 8h12"/>',
  'chart-column': '<path d="M4 20V10m5 10V4m5 16v-7m5 7V7"/>',
  'chart-bar-big': '<path d="M4 19V5m0 14h16M8 16h4M8 12h8M8 8h11"/>',
  'rows-3': '<path d="M4 5h16M4 12h16M4 19h16"/>',
  'grid-2x2': '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
  'badge-check': '<path d="m12 3 2 2 3-.2.8 2.8L20 9l-1 2.8 1 2.8-2.2 1.4-.8 2.8-3-.2-2 2-2-2-3 .2-.8-2.8L4 14.6l1-2.8L4 9l2.2-1.4L7 4.8l3 .2Z"/><path d="m9 12 2 2 4-4"/>',
  'chevron-up': '<path d="m18 15-6-6-6 6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'square-stack': '<rect x="8" y="3" width="12" height="12"/><path d="M16 17v2H4V7h2"/>'
};
function localIcon(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LOCAL_ICON_PATHS[name] || '<circle cx="12" cy="12" r="8"/>'}</svg>`;
}
function editable(value, field, index = '') {
  return `<span class="editable" contenteditable="true" spellcheck="false" data-field="${field}"${index !== '' ? ` data-item-index="${index}"` : ''}>${escapeHTML(value)}</span>`;
}
function isSingleLineEditable(field, hasItemIndex = false) {
  return ['kicker', 'footerLeft', 'value'].includes(field) || (hasItemIndex && field === 'title');
}
function normalizeEditableText(value, field, hasItemIndex = false) {
  const text = String(value || '').replace(/\u00a0/g, ' ').replace(/\n{3,}/g, '\n\n');
  return (isSingleLineEditable(field, hasItemIndex) ? text.replace(/\s*\n+\s*/g, ' ').replace(/[ \t]{2,}/g, ' ') : text).trim();
}
function logicalDistance(start, end, scale = 1) {
  return (end - start) / Math.max(Number(scale) || 1, .001);
}
function normalizePage(page) {
  const migratedRecipe = LEGACY_RECIPE_MAP[page.recipe] || page.recipe;
  const recipe = RECIPES.some(entry => entry.id === migratedRecipe) ? migratedRecipe : 'S01';
  const normalized = {
    id: typeof page.id === 'string' && /^[\w-]{1,100}$/.test(page.id) ? page.id : makeId(),
    recipe,
    kicker: String(page.kicker || ''), title: String(page.title || ''), subtitle: String(page.subtitle || ''), body: String(page.body || ''),
    image: String(page.image || ''), imageName: String(page.imageName || ''),
    imagePosition: Number.isFinite(Number(page.imagePosition)) ? Math.max(0, Math.min(100, Number(page.imagePosition))) : 50,
    imageFit: page.imageFit === 'contain' ? 'contain' : 'cover',
    items: Array.isArray(page.items) ? page.items.slice(0, 12).map((item, index) => ({
      title: String(item.title || `条目 ${index + 1}`), text: String(item.text || ''), value: String(item.value || String(index + 1).padStart(2, '0'))
    })) : []
  };
  const legacyComponents = Array.isArray(page.components) ? page.components.slice(0, 16).map(component => ({ ...component })) : [];
  if (recipe === 'S08' && page.layoutMode !== 'custom' && legacyComponents.map(component => component.type).join(',') === 'image,title,stats') {
    legacyComponents.splice(1, 0, { type: 'meta', span: 12, data: { text: normalized.kicker }, visible: true });
    legacyComponents[0].span = 12;
    legacyComponents[2].span = 12;
  }
  normalized.components = legacyComponents.length
    ? legacyComponents.map(component => normalizeComponent(component, normalized))
    : componentsForRecipe(recipe, normalized);
  // Layout mode is derived from the actual component structure. This lets a
  // page return to its recipe automatically after temporary custom components
  // are removed or the original order/width/visibility is restored.
  syncLayoutMode(normalized);
  return normalized;
}
function normalizeDeck(input) {
  const allowedTheme = THEMES.some(theme => theme.id === input?.theme) ? input.theme : 'ikb';
  const pages = Array.isArray(input?.pages) && input.pages.length ? input.pages.map(normalizePage) : clone(sampleDeck.pages).map(normalizePage);
  return { version: 2, style: 'swiss', theme: allowedTheme, footerLeft: String(input?.footerLeft ?? 'SOCIAL CARD STUDIO'), pageStart: Math.max(0, Math.min(99, Number(input?.pageStart ?? 1) || 0)), pages };
}
function loadDeck() {
  try { return normalizeDeck(JSON.parse(localStorage.getItem(STORAGE_KEY)) || sampleDeck); }
  catch { return normalizeDeck(sampleDeck); }
}
function currentPage() { return deck.pages[selectedIndex]; }
function pageNumber(index) { return String(deck.pageStart + index).padStart(2, '0'); }

function pushHistory() {
  const serialized = JSON.stringify(deck);
  if (history[historyIndex] === serialized) return;
  history = history.slice(0, historyIndex + 1);
  history.push(serialized);
  if (history.length > 15) history.shift();
  historyIndex = history.length - 1;
  updateHistoryButtons();
}
function scheduleSnapshot() {
  clearTimeout(snapshotTimer);
  snapshotTimer = setTimeout(pushHistory, 500);
}
function persist() {
  $('saveState').textContent = '保存中';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
      $('saveState').textContent = '已保存';
    } catch {
      $('saveState').textContent = '存储已满';
      toast('浏览器存储空间不足，请先下载 JSON 备份');
    }
  }, 180);
}
function commit({ full = true, snapshot = true } = {}) {
  syncLayoutMode(currentPage());
  if (full) renderAll(); else renderPoster();
  persist();
  if (snapshot) scheduleSnapshot();
}
function updateHistoryButtons() {
  $('undoButton').disabled = historyIndex <= 0;
  $('redoButton').disabled = historyIndex >= history.length - 1;
}
function travelHistory(direction) {
  clearTimeout(snapshotTimer);
  if (JSON.stringify(deck) !== history[historyIndex]) pushHistory();
  const next = historyIndex + direction;
  if (next < 0 || next >= history.length) return;
  historyIndex = next;
  deck = normalizeDeck(JSON.parse(history[historyIndex]));
  selectedIndex = Math.min(selectedIndex, deck.pages.length - 1);
  selectedComponentId = currentPage().components[0]?.id || null;
  renderAll(); persist(); updateHistoryButtons();
}

function titleSize(page) {
  const length = page.title.replace(/\s/g, '').length;
  return length <= 8 ? 126 : length <= 14 ? 110 : length <= 22 ? 94 : 78;
}
function imageMarkup(page) {
  if (!page.image) return `<div class="image-placeholder"><span>IMAGE / PROOF</span></div>`;
  const fit = page.imageFit === 'contain' ? 'contain' : 'cover';
  const position = Number.isFinite(Number(page.imagePosition)) ? Math.max(0, Math.min(100, Number(page.imagePosition))) : 50;
  return `<img src="${escapeHTML(page.image)}" alt="${escapeHTML(page.imageName || '页面图片')}" style="object-fit:${fit};object-position:center ${position}%">`;
}
function footerMarkup(index) {
  return `<footer class="foot"><span>${editable(deck.footerLeft, 'footerLeft')}</span><span>${pageNumber(index)}</span></footer>`;
}
function item(page, index) { return page.items[index] || { title: `条目 ${index + 1}`, text: '', value: String(index + 1).padStart(2, '0') }; }
function pageHeading(page, max = 94) {
  return `<div class="kicker">${editable(page.kicker, 'kicker')}</div><h1 class="display" style="font-size:${Math.min(max, titleSize(page))}px">${editable(page.title, 'title')}</h1>`;
}
function numericValues(page, count) {
  const values = Array.from({ length: count }, (_, index) => Math.max(0, Number.parseFloat(item(page, index).value.replace(/[^0-9.-]/g, '')) || 0));
  const max = Math.max(...values, 1);
  return values.map(value => Math.round(value / max * 100));
}
function chartValues(component, page, count) {
  if (component?.data?.chartScale === 'percent') {
    return Array.from({ length: count }, (_, index) => Math.max(0, Math.min(100, Math.round(Number.parseFloat(component.data.items[index]?.value) || 0))));
  }
  return numericValues(page, count);
}
function enablePercentChartScale(component, page) {
  if (!component?.data?.items || component.data.chartScale === 'percent') return;
  const values = numericValues({ ...page, items: component.data.items }, component.data.items.length);
  component.data.items.forEach((entry, index) => { entry.value = `${values[index]}%`; });
  component.data.chartScale = 'percent';
}
function chartComponentFromControl(control) {
  const section = control.closest('[data-component-id]');
  const component = currentPage().components.find(entry => entry.id === section?.dataset.componentId);
  return component && ['bars', 'kpi'].includes(component.type) ? { component, section } : null;
}
function syncChartValueUI(section, component, itemIndex, percent, control) {
  component.data.items[itemIndex].value = `${percent}%`;
  control.style[control.dataset.chartDrag === 'x' ? 'width' : 'height'] = `${percent}%`;
  control.setAttribute('aria-valuenow', String(percent));
  const readout = control.querySelector('.chart-drag-value');
  if (readout) readout.textContent = `${percent}%`;
  const label = section.querySelector(`.editable[data-field="value"][data-item-index="${itemIndex}"]`);
  if (label) label.textContent = `${percent}%`;
  const editorInput = $('componentEditor').querySelector(`[data-component-item-field="value"][data-component-item-index="${itemIndex}"]`);
  if (component.id === selectedComponentId && editorInput) editorInput.value = `${percent}%`;
}
function syncPercentChartLabels(section, component) {
  component.data.items.forEach((entry, index) => {
    const label = section.querySelector(`.editable[data-field="value"][data-item-index="${index}"]`);
    if (label) label.textContent = entry.value;
  });
}
function percentFromChartPointer(control, clientX, clientY) {
  const rect = control.parentElement.getBoundingClientRect();
  const ratio = control.dataset.chartDrag === 'x'
    ? (clientX - rect.left) / Math.max(rect.width, 1)
    : (rect.bottom - clientY) / Math.max(rect.height, 1);
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}
function finishChartDrag(event) {
  const state = chartDragState;
  if (!state || event.pointerId !== state.pointerId) return;
  chartDragState = null;
  state.control.classList.remove('is-dragging');
  $('poster').classList.remove('chart-dragging');
  try { state.control.releasePointerCapture(event.pointerId); } catch (_) {}
  commit();
}
function renderS01(page, index) {
  const briefs = [0, 1, 2].map(i => { const entry = item(page, i); return `<div class="brief"><b>${editable(entry.value, 'value', i)}</b><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`; }).join('');
  return `<div class="poster-inner"><div class="accent-band"></div><div class="kicker">${editable(page.kicker, 'kicker')}</div><h1 class="display" style="font-size:${titleSize(page)}px">${editable(page.title, 'title')}</h1><p class="subtitle">${editable(page.subtitle, 'subtitle')}</p><div class="cover-thesis">${editable(page.body, 'body')}</div><div class="brief-grid">${briefs}</div>${footerMarkup(index)}</div>`;
}
function renderS02(page, index) {
  const left = item(page, 0), right = item(page, 1);
  return `<div class="poster-inner">${pageHeading(page, 96)}<div class="compare-grid"><div class="compare-col"><span class="tag">A / ${editable(left.value, 'value', 0)}</span><strong>${editable(left.title, 'title', 0)}</strong><p>${editable(left.text, 'text', 0)}</p></div><div class="compare-col accent"><span class="tag">B / ${editable(right.value, 'value', 1)}</span><strong>${editable(right.title, 'title', 1)}</strong><p>${editable(right.text, 'text', 1)}</p></div></div><div class="conclusion">${editable(page.body, 'body')}</div>${footerMarkup(index)}</div>`;
}
function renderS03(page, index) {
  const properties = [0, 1, 2, 3].map(i => { const entry = item(page, i); return `<div class="property-row"><span>${editable(entry.title, 'title', i)}</span><strong>${editable(entry.value, 'value', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`; }).join('');
  return `<div class="poster-inner">${pageHeading(page, 88)}<div class="file-card"><div class="file-object"><span>OBJECT / SOURCE</span><strong>${editable(page.subtitle || 'DECK.JSON', 'subtitle')}</strong><p>${editable(page.body, 'body')}</p></div><div class="property-list">${properties}</div></div>${footerMarkup(index)}</div>`;
}
function renderS04(page, index) {
  const modules = [0, 1, 2].map(i => { const entry = item(page, i); return `<div class="interface-module"><span>${editable(entry.value, 'value', i)}</span><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`; }).join('');
  return `<div class="poster-inner">${pageHeading(page, 88)}<div class="browser-frame"><div class="browser-bar"><span>APP / OUTPUT</span><span>${editable(page.subtitle || 'preview.local', 'subtitle')}</span></div><div class="interface-preview">${imageMarkup(page)}</div><div class="interface-modules">${modules}</div></div>${footerMarkup(index)}</div>`;
}
function renderS05(page, index) {
  const rows = [0, 1, 2].map((i) => { const entry = item(page, i); return `<div class="warning-row"><span class="warning-code">${editable(entry.value, 'value', i)}</span><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`; }).join('');
  return `<div class="poster-inner">${pageHeading(page, 94)}<div class="warning-list">${rows}</div><div class="conclusion">${editable(page.body, 'body')}</div>${footerMarkup(index)}</div>`;
}
function renderS06(page, index) {
  const stages = [0, 1, 2].map((i) => { const entry = item(page, i); return `<div class="pipeline-stage"><span class="stage-number">${String(i + 1).padStart(2, '0')}</span><div><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div><span class="stage-result">${editable(entry.value, 'value', i)}</span></div>`; }).join('');
  return `<div class="poster-inner">${pageHeading(page, 92)}<div class="pipeline-list">${stages}</div><div class="conclusion">${editable(page.body, 'body')}</div>${footerMarkup(index)}</div>`;
}
function renderS07(page, index) {
  const rows = [0, 1, 2].map((i) => { const entry = item(page, i); return `<div class="closing-row"><span>${editable(entry.value, 'value', i)}</span><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`; }).join('');
  return `<div class="poster-inner closing-inner"><div class="kicker">${editable(page.kicker, 'kicker')}</div><h1 class="closing-title" style="font-size:${Math.min(112, titleSize(page))}px">${editable(page.title, 'title')}</h1><div class="closing-ledger">${rows}</div><p class="closing-note">${editable(page.body, 'body')}</p>${footerMarkup(index)}</div>`;
}
function renderS08(page, index) {
  const stats = [0, 1, 2].map(i => { const entry = item(page, i); return `<div class="hero-stat"><strong>${editable(entry.value, 'value', i)}</strong><span>${editable(entry.title, 'title', i)}</span></div>`; }).join('');
  return `<div class="poster-inner"><div class="image-hero"><figure class="frame-img">${imageMarkup(page)}</figure><div class="hero-overlay"><span>${editable(page.kicker, 'kicker')}</span><h1 style="font-size:${Math.min(96, titleSize(page))}px">${editable(page.title, 'title')}</h1></div></div><div class="hero-stats">${stats}</div>${footerMarkup(index)}</div>`;
}
function renderS09(page, index) {
  const values = numericValues(page, 4);
  const towers = [0, 1, 2, 3].map(i => { const entry = item(page, i); return `<div class="tower-col"><strong>${editable(entry.value, 'value', i)}</strong><span>${editable(entry.title, 'title', i)}</span><div class="tower-track"><div style="height:${Math.max(12, values[i])}%"></div></div><p>${editable(entry.text, 'text', i)}</p></div>`; }).join('');
  return `<div class="poster-inner">${pageHeading(page, 92)}<div class="kpi-towers">${towers}</div>${footerMarkup(index)}</div>`;
}
function renderS10(page, index) {
  const visible = page.items.slice(0, 10); const values = numericValues(page, visible.length);
  const rows = visible.map((entry, i) => `<div class="bar-row"><strong>${editable(entry.title, 'title', i)}</strong><div class="bar-track"><div style="width:${values[i]}%"></div></div><span>${editable(entry.value, 'value', i)}</span></div>`).join('');
  return `<div class="poster-inner">${pageHeading(page, 88)}<div class="hbar-chart">${rows}</div>${footerMarkup(index)}</div>`;
}
function renderS11(page, index) {
  const rows = page.items.slice(0, 6).map((entry, i) => `<div class="ledger-row"><span class="num">${String(i + 1).padStart(2, '0')}</span><div><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div><span class="value">${editable(entry.value, 'value', i)}</span></div>`).join('');
  return `<div class="poster-inner">${pageHeading(page, 90)}<div class="ledger">${rows}</div>${footerMarkup(index)}</div>`;
}
function renderS12(page, index) {
  const visible = page.items.slice(0, 8);
  const cells = visible.map((entry, i) => `<div class="matrix-cell ${i === 2 ? 'accent' : ''}"><span>${String(i + 1).padStart(2, '0')}</span><strong>${editable(entry.title, 'title', i)}</strong></div>`).join('');
  return `<div class="poster-inner">${pageHeading(page, 84)}<div class="matrix-grid">${cells}</div><div class="matrix-total"><div><span>TOTAL / COVERAGE</span><p>${editable(page.body, 'body')}</p></div><strong>${visible.length}</strong></div>${footerMarkup(index)}</div>`;
}

const RENDERERS = { S01: renderS01, S02: renderS02, S03: renderS03, S04: renderS04, S05: renderS05, S06: renderS06, S07: renderS07, S08: renderS08, S09: renderS09, S10: renderS10, S11: renderS11, S12: renderS12 };

function renderComponent(component, page, strict = false) {
  const span = component.span || 12;
  const data = component.data || {};
  const items = Array.isArray(data.items) ? data.items : (Array.isArray(page.items) ? page.items : []);
  page = { ...page, items };
  if (component.type === 'meta') page.kicker = data.text ?? page.kicker;
  if (component.type === 'title') page.title = data.text ?? page.title;
  if (component.type === 'text') { page.subtitle = data.title ?? page.subtitle; page.body = data.text ?? page.body; }
  if (component.type === 'conclusion') page.body = data.text ?? page.body;
  if (component.type === 'image') page = { ...page, ...data };
  if (['file', 'interface'].includes(component.type)) { page.subtitle = data.title ?? page.subtitle; page.body = data.text ?? page.body; }
  if (component.type === 'interface') page = { ...page, image: data.image ?? page.image, imageName: data.imageName ?? page.imageName, imagePosition: data.imagePosition ?? page.imagePosition, imageFit: data.imageFit ?? page.imageFit };
  let content = '';
  if (component.type === 'meta') content = `<div class="kicker">${editable(page.kicker, 'kicker')}</div>`;
  if (component.type === 'title') content = `<h1 class="display${strict ? ' h-xl' : ''}"${strict ? '' : ` style="font-size:${Math.min(94, titleSize(page))}px"`}>${editable(page.title, 'title')}</h1>`;
  if (component.type === 'text') content = strict && page.recipe === 'S01'
    ? `<div class="s01-thesis"><div class="s01-thesis-copy"><strong>${editable(page.subtitle, 'subtitle')}</strong><p>${editable(page.body, 'body')}</p></div><div class="s01-thesis-stat"><b>${page.components.find(entry => entry.type === 'summary')?.data?.items?.length || 3}</b><span>KEY POINTS</span></div></div>`
    : `<div class="component-copy"><strong>${editable(page.subtitle, 'subtitle')}</strong><p>${editable(page.body, 'body')}</p></div>`;
  if (component.type === 'image') content = `<figure class="frame-img component-image">${imageMarkup(page)}</figure>`;
  if (component.type === 'summary') content = `<div class="brief-grid" style="--cols:${Math.max(1, Math.min(items.length, 4))};${strict ? '' : `grid-template-columns:repeat(${Math.max(1, Math.min(items.length, 4))},minmax(0,1fr))`}">${items.map((entry, i) => `<div class="brief"><b>${editable(entry.value, 'value', i)}</b><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`).join('')}</div>`;
  if (component.type === 'compare') content = `<div class="compare-grid ${items.length > 2 ? 'compare-grid-dense' : ''}"${strict ? '' : ` style="grid-template-columns:repeat(${Math.max(1, Math.min(items.length, 4))},minmax(0,1fr))"`}>${items.map((entry, i) => `<div class="compare-col ${i === 1 ? 'accent' : ''}"><span class="tag">${String.fromCharCode(65 + i)} / ${editable(entry.value, 'value', i)}</span><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`).join('')}</div>`;
  if (component.type === 'file') content = `<div class="file-card"><div class="file-object"><span>OBJECT / SOURCE</span><strong>${editable(data.title || page.subtitle || 'DECK.JSON', 'subtitle')}</strong><p>${editable(data.text || page.body || '', 'body')}</p></div><div class="property-list" style="--rows:${items.length}">${items.map((entry, i) => `<div class="property-row"><span>${editable(entry.title, 'title', i)}</span><strong>${editable(entry.value, 'value', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`).join('')}</div></div>`;
  if (component.type === 'interface') content = `<div class="browser-frame"><div class="browser-bar"><span>APP / OUTPUT</span><span>${editable(data.title || page.subtitle || 'preview.local', 'subtitle')}</span></div><div class="interface-preview">${imageMarkup(page)}</div><div class="interface-modules" style="--cols:${items.length}${strict ? '' : `;grid-template-columns:repeat(${Math.max(1, Math.min(items.length, 4))},minmax(0,1fr))`}">${items.map((entry, i) => `<div class="interface-module"><span>${editable(entry.value, 'value', i)}</span><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`).join('')}</div>${strict ? `<div class="interface-action">${editable(data.text || page.body || '', 'body')}</div>` : ''}</div>`;
  if (component.type === 'warning') content = `<div class="warning-list">${items.map((entry, i) => `<div class="warning-row"><span class="warning-code">${editable(entry.value || 'WARN', 'value', i)}</span><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>`).join('')}</div>`;
  if (component.type === 'steps') content = `<div class="pipeline-list">${items.map((entry, i) => `<div class="pipeline-stage"><span class="stage-number">${String(i + 1).padStart(2, '0')}</span><div><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div><span class="stage-result">${editable(entry.value, 'value', i)}</span></div>`).join('')}</div>`;
  if (component.type === 'stats') content = `<div class="hero-stats" style="grid-template-columns:repeat(${Math.max(1, Math.min(items.length, 4))},minmax(0,1fr))">${items.map((entry, i) => `<div class="hero-stat"><strong>${editable(entry.value, 'value', i)}</strong><span>${editable(entry.title, 'title', i)}</span></div>`).join('')}</div>`;
  if (component.type === 'kpi') { const values = chartValues(component, page, items.length); content = `<div class="kpi-towers" style="grid-template-columns:repeat(${Math.max(1, Math.min(items.length, 4))},minmax(0,1fr))">${items.map((entry, i) => `<div class="tower-col"><strong>${editable(entry.value, 'value', i)}</strong><span>${editable(entry.title, 'title', i)}</span><div class="tower-track"><div class="chart-fill chart-fill-vertical" style="height:${values[i]}%" data-chart-drag="y" data-chart-item="${i}" role="slider" tabindex="0" aria-label="${escapeHTML(entry.title || `指标 ${i + 1}`)}高度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${values[i]}"><i class="chart-drag-handle" aria-hidden="true"></i><b class="chart-drag-value" aria-hidden="true">${values[i]}%</b></div></div><p>${editable(entry.text, 'text', i)}</p></div>`).join('')}</div>`; }
  if (component.type === 'bars') { const values = chartValues(component, page, items.length); content = `<div class="hbar-chart" style="--rows:${items.length}">${items.map((entry, i) => `<div class="bar-row"><strong>${editable(entry.title, 'title', i)}</strong><div class="bar-track"><div class="chart-fill chart-fill-horizontal" style="width:${values[i]}%" data-chart-drag="x" data-chart-item="${i}" role="slider" tabindex="0" aria-label="${escapeHTML(entry.title || `条目 ${i + 1}`)}长度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${values[i]}"><i class="chart-drag-handle" aria-hidden="true"></i><b class="chart-drag-value" aria-hidden="true">${values[i]}%</b></div></div><span>${editable(entry.value, 'value', i)}</span></div>`).join('')}</div>`; }
  if (component.type === 'ledger') content = `<div class="ledger" style="--rows:${items.length}">${items.map((entry, i) => `<div class="ledger-row"><span class="num">${strict && page.recipe === 'S11' ? editable(entry.value, 'value', i) : String(i + 1).padStart(2, '0')}</span><div><strong>${editable(entry.title, 'title', i)}</strong><p>${editable(entry.text, 'text', i)}</p></div>${strict && page.recipe === 'S11' ? '<i data-lucide="square-stack" class="ledger-icon" aria-hidden="true"></i>' : `<span class="value">${editable(entry.value, 'value', i)}</span>`}</div>`).join('')}</div>`;
  if (component.type === 'matrix') content = `<div class="matrix-grid">${items.map((entry, i) => `<div class="matrix-cell ${i === 2 ? 'accent' : ''}"><span>${String(i + 1).padStart(2, '0')}</span><strong>${editable(entry.title, 'title', i)}</strong></div>`).join('')}</div>`;
  if (component.type === 'conclusion') content = strict && page.recipe === 'S12'
    ? `<div class="matrix-total"><div><span>IN TOTAL / 汇总</span><p>${editable(page.body, 'body')}</p></div><strong>${items.length}</strong></div>`
    : `<div class="conclusion">${editable(page.body, 'body')}</div>`;
  return `<section class="layout-component component-${component.type}" data-component-id="${escapeHTML(component.id)}" style="--component-span:${span}">${content}</section>`;
}

function renderComponentPage(page, index) {
  const strict = isStrictPage(page);
  const components = page.components.filter(component => component.visible).map(component => renderComponent(component, page, strict)).join('');
  return `<div class="poster-inner component-poster ${strict ? 'strict-poster' : 'custom-poster'}"><div class="component-flow"><div class="component-flow-content">${components}</div></div>${footerMarkup(index)}</div>`;
}

function fitPosterContent() {
  const frame = $('poster').querySelector('.component-flow');
  const content = frame?.firstElementChild;
  if (!frame || !content || !frame.clientHeight) return false;
  if (isStrictPage(currentPage())) {
    const page = currentPage();
    content.style.width = '100%';
    content.style.transform = 'none';
    const poster = $('poster');
    const posterRect = poster.getBoundingClientRect();
    const visualScale = poster.offsetWidth ? posterRect.width / poster.offsetWidth : (zoom || 1);
    const footer = $('poster').querySelector('.foot');
    const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
    const contentBottom = Math.max(...Array.from(content.children, element => element.getBoundingClientRect().bottom), 0);
    const contentToFooterGap = logicalDistance(contentBottom, footerTop, visualScale);
    const exceedsFrame = content.scrollHeight > frame.clientHeight + 2 || contentToFooterGap < 18;
    const overwideText = Array.from(content.querySelectorAll('.display, .compare-col strong, .file-object strong, .matrix-cell strong, .bar-row strong'))
      .some(element => element.scrollWidth > element.clientWidth + 2);
    const clippedRows = Array.from(content.querySelectorAll('.compare-col, .property-row, .interface-module, .warning-row, .pipeline-stage, .tower-col, .bar-row, .ledger-row, .matrix-cell, .s01-node'))
      .some(element => element.scrollHeight > element.clientHeight + 2 || element.scrollWidth > element.clientWidth + 2);
    const title = content.querySelector('.component-title .display .editable');
    let tooManyTitleLines = false;
    if (title?.firstChild) {
      const range = document.createRange();
      range.selectNodeContents(title);
      const lines = new Set(Array.from(range.getClientRects(), rect => Math.round(rect.top)));
      tooManyTitleLines = lines.size > (['S01', 'S05', 'S07'].includes(page.recipe) ? 3 : 2);
    }
    const titleSection = content.querySelector('.component-title');
    const nextSection = titleSection?.nextElementSibling;
    const titleGap = page.recipe === 'S08' || !nextSection ? Infinity : logicalDistance(titleSection.getBoundingClientRect().bottom, nextSection.getBoundingClientRect().top, visualScale);
    const blankBottom = logicalDistance(content.lastElementChild.getBoundingClientRect().bottom, footerTop, visualScale);
    const missingHeroImage = ['S04', 'S08'].includes(page.recipe) && !pageContentFromComponents(page).image;
    const issue = exceedsFrame || overwideText || clippedRows || tooManyTitleLines || titleGap < 28 || (blankBottom > 216 && !['S01', 'S07'].includes(page.recipe)) || missingHeroImage;
    $('poster').dataset.overflow = String(issue);
    $('overflowNotice').textContent = missingHeroImage ? `${page.recipe} 需要上传${page.recipe === 'S04' ? '界面截图' : '主视觉图片'}` :
      tooManyTitleLines ? '标题行数超出 skill 规范' :
      titleGap < 28 ? '标题与正文间距不足' :
      blankBottom > 216 && !['S01', 'S07'].includes(page.recipe) ? '页面下方留白过多' :
      issue ? '内容超出规范版式，请缩短文字或拆分页面' : '';
    $('overflowNotice').hidden = !issue;
    return issue;
  }
  const fits = scale => {
    content.style.width = `${100 / scale}%`;
    content.style.transform = `scale(${scale})`;
    return content.scrollHeight * scale <= frame.clientHeight - 1 && content.scrollWidth <= content.clientWidth + 1;
  };
  let low = .6, high = 1;
  if (fits(1)) low = 1;
  else if (fits(low)) {
    for (let i = 0; i < 12; i++) {
      const middle = (low + high) / 2;
      if (fits(middle)) low = middle;
      else high = middle;
    }
  }
  const overflow = !fits(low);
  $('poster').dataset.overflow = String(overflow);
  $('overflowNotice').textContent = '内容过多，请拆分页面';
  $('overflowNotice').hidden = !overflow;
  return overflow;
}

function renderPoster() {
  const page = currentPage();
  const poster = $('poster');
  poster.className = `poster swiss ${page.recipe.toLowerCase()} theme-${deck.theme}`;
  poster.innerHTML = renderComponentPage(page, selectedIndex);
  poster.style.transform = `scale(${zoom})`;
  $('posterStage').style.width = `${1080 * zoom}px`;
  $('posterStage').style.height = `${1440 * zoom}px`;
  $('recipeBadge').textContent = `${page.recipe} · ${isStrictPage(page) ? '规范版式' : '自定义'}`;
  $('zoomValue').textContent = `${Math.round(zoom * 100)}%`;
  refreshIcons();
  fitPosterContent();
  document.fonts.ready.then(() => { if ($('poster') === poster && currentPage() === page) fitPosterContent(); });
}
function renderPageList() {
  $('pageTotal').textContent = deck.pages.length;
  $('pageList').innerHTML = deck.pages.map((page, index) => {
    const recipe = RECIPES.find(entry => entry.id === page.recipe);
    const title = page.components.find(component => component.type === 'title')?.data?.text || page.title;
    return `<div class="page-row ${index === selectedIndex ? 'active' : ''}" data-page-index="${index}" role="button" tabindex="0"><span class="page-number">${pageNumber(index)}</span><span class="page-summary"><strong>${escapeHTML(title || '无标题')}</strong><span>${page.recipe} · ${escapeHTML(recipe?.name || '')}</span></span><button class="page-menu" data-menu-index="${index}" title="页面操作" aria-label="页面操作"><i data-lucide="more-horizontal"></i></button></div>`;
  }).join('');
}
function recipeDiagram(kind) {
  const patterns = {
    cover: '<i class="wide"></i><i class="hero"></i><b><i></i><i></i><i></i></b>',
    compare: '<i class="wide"></i><b><i class="tall"></i><i class="tall accent"></i></b>',
    file: '<i class="wide"></i><b><i class="square accent"></i><i class="tall"></i></b>',
    interface: '<i class="wide"></i><i class="hero outline"></i><b><i></i><i></i><i></i></b>',
    warning: '<i class="wide accent"></i><i></i><i></i><i></i>',
    pipeline: '<i class="wide"></i><i class="row"></i><i class="row"></i><i class="row"></i>',
    closing: '<i class="hero dark"></i><i></i><i></i><i></i>',
    hero: '<i class="hero accent"></i><b><i></i><i></i><i></i></b>',
    kpi: '<i class="wide"></i><b><i class="tower"></i><i class="tower accent"></i><i class="tower"></i><i class="tower"></i></b>',
    bars: '<i class="wide"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i><i class="bar"></i>',
    ledger: '<i class="wide"></i><i class="row"></i><i class="row"></i><i class="row"></i>',
    matrix: '<i class="wide"></i><b class="matrix"><i></i><i></i><i class="accent"></i><i></i><i></i><i></i></b>'
  };
  return `<span class="recipe-diagram">${patterns[kind]}</span>`;
}
function recipeCards(createMode = false) {
  return RECIPES.map(recipe => `<button class="recipe-card ${!createMode && currentPage().recipe === recipe.id ? 'active' : ''}" data-recipe="${recipe.id}"${createMode ? ' data-create-recipe="true"' : ''}>${recipeDiagram(recipe.kind)}<span><strong>${recipe.id} · ${recipe.name}</strong><small>${recipe.desc}</small></span></button>`).join('');
}
function renderRecipeOptions() {
  $('recipeGallery').innerHTML = recipeCards(false);
  $('newPageRecipeGallery').innerHTML = recipeCards(true);
}
function renderThemeControls() {
  $('themeSelect').innerHTML = THEMES.map(theme => `<option value="${theme.id}">${theme.name}</option>`).join('');
  $('themeSelect').value = deck.theme;
  $('themeSwatches').innerHTML = THEMES.map(theme => `<button class="swatch ${theme.id === deck.theme ? 'active' : ''}" data-theme="${theme.id}" style="--swatch:${theme.color}" title="${theme.name}" aria-label="${theme.name}"></button>`).join('');
}
function componentCards() {
  return COMPONENTS.map(component => `<button class="component-card" data-add-component="${component.type}"><i data-lucide="${component.icon}"></i><span><strong>${component.name}</strong><small>${component.desc}</small></span><i data-lucide="plus"></i></button>`).join('');
}
function reorderComponent(fromIndex, toIndex) {
  if (fromIndex === null || toIndex === null || fromIndex === toIndex) return;
  const components = currentPage().components;
  if (fromIndex < 0 || fromIndex >= components.length || toIndex < 0 || toIndex >= components.length) return;
  currentPage().layoutMode = 'custom';
  const [component] = components.splice(fromIndex, 1);
  components.splice(toIndex, 0, component);
  selectedComponentId = component.id;
  commit();
  toast('组件顺序已调整');
}

function getClosestComponentIndex(clientY) {
  const rows = Array.from(document.querySelectorAll('#componentList .component-row'));
  if (!rows.length) return null;
  let closestIndex = null;
  let minDistance = Infinity;
  for (let i = 0; i < rows.length; i++) {
    const rect = rows[i].getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = Math.abs(clientY - centerY);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = Number(rows[i].dataset.componentIndex);
    }
  }
  return closestIndex;
}

function setupPointerDrag(handle, index) {
  handle.onpointerdown = event => {
    if (event.button !== 0) return;
    event.stopPropagation();
    const row = handle.closest('.component-row');
    if (!row) return;

    let isDragging = false;
    const startY = event.clientY;
    const fromIndex = index;

    const onPointerMove = moveEvent => {
      if (!isDragging) {
        if (Math.abs(moveEvent.clientY - startY) > 3) {
          isDragging = true;
          row.classList.add('dragging');
        } else {
          return;
        }
      }

      const targetIndex = getClosestComponentIndex(moveEvent.clientY);
      document.querySelectorAll('#componentList .component-row').forEach(element => element.classList.remove('drop-before', 'drop-after'));
      if (targetIndex !== null && targetIndex !== fromIndex) {
        const rows = document.querySelectorAll('#componentList .component-row');
        const targetRow = Array.from(rows).find(r => Number(r.dataset.componentIndex) === targetIndex);
        if (targetRow) {
          targetRow.classList.add(targetIndex > fromIndex ? 'drop-after' : 'drop-before');
        }
      }
    };

    const onPointerUp = upEvent => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      row.classList.remove('dragging');
      document.querySelectorAll('#componentList .component-row').forEach(element => element.classList.remove('drop-before', 'drop-after'));

      if (isDragging) {
        const toIndex = getClosestComponentIndex(upEvent.clientY);
        if (toIndex !== null && fromIndex !== toIndex) {
          reorderComponent(fromIndex, toIndex);
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };
}

function renderComponentList() {
  const page = currentPage();
  const strict = isStrictPage(page);
  if (!page.components.some(component => component.id === selectedComponentId)) selectedComponentId = page.components[0]?.id || null;
  const count = page.components.length;
  $('componentList').innerHTML = page.components.map((component, index) => {
    const definition = COMPONENTS.find(entry => entry.type === component.type);
    const isFirst = index === 0;
    const isLast = index === count - 1;
    return `<div class="component-row ${strict ? 'strict-row' : ''} ${component.visible ? '' : 'muted'} ${component.id === selectedComponentId ? 'selected' : ''}" draggable="${!strict}" data-component-index="${index}" data-select-component="${escapeHTML(component.id)}">
      ${strict ? `<span class="template-index">${String(index + 1).padStart(2, '0')}</span>` : `<span class="drag-handle" data-drag-handle="${index}" title="按住拖拽排序" aria-label="按住拖拽排序"><i data-lucide="grip-vertical"></i></span>`}
      <div class="component-row-main"><strong>${escapeHTML(definition?.name || component.type)}</strong>${strict ? '' : `<div class="span-switch" aria-label="组件宽度">${[4, 6, 8, 12].map(span => `<button class="${component.span === span ? 'active' : ''}" data-component-span="${span}" data-component-index="${index}">${span}</button>`).join('')}</div>`}</div>
      ${strict ? '<span class="template-lock">固定</span>' : `<button class="component-action" data-move-component="${index}" data-move-dir="-1" title="上移" aria-label="上移" ${isFirst ? 'disabled' : ''}><i data-lucide="chevron-up"></i></button>
      <button class="component-action" data-move-component="${index}" data-move-dir="1" title="下移" aria-label="下移" ${isLast ? 'disabled' : ''}><i data-lucide="chevron-down"></i></button>
      <button class="component-action" data-toggle-component="${index}" title="${component.visible ? '隐藏' : '显示'}" aria-label="${component.visible ? '隐藏' : '显示'}"><i data-lucide="${component.visible ? 'eye' : 'eye-off'}"></i></button>
      <button class="component-action danger-text" data-delete-component="${index}" title="删除组件" aria-label="删除组件"><i data-lucide="trash-2"></i></button>`}
    </div>`;
  }).join('');

  document.querySelectorAll('#componentList [data-drag-handle]').forEach(handle => {
    setupPointerDrag(handle, Number(handle.dataset.dragHandle));
  });

  $('componentGallery').innerHTML = componentCards();
}
function currentComponent() {
  return currentPage().components.find(component => component.id === selectedComponentId) || currentPage().components[0];
}
function renderComponentEditor() {
  const oldActiveTab = $('componentEditor').querySelector('.editor-tab.active');
  const previousTabPosition = oldActiveTab ? { left: oldActiveTab.offsetLeft, width: oldActiveTab.offsetWidth } : null;
  const page = currentPage();
  const component = currentComponent();
  if (!component) { $('componentEditor').innerHTML = ''; return; }
  const definition = COMPONENTS.find(entry => entry.type === component.type);
  const data = component.data || (component.data = componentDefaults(component.type, page));
  const strictRule = isStrictPage(page) && STRICT_RECIPE_ITEMS[page.recipe].type === component.type ? STRICT_RECIPE_ITEMS[page.recipe] : null;

  const currentIndex = page.components.findIndex(c => c.id === component.id);
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= page.components.length - 1;

  const navTabs = page.components.map((c, i) => {
    const def = COMPONENTS.find(entry => entry.type === c.type);
    const isSel = c.id === component.id;
    const itemCount = Array.isArray(c.data?.items) ? c.data.items.length : null;
    return `<button class="editor-tab ${isSel ? 'active' : ''}" id="editor-tab-${escapeHTML(c.id)}" role="tab" aria-selected="${isSel}" aria-controls="componentFieldsPanel" tabindex="${isSel ? 0 : -1}" data-select-comp-tab="${escapeHTML(c.id)}" title="${escapeHTML(def?.name || c.type)}">
      <span class="tab-idx">${String(i + 1).padStart(2, '0')}</span>
      <span class="tab-name">${escapeHTML(def?.name || c.type)}</span>
      ${itemCount !== null ? `<span class="tab-count">${itemCount}项</span>` : ''}
    </button>`;
  }).join('');

  const switcherBar = `
    <div class="component-editor-nav">
      <button class="editor-nav-btn" data-nav-comp="-1" title="切换到上一个组件" aria-label="上一个组件" ${isFirst ? 'disabled' : ''}>
        <i data-lucide="chevron-left"></i>
      </button>
      <div class="editor-tabs-scroll" role="tablist" aria-label="页面组件">
        <span class="editor-tab-indicator" aria-hidden="true"></span>
        ${navTabs}
      </div>
      <button class="editor-nav-btn" data-nav-comp="1" title="切换到下一个组件" aria-label="下一个组件" ${isLast ? 'disabled' : ''}>
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;

  let fields = '';
  if (['meta', 'title', 'conclusion'].includes(component.type)) {
    fields = `<label>${component.type === 'meta' ? '眉题' : component.type === 'title' ? '主标题' : '结论'}<textarea data-component-field="text" rows="${component.type === 'title' ? 3 : 2}">${escapeHTML(data.text || '')}</textarea></label>`;
  } else if (component.type === 'text') {
    fields = `<label>小标题<input data-component-field="title" value="${escapeHTML(data.title || '')}"></label><label>正文<textarea data-component-field="text" rows="4">${escapeHTML(data.text || '')}</textarea></label>`;
  } else if (component.type === 'image') {
    fields = `<div class="component-empty"><i data-lucide="image"></i><span>图片素材与裁切在“内容”页底部设置</span></div>`;
  } else {
    const contextFields = ['file', 'interface'].includes(component.type) ? `<label>对象名称<input data-component-field="title" value="${escapeHTML(data.title || '')}"></label><label>说明<textarea data-component-field="text" rows="2">${escapeHTML(data.text || '')}</textarea></label>` : '';
    const items = (data.items || []).map((entry, index) => `<div class="item-row"><span class="item-index">${String(index + 1).padStart(2, '0')}</span><div class="item-inputs"><input data-component-item-field="title" data-component-item-index="${index}" value="${escapeHTML(entry.title)}" placeholder="条目标题"><input data-component-item-field="text" data-component-item-index="${index}" value="${escapeHTML(entry.text)}" placeholder="补充说明"><input data-component-item-field="value" data-component-item-index="${index}" value="${escapeHTML(entry.value)}" placeholder="数字 / 标签"></div><button class="remove-item" data-remove-component-item="${index}" title="删除条目" ${strictRule && data.items.length <= strictRule.min ? 'disabled' : ''}><i data-lucide="trash-2"></i></button></div>`).join('');
    fields = `${contextFields}<div class="field-heading"><label>组件条目 (${(data.items || []).length} 项${strictRule ? `，规范 ${strictRule.min}${strictRule.max === strictRule.min ? '' : `–${strictRule.max}`}` : ''})</label><button class="text-action" data-add-component-item ${strictRule && data.items.length >= strictRule.max ? 'disabled' : ''}><i data-lucide="plus"></i>添加条目</button></div><div class="item-editor">${items}</div>`;
  }
  $('componentEditor').innerHTML = `${switcherBar}<div class="component-editor-head"><div class="editor-head-title"><strong>${escapeHTML(definition?.name || component.type)}</strong><span class="comp-badge">${currentIndex + 1} / ${page.components.length}</span></div><small>${escapeHTML(definition?.desc || '')}</small></div><div class="component-fields" id="componentFieldsPanel" role="tabpanel" aria-labelledby="editor-tab-${escapeHTML(component.id)}">${fields}</div>`;
  syncEditorTabIndicator(previousTabPosition);
}
function syncEditorTabIndicator(previous) {
  const scroller = $('componentEditor').querySelector('.editor-tabs-scroll');
  const active = scroller?.querySelector('.editor-tab.active');
  const indicator = scroller?.querySelector('.editor-tab-indicator');
  if (!active || !indicator) return;
  const left = active.offsetLeft;
  const width = active.offsetWidth;
  if (previous?.width) {
    indicator.style.left = previous.left + 'px';
    indicator.style.width = previous.width + 'px';
    indicator.getBoundingClientRect();
    requestAnimationFrame(() => {
      if (!indicator.isConnected) return;
      indicator.style.left = left + 'px';
      indicator.style.width = width + 'px';
    });
  } else {
    indicator.style.left = left + 'px';
    indicator.style.width = width + 'px';
  }
  if (left < scroller.scrollLeft) scroller.scrollLeft = left;
  else if (left + width > scroller.scrollLeft + scroller.clientWidth) scroller.scrollLeft = left + width - scroller.clientWidth;
}
function selectedImageComponent(page = currentPage()) {
  const isImage = component => ['image', 'interface'].includes(component.type);
  return page.components.find(component => component.id === selectedComponentId && isImage(component)) || page.components.find(isImage) || null;
}
function renderInspector() {
  const page = currentPage();
  renderRecipeOptions(); renderThemeControls(); renderComponentList(); renderComponentEditor();
  $('componentHint').textContent = isStrictPage(page)
    ? '当前按 skill 规范排版。可编辑文案和允许的条目；添加组件会切换到自定义排版。'
    : '当前为自定义排版。点击当前模板卡片可恢复规范结构；原始数据仍保存在页面中。';
  const imageComponent = selectedImageComponent(page);
  const imageData = imageComponent?.data || page;
  $('imageSectionLabel').textContent = imageComponent ? `图片 · ${COMPONENTS.find(entry => entry.type === imageComponent.type)?.name}` : '页面图片';
  $('cropRange').value = imageData.imagePosition;
  $('cropValue').textContent = `${imageData.imagePosition}%`;
  $('imageLabel').textContent = imageData.imageName || '选择图片';
  $('uploadPreview').innerHTML = imageData.image ? `<img src="${escapeHTML(imageData.image)}" alt="">` : '<i data-lucide="image-plus"></i>';
  document.querySelectorAll('#fitSwitch button').forEach((button, index) => {
    const active = button.dataset.fit === imageData.imageFit;
    button.classList.toggle('active', active);
    button.setAttribute('aria-checked', String(active));
    button.tabIndex = active ? 0 : -1;
    if (active) $('fitSwitch').dataset.activeIndex = String(index);
  });
  $('footerLeftInput').value = deck.footerLeft;
  $('pageStartInput').value = deck.pageStart;
  refreshIcons();
}
function renderExportOptions() {
  $('exportCurrentTab').textContent = '当前页 · ' + pageNumber(selectedIndex);
  $('exportAllTab').textContent = '全部页面 · ' + deck.pages.length;
  document.querySelectorAll('.export-tabs').forEach(list => {
    const selected = [...list.querySelectorAll('[role="tab"]')].findIndex(tab => tab.dataset.exportValue === $(list.dataset.exportFor).value);
    setExportTab(list, Math.max(0, selected));
  });
}
function setExportTab(list, index, focus = false) {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const tab = tabs[index];
  if (!tab) return;
  tabs.forEach((item, itemIndex) => {
    item.setAttribute('aria-selected', String(itemIndex === index));
    item.tabIndex = itemIndex === index ? 0 : -1;
  });
  list.dataset.activeIndex = String(index);
  $(list.dataset.exportFor).value = tab.dataset.exportValue;
  const panel = $(tab.getAttribute('aria-controls'));
  panel.setAttribute('aria-labelledby', tab.id);
  panel.textContent = list.dataset.exportFor === 'exportPageSelect'
    ? (index === 0 ? '仅导出第 ' + pageNumber(selectedIndex) + ' 页。' : '按页码依次导出全部 ' + deck.pages.length + ' 页。')
    : (index === 0 ? '文字与线条更清晰。' : '文件体积更小，适合分享。');
  if (focus) tab.focus();
}
function closeExportDialog() {
  const dialog = $('exportDialog');
  if (!dialog.open || dialog.hasAttribute('data-closing')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { dialog.close(); return; }
  dialog.setAttribute('data-closing', '');
  setTimeout(() => {
    dialog.close();
    dialog.removeAttribute('data-closing');
  }, 180);
}
function renderAll() {
  renderPageList(); renderPoster(); renderInspector(); renderExportOptions(); refreshIcons();
}
function refreshIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.8 } });
    return;
  }
  document.querySelectorAll('i[data-lucide]').forEach(element => {
    if (element.dataset.localIconReady) return;
    element.innerHTML = localIcon(element.dataset.lucide);
    element.dataset.localIconReady = 'true';
  });
}

function toast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').classList.add('show');
  toastTimer = setTimeout(() => $('toast').classList.remove('show'), 1900);
}
function setSelected(index) {
  selectedIndex = Math.max(0, Math.min(deck.pages.length - 1, index));
  selectedComponentId = currentPage().components[0]?.id || null;
  renderAll();
}
const TEMPLATE_EXAMPLES = {
  S01: { kicker: 'CONTENT / 01', title: '把想法变成\n清楚的卡片', subtitle: '先给读者一个值得记住的判断。', body: '再用证据与结构让它站得住。', items: [
    { value: '01', title: '核心观点', text: '一句话说清这一页' }, { value: '02', title: '真实证据', text: '图片、截图或数据' }, { value: '03', title: '清晰结构', text: '让内容有阅读顺序' }
  ] },
  S02: { kicker: 'COMPARISON / 02', title: '两种表达\n差在哪里', body: '先决定要读者记住什么。', items: [
    { value: '旧方法', title: '堆满信息', text: '每一句都想说，读者只能自己找重点。' }, { value: '新方法', title: '突出判断', text: '先给结论，再放支持它的证据。' }
  ] },
  S03: { kicker: 'DATA LAYER / 03', title: '一张卡片\n需要什么', subtitle: 'PAGE.JSON', body: '把核心信息整理成可复核的对象。', items: [
    { value: 'TOPIC', title: '主题', text: '这一页具体谈什么' }, { value: 'CLAIM', title: '主张', text: '读者应记住的判断' },
    { value: 'PROOF', title: '证据', text: '支持判断的真实材料' }, { value: 'CLOSE', title: '结论', text: '把信息收束成一句话' }
  ] },
  S04: { kicker: 'INTERFACE / 04', title: '让截图\n成为证据', subtitle: 'preview.local', body: '界面要让关键结果一眼可见。', items: [
    { value: '01', title: '主体', text: '保留完整界面' }, { value: '02', title: '关键', text: '标清重要区域' }, { value: '03', title: '结果', text: '说明已经发生什么' }
  ] },
  S05: { kicker: 'WARNING / 05', title: '别让设计\n抢走重点', body: '删掉不支持主张的装饰。', items: [
    { value: '01', title: '文字太多', text: '读者无法快速抓住结论。' }, { value: '02', title: '证据太小', text: '真实截图失去证明作用。' }, { value: '03', title: '层级太乱', text: '标题、说明与数据互相争抢。' }
  ] },
  S06: { kicker: 'PIPELINE / 06', title: '从文章到卡片\n分成三步', body: '每一步只处理一个决定。', items: [
    { value: 'SOURCE', title: '提取主张', text: '从长文中找到真正重要的一句。' }, { value: 'RENDER', title: '匹配版式', text: '让视觉结构服务这条主张。' }, { value: 'SHARE', title: '检查导出', text: '确认图片可读、无裁切。' }
  ] },
  S07: { kicker: 'TAKEAWAY / 07', title: '最后只留\n一个判断', body: '表达越清楚，读者越容易记住。', items: [
    { value: '01', title: '内容', text: '这页到底在说什么' }, { value: '02', title: '证据', text: '凭什么这样判断' }, { value: '03', title: '行动', text: '读者看完能做什么' }
  ] },
  S08: { kicker: 'IMAGE HERO / 08', title: '让图片\n说第一句话', items: [
    { value: '01', title: '主体', text: '' }, { value: '02', title: '细节', text: '' }, { value: '03', title: '结果', text: '' }
  ] },
  S09: { kicker: '示例数据 / 请替换', title: '用四组数字\n说明变化', items: [
    { value: '94%', title: '指标一', text: '换成真实数据' }, { value: '78%', title: '指标二', text: '换成真实数据' },
    { value: '62%', title: '指标三', text: '换成真实数据' }, { value: '48%', title: '指标四', text: '换成真实数据' }
  ] },
  S10: { kicker: '示例数据 / 请替换', title: '用横条\n看清差异', items: [94, 78, 62, 48, 36, 28].map((value, index) => ({ value: `${value}%`, title: `指标 ${String.fromCharCode(65 + index)}`, text: '' })) },
  S11: { kicker: '示例数据 / 请替换', title: '把变化\n写成台账', items: [
    { value: '12', title: '第一项', text: '补充真实来源' }, { value: '08', title: '第二项', text: '补充真实来源' },
    { value: '04', title: '第三项', text: '补充真实来源' }, { value: '02', title: '第四项', text: '补充真实来源' }
  ] },
  S12: { kicker: 'MATRIX / 12', title: '八个能力\n组成一套方法', body: '覆盖从观点到发布的完整链路。', items: [
    '提炼观点', '梳理结构', '选择证据', '安排留白', '对齐文字', '核对数据', '检查导出', '发布复盘'
  ].map((title, index) => ({ value: String(index + 1).padStart(2, '0'), title, text: '' })) }
};
function createPageForRecipe(recipeId) {
  const recipe = RECIPES.find(entry => entry.id === recipeId) || RECIPES[0];
  const example = TEMPLATE_EXAMPLES[recipe.id];
  return normalizePage({
    recipe: recipe.id, kicker: example.kicker, title: example.title,
    subtitle: example.subtitle || '', body: example.body || '', items: clone(example.items)
  });
}
function pageContentFromComponents(page) {
  const content = { ...page, items: clone(page.items || []) };
  const first = type => page.components.find(component => component.type === type && component.visible)?.data;
  const meta = first('meta'), title = first('title'), text = first('text');
  const detail = first('file') || first('interface');
  const conclusion = first('conclusion');
  const image = first('image') || first('interface');
  if (meta) content.kicker = meta.text;
  if (title) content.title = title.text;
  if (text) { content.subtitle = text.title; content.body = text.text; }
  else if (detail) { content.subtitle = detail.title; content.body = detail.text; }
  else if (conclusion) content.body = conclusion.text;
  if (image) Object.assign(content, { image: image.image ?? page.image, imageName: image.imageName ?? page.imageName, imagePosition: image.imagePosition ?? page.imagePosition, imageFit: image.imageFit ?? page.imageFit });
  const list = page.components.find(component => component.visible && Array.isArray(component.data?.items));
  if (list) list.data.items.forEach((item, index) => { content.items[index] = clone(item); });
  return content;
}
function switchRecipe(recipeId) {
  if (currentPage().recipe === recipeId && isStrictPage(currentPage())) return;
  const defaults = createPageForRecipe(recipeId);
  const page = currentPage();
  Object.assign(page, pageContentFromComponents(page));
  page.recipe = recipeId;
  page.components = componentsForRecipe(recipeId, page);
  page.layoutMode = 'template';
  selectedComponentId = currentPage().components[0]?.id || null;
  while (currentPage().items.length < defaults.items.length) currentPage().items.push(defaults.items[currentPage().items.length]);
  commit(); toast(`已应用 ${recipeId} 规范版式`);
}
function addPage(recipeId) {
  const page = createPageForRecipe(recipeId);
  deck.pages.splice(selectedIndex + 1, 0, page);
  selectedIndex += 1;
  selectedComponentId = page.components[0]?.id || null;
  $('templateDialog').close();
  commit(); toast(`已新增 ${recipeId} 页面`);
}
function duplicatePage(index) {
  const copy = clone(deck.pages[index]); copy.id = makeId();
  deck.pages.splice(index + 1, 0, copy); selectedIndex = index + 1; commit(); toast('已复制页面');
}
function deletePage(index) {
  if (deck.pages.length === 1) { toast('至少保留一个页面'); return; }
  deck.pages.splice(index, 1); selectedIndex = Math.min(selectedIndex, deck.pages.length - 1); commit(); toast('已删除页面');
}
function movePage(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= deck.pages.length) return;
  [deck.pages[index], deck.pages[target]] = [deck.pages[target], deck.pages[index]];
  selectedIndex = target; commit();
}
function showPageMenu(button, index) {
  document.querySelector('.context-menu')?.remove();
  const rect = button.getBoundingClientRect();
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.style.left = `${Math.min(rect.left, window.innerWidth - 154)}px`;
  menu.style.top = `${rect.bottom + 4}px`;
  menu.innerHTML = `<button data-action="duplicate"><i data-lucide="copy"></i>复制页面</button><button data-action="up"><i data-lucide="arrow-up"></i>上移</button><button data-action="down"><i data-lucide="arrow-down"></i>下移</button><button class="danger-text" data-action="delete"><i data-lucide="trash-2"></i>删除</button>`;
  menu.onclick = event => {
    const action = event.target.closest('button')?.dataset.action;
    if (action === 'duplicate') duplicatePage(index);
    if (action === 'up') movePage(index, -1);
    if (action === 'down') movePage(index, 1);
    if (action === 'delete') deletePage(index);
    menu.remove();
  };
  document.body.append(menu); refreshIcons();
  setTimeout(() => document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.remove(); }, { once: true }), 0);
}

async function compressedImageData(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const ratio = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    const webp = canvas.toDataURL('image/webp', .8);
    return webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function bindEvents() {
  $('pageList').addEventListener('click', event => {
    const menu = event.target.closest('[data-menu-index]');
    if (menu) { event.stopPropagation(); showPageMenu(menu, Number(menu.dataset.menuIndex)); return; }
    const row = event.target.closest('[data-page-index]'); if (row) setSelected(Number(row.dataset.pageIndex));
  });
  $('pageList').addEventListener('keydown', event => { if (event.key === 'Enter') setSelected(Number(event.target.closest('[data-page-index]')?.dataset.pageIndex)); });
  $('addPageButton').onclick = () => $('templateDialog').showModal();
  $('closeTemplateDialog').onclick = () => $('templateDialog').close();
  $('recipeGallery').onclick = event => { const card = event.target.closest('[data-recipe]'); if (card) switchRecipe(card.dataset.recipe); };
  $('newPageRecipeGallery').onclick = event => { const card = event.target.closest('[data-recipe]'); if (card) addPage(card.dataset.recipe); };
  $('addComponentButton').onclick = () => $('componentDialog').showModal();
  $('closeComponentDialog').onclick = () => $('componentDialog').close();
  $('componentGallery').onclick = event => {
    const card = event.target.closest('[data-add-component]'); if (!card) return;
    if (currentPage().components.length >= 16) { toast('每页最多使用 16 个组件'); return; }
    const component = normalizeComponent({ type: card.dataset.addComponent, span: 12 }, currentPage());
    currentPage().layoutMode = 'custom';
    currentPage().components.push(component); selectedComponentId = component.id;
    $('componentDialog').close(); commit(); toast('已切换到自定义排版并添加组件');
  };
  $('componentList').onclick = event => {
    const moveButton = event.target.closest('[data-move-component]');
    if (moveButton && !moveButton.disabled) {
      const idx = Number(moveButton.dataset.moveComponent);
      const dir = Number(moveButton.dataset.moveDir);
      reorderComponent(idx, idx + dir);
      return;
    }
    const spanButton = event.target.closest('[data-component-span]');
    if (spanButton) {
      currentPage().layoutMode = 'custom';
      currentPage().components[Number(spanButton.dataset.componentIndex)].span = Number(spanButton.dataset.componentSpan);
      commit(); return;
    }
    const toggleButton = event.target.closest('[data-toggle-component]');
    if (toggleButton) {
      const component = currentPage().components[Number(toggleButton.dataset.toggleComponent)];
      currentPage().layoutMode = 'custom';
      component.visible = !component.visible; commit(); return;
    }
    const deleteButton = event.target.closest('[data-delete-component]');
    if (deleteButton) {
      if (currentPage().components.length <= 1) { toast('至少保留一个组件'); return; }
      currentPage().layoutMode = 'custom';
      const deleted = currentPage().components.splice(Number(deleteButton.dataset.deleteComponent), 1)[0];
      if (deleted?.id === selectedComponentId) selectedComponentId = currentPage().components[0]?.id || null;
      commit(); return;
    }
    const row = event.target.closest('[data-select-component]');
    if (row) {
      selectedComponentId = row.dataset.selectComponent;
      renderInspector();
      return;
    }
  };

  $('componentList').addEventListener('dragstart', event => {
    if (isStrictPage(currentPage())) { event.preventDefault(); return; }
    const row = event.target.closest('[data-component-index]');
    if (!row || event.target.closest('button')) {
      event.preventDefault();
      return;
    }
    draggedComponentIndex = Number(row.dataset.componentIndex);
    row.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(draggedComponentIndex));
  });

  document.addEventListener('dragover', event => {
    if (draggedComponentIndex === null) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    const targetIndex = getClosestComponentIndex(event.clientY);
    document.querySelectorAll('#componentList .component-row').forEach(element => element.classList.remove('drop-before', 'drop-after'));
    if (targetIndex !== null && targetIndex !== draggedComponentIndex) {
      const rows = document.querySelectorAll('#componentList .component-row');
      const targetRow = Array.from(rows).find(r => Number(r.dataset.componentIndex) === targetIndex);
      if (targetRow) {
        targetRow.classList.add(targetIndex > draggedComponentIndex ? 'drop-after' : 'drop-before');
      }
    }
  });

  document.addEventListener('drop', event => {
    if (draggedComponentIndex === null) return;
    event.preventDefault();
    const fromIndex = draggedComponentIndex;
    const toIndex = getClosestComponentIndex(event.clientY);
    draggedComponentIndex = null;
    document.querySelectorAll('#componentList .component-row').forEach(element => element.classList.remove('dragging', 'drop-before', 'drop-after'));
    if (toIndex !== null && fromIndex !== toIndex) {
      reorderComponent(fromIndex, toIndex);
    }
  });

  document.addEventListener('dragend', () => {
    draggedComponentIndex = null;
    document.querySelectorAll('#componentList .component-row').forEach(element => element.classList.remove('dragging', 'drop-before', 'drop-after'));
  });
  $('themeSelect').onchange = event => { deck.theme = event.target.value; commit(); };
  $('themeSwatches').onclick = event => { const swatch = event.target.closest('[data-theme]'); if (swatch) { deck.theme = swatch.dataset.theme; commit(); } };
  $('componentEditor').addEventListener('input', event => {
    const component = currentComponent(); if (!component) return;
    const fieldInput = event.target.closest('[data-component-field]');
    if (fieldInput) { component.data[fieldInput.dataset.componentField] = fieldInput.value; commit({ full: false }); return; }
    const itemInput = event.target.closest('[data-component-item-field]');
    if (!itemInput) return;
    component.data.items[Number(itemInput.dataset.componentItemIndex)][itemInput.dataset.componentItemField] = itemInput.value;
    commit({ full: false });
  });
  $('componentEditor').addEventListener('click', event => {
    const navBtn = event.target.closest('[data-nav-comp]');
    if (navBtn && !navBtn.disabled) {
      const page = currentPage();
      const currIdx = page.components.findIndex(c => c.id === selectedComponentId);
      const dir = Number(navBtn.dataset.navComp);
      const nextIdx = Math.max(0, Math.min(page.components.length - 1, (currIdx === -1 ? 0 : currIdx) + dir));
      selectedComponentId = page.components[nextIdx].id;
      renderInspector();
      return;
    }

    const tabBtn = event.target.closest('[data-select-comp-tab]');
    if (tabBtn) {
      selectedComponentId = tabBtn.dataset.selectCompTab;
      renderInspector();
      return;
    }

    const component = currentComponent();
    if (!component) return;

    const removeButton = event.target.closest('[data-remove-component-item]');
    if (removeButton) {
      const rule = isStrictPage(currentPage()) && STRICT_RECIPE_ITEMS[currentPage().recipe].type === component.type ? STRICT_RECIPE_ITEMS[currentPage().recipe] : null;
      if (component.data.items.length <= (rule?.min || 1)) { toast(rule ? `${currentPage().recipe} 至少保留 ${rule.min} 项` : '至少保留一个条目'); return; }
      component.data.items.splice(Number(removeButton.dataset.removeComponentItem), 1); commit(); return;
    }
    if (event.target.closest('[data-add-component-item]')) {
      const rule = isStrictPage(currentPage()) && STRICT_RECIPE_ITEMS[currentPage().recipe].type === component.type ? STRICT_RECIPE_ITEMS[currentPage().recipe] : null;
      const capacity = rule?.max || componentItemCount(component.type);
      if (component.data.items.length >= capacity) { toast(`${COMPONENTS.find(entry => entry.type === component.type)?.name}最多 ${capacity} 项`); return; }
      const index = component.data.items.length;
      component.data.items.push({ title: `核心信息 ${index + 1}`, text: '用一句简短说明补充这一项。', value: String(index + 1).padStart(2, '0') }); commit();
    }
  });
  $('componentEditor').addEventListener('keydown', event => {
    const tab = event.target.closest('[data-select-comp-tab]');
    if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...$('componentEditor').querySelectorAll('[data-select-comp-tab]')];
    const current = tabs.indexOf(tab);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
      : event.key === 'ArrowRight' ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
    event.preventDefault();
    selectedComponentId = tabs[next].dataset.selectCompTab;
    renderInspector();
    $('componentEditor').querySelector('.editor-tab.active')?.focus();
  });

  $('poster').addEventListener('pointerdown', event => {
    const control = event.target.closest('[data-chart-drag]');
    if (!control || event.button !== 0) return;
    const context = chartComponentFromControl(control);
    if (!context) return;
    event.preventDefault();
    event.stopPropagation();
    selectedComponentId = context.component.id;
    enablePercentChartScale(context.component, currentPage());
    syncPercentChartLabels(context.section, context.component);
    chartDragState = { ...context, control, pointerId: event.pointerId, itemIndex: Number(control.dataset.chartItem) };
    control.classList.add('is-dragging');
    $('poster').classList.add('chart-dragging');
    control.setPointerCapture(event.pointerId);
    syncChartValueUI(context.section, context.component, chartDragState.itemIndex, percentFromChartPointer(control, event.clientX, event.clientY), control);
  });
  $('poster').addEventListener('pointermove', event => {
    const state = chartDragState;
    if (!state || event.pointerId !== state.pointerId) return;
    event.preventDefault();
    syncChartValueUI(state.section, state.component, state.itemIndex, percentFromChartPointer(state.control, event.clientX, event.clientY), state.control);
  });
  $('poster').addEventListener('pointerup', finishChartDrag);
  $('poster').addEventListener('pointercancel', finishChartDrag);
  $('poster').addEventListener('keydown', event => {
    const control = event.target.closest('[data-chart-drag]');
    if (!control || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) return;
    const context = chartComponentFromControl(control);
    if (!context) return;
    event.preventDefault();
    enablePercentChartScale(context.component, currentPage());
    const itemIndex = Number(control.dataset.chartItem);
    const current = Math.max(0, Math.min(100, Number.parseFloat(context.component.data.items[itemIndex].value) || 0));
    const step = event.shiftKey || event.key === 'PageUp' || event.key === 'PageDown' ? 5 : 1;
    const percent = event.key === 'Home' ? 0 : event.key === 'End' ? 100
      : Math.max(0, Math.min(100, current + (['ArrowRight', 'ArrowUp', 'PageUp'].includes(event.key) ? step : -step)));
    context.component.data.items[itemIndex].value = `${percent}%`;
    selectedComponentId = context.component.id;
    commit();
    requestAnimationFrame(() => {
      const replacement = [...$('poster').querySelectorAll('[data-chart-drag]')].find(item => item.closest('[data-component-id]')?.dataset.componentId === context.component.id && Number(item.dataset.chartItem) === itemIndex);
      replacement?.focus();
    });
  });

  $('poster').addEventListener('click', event => {
    const compEl = event.target.closest('[data-component-id]');
    if (compEl) {
      selectedComponentId = compEl.dataset.componentId;
      renderInspector();
    }
  });
  $('poster').addEventListener('beforeinput', event => {
    const element = event.target.closest('[data-field]');
    if (!element || !isStrictPage(currentPage())) return;
    const hasItemIndex = element.dataset.itemIndex !== undefined;
    if (isSingleLineEditable(element.dataset.field, hasItemIndex) && ['insertParagraph', 'insertLineBreak'].includes(event.inputType)) {
      event.preventDefault();
      toast('该字段由模板固定为单行');
    }
  });
  $('poster').addEventListener('paste', event => {
    const element = event.target.closest('[data-field]');
    if (!element || !isStrictPage(currentPage())) return;
    event.preventDefault();
    const hasItemIndex = element.dataset.itemIndex !== undefined;
    const text = normalizeEditableText(event.clipboardData?.getData('text/plain') || '', element.dataset.field, hasItemIndex);
    document.execCommand('insertText', false, text);
  });
  $('poster').addEventListener('input', event => {
    const element = event.target.closest('[data-field]'); if (!element) return;
    const value = normalizeEditableText(element.innerText, element.dataset.field, element.dataset.itemIndex !== undefined);
    const field = element.dataset.field;
    const componentId = element.closest('[data-component-id]')?.dataset.componentId;
    const component = currentPage().components.find(entry => entry.id === componentId);
    if (field === 'footerLeft') deck.footerLeft = value;
    else if (component && element.dataset.itemIndex !== undefined) component.data.items[Number(element.dataset.itemIndex)][field] = value;
    else if (component) {
      const key = field === 'subtitle' && ['text', 'file', 'interface'].includes(component.type) ? 'title' :
        ['kicker', 'title', 'body'].includes(field) ? 'text' : field;
      component.data[key] = value;
    }
    persist(); scheduleSnapshot();
  });
  $('poster').addEventListener('blur', event => { if (event.target.closest('[data-field]')) renderAll(); }, true);

  $('imageButton').onclick = () => $('imageInput').click();
  $('imageInput').onchange = async event => {
    const file = event.target.files[0]; event.target.value = '';
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 25 * 1024 * 1024) { toast('请选择 25MB 以内的 PNG、JPG 或 WebP 图片'); return; }
    const page = currentPage();
    const imageComponent = selectedImageComponent(page);
    const target = imageComponent?.data || page;
    try {
      const image = await compressedImageData(file);
      const previous = { image: target.image, imageName: target.imageName };
      target.image = image; target.imageName = file.name;
      if (JSON.stringify(deck).length > 2500000) {
        Object.assign(target, previous);
        toast('图片压缩后仍过大，请换一张图片或先下载 JSON 备份');
        return;
      }
      commit(); toast('图片已替换');
    } catch (error) { console.error(error); toast('图片读取失败，请换一张图片'); }
  };
  $('removeImageButton').onclick = () => { const target = selectedImageComponent()?.data || currentPage(); target.image = ''; target.imageName = ''; commit(); };
  $('cropRange').oninput = event => { const target = selectedImageComponent()?.data || currentPage(); target.imagePosition = Number(event.target.value); $('cropValue').textContent = `${event.target.value}%`; commit({ full: false }); };
  document.querySelectorAll('#fitSwitch button').forEach(button => button.onclick = () => { const target = selectedImageComponent()?.data || currentPage(); target.imageFit = button.dataset.fit; commit(); });
  $('fitSwitch').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const buttons = [...$('fitSwitch').querySelectorAll('button')];
    const current = buttons.findIndex(button => button.getAttribute('aria-checked') === 'true');
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
      : event.key === 'ArrowRight' ? (current + 1) % buttons.length : (current - 1 + buttons.length) % buttons.length;
    event.preventDefault();
    const target = selectedImageComponent()?.data || currentPage();
    target.imageFit = buttons[next].dataset.fit;
    commit();
    buttons[next].focus();
  });
  $('footerLeftInput').oninput = event => { deck.footerLeft = event.target.value; commit({ full: false }); };
  $('pageStartInput').oninput = event => { deck.pageStart = Math.max(0, Math.min(99, Number(event.target.value) || 0)); commit(); };

  document.querySelectorAll('.inspector-tabs button').forEach(button => button.onclick = () => {
    document.querySelectorAll('.inspector-tabs button').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.inspector-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === button.dataset.tab));
  });
  $('zoomOut').onclick = () => setZoom(zoom - .05);
  $('zoomIn').onclick = () => setZoom(zoom + .05);
  $('undoButton').onclick = () => travelHistory(-1);
  $('redoButton').onclick = () => travelHistory(1);

  $('resetButton').onclick = () => {
    if (!confirm('恢复示例会覆盖当前编辑内容，继续吗？')) return;
    deck = normalizeDeck(sampleDeck); selectedIndex = 0; selectedComponentId = currentPage().components[0]?.id || null; history = []; historyIndex = -1; pushHistory(); commit({ snapshot: false }); toast('已恢复示例');
  };
  $('saveJsonButton').onclick = downloadJSON;
  $('importButton').onclick = () => $('jsonInput').click();
  $('jsonInput').onchange = importJSON;
  $('exportButton').onclick = () => $('exportDialog').showModal();
  document.querySelectorAll('[data-close-export]').forEach(button => button.onclick = closeExportDialog);
  $('exportDialog').addEventListener('cancel', event => { event.preventDefault(); closeExportDialog(); });
  $('exportDialog').addEventListener('click', event => { if (event.target === $('exportDialog')) closeExportDialog(); });
  document.querySelectorAll('.export-tabs').forEach(list => {
    list.addEventListener('click', event => {
      const tab = event.target.closest('[role="tab"]');
      if (tab) setExportTab(list, [...list.querySelectorAll('[role="tab"]')].indexOf(tab));
    });
    list.addEventListener('keydown', event => {
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
      const next = event.key === 'ArrowRight' ? (current + 1) % tabs.length
        : event.key === 'ArrowLeft' ? (current - 1 + tabs.length) % tabs.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      setExportTab(list, next, true);
    });
  });
  $('confirmExport').onclick = exportImages;
  window.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') { event.preventDefault(); downloadJSON(); }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); travelHistory(event.shiftKey ? 1 : -1); }
  });
}

function setZoom(value) {
  zoom = Math.max(.25, Math.min(.8, Math.round(value * 20) / 20)); renderPoster();
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 500);
}
function downloadJSON() {
  downloadBlob(new Blob([JSON.stringify(deck, null, 2)], { type: 'application/json' }), 'social-card-deck.json'); toast('Deck JSON 已下载');
}
function validDeckFile(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.pages) || !input.pages.length || input.pages.length > 100) return false;
  return input.pages.every(page => {
    if (!page || typeof page !== 'object' || !RECIPES.some(recipe => recipe.id === (LEGACY_RECIPE_MAP[page.recipe] || page.recipe))) return false;
    if (page.items !== undefined && (!Array.isArray(page.items) || page.items.some(item => !item || typeof item !== 'object'))) return false;
    if (page.components !== undefined && (!Array.isArray(page.components) || !page.components.length || page.components.length > 16 || page.components.some(component => !component || !COMPONENTS.some(entry => entry.type === component.type)))) return false;
    return true;
  });
}
function importJSON(event) {
  const file = event.target.files[0]; event.target.value = '';
  if (!file) return;
  if (file.size > 25 * 1024 * 1024) { toast('JSON 文件超过 25MB，请先缩小图片'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const input = JSON.parse(reader.result);
      if (!validDeckFile(input)) { toast('这不是有效的 Social Card Deck JSON'); return; }
      const imported = normalizeDeck(input);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      clearTimeout(snapshotTimer); pushHistory();
      deck = imported; selectedIndex = 0; selectedComponentId = currentPage().components[0]?.id || null;
      pushHistory(); renderAll(); toast('Deck 已导入');
    } catch (error) { console.error(error); toast('JSON 无法读取或浏览器存储空间不足'); }
  };
  reader.readAsText(file);
}
async function exportImages() {
  if (!window.html2canvas) { toast('导出组件未加载，请刷新后重试'); return; }
  const originalIndex = selectedIndex;
  const choice = $('exportPageSelect').value;
  const format = $('exportFormat').value;
  const filename = $('exportFilename').value.trim().replace(/[\\/:*?"<>|]/g, '-').replace(/[. ]+$/g, '') || 'social-card';
  const targets = choice === 'all' ? deck.pages.map((_, index) => index) : [selectedIndex];
  $('confirmExport').disabled = true;
  try {
    await document.fonts.ready;
    for (const index of targets) {
      selectedIndex = index; renderPoster();
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (fitPosterContent()) { toast(`第 ${pageNumber(index)} 页内容过多，请拆分后导出`); return; }
    }
    for (const index of targets) {
      selectedIndex = index; renderPoster();
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const poster = $('poster'); const transform = poster.style.transform; poster.style.transform = 'none'; poster.classList.add('exporting');
      const canvas = await html2canvas(poster, { width: 1080, height: 1440, scale: 1, useCORS: true, backgroundColor: getComputedStyle(poster).getPropertyValue('--paper').trim(), logging: false });
      poster.style.transform = transform; poster.classList.remove('exporting');
      const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, format === 'jpeg' ? .94 : undefined));
      downloadBlob(blob, filename + '-' + pageNumber(index) + '.' + (format === 'jpeg' ? 'jpg' : 'png'));
      await new Promise(resolve => setTimeout(resolve, 180));
    }
    toast(`已导出 ${targets.length} 张图片`); closeExportDialog();
  } catch (error) {
    console.error(error); toast('导出失败，请检查图片或刷新后重试');
  } finally {
    selectedIndex = originalIndex; renderAll(); $('confirmExport').disabled = false;
  }
}

function setupInspectorResizer() {
  const resizer = $('inspectorResizer');
  if (!resizer) return;

  const savedWidth = localStorage.getItem('social_card_inspector_width');
  if (savedWidth) {
    const widthNum = parseInt(savedWidth, 10);
    if (widthNum >= 360 && widthNum <= 760) {
      document.documentElement.style.setProperty('--inspector-width', `${widthNum}px`);
    }
  }

  let isDragging = false;
  let startX = 0;
  let startWidth = 0;

  resizer.addEventListener('pointerdown', event => {
    isDragging = true;
    resizer.classList.add('is-dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    startX = event.clientX;
    const currentWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--inspector-width')) || 440;
    startWidth = currentWidth;
    resizer.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  resizer.addEventListener('pointermove', event => {
    if (!isDragging) return;
    const delta = startX - event.clientX;
    const maxAvailable = Math.max(380, window.innerWidth - 450);
    const newWidth = Math.max(360, Math.min(Math.min(720, maxAvailable), Math.round(startWidth + delta)));
    document.documentElement.style.setProperty('--inspector-width', `${newWidth}px`);
  });

  const stopDragging = event => {
    if (!isDragging) return;
    isDragging = false;
    resizer.classList.remove('is-dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    try {
      resizer.releasePointerCapture(event.pointerId);
    } catch (_) {}
    const finalWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--inspector-width')) || 440;
    localStorage.setItem('social_card_inspector_width', `${finalWidth}`);
  };

  resizer.addEventListener('pointerup', stopDragging);
  resizer.addEventListener('pointercancel', stopDragging);

  resizer.addEventListener('dblclick', () => {
    document.documentElement.style.setProperty('--inspector-width', '440px');
    localStorage.setItem('social_card_inspector_width', '440');
    toast('已恢复右侧栏默认宽度 (440px)');
  });
}

function setupButtonRipples() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function ripple(button, clientX, clientY) {
    if (button.disabled || reducedMotion.matches) return;
    const rect = button.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const size = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2;
    const wave = document.createElement('span');
    wave.className = 'button-ripple';
    wave.setAttribute('aria-hidden', 'true');
    wave.style.setProperty('--ripple-x', `${x}px`);
    wave.style.setProperty('--ripple-y', `${y}px`);
    wave.style.setProperty('--ripple-size', `${size}px`);
    button.prepend(wave);
    wave.addEventListener('animationend', () => wave.remove(), { once: true });
  }

  document.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    const button = event.target.closest('button');
    if (button) ripple(button, event.clientX, event.clientY);
  });
  document.addEventListener('click', event => {
    if (event.detail !== 0) return;
    const button = event.target.closest('button');
    if (!button) return;
    const rect = button.getBoundingClientRect();
    ripple(button, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
}

function setupIntroScreen() {
  const intro = $('introScreen');
  const grid = $('introGrid');
  const typingText = $('introTypingText');
  const startButton = $('startCreatingButton');
  const transition = $('introTransition');
  const shell = $('appShell');
  if (!intro || !grid || !typingText || !startButton || !transition || !shell) return;

  const messages = [
    'Hello，这是一款小红书图文编辑器',
    '来自大佬guizang的开源项目',
    '帮助你更高效率完成图文创作'
  ];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const timers = new Set();
  let messageIndex = 0;
  let characterIndex = reducedMotion.matches ? messages[0].length : 0;
  let deleting = false;
  let hasEntered = false;

  document.body.classList.add('intro-active');
  shell.inert = true;

  for (let index = 0; index < 34; index += 1) {
    const square = document.createElement('span');
    square.className = 'intro-grid-square';
    square.style.setProperty('--grid-x', String((index * 7 + 3) % 36));
    square.style.setProperty('--grid-y', String((index * 11 + 5) % 27));
    square.style.setProperty('--grid-duration', `${2.8 + (index % 5) * .38}s`);
    square.style.setProperty('--grid-delay', `${(index % 9) * -.41}s`);
    square.style.setProperty('--grid-opacity', String(.06 + (index % 4) * .025));
    grid.appendChild(square);
  }

  function schedule(callback, delay) {
    const timer = window.setTimeout(() => { timers.delete(timer); callback(); }, delay);
    timers.add(timer);
  }

  function typeNext() {
    if (hasEntered || reducedMotion.matches) return;
    const message = Array.from(messages[messageIndex]);
    characterIndex += deleting ? -1 : 1;
    typingText.textContent = message.slice(0, characterIndex).join('');
    if (!deleting && characterIndex === message.length) {
      deleting = true;
      schedule(typeNext, 1750);
      return;
    }
    if (deleting && characterIndex === 0) {
      deleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      schedule(typeNext, 360);
      return;
    }
    schedule(typeNext, deleting ? 38 : 74);
  }

  function enterStudio() {
    if (hasEntered) return;
    hasEntered = true;
    timers.forEach(timer => clearTimeout(timer));
    timers.clear();
    const rect = startButton.getBoundingClientRect();
    transition.style.setProperty('--transition-left', `${rect.left + rect.width / 2}px`);
    transition.style.setProperty('--transition-top', `${rect.top + rect.height / 2}px`);
    transition.style.setProperty('--transition-width', `${rect.width}px`);
    transition.style.setProperty('--transition-height', `${rect.height}px`);
    shell.inert = false;
    shell.removeAttribute('aria-hidden');
    shell.classList.add('is-ready');
    document.body.classList.remove('intro-active');
    if (reducedMotion.matches) {
      intro.hidden = true;
      transition.hidden = true;
      return;
    }
    transition.classList.add('is-expanding');
    schedule(() => intro.classList.add('is-leaving'), 430);
    schedule(() => {
      intro.hidden = true;
      transition.hidden = true;
      transition.classList.remove('is-expanding');
    }, 1240);
  }

  startButton.addEventListener('click', enterStudio);
  if (!reducedMotion.matches) {
    typingText.textContent = '';
    schedule(typeNext, 420);
  }
}

function init() {
  if (window.innerWidth < 560) zoom = 0.3;
  bindEvents(); setupButtonRipples(); setupInspectorResizer(); setupIntroScreen(); pushHistory(); renderAll(); updateHistoryButtons();
}
init();
