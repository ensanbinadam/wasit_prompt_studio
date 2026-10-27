import {
  CATALOG,
  CATEGORIES,
  MODIFIERS,
  OPTIONS,
  SMART_GROUPS,
  TEMPLATES,
} from './catalog.js';
import {
  auditPrompt,
  buildPrompt,
  getProductSpec,
  getTaskGroup,
} from './promptBuilder.js';

// Initial state
const INITIAL_STATE = {
  locale: 'ar',
  command: 'Comic',
  category: 'all',
  search: '',
  idea: '',
  constraints: '',
  customCommand: '',
  persona: '',
  context: '',
  avoid: '',
  successCriteria: '',
  platform: 'general',
  promptMode: 'structured',
  sourcePolicy: 'balanced',
  maxWords: 'auto',
  creativity: '50',
  promptLang: 'ar',
  audience: 'general',
  tone: 'friendly',
  depth: 'balanced',
  format: 'storyboard',
  quantity: '6',
  numerals: 'western',
  resultAlign: 'natural',
  resultDir: 'auto',
  outputOrder: 'logical',
  needExamples: true,
  needQuestions: true,
  needSources: false,
  needChecklist: false,
  uiDir: 'rtl',
  cardOrder: 'rtl',
  uiAlign: 'start',
  density: 'comfortable',
  includeFileText: true,
  artifactFormat: 'auto',
  artifactName: '',
  includeEditable: true,
  footerEnabled: false,
  footerText: '',
  footerAlign: 'center',
  footerScope: 'all',
  footerSize: 'small',
  footerSeparator: false,
  modifiers: ['Educational'],
  dark: false,
  specialized: {},
};

// Global reactive state
let state = { ...INITIAL_STATE };
let files = [];
let characters = [];
let presets = [];
let activeTemplateId = null;
let toastTimeout = null;

const $ = (id) => document.getElementById(id);

// Load persisted state
function loadPersistedState() {
  try {
    const saved = localStorage.getItem('wasit-state-v2');
    if (saved) state = { ...INITIAL_STATE, ...JSON.parse(saved) };
  } catch (e) {
    console.warn('Could not load saved state:', e);
  }

  try {
    const savedChars = localStorage.getItem('wasit-characters-v2');
    if (savedChars) characters = JSON.parse(savedChars);
    else {
      characters = [
        {
          id: 'salem-default',
          name: 'سالم',
          heroIdentity: 'طفل سعودي عمره 9 سنوات، وجه مستدير، بشرة قمحية فاتحة، شعر أسود قصير مسرّح للجانب، عينان بنيتان واسعتان.',
          heroOutfit: 'ثوب سعودي أبيض أنيق مع ياقة بأزرار، حذاء رياضي أبيض خفيف.',
          heroAccessories: 'حقيبة ظهر خضراء صغيرة بحمالتين.',
          visualStyle: 'cartoon',
        },
      ];
    }
  } catch (e) {
    // fallback
  }

  try {
    const savedPresets = localStorage.getItem('wasit-presets-v2');
    if (savedPresets) presets = JSON.parse(savedPresets);
  } catch (e) {
    // fallback
  }
}

function persistState() {
  try {
    const toSave = { ...state };
    delete toSave.search;
    localStorage.setItem('wasit-state-v2', JSON.stringify(toSave));
  } catch (e) {}
}

function persistCharacters() {
  try {
    localStorage.setItem('wasit-characters-v2', JSON.stringify(characters));
  } catch (e) {}
}

function persistPresets() {
  try {
    localStorage.setItem('wasit-presets-v2', JSON.stringify(presets));
  } catch (e) {}
}

export function showToast(message) {
  const toast = $('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden', 'opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.classList.add('hidden'), 200);
  }, 2600);
}

// Render dynamic parts
function renderLocaleAndTheme() {
  const isAr = state.locale === 'ar';
  document.documentElement.lang = state.locale;
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';

  if (state.dark) {
    document.documentElement.classList.add('dark');
    $('themeToggle').innerHTML = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    $('themeToggle').innerHTML = '☾';
  }

  $('langToggle').textContent = isAr ? 'EN' : 'عربي';

  // Update i18n text tags
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (I18N_STRINGS[key]) {
      el.textContent = isAr ? I18N_STRINGS[key].ar : I18N_STRINGS[key].en;
    }
  });

  // Re-populate select dropdown options with localized labels
  populateSelectOptions();
}

const I18N_STRINGS = {
  appName: { ar: 'وسيط', en: 'WASIT' },
  appTagline: { ar: 'استوديو البرومبتات الذكي', en: 'PROMPT STUDIO' },
  navCommands: { ar: 'الأوامر', en: 'Commands' },
  navIdea: { ar: 'الفكرة والمراجع', en: 'Idea & Files' },
  navSmart: { ar: 'الإعدادات الذكية', en: 'Smart Specs' },
  navProduct: { ar: 'المنتج الرقمي', en: 'Digital Product' },
  navFooter: { ar: 'تذييل التوثيق', en: 'Footer' },
  navFineTune: { ar: 'الضبط المتقدم', en: 'Fine-Tuning' },
  btnLibrary: { ar: 'المكتبة', en: 'Library' },
  btnLiveTest: { ar: 'تجربة الذكاء الاصطناعي', en: 'Live Test' },
  btnNewRequest: { ar: 'طلب جديد', en: 'New Request' },
  heroEyebrow: { ar: 'من الفكرة البسيطة إلى برومبت تنفيذي متكامل', en: 'FROM IDEA TO PRODUCTION PROMPT' },
  heroTitle1: { ar: 'فكرتك تستحق', en: 'Your idea deserves' },
  heroTitleHighlight: { ar: 'صياغة استثنائية', en: 'masterful prompting' },
  heroTitle2: { ar: 'تطلب منتجًا نهائيًا.', en: 'for real digital deliverables.' },
  heroDesc: {
    ar: 'اختر أمرًا، صف فكرتك، واضبط كل تفصيل. وسيط يحوّل اختصاراتك إلى برومبت هندسي يطلب إنشاء ملفات رقمية حقيقية قابلة للتنزيل مع تذييل توثيق اختياري مستقل للمعلمين والباحثين.',
    en: 'Pick a command, describe your idea, and fine-tune every variable. Wasit crafts an authoritative prompt requesting downloadable final files with optional independent educator footers.'
  },
  quickTemplatesTitle: { ar: 'قوالب سريعة جاهزة بنقرة واحدة', en: 'One-Click Quick Templates' },
  templatesTip: {
    ar: 'انقر على أي قالب لتعبئة الأمر والفكرة والمعايير فوراً',
    en: 'Click any template to auto-populate command and details immediately'
  },
  kpiCommands: { ar: 'أمر احترافي مصنف', en: 'Categorized Commands' },
  kpiFormats: { ar: 'صيغة منتج رقمي نهائي', en: 'Digital Product Formats' },
  kpiLanguages: { ar: 'ثنائي اللغة واتجاهين كاملين', en: 'Bilingual RTL & LTR' },
  kpiPrivacy: { ar: 'خصوصية ومعالجة محلية', en: 'Local & Private by Design' },
  step1Title: { ar: 'ما الذي تريد إنجازه؟', en: 'What do you want to accomplish?' },
  step1Sub: { ar: 'اختر أمرًا متخصصًا من مكتبة الـ 136 أمرًا، أو اكتب أمرًا مخصصًا لك.', en: 'Pick a specialized command from the 136-item library, or define a custom one.' },
  customCommandLabel: { ar: 'أو أدخل أمرًا خاصًا بك (اختياري)', en: 'Or enter a custom command (optional)' },
  step2Title: { ar: 'أضف الفكرة والمراجع', en: 'Add Idea & Reference Files' },
  step2Sub: { ar: 'صف المهمة بلغتك الطبيعية، وأرفق ملفات داعمة إذا كانت متوفرة.', en: 'Describe the task in natural language, and attach relevant references.' },
  ideaLabel: { ar: 'فكرتك أو المهمة المطلوبة', en: 'Your Idea or Task' },
  constraintsLabel: { ar: 'شروط وقيود إضافية (اختياري)', en: 'Additional Constraints (optional)' },
  dropTitle: { ar: 'أسقط ملفاتك هنا أو تصفح من جهازك', en: 'Drop reference files here or browse' },
  step3Title: { ar: 'اضبط أسلوب الاستجابة والمحرك', en: 'Fine-Tune Response & Prompt Engine' },
  step3Sub: { ar: 'تحكم في ما سيظهر في النتيجة بدقة هندسية عالية لضمان التوافق مع هدفك.', en: 'Precisely shape the tone, audience, structure, and length of the generated answer.' },
  livePreviewTitle: { ar: 'البرومبت التنفيذي النهائي', en: 'Production Prompt' },
  btnCopyPrompt: { ar: 'نسخ البرومبت', en: 'Copy Prompt' },
  btnDownloadTxt: { ar: 'تنزيل TXT', en: 'Download TXT' },
  btnExportJson: { ar: 'تصدير JSON', en: 'Export JSON' },
  btnSavePreset: { ar: 'حفظ كقالب', en: 'Save Preset' },
  btnDownloadStandalone: { ar: 'تنزيل صفحة أوفلاين مستقلة (HTML)', en: 'Download Standalone HTML (Offline)' },
};

function populateSelectOptions() {
  const isAr = state.locale === 'ar';
  const selectMap = {
    promptLang: OPTIONS.promptLang,
    audience: OPTIONS.audience,
    tone: OPTIONS.tone,
    depth: OPTIONS.depth,
    format: OPTIONS.format,
    quantity: OPTIONS.quantity,
    numerals: OPTIONS.numerals,
    resultDir: OPTIONS.resultDir,
    resultAlign: OPTIONS.resultAlign,
    platform: OPTIONS.platform,
    promptMode: OPTIONS.promptMode,
    sourcePolicy: OPTIONS.sourcePolicy,
    maxWords: OPTIONS.maxWords,
    artifactFormat: OPTIONS.artifactFormat,
    footerAlign: OPTIONS.footerAlign,
    footerScope: OPTIONS.footerScope,
    footerSize: OPTIONS.footerSize,
  };

  for (const [selectId, opts] of Object.entries(selectMap)) {
    const el = $(selectId);
    if (!el) continue;
    const currentVal = state[selectId] || el.value;
    el.innerHTML = opts
      .map((opt) => `<option value="${opt[0]}" ${opt[0] === currentVal ? 'selected' : ''}>${isAr ? opt[1] : opt[2]}</option>`)
      .join('');
  }
}

function renderQuickTemplates() {
  const container = $('templatesContainer');
  if (!container) return;
  const isAr = state.locale === 'ar';

  const countBadge = $('templatesCountBadge');
  if (countBadge) {
    countBadge.textContent = isAr
      ? `${TEMPLATES.length} قالبًا نموذجيًا (معروضة بالكامل)`
      : `All ${TEMPLATES.length} Curated Templates`;
  }

  container.innerHTML = TEMPLATES.map((tpl) => {
    const isSelected = activeTemplateId === tpl.id;
    return `
      <button
        type="button"
        data-template-id="${tpl.id}"
        class="template-btn flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
          isSelected
            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-1 ring-emerald-500'
            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30'
        }"
      >
        <span class="text-xs">${tpl.icon || '✦'}</span>
        <span>${isAr ? tpl.labelAr : tpl.labelEn}</span>
        ${isSelected ? '<span class="w-1.5 h-1.5 rounded-full bg-white ms-0.5"></span>' : ''}
      </button>
    `;
  }).join('');
}

function renderCategories() {
  const container = $('categoriesBar');
  if (!container) return;
  const isAr = state.locale === 'ar';

  container.innerHTML = CATEGORIES.map((cat) => {
    const isActive = state.category === cat.id;
    return `
      <button
        type="button"
        data-category-id="${cat.id}"
        class="category-btn px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 ${
          isActive
            ? 'bg-emerald-800 text-white border-emerald-800 dark:bg-emerald-700 dark:border-emerald-700 shadow-xs'
            : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200/90 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-emerald-600 hover:text-emerald-700'
        }"
      >
        ${isAr ? cat.nameAr : cat.nameEn}
      </button>
    `;
  }).join('');
}

function renderCommandsGrid() {
  const grid = $('commandsGrid');
  if (!grid) return;
  const isAr = state.locale === 'ar';
  const q = (state.search || '').toLowerCase().trim();

  const filtered = CATALOG.filter((cmd) => {
    const matchesCat = state.category === 'all' || cmd[1] === state.category;
    if (!matchesCat) return false;
    if (!q) return true;
    return (
      cmd[0].toLowerCase().includes(q) ||
      cmd[2].toLowerCase().includes(q) ||
      cmd[3].toLowerCase().includes(q) ||
      cmd[4].toLowerCase().includes(q) ||
      cmd[5].toLowerCase().includes(q)
    );
  });

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="col-span-full py-10 text-center text-neutral-500 dark:text-neutral-400 text-sm">
        ${isAr ? 'لم نعثر على أمر مطابق لبحثك. جرب كلمة أخرى.' : 'No commands matched your search query.'}
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((cmd) => {
      const isSelected = state.command === cmd[0] && !state.customCommand.trim();
      return `
        <button
          type="button"
          data-command-id="${cmd[0]}"
          class="command-card relative text-start rounded-xl transition-all border p-3 flex flex-col justify-between min-h-[96px] ${
            isSelected
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-600'
              : 'bg-neutral-50/60 dark:bg-neutral-800/40 border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-500/70 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
          }"
        >
          <div>
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400 tracking-tight" dir="ltr">
                /${cmd[0]}
              </span>
              ${isSelected ? '<span class="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</span>' : ''}
            </div>
            <strong class="block text-xs font-bold text-neutral-900 dark:text-neutral-100">
              ${isAr ? cmd[2] : cmd[3]}
            </strong>
          </div>
          <p class="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-snug">
            ${isAr ? cmd[4] : cmd[5]}
          </p>
        </button>
      `;
    })
    .join('');

  // Update active command indicator
  const activeCmd = CATALOG.find((c) => c[0] === state.command) || CATALOG[0];
  const activeCode = state.customCommand.trim() ? state.customCommand.trim().replace(/^\//, '') : activeCmd[0];
  $('activeCommandTag').textContent = `/${activeCode}`;
  $('activeCommandDesc').textContent = isAr ? activeCmd[4] : activeCmd[5];
}

function renderSmartFields() {
  const container = $('smartFieldsContainer');
  if (!container) return;
  const isAr = state.locale === 'ar';
  const group = getTaskGroup(state);
  const def = SMART_GROUPS[group] || SMART_GROUPS.general;
  const vals = state.specialized?.[group] || {};

  $('smartDomainLabel').textContent = isAr ? def.ar : def.en;

  // Comic Character Tool is shown if group === 'comic'
  const charTool = $('comicCharacterTool');
  if (charTool) {
    charTool.classList.toggle('hidden', group !== 'comic');
    if (group === 'comic') renderCharacterDropdown();
  }

  container.innerHTML = def.fields
    .map(([key, nameAr, nameEn, type, arg1, arg2, wide]) => {
      const val = vals[key] || '';
      const label = isAr ? nameAr : nameEn;
      let inputHtml = '';

      if (type === 'select') {
        const options = arg1
          .map((o) => `<option value="${o[0]}" ${o[0] === val ? 'selected' : ''}>${isAr ? o[1] : o[2]}</option>`)
          .join('');
        inputHtml = `
          <select data-smart-group="${group}" data-smart-key="${key}" class="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-neutral-100">
            ${options}
          </select>
        `;
      } else if (type === 'textarea') {
        inputHtml = `
          <textarea rows="2" data-smart-group="${group}" data-smart-key="${key}" placeholder="${isAr ? arg1 : arg2}" class="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-neutral-100">${val}</textarea>
        `;
      } else {
        inputHtml = `
          <input type="text" data-smart-group="${group}" data-smart-key="${key}" value="${val}" placeholder="${isAr ? arg1 : arg2}" class="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-900 dark:text-neutral-100" />
        `;
      }

      return `
        <div class="${wide ? 'sm:col-span-2' : ''}">
          <label class="block text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1">${label}</label>
          ${inputHtml}
        </div>
      `;
    })
    .join('');
}

function renderCharacterDropdown() {
  const select = $('characterSelect');
  if (!select) return;
  const isAr = state.locale === 'ar';

  select.innerHTML = `
    <option value="">${isAr ? '-- اختر شخصية محفوظة للاستدعاء --' : '-- Choose a saved character --'}</option>
    ${characters.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}
  `;
}

function renderProductPreview() {
  const spec = getProductSpec(state);
  const isAr = state.locale === 'ar';

  $('productPreviewTitle').textContent = `${isAr ? spec.profile.ar : spec.profile.en} — ${spec.files.join(' + ')}${
    spec.editable.length ? ` (${isAr ? 'ملفات المصدر: ' : 'source: '}${spec.editable.join(' + ')})` : ''
  }`;
  $('productPreviewGuide').textContent = isAr ? spec.profile.arGuide : spec.profile.enGuide;
}

function renderFooterPreview() {
  const isEnabled = Boolean(state.footerEnabled);
  $('footerFieldsArea').classList.toggle('hidden', !isEnabled);

  const preview = $('footerMockBand');
  if (!preview) return;
  const isAr = state.locale === 'ar';

  preview.textContent = (state.footerText || '').trim() || (isAr ? 'سيظهر نص التذييل الموثق هنا في الهامش الخارجي المستقل' : 'Your documentation footer text will appear here');
  preview.style.textAlign = state.footerAlign || 'center';
  preview.classList.toggle('border-t', Boolean(state.footerSeparator));
  preview.classList.toggle('text-xs', state.footerSize === 'medium');
  preview.classList.toggle('text-[11px]', state.footerSize !== 'medium');
}

function renderModifiersGrid() {
  const container = $('modifiersGrid');
  if (!container) return;
  const isAr = state.locale === 'ar';

  container.innerHTML = MODIFIERS.map(([id, nameAr, nameEn]) => {
    const isSelected = state.modifiers.includes(id);
    return `
      <button
        type="button"
        data-modifier-id="${id}"
        class="modifier-btn px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
          isSelected
            ? 'bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600 shadow-xs'
            : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-600 hover:text-emerald-700'
        }"
      >
        <span class="font-mono font-semibold" dir="ltr">/${id}</span>
        <span class="ms-1 text-[11px] opacity-90">· ${isAr ? nameAr : nameEn}</span>
      </button>
    `;
  }).join('');
}

function renderFilesList() {
  const list = $('filesList');
  if (!list) return;
  const isAr = state.locale === 'ar';

  if (!files.length) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = files
    .map((file, idx) => `
      <div class="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <span class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
            ${file.ext}
          </span>
          <div class="truncate ms-2">
            <span class="font-semibold text-neutral-800 dark:text-neutral-200 block truncate">${file.name}</span>
            <span class="text-[10px] text-neutral-500 dark:text-neutral-400">
              ${(file.size / 1024).toFixed(0)} KB · ${
                file.content
                  ? isAr ? 'محتوى نصي مدرج' : 'Text content included'
                  : file.tooBig
                  ? isAr ? 'حجم كبير (اسم فقط)' : 'Large file (name only)'
                  : isAr ? 'إرفاق يدوي مطلوب' : 'Attach separately'
              }
            </span>
          </div>
        </div>
        <button type="button" data-remove-file="${idx}" class="p-1 rounded-lg text-neutral-400 hover:text-rose-600">
          ✕
        </button>
      </div>
    `)
    .join('');
}

function renderPromptPreview() {
  const promptText = buildPrompt(state, files);
  const promptEl = $('promptOutput');
  if (promptEl) {
    promptEl.textContent = promptText;
    promptEl.style.direction = state.resultDir === 'auto' ? (state.promptLang === 'en' ? 'ltr' : 'rtl') : state.resultDir;
    promptEl.style.textAlign = state.resultAlign === 'natural' ? (state.promptLang === 'en' ? 'left' : 'right') : state.resultAlign;
  }

  const isAr = state.locale === 'ar';
  const wordCount = promptText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = promptText.length;
  const tokens = Math.ceil(charCount / 3.8);

  $('wordCount').textContent = `${wordCount} ${isAr ? 'كلمة' : 'words'}`;
  $('charCount').textContent = `${charCount} ${isAr ? 'حرف' : 'chars'}`;
  $('tokenCount').textContent = `~${tokens} ${isAr ? 'رمز تقديري' : 'tokens'}`;
  $('ideaCharCount').textContent = `${(state.idea || '').length} ${isAr ? 'حرف' : 'characters'}`;
  $('creativityDisplay').textContent = `${state.creativity}%`;

  // Render Quality Issues
  const issues = auditPrompt(state, files);
  const issuesList = $('qualityIssuesList');
  const issuesSummary = $('qualitySummary');

  if (issuesSummary) {
    if (issues.length) {
      issuesSummary.textContent = `${issues.length} ${isAr ? 'ملاحظات' : 'items'}`;
      issuesSummary.className = 'text-[11px] font-bold text-amber-700 dark:text-amber-400';
    } else {
      issuesSummary.textContent = isAr ? '✓ ممتاز ومتناسق' : '✓ Optimal & Consistent';
      issuesSummary.className = 'text-[11px] font-bold text-emerald-700 dark:text-emerald-400';
    }
  }

  if (issuesList) {
    if (!issues.length) {
      issuesList.innerHTML = `<p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">${
        isAr ? 'المعطيات مكتملة ومتناسقة وجاهزة للتنفيذ أو النسخ.' : 'All settings are balanced and ready for copy or execution.'
      }</p>`;
    } else {
      issuesList.innerHTML = issues
        .map(
          (i) => `
          <div class="flex items-start justify-between gap-2 text-[11px] text-neutral-700 dark:text-neutral-300 pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60">
            <span class="leading-snug">⚑ ${i.text}</span>
            ${
              i.fix
                ? `<button type="button" data-quality-fix="${i.fix}" class="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-200 transition-colors shrink-0 text-[10px]">
                    ${isAr ? 'إصلاح فوري' : 'Fix'}
                   </button>`
                : ''
            }
          </div>
        `
        )
        .join('');
    }
  }

  persistState();
}

function renderPresetsModal() {
  const isAr = state.locale === 'ar';
  const list = $('presetsList');
  if (!list) return;

  if (!presets.length) {
    list.innerHTML = `
      <div class="py-8 text-center text-xs text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
        ${isAr ? 'لم تحفظ أي قوالب خاصة بعد. احفظ إعداداتك لتسهيل استدعائها مستقبلاً.' : 'No saved presets yet.'}
      </div>
    `;
    return;
  }

  list.innerHTML = presets
    .map(
      (p) => `
      <div class="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800/40 hover:border-emerald-600/60 transition-colors">
        <div class="min-w-0 pe-3">
          <strong class="block text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">${p.name}</strong>
          <span class="text-[10px] text-neutral-500 font-mono">/${p.config.command} · ${p.config.format} · ${p.createdAt}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button type="button" data-load-preset="${p.id}" class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 text-xs font-bold transition-colors">
            ${isAr ? 'استدعاء' : 'Load'}
          </button>
          <button type="button" data-delete-preset="${p.id}" class="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600">
            🗑
          </button>
        </div>
      </div>
    `
    )
    .join('');
}

// Download Standalone Single-File HTML
function downloadStandaloneHtml() {
  const currentPrompt = buildPrompt(state, files);
  const standaloneDoc = `<!doctype html>
<html lang="${state.locale}" dir="${state.locale === 'ar' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>وسيط | Wasit Prompt Studio - Offline</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8faf9; color: #111827; padding: 24px 16px; max-width: 960px; margin: 0 auto; line-height: 1.6; }
    @media (prefers-color-scheme: dark) { body { background: #0c0f0e; color: #f3f4f6; } pre { background: #171d1a!important; border-color: #2b3b33!important; color: #e5e7eb!important; } .card { background: #171d1a!important; border-color: #2b3b33!important; } }
    h1 { color: #047857; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; font-size: 24px; }
    .badge { font-size: 11px; background: #d1fae5; color: #065f46; padding: 3px 8px; border-radius: 999px; font-weight: bold; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; margin-top: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    pre { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; white-space: pre-wrap; font-family: monospace; font-size: 12px; line-height: 1.7; max-height: 520px; overflow-y: auto; }
    .btn-group { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
    .btn { background: #047857; color: #fff; border: none; padding: 9px 16px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
    .btn:hover { background: #065f46; }
    .btn-outline { background: transparent; color: inherit; border: 1px solid #d1d5db; padding: 7px 12px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; }
    .btn-outline:hover { border-color: #047857; color: #047857; }
  </style>
</head>
<body>
  <h1><span>و</span> <span>وسيط · Wasit Prompt Studio</span> <span class="badge">Offline</span></h1>
  <p style="margin: 4px 0 16px; font-size: 13px; color: #6b7280;">برومبت تنفيذي متكامل معدّ وجاهز للاستخدام الفوري مع أي نموذج ذكاء اصطناعي.</p>
  
  <div class="card">
    <div class="btn-group">
      <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('p').innerText);alert('تم نسخ البرومبت بنجاح!')">📋 نسخ البرومبت</button>
      <a class="btn-outline" href="https://chatgpt.com/" target="_blank" onclick="navigator.clipboard.writeText(document.getElementById('p').innerText)">🟢 فتح في ChatGPT</a>
      <a class="btn-outline" href="https://claude.ai/new" target="_blank" onclick="navigator.clipboard.writeText(document.getElementById('p').innerText)">🟣 فتح في Claude</a>
      <a class="btn-outline" href="https://chat.deepseek.com/" target="_blank" onclick="navigator.clipboard.writeText(document.getElementById('p').innerText)">🐋 فتح في DeepSeek</a>
      <a class="btn-outline" href="https://gemini.google.com/app" target="_blank" onclick="navigator.clipboard.writeText(document.getElementById('p').innerText)">🔵 فتح في Gemini</a>
      <a class="btn-outline" href="https://copilot.microsoft.com/" target="_blank" onclick="navigator.clipboard.writeText(document.getElementById('p').innerText)">🔷 فتح في Copilot</a>
    </div>
    <pre id="p">${currentPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
  </div>
</body>
</html>`;

  const blob = new Blob([standaloneDoc], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wasit-standalone-${state.command.toLowerCase()}.html`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 1000);
  showToast(state.locale === 'ar' ? 'تم تنزيل صفحة HTML مستقلة تعمل دون إنترنت!' : 'Downloaded offline standalone HTML file!');
}

// Setup event listeners
function setupEventListeners() {
  // Theme & Locale
  $('themeToggle').addEventListener('click', () => {
    state.dark = !state.dark;
    renderLocaleAndTheme();
    renderPromptPreview();
  });

  $('langToggle').addEventListener('click', () => {
    state.locale = state.locale === 'ar' ? 'en' : 'ar';
    renderLocaleAndTheme();
    renderQuickTemplates();
    renderCategories();
    renderCommandsGrid();
    renderSmartFields();
    renderProductPreview();
    renderFooterPreview();
    renderModifiersGrid();
    renderPromptPreview();
  });

  // Navigation Links
  document.querySelectorAll('[data-nav-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = $(btn.dataset.navTarget);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Top Action Buttons
  $('btnNewRequest').addEventListener('click', () => {
    state.idea = '';
    state.constraints = '';
    state.customCommand = '';
    state.context = '';
    state.persona = '';
    state.avoid = '';
    state.successCriteria = '';
    state.specialized = {};
    files = [];
    activeTemplateId = null;
    $('ideaInput').value = '';
    $('constraintsInput').value = '';
    $('customCommandInput').value = '';
    renderFilesList();
    renderSmartFields();
    renderPromptPreview();
    showToast(state.locale === 'ar' ? 'تم مسح الطلب والبدء من جديد' : 'New request ready');
  });

  $('btnOpenLibrary').addEventListener('click', () => {
    renderPresetsModal();
    $('presetsModal').classList.remove('hidden');
  });

  $('btnLiveTestTop').addEventListener('click', openLiveTestModal);
  $('btnLiveTestDock').addEventListener('click', openLiveTestModal);

  // Template clicks
  $('templatesContainer').addEventListener('click', (e) => {
    const btn = e.target.closest('.template-btn');
    if (!btn) return;
    const tplId = btn.dataset.templateId;
    const tpl = TEMPLATES.find((t) => t.id === tplId);
    if (!tpl) return;

    activeTemplateId = tpl.id;
    state.command = tpl.cmd;
    state.customCommand = '';
    state.idea = state.locale === 'ar' ? tpl.ideaAr : tpl.ideaEn;
    state.format = tpl.format;
    state.quantity = tpl.quantity;
    state.modifiers = [...tpl.mods];
    state.category = 'all';
    state.search = '';

    $('ideaInput').value = state.idea;
    $('customCommandInput').value = '';
    renderQuickTemplates();
    renderCategories();
    renderCommandsGrid();
    renderSmartFields();
    renderProductPreview();
    renderModifiersGrid();
    renderPromptPreview();
    showToast(state.locale === 'ar' ? `تم تفعيل قالب «${tpl.labelAr}»` : `Loaded template "${tpl.labelEn}"`);
  });

  // Category clicks
  $('categoriesBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;
    state.category = btn.dataset.categoryId;
    renderCategories();
    renderCommandsGrid();
  });

  // Search input
  $('searchCommandsInput').addEventListener('input', (e) => {
    state.search = e.target.value;
    renderCommandsGrid();
  });

  // Command clicks
  $('commandsGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.command-card');
    if (!card) return;
    state.command = card.dataset.commandId;
    state.customCommand = '';
    $('customCommandInput').value = '';
    renderCommandsGrid();
    renderSmartFields();
    renderProductPreview();
    renderPromptPreview();
  });

  // Custom command
  $('customCommandInput').addEventListener('input', (e) => {
    state.customCommand = e.target.value;
    renderCommandsGrid();
    renderSmartFields();
    renderProductPreview();
    renderPromptPreview();
  });

  // Idea input
  $('ideaInput').addEventListener('input', (e) => {
    state.idea = e.target.value;
    renderPromptPreview();
  });

  // Constraints input
  $('constraintsInput').addEventListener('input', (e) => {
    state.constraints = e.target.value;
    renderPromptPreview();
  });

  // AI Expand Idea
  $('btnEnhanceIdea').addEventListener('click', async () => {
    if (!state.idea.trim()) return;
    const btn = $('btnEnhanceIdea');
    btn.disabled = true;
    btn.classList.add('opacity-50');

    try {
      const res = await fetch('/api/enhance-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: state.idea,
          command: state.command,
          lang: state.locale,
        }),
      });
      const data = await res.json();
      if (data.success && data.enhanced) {
        state.idea = data.enhanced;
        $('ideaInput').value = data.enhanced;
        renderPromptPreview();
        showToast(state.locale === 'ar' ? 'تم توسيع الفكرة بذكاء!' : 'Idea expanded by AI!');
      }
    } catch (e) {
      console.error(e);
    } finally {
      btn.disabled = false;
      btn.classList.remove('opacity-50');
    }
  });

  // Insert Sample Idea
  $('btnInsertExample').addEventListener('click', () => {
    const known = TEMPLATES.find((t) => t.cmd === state.command);
    state.idea = known
      ? state.locale === 'ar' ? known.ideaAr : known.ideaEn
      : state.locale === 'ar'
      ? 'أنشئ محتوى تفاعلياً متميزاً يراعي المعايير التربوية وتطبيق أمثلة واقعية.'
      : 'Create an engaging interactive workflow adhering to best practices and realistic examples.';
    $('ideaInput').value = state.idea;
    renderPromptPreview();
    showToast(state.locale === 'ar' ? 'تم إدراج فكرة نموذجية' : 'Sample idea inserted');
  });

  // Clear Idea
  $('btnClearIdea').addEventListener('click', () => {
    state.idea = '';
    $('ideaInput').value = '';
    renderPromptPreview();
  });

  // Files Dropzone
  const dropzone = $('dropzone');
  const fileInput = $('fileInput');

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('border-emerald-600', 'bg-emerald-50/40');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('border-emerald-600', 'bg-emerald-50/40');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('border-emerald-600', 'bg-emerald-50/40');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  });

  $('includeFileTextCheckbox').addEventListener('change', (e) => {
    state.includeFileText = e.target.checked;
    renderPromptPreview();
  });

  $('filesList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-file]');
    if (!btn) return;
    const idx = parseInt(btn.dataset.removeFile, 10);
    files.splice(idx, 1);
    renderFilesList();
    renderPromptPreview();
  });

  // Smart Fields Input
  $('smartFieldsContainer').addEventListener('input', (e) => {
    const target = e.target;
    const group = target.dataset.smartGroup;
    const key = target.dataset.smartKey;
    if (group && key) {
      if (!state.specialized[group]) state.specialized[group] = {};
      state.specialized[group][key] = target.value;
      renderPromptPreview();
    }
  });

  // Character Tool
  $('btnFillSalem').addEventListener('click', () => {
    const salem = characters.find((c) => c.name === 'سالم') || characters[0];
    if (!state.specialized.comic) state.specialized.comic = {};
    state.specialized.comic.heroName = salem.name;
    state.specialized.comic.heroIdentity = salem.heroIdentity;
    state.specialized.comic.heroOutfit = salem.heroOutfit;
    state.specialized.comic.heroAccessories = salem.heroAccessories;
    state.specialized.comic.visualStyle = salem.visualStyle;
    state.specialized.comic.targetGrade = 'الصف الثالث الابتدائي';
    renderSmartFields();
    renderPromptPreview();
    showToast(state.locale === 'ar' ? 'تمت تعبئة بيانات سالم' : 'Filled Salem profile');
  });

  $('characterSelect').addEventListener('change', (e) => {
    const id = e.target.value;
    const char = characters.find((c) => c.id === id);
    if (char) {
      if (!state.specialized.comic) state.specialized.comic = {};
      state.specialized.comic.heroName = char.name;
      state.specialized.comic.heroIdentity = char.heroIdentity;
      state.specialized.comic.heroOutfit = char.heroOutfit;
      state.specialized.comic.heroAccessories = char.heroAccessories;
      state.specialized.comic.visualStyle = char.visualStyle;
      renderSmartFields();
      renderPromptPreview();
      showToast(state.locale === 'ar' ? `تم استدعاء «${char.name}»` : `Loaded "${char.name}"`);
    }
  });

  // Product Delivery Section
  $('artifactFormat').addEventListener('change', (e) => {
    state.artifactFormat = e.target.value;
    renderProductPreview();
    renderPromptPreview();
  });

  $('artifactName').addEventListener('input', (e) => {
    state.artifactName = e.target.value;
    renderProductPreview();
    renderPromptPreview();
  });

  $('includeEditableCheckbox').addEventListener('change', (e) => {
    state.includeEditable = e.target.checked;
    renderProductPreview();
    renderPromptPreview();
  });

  // Footer Section
  $('footerEnabledCheckbox').addEventListener('change', (e) => {
    state.footerEnabled = e.target.checked;
    renderFooterPreview();
    renderPromptPreview();
  });

  $('footerTextInput').addEventListener('input', (e) => {
    state.footerText = e.target.value;
    renderFooterPreview();
    renderPromptPreview();
  });

  $('footerAlign').addEventListener('change', (e) => {
    state.footerAlign = e.target.value;
    renderFooterPreview();
    renderPromptPreview();
  });

  $('footerScope').addEventListener('change', (e) => {
    state.footerScope = e.target.value;
    renderFooterPreview();
    renderPromptPreview();
  });

  $('footerSize').addEventListener('change', (e) => {
    state.footerSize = e.target.value;
    renderFooterPreview();
    renderPromptPreview();
  });

  $('footerSeparatorCheckbox').addEventListener('change', (e) => {
    state.footerSeparator = e.target.checked;
    renderFooterPreview();
    renderPromptPreview();
  });

  // Fine-tuning basic selects
  [
    'promptLang', 'audience', 'tone', 'depth', 'format',
    'quantity', 'numerals', 'resultDir', 'resultAlign',
  ].forEach((id) => {
    $(id).addEventListener('change', (e) => {
      state[id] = e.target.value;
      renderPromptPreview();
    });
  });

  // 4 Toggles
  ['needExamples', 'needQuestions', 'needSources', 'needChecklist'].forEach((id) => {
    $(id).addEventListener('change', (e) => {
      state[id] = e.target.checked;
      renderPromptPreview();
    });
  });

  // Advanced section collapsible toggle
  $('btnToggleAdvanced').addEventListener('click', () => {
    const area = $('advancedOptionsArea');
    const isHidden = area.classList.contains('hidden');
    area.classList.toggle('hidden', !isHidden);
    $('advancedToggleIcon').textContent = isHidden ? '▲' : '▼';
  });

  // Advanced selects and inputs
  ['platform', 'promptMode', 'sourcePolicy', 'maxWords'].forEach((id) => {
    $(id).addEventListener('change', (e) => {
      state[id] = e.target.value;
      renderPromptPreview();
    });
  });

  ['personaInput', 'contextInput', 'avoidInput', 'successCriteriaInput'].forEach((id) => {
    const key = id.replace('Input', '');
    $(id).addEventListener('input', (e) => {
      state[key] = e.target.value;
      renderPromptPreview();
    });
  });

  $('creativityRange').addEventListener('input', (e) => {
    state.creativity = e.target.value;
    renderPromptPreview();
  });

  // Modifiers
  $('modifiersGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.modifier-btn');
    if (!btn) return;
    const modId = btn.dataset.modifierId;
    if (state.modifiers.includes(modId)) {
      state.modifiers = state.modifiers.filter((m) => m !== modId);
    } else {
      state.modifiers.push(modId);
    }
    renderModifiersGrid();
    renderPromptPreview();
  });

  // Quality Fixes
  $('qualityIssuesList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quality-fix]');
    if (!btn) return;
    const fix = btn.dataset.qualityFix;
    if (fix === 'audience-students') {
      state.audience = 'students';
      $('audience').value = 'students';
      showToast(state.locale === 'ar' ? 'تم تعديل الجمهور المستهدف إلى طلاب' : 'Audience set to Students');
    } else if (fix === 'panels-6') {
      state.quantity = '6';
      $('quantity').value = '6';
      showToast(state.locale === 'ar' ? 'تم ضبط اللوحات إلى 6' : 'Panels set to 6');
    } else if (fix === 'move-avoid') {
      state.constraints = [state.constraints.trim(), state.avoid.trim()].filter(Boolean).join('\n');
      state.avoid = '';
      $('constraintsInput').value = state.constraints;
      $('avoidInput').value = '';
      showToast(state.locale === 'ar' ? 'تم نقل التوجيهات إلى الشروط' : 'Moved avoid instructions to constraints');
    }
    renderPromptPreview();
  });

  // Copy Prompt
  $('btnCopyPrompt').addEventListener('click', async () => {
    const text = buildPrompt(state, files);
    try {
      await navigator.clipboard.writeText(text);
      showToast(state.locale === 'ar' ? 'تم نسخ البرومبت بنجاح!' : 'Prompt copied to clipboard!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(state.locale === 'ar' ? 'تم النسخ!' : 'Copied!');
    }
  });

  // 1-Click External AI Launchers (Copy prompt + Open Platform)
  document.addEventListener('click', async (e) => {
    const launchBtn = e.target.closest('.ai-launch-btn');
    if (!launchBtn) return;
    const platform = launchBtn.dataset.aiPlatform;
    const name = launchBtn.dataset.platformName || platform;

    const text = buildPrompt(state, files);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }

    // If platform in state differs, sync it to platform and re-render preview
    if (state.platform !== platform && platform !== 'general') {
      state.platform = platform;
      const platformSelect = $('platform');
      if (platformSelect) platformSelect.value = platform;
      renderPromptPreview();
    }

    showToast(
      state.locale === 'ar'
        ? `تم نسخ البرومبت بنجاح! جارٍ فتح ${name}... الصق البرومبت هناك (Ctrl+V) وابدأ الإنجاز 🚀`
        : `Prompt copied! Opening ${name}... Paste your prompt and run 🚀`
    );
  });

  // Download TXT
  $('btnDownloadTxt').addEventListener('click', () => {
    const text = buildPrompt(state, files);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wasit-prompt-${state.command.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1000);
    showToast(state.locale === 'ar' ? 'تم تنزيل ملف البرومبت TXT' : 'Downloaded TXT');
  });

  // Export JSON
  $('btnExportJson').addEventListener('click', () => {
    const text = buildPrompt(state, files);
    const blob = new Blob([JSON.stringify({ generator: 'Wasit Prompt Studio', state, prompt: text }, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wasit-settings-${state.command.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1000);
    showToast(state.locale === 'ar' ? 'تم تصدير الإعدادات JSON' : 'Exported JSON');
  });

  // Download Standalone Offline HTML
  const btnStandalone = $('btnDownloadStandalone');
  if (btnStandalone) {
    btnStandalone.addEventListener('click', downloadStandaloneHtml);
  }

  // Reset All
  $('btnResetAll').addEventListener('click', () => {
    state = { ...INITIAL_STATE, locale: state.locale, dark: state.dark };
    files = [];
    activeTemplateId = null;
    $('ideaInput').value = '';
    $('constraintsInput').value = '';
    $('customCommandInput').value = '';
    renderLocaleAndTheme();
    renderQuickTemplates();
    renderCategories();
    renderCommandsGrid();
    renderSmartFields();
    renderProductPreview();
    renderFooterPreview();
    renderModifiersGrid();
    renderFilesList();
    renderPromptPreview();
    showToast(state.locale === 'ar' ? 'تمت استعادة الإعدادات الافتراضية' : 'Settings reset to default');
  });

  // Presets Modal Open
  $('btnSavePresetDock').addEventListener('click', () => {
    renderPresetsModal();
    $('presetsModal').classList.remove('hidden');
  });

  $('btnClosePresets').addEventListener('click', () => {
    $('presetsModal').classList.add('hidden');
  });

  $('formSavePreset').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('newPresetNameInput');
    const name = input.value.trim();
    if (!name) return;

    presets.unshift({
      id: String(Date.now()),
      name,
      createdAt: new Date().toLocaleDateString(state.locale === 'ar' ? 'ar-SA' : 'en-US'),
      config: { ...state },
    });
    presets = presets.slice(0, 30);
    persistPresets();
    input.value = '';
    renderPresetsModal();
    showToast(state.locale === 'ar' ? 'تم حفظ القالب بنجاح' : 'Preset saved');
  });

  $('presetsList').addEventListener('click', (e) => {
    const loadBtn = e.target.closest('[data-load-preset]');
    if (loadBtn) {
      const id = loadBtn.dataset.loadPreset;
      const p = presets.find((x) => x.id === id);
      if (p) {
        state = { ...INITIAL_STATE, ...p.config, locale: state.locale };
        $('ideaInput').value = state.idea || '';
        $('constraintsInput').value = state.constraints || '';
        $('customCommandInput').value = state.customCommand || '';
        renderQuickTemplates();
        renderCategories();
        renderCommandsGrid();
        renderSmartFields();
        renderProductPreview();
        renderFooterPreview();
        renderModifiersGrid();
        renderPromptPreview();
        $('presetsModal').classList.add('hidden');
        showToast(state.locale === 'ar' ? `تم استدعاء «${p.name}»` : `Loaded "${p.name}"`);
      }
      return;
    }

    const delBtn = e.target.closest('[data-delete-preset]');
    if (delBtn) {
      const id = delBtn.dataset.deletePreset;
      presets = presets.filter((x) => x.id !== id);
      persistPresets();
      renderPresetsModal();
      showToast(state.locale === 'ar' ? 'تم حذف القالب' : 'Preset deleted');
    }
  });

  $('btnExportLibrary').addEventListener('click', () => {
    const data = {
      schema: 'wasit-library',
      version: 2,
      exportedAt: new Date().toISOString(),
      presets,
      characters,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wasit-library-backup.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1000);
    showToast(state.locale === 'ar' ? 'تم تصدير المكتبة كاملة' : 'Exported library');
  });

  $('libraryFileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (parsed.schema === 'wasit-library') {
        if (Array.isArray(parsed.presets)) presets = [...parsed.presets, ...presets].slice(0, 40);
        if (Array.isArray(parsed.characters)) characters = [...parsed.characters, ...characters].slice(0, 50);
        persistPresets();
        persistCharacters();
        renderPresetsModal();
        renderCharacterDropdown();
        showToast(state.locale === 'ar' ? 'تم استيراد المكتبة بنجاح!' : 'Library imported successfully!');
      }
    } catch {
      showToast(state.locale === 'ar' ? 'ملف غير صالح' : 'Invalid file');
    }
    e.target.value = '';
  });

  // Live Test Modal
  $('btnCloseLiveTest').addEventListener('click', () => {
    $('liveTestModal').classList.add('hidden');
  });
  $('btnDismissLiveTest').addEventListener('click', () => {
    $('liveTestModal').classList.add('hidden');
  });

  $('btnRerunTest').addEventListener('click', runGeminiTest);

  $('btnCopyAiResponse').addEventListener('click', async () => {
    const text = $('aiResponseArea').textContent;
    try {
      await navigator.clipboard.writeText(text);
      showToast(state.locale === 'ar' ? 'تم نسخ إجابة الذكاء الاصطناعي!' : 'AI response copied!');
    } catch {}
  });
}

async function handleFiles(fileList) {
  if (!fileList) return;
  const remaining = 10 - files.length;
  if (remaining <= 0) return;

  const textExts = ['txt', 'md', 'csv', 'json', 'html', 'xml', 'log', 'yaml', 'yml', 'js', 'jsx', 'ts', 'tsx', 'css', 'py', 'sql', 'srt', 'vtt'];
  const newItems = [];

  for (const file of Array.from(fileList).slice(0, remaining)) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const isText = textExts.includes(ext);
    let content = '';
    let tooBig = false;

    if (isText && file.size <= 2 * 1024 * 1024) {
      try {
        content = await file.text();
      } catch {}
    } else if (isText) {
      tooBig = true;
    }

    newItems.push({
      name: file.name,
      size: file.size,
      ext: ext.slice(0, 5).toUpperCase(),
      content,
      tooBig,
    });
  }

  files = [...files, ...newItems];
  renderFilesList();
  renderPromptPreview();
}

function openLiveTestModal() {
  $('liveTestModal').classList.remove('hidden');
  runGeminiTest();
}

async function runGeminiTest() {
  const promptText = buildPrompt(state, files);
  if (!promptText.trim()) return;

  const loadingEl = $('aiLoadingState');
  const errorEl = $('aiErrorState');
  const responseArea = $('aiResponseArea');
  const responseWrapper = $('aiResponseWrapper');
  const statsEl = $('aiExecutionStats');

  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  responseWrapper.classList.add('hidden');

  const startTime = performance.now();

  try {
    const res = await fetch('/api/test-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText, model: 'gemini-3.8-flash' }),
    });

    const data = await res.json();
    const latency = Math.round(performance.now() - startTime);

    if (data.success && data.text) {
      responseArea.textContent = data.text;
      statsEl.textContent = `gemini-3.8-flash · ${latency}ms`;
      responseWrapper.classList.remove('hidden');
    } else {
      errorEl.textContent = data.error || (state.locale === 'ar' ? 'فشل تنفيذ الطلب' : 'Execution failed');
      errorEl.classList.remove('hidden');
    }
  } catch (err) {
    errorEl.textContent = err?.message || (state.locale === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Connection error');
    errorEl.classList.remove('hidden');
  } finally {
    loadingEl.classList.add('hidden');
  }
}

// App Initialization
export function initApp() {
  loadPersistedState();
  renderLocaleAndTheme();
  renderQuickTemplates();
  renderCategories();
  renderCommandsGrid();
  renderSmartFields();
  renderProductPreview();
  renderFooterPreview();
  renderModifiersGrid();
  renderFilesList();
  renderPromptPreview();
  setupEventListeners();

  // Populate inputs with current state
  $('ideaInput').value = state.idea || '';
  $('constraintsInput').value = state.constraints || '';
  $('customCommandInput').value = state.customCommand || '';
  $('personaInput').value = state.persona || '';
  $('contextInput').value = state.context || '';
  $('avoidInput').value = state.avoid || '';
  $('successCriteriaInput').value = state.successCriteria || '';
  $('creativityRange').value = state.creativity || '50';
  $('footerTextInput').value = state.footerText || '';
  $('artifactName').value = state.artifactName || '';
}

// Start on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
