import {
  CATALOG,
  OPTIONS,
  PRODUCT_BY_COMMAND,
  PRODUCT_PROFILES,
  SMART_GROUPS,
} from './catalog.js';

export function getTaskGroup(state) {
  if (state.customCommand && state.customCommand.trim()) return 'general';
  if (['Comic', 'Manga', 'Storyboard'].includes(state.command)) return 'comic';
  const item = CATALOG.find((c) => c[0] === state.command);
  const cat = item ? item[1] : 'creative';
  if (cat === 'education') return 'education';
  if (cat === 'coding') return 'coding';
  if (cat === 'research' || cat === 'analysis') return 'research';
  if (cat === 'visual') return 'visual';
  return 'general';
}

export function getProductSpec(state) {
  const isCustom = Boolean(state.customCommand && state.customCommand.trim());
  const group = isCustom ? 'document' : PRODUCT_BY_COMMAND[state.command] || 'document';
  const profile = PRODUCT_PROFILES[group] || PRODUCT_PROFILES.document;

  let files = [...profile.files];
  if (group === 'comic' && state.artifactFormat === 'auto') {
    const delivery = state.specialized?.comic?.delivery;
    if (delivery === 'panels') files = ['PDF'];
    else if (delivery === 'image') files = ['PNG', 'PDF'];
  }

  if (state.artifactFormat && state.artifactFormat !== 'auto') {
    files = [state.artifactFormat.toUpperCase()];
  }

  const editable = state.includeEditable
    ? profile.editable.filter((ext) => !files.includes(ext))
    : [];

  const cleanName = (state.artifactName || '')
    .trim()
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-')
    .replace(/^\.+/, '')
    .slice(0, 80);

  return {
    group,
    profile,
    files,
    editable,
    name: cleanName || 'wasit-product',
  };
}

export function buildProductText(state, english) {
  const p = getProductSpec(state);
  const exts = p.files.join(' + ');
  const source = p.editable.join(' + ');

  const storyboardOnly =
    p.group === 'comic' &&
    state.artifactFormat === 'auto' &&
    state.specialized?.comic?.delivery === 'panels';

  const productionGuide = storyboardOnly
    ? english
      ? 'Create a finished, designed PDF storyboard with all panels, visual descriptions, dialogue, and stable character reference sheets; this choice does not request rendered illustrated PNG panels.'
      : 'أنشئ ملف PDF نهائيًا منسقًا للوحات السيناريو، يضم تكوين كل لوحة والحوار ومرجعًا ثابتًا للشخصيات؛ لا يتطلب هذا الخيار صور PNG مرسومة.'
    : english
    ? p.profile.enGuide
    : p.profile.arGuide;

  const lines = english
    ? [
        'The required outcome has TWO parts: the complete final digital product and a brief handoff explaining the delivered files. This text itself is the production prompt; do not answer by composing another prompt.',
        `Required downloadable file format(s): ${exts}. Suggested base filename: ${p.name}.`,
        productionGuide,
        'Use your available creation tools to make REAL files and provide working download links/attachments after successful creation. Ensure files contain the finished content, are readable, and match the audience and language settings.',
        ...(source
          ? [`Also supply editable/source version(s) where technically appropriate: ${source}.`]
          : []),
        'If a tool or requested export format is unavailable, state exactly which file could not be generated. Provide the closest complete usable alternative (e.g. a runnable HTML or valid SVG source) and clear save/export instructions. Label it as an alternative, not as the requested file. Never invent broken download links or imaginary claims of testing.',
      ]
    : [
        'المطلوب نتيجتان مترابطتان: المنتج الرقمي النهائي مكتمل المحتوى، ثم تسليم موجز يوضح الملفات وكيفية استخدامها. هذا النص هو البرومبت التنفيذي؛ لا تكتفِ بإعداد برومبت جديد أو الاكتفاء بوصف المنتج.',
        `صيغ الملفات النهائية المطلوبة والقابلة للتنزيل: ${exts}. اسم الملف الأساسي المقترح: ${p.name}.`,
        productionGuide,
        'استخدم أدوات الإنشاء المتاحة لديك لإنتاج ملفات حقيقية مكتملة المحتوى، ثم قدّم روابط تنزيل أو مرفقات تعمل بعد إنشائها فعليًا. تحقق من وضوحها ومناسبتها للجمهور واللغة.',
        ...(source
          ? [`قدّم أيضًا نسخة قابلة للتعديل أو ملف مصدر عند ملاءمته تقنيًا: ${source}.`]
          : []),
        'إذا لم تتوفر أداة أو تعذّر تصدير صيغة مطلوبة، فاذكر الملف الذي لم تستطع إنتاجه بصراحة. قدّم أقرب بديل مكتمل قابل للاستخدام (مثل تطبيق HTML يعمل مباشرة أو كود SVG صالح) مع طريقة حفظه وتصديره، وسمّه بديلاً ولا تدّعِ أنه الملف المطلوب. لا تختلق روابط تنزيل أو ملفات وهمية.',
      ];

  const header = english
    ? 'FINAL DIGITAL PRODUCT — REQUIRED DELIVERABLE'
    : 'المنتج الرقمي النهائي — تكليف إلزامي بالإنتاج';

  return `${header}\n- ${lines.join('\n- ')}`;
}

export function buildFooterText(state, english) {
  if (!state.footerEnabled || !(state.footerText && state.footerText.trim())) return '';

  const alignOpt = OPTIONS.footerAlign.find((o) => o[0] === state.footerAlign);
  const align = english ? alignOpt?.[2] || 'Center' : alignOpt?.[1] || 'وسط';

  const scopeOpt = OPTIONS.footerScope.find((o) => o[0] === state.footerScope);
  const scope = english ? scopeOpt?.[2] || 'All pages' : scopeOpt?.[1] || 'أسفل كل صفحة';

  const size =
    state.footerSize === 'medium'
      ? english
        ? 'medium (11–13 pt)'
        : 'متوسط (١١–١٣ نقطة)'
      : english
      ? 'small (9–11 pt)'
      : 'صغير وهادئ (٩–١١ نقطة)';

  const text = state.footerText.trim();

  if (english) {
    return [
      'SEPARATE EXTERNAL DOCUMENTATION FOOTER — OPTIONAL CREDIT, NOT MAIN CONTENT',
      `- Exact footer text (preserve spelling and line breaks; do not rewrite or translate):\n<<<FOOTER_TEXT>>>\n${text}\n<<<END_FOOTER_TEXT>>>`,
      `- Position: Dedicated bottom OUTER margin/band, clearly separated visually from the complete main work. Alignment: ${align}. Text size: ${size}. Placement on multi-page work: ${scope}. Separator: ${
        state.footerSeparator ? 'a subtle thin line above the footer' : 'no separator line'
      }.`,
      '- For PNG/SVG/comics/posters, reserve additional bottom export space outside the original art/panels. For PDFs/DOCX/slides, use the document/page/slide footer zone outside the body layout. For HTML, use a separate <footer> after <main>, including print styling. Never place this credit inside illustrations, dialogue balloons, quiz questions, or as a watermark.',
      '- For outputs without a visual page (such as MP3, ZIP or raw data), place this text on a separate printable/documentation cover or companion credit file; do not inject it into the audio, code, or data. Keep the requested digital product complete and unchanged.',
    ].join('\n');
  }

  return [
    'تذييل توثيق خارجي مستقل — ليس جزءًا من محتوى العمل الأساسي',
    `- نص التذييل حرفيًا (حافظ على الحروف والأسطر كما كتبها المستخدم، ولا تعِد صياغته أو ترجمته):\n<<<نص_التذييل>>>\n${text}\n<<<نهاية_التذييل>>>`,
    `- الموضع: هامش أو شريط سفلي خارجي مخصص، يأتي بعد اكتمال العمل ويفصله عنه فراغ بصري واضح. المحاذاة: ${align}. حجم الخط: ${size}. التكرار في الأعمال متعددة الصفحات: ${scope}. الخط الفاصل: ${
      state.footerSeparator ? 'خط رفيع هادئ فوق التذييل' : 'دون خط فاصل'
    }.`,
    '- في الصور والإنفوجرافيك والقصص المصورة: خصص مساحة إضافية أسفل اللوحة الأصلية ضمن التصدير النهائي، من دون تغطية الرسم أو اقتصاصه. في PDF وWord والشرائح: استخدم منطقة تذييل الصفحة خارج المتن والتصميم الأساسي. في HTML: استخدم عنصر تذييل مستقل بعد المحتوى الرئيسي مع تنسيق للطباعة. لا تضع التذييل داخل المشاهد أو فقاعات الحوار أو أسئلة الاختبار أو الرسومات أو كعلامة مائية مشوهة.',
    '- للمنتجات غير المرئية التي لا تحتوي صفحة (مثل MP3 أو ZIP أو البيانات الخام): ضع التوثيق في صفحة غلاف أو ملف اعتماد مرافق مستقل قابل للطباعة، ولا تُدخله في الصوت أو الكود أو البيانات. احفظ المنتج الأصلي كاملاً دون تغيير.',
  ].join('\n');
}

export function buildTaskSpecificText(state, english) {
  const group = getTaskGroup(state);
  const vals = state.specialized?.[group] || {};
  const def = SMART_GROUPS[group];
  if (!def) return '';

  const lines = [];
  for (const field of def.fields) {
    const val = vals[field[0]];
    if (val && typeof val === 'string' && val.trim()) {
      let displayVal = val.trim();
      if (field[3] === 'select') {
        const opt = field[4].find((o) => o[0] === val);
        if (opt) displayVal = english ? opt[2] : opt[1];
      }
      lines.push(`- ${english ? field[2] : field[1]}: ${displayVal}`);
    }
  }

  if (group === 'comic') {
    lines.push(
      english
        ? '- Character continuity: repeat exactly the same face, age, hair, clothing, and accessories across all panels. Maintain coherent beginning, middle and ending.'
        : '- ثبات الشخصية: حافظ على العمر والوجه والشعر والملابس والإكسسوارات نفسها تمامًا في جميع اللوحات، مع ترابط متين بين البداية والوسط والخاتمة.'
    );
  } else if (group === 'education') {
    lines.push(
      english
        ? '- Pedagogical check: calibrate vocabulary and cognitive load to grade; provide measurable Bloom objectives and actionable assessment.'
        : '- تحقق تربوي: اضبط المفردات والصعوبة بحسب الصف الدراسي، واجعل الأهداف قابلة للقياس والأنشطة محفزة للطلاب بمستوياتهم المختلفة.'
    );
  } else if (group === 'coding') {
    lines.push(
      english
        ? '- Delivery check: provide runnable code, self-contained dependencies, and verifiable test cases.'
        : '- تحقق برمجي: قدّم كودًا نظيفًا يعمل مباشرة بدون نواقص، مع حالات اختبار واضحة لمعايير القبول.'
    );
  } else if (group === 'research') {
    lines.push(
      english
        ? '- Evidence check: distinguish sourced facts from inferences and clearly acknowledge uncertainty.'
        : '- تحقق علمي: ميّز بدقة بين الحقائق الموثقة بمراجع وبين الاستنتاجات التحليلية واذكر مواطن عدم اليقين.'
    );
  }

  if (!lines.length) return '';
  const header = english ? 'TASK-SPECIFIC DETAILS' : 'تفاصيل خاصة بنوع المهمة';
  return `${header}\n${lines.join('\n')}`;
}

export function buildPrompt(state, files = []) {
  const activeCmd = CATALOG.find((c) => c[0] === state.command) || CATALOG[0];
  const english = state.promptLang === 'en';
  const both = state.promptLang === 'both';
  const mainLang = english ? 'English' : 'العربية';

  const customized = (state.customCommand || '').trim().replace(/^\/+/, '').replace(/\s+/g, '_');
  const taskName = customized || (english ? activeCmd[3] : activeCmd[2]);
  const command = `/${customized || activeCmd[0]}`;
  const mods = (state.modifiers || []).map((m) => `/${m}`).join(' ');

  const parts = [];

  // 1. Role
  if (english) {
    parts.push(
      `ROLE\n${
        (state.persona || '').trim() ||
        `You are a world-class expert assistant specialized in ${taskName.toLowerCase()}.`
      } Translate the user's idea into an outstanding, production-ready result with zero generic filler.`
    );
  } else {
    parts.push(
      `الدور\n${
        (state.persona || '').trim() ||
        `أنت مساعد استثنائي وخبير رفيع في مجال ${taskName}.`
      } حوّل فكرة المستخدم وتوجيهاته إلى ناتج احترافي متقن وعالي الجودة، مع مراعاة كاملة للجمهور والقيود.`
    );
  }

  // 2. Task
  if (english) {
    parts.push(
      `TASK\nPrimary command: ${command}${mods ? ' ' + mods : ''}\nTask type: ${
        customized
          ? 'Custom specialized task — interpret the command in the exact context of the idea.'
          : `${activeCmd[3]} — ${activeCmd[5]}.`
      }`
    );
  } else {
    parts.push(
      `المهمة\nالأمر الرئيسي: ${command}${mods ? ' ' + mods : ''}\nنوع المهمة: ${
        customized
          ? 'مهمة مخصصة؛ فسّر الأمر وفق سياق الفكرة والمخرجات المطلوبة.'
          : `${activeCmd[2]} — ${activeCmd[4]}.`
      }`
    );
  }

  // 3. Idea / Goal
  if (english) {
    parts.push(`IDEA / GOAL\n${(state.idea || '').trim() || 'Describe the desired task or request here.'}`);
    if (state.constraints?.trim()) parts.push(`ADDITIONAL CONSTRAINTS\n${state.constraints.trim()}`);
    if (state.context?.trim()) parts.push(`BACKGROUND / CONTEXT\n${state.context.trim()}`);
    if (state.avoid?.trim()) parts.push(`THINGS TO AVOID\n${state.avoid.trim()}`);
    if (state.successCriteria?.trim()) parts.push(`SUCCESS CRITERIA\n${state.successCriteria.trim()}`);
  } else {
    parts.push(`الفكرة أو الهدف المطلوب\n${(state.idea || '').trim() || 'اكتب الفكرة أو المهمة المطلوبة هنا.'}`);
    if (state.constraints?.trim()) parts.push(`شروط وقيود خاصة\n${state.constraints.trim()}`);
    if (state.context?.trim()) parts.push(`سياق ومعلومات خلفية\n${state.context.trim()}`);
    if (state.avoid?.trim()) parts.push(`ما يجب تجنبه والابتعاد عنه\n${state.avoid.trim()}`);
    if (state.successCriteria?.trim()) parts.push(`معايير نجاح النتيجة واكتمالها\n${state.successCriteria.trim()}`);
  }

  // 4. Task Specific Details
  const specializedText = buildTaskSpecificText(state, english);
  if (specializedText) parts.push(specializedText);

  // 5. Reference Files
  if (files.length) {
    const fileLines = files.map((f) => {
      let item = `- ${f.name} (${(f.size / 1024).toFixed(0)} KB)`;
      if (f.content && state.includeFileText) {
        item += english ? ' — full text included below' : ' — محتواه النصي مضمّن أدناه';
      } else {
        item += english
          ? ' — attach this actual file to the same chat message; filename alone is not the content.'
          : ' — أرفق الملف الأصلي مع رسالتك في المساعد الذكي؛ ذكر اسمه وحده لا ينقل محتواه.';
      }
      return item;
    });

    parts.push(`${english ? 'REFERENCE FILES' : 'الملفات والمراجع المصاحبة'}\n${fileLines.join('\n')}`);

    if (state.includeFileText) {
      let budget = 28000;
      const texts = [];
      for (const f of files) {
        if (!f.content || budget <= 0) continue;
        const clipped = f.content.slice(0, Math.min(12000, budget));
        budget -= clipped.length;
        texts.push(
          `--- ${f.name} ---\n${clipped}${
            clipped.length < f.content.length ? '\n[... excerpt truncated ...]' : ''
          }`
        );
      }
      if (texts.length) {
        parts.push(`${english ? 'TEXT REFERENCE CONTENT' : 'محتوى المراجع النصية المرفقة'}\n${texts.join('\n\n')}`);
      }
    }
  }

  // 6. Output Settings
  const getOpt = (field, val, isEn) => {
    const list = OPTIONS[field];
    const found = list?.find((x) => x[0] === val);
    return isEn ? found?.[2] || val : found?.[1] || val;
  };

  const settings = english
    ? [
        `Language: ${both ? 'Arabic and English (deliver both versions side by side)' : mainLang}.`,
        `Audience: ${getOpt('audience', state.audience, true)}.`,
        `Tone: ${getOpt('tone', state.tone, true)}.`,
        `Detail level: ${getOpt('depth', state.depth, true)}.`,
        `Output structure: ${getOpt('format', state.format, true)}.`,
        state.quantity === 'auto'
          ? 'Choose a suitable, well-paced count of items/panels.'
          : `Requested number of items/panels: ${state.quantity}.`,
        `Numerals format: ${
          state.numerals === 'arabic'
            ? 'Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩)'
            : 'Western Arabic digits (0123456789)'
        }.`,
        `Text direction: ${getOpt('resultDir', state.resultDir, true)}.`,
        `Text alignment: ${getOpt('resultAlign', state.resultAlign, true)}.`,
        `Visual ordering: ${getOpt('outputOrder', state.outputOrder, true)}.`,
        `Target AI platform: ${getOpt('platform', state.platform, true)}.`,
        state.maxWords === 'auto'
          ? 'Use the natural length needed for a complete, fully usable response.'
          : `Aim for approximately ${state.maxWords} words unless it compromises completeness.`,
        `Creativity index: ${state.creativity}/100 (${
          +state.creativity < 35
            ? 'conservative and rigorous'
            : +state.creativity > 65
            ? 'exploratory and innovative'
            : 'balanced'
        }).`,
      ]
    : [
        `اللغة: ${both ? 'العربية والإنجليزية معًا مع تقديم النسختين بوضوح' : 'العربية الفصحى السليمة'}.`,
        `الجمهور المستهدف: ${getOpt('audience', state.audience, false)}.`,
        `النبرة والأسلوب: ${getOpt('tone', state.tone, false)}.`,
        `مستوى التفصيل: ${getOpt('depth', state.depth, false)}.`,
        `هيكل المخرجات: ${getOpt('format', state.format, false)}.`,
        state.quantity === 'auto'
          ? 'اختر عدد العناصر أو المشاهد الأنسب للموضوع وطبيعته.'
          : `العدد المطلوب بدقة: ${state.quantity} عنصرًا / لوحة.`,
        `رسم الأرقام: ${
          state.numerals === 'arabic'
            ? 'الأرقام العربية المشرقية (٠١٢٣٤٥٦٧٨٩)'
            : 'الأرقام العربية القياسية (0123456789)'
        }.`,
        `اتجاه النص الناتج: ${getOpt('resultDir', state.resultDir, false)}.`,
        `محاذاة النص: ${getOpt('resultAlign', state.resultAlign, false)}.`,
        `ترتيب البطاقات والعناصر: ${getOpt('outputOrder', state.outputOrder, false)}.`,
        `المنصة المقصودة: ${getOpt('platform', state.platform, false)}.`,
        state.maxWords === 'auto'
          ? 'الحجم اللازم لاكتمال العمل دون إيجاز مخل أو حشو زائد.'
          : `اجعل الاستجابة في حدود ${state.maxWords} كلمة تقريبًا.`,
        `درجة الإبداع: ${state.creativity} من 100 (${
          +state.creativity < 35
            ? 'منضبط ودقيق'
            : +state.creativity > 65
            ? 'ابتكاري ومنفتح على الأفكار الجديدة'
            : 'متوازن'
        }).`,
      ];

  parts.push(`${english ? 'OUTPUT SPECIFICATIONS' : 'إعدادات ومواصفات المخرجات'}\n${settings.map((x) => '- ' + x).join('\n')}`);

  // 7. Product Delivery Text
  parts.push(buildProductText(state, english));

  // 8. Documentation Footer Text
  const documentationFooter = buildFooterText(state, english);
  if (documentationFooter) parts.push(documentationFooter);

  // 9. Quality Rules
  const rules = [];
  if (['Comic', 'Manga', 'Storyboard'].includes(activeCmd[0])) {
    rules.push(
      english
        ? 'For each panel, detail visual composition, camera shot, lighting, action, and legible dialogue. Preserve visual continuity of character faces and clothes.'
        : 'لكل لوحة، فصّل التكوين البصري وزاوية الكاميرا والحركة والحوار الصريح؛ وحافظ على الثبات البصري التام لوجوه وملابس الشخصيات بين اللوحات.'
    );
  }
  if (['App', 'Game', 'Code', 'Prototype', 'UI'].includes(activeCmd[0])) {
    rules.push(
      english
        ? 'When code is requested, provide a complete working implementation without placeholders or truncated snippets. Include execution instructions and verification tests.'
        : 'عند طلب الكود، قدّم تطبيقًا كاملاً قابلاً للتشغيل فوراً دون أجزاء ناقصة أو عبارات "أكمل الكود هنا"، مع إرشادات التشغيل والاختبار.'
    );
  }
  if (['Research', 'Verify', 'LiteratureReview'].includes(activeCmd[0])) {
    rules.push(
      english
        ? 'Distinguish verifiable facts from interpretations. Never hallucinate or fabricate citations, URLs, or studies.'
        : 'ميّز بوضوح قاطع بين الحقائق المؤكدة والاستنتاجات؛ ولا تختلق مراجع أو أبحاثًا أو روابط وهمية إطلاقًا.'
    );
  }
  if (state.format === 'json') {
    rules.push(
      english
        ? 'Return strictly valid JSON with clear semantic keys. Do not include markdown codeblocks unless asked.'
        : 'أخرج كائن JSON صالحًا تركيبيًا بمفاتيح واضحة الدلالة؛ وتجنب إحاطته بكتل Markdown إذا كان مطلوبًا كملف.'
    );
  }
  if (state.needExamples) {
    rules.push(english ? 'Include concrete, real-world examples.' : 'ضمّن أمثلة واقعية ملموسة تعزز الفهم.');
  }
  if (state.needQuestions) {
    rules.push(
      english
        ? 'If crucial constraints are missing, ask up to 3 focused clarifying questions at the end.'
        : 'إذا لاحظت نقصًا في معلومات جوهرية، اطرح حتى 3 أسئلة توضيحية ذكية في الختام؛ وإلا فامضِ بناءً على الافتراضات الأكثر عقلانية.'
    );
  }
  if (state.needSources || state.sourcePolicy === 'strict') {
    rules.push(
      english
        ? 'Support factual statements with reliable source attributions; state clearly when empirical data is uncertain.'
        : 'استند في الحقائق والأرقام إلى مصادر علمية موثوقة، وأوضح بصدق حدود البيانات عند عدم توفر حسم قطعي.'
    );
  }
  if (state.sourcePolicy === 'creative') {
    rules.push(
      english
        ? 'Fictional freedom is welcomed in narrative aspects, but do not present inventions as real-world facts.'
        : 'المجال مفتوح للخيال والابتكار في الجوانب السردية، مع عدم تقديم الخيال كحقائق واقعية.'
    );
  }
  if (state.needChecklist) {
    rules.push(
      english
        ? 'Conclude with an actionable completion checklist.'
        : 'اختم بقائمة تحقق عملية تلخص بنود الإنجاز والاكتمال.'
    );
  }
  if (mods) {
    rules.push(
      english
        ? `Interpret the following tokens as thematic modifiers: ${mods}.`
        : `فسّر الكلمات المفتاحية الآتية كتوجيهات أسلوبية للمهمة: ${mods}.`
    );
  }
  if (both) {
    rules.push(
      'قدّم النتيجة بالعربية أولاً ثم بالإنجليزية، مع المحافظة على رصانة المعنى والتنسيق في اللغتين.'
    );
  }

  // Target platform specific optimization directives
  if (state.platform === 'chatgpt') {
    rules.push(
      english
        ? 'Optimized for OpenAI ChatGPT: use standard markdown with clear bold headers, bullet points, clean tabular data, and syntax-highlighted codeblocks.'
        : 'توافق كامل مع OpenAI ChatGPT: استخدم تنسيق Markdown القياسي بعناوين عريضة واضحة، وجداول مقارنة منظمة، وكود برمجي مع تظليل الصياغة.'
    );
  } else if (state.platform === 'claude') {
    rules.push(
      english
        ? 'Optimized for Anthropic Claude: present nuanced, structured analysis, leverage hierarchical semantic sections or XML tags, and maintain thorough intellectual depth.'
        : 'توافق كامل مع Anthropic Claude: قدّم تحليلًا فكريًا متماسكًا ومنظمًا بعناوين دلالية متسلسلة، مع عمق تحليلي عالي ودقة لغوية فائقة.'
    );
  } else if (state.platform === 'deepseek') {
    rules.push(
      english
        ? 'Optimized for DeepSeek (V3/R1): employ deep step-by-step reasoning, mathematical rigour, and transparent logical deduction for high-complexity tasks.'
        : 'توافق كامل مع DeepSeek (V3/R1): وظّف منهجية التفكير الاستدلالي المتسلسل المتعمق (Chain-of-Thought)، والدقة الرياضية والبرمجية الصارمة.'
    );
  } else if (state.platform === 'gemini') {
    rules.push(
      english
        ? 'Optimized for Google Gemini: leverage multimodal synthesis, fast structured outputs, and practical downloadable artifact generation.'
        : 'توافق كامل مع Google Gemini: استفد من المعالجة الشاملة والسريعة والقدرة على توليد منتجات رقمية منظمة ومخرجات حية عالية الدقة.'
    );
  } else if (state.platform === 'perplexity') {
    rules.push(
      english
        ? 'Optimized for Perplexity AI: emphasize real-time factual accuracy, objective comparative synthesis, and direct authoritative source citations.'
        : 'توافق كامل مع Perplexity AI: ركّز على الدقة الإخبارية والمعرفية المحدثة، والمقارنات الموضوعية، والإسناد التوثيقي المباشر.'
    );
  } else if (state.platform === 'copilot') {
    rules.push(
      english
        ? 'Optimized for Microsoft Copilot: format with executive clarity, Office document readability, and actionable enterprise-grade summaries.'
        : 'توافق كامل مع Microsoft Copilot: نسّق بإخراج تنفيذي رفيع مناسب لحزم العمل المؤسسية ومستندات Office وشرائح العرض.'
    );
  }
  rules.push(
    english
      ? 'Deliver ready-to-use outcomes, not merely meta-advice. If a reference file was merely named, do not pretend to have read unprovided contents.'
      : 'قدّم نواتج عملية جاهزة للاستخدام الفوري، لا نصائح عامة مجردة. ولا تدّعِ الاطلاع على محتوى أي ملف ذُكر اسمه دون تزويدك بنصه.'
  );

  parts.push(`${english ? 'QUALITY RULES & GUARDRAILS' : 'ضوابط الجودة والمصداقية'}\n${rules.map((x) => '- ' + x).join('\n')}`);

  // Format mode serialization
  if (state.promptMode === 'compact') {
    return parts.map((x) => x.replace(/^[^\n]+\n/, '')).join('\n').replace(/\n{3,}/g, '\n\n');
  }

  if (state.promptMode === 'xml') {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return (
      '<prompt>\n' +
      parts.map((part, i) => `  <section index="${i + 1}">\n${esc(part)}\n  </section>`).join('\n') +
      '\n</prompt>'
    );
  }

  if (state.promptMode === 'json') {
    return JSON.stringify(
      {
        generator: 'Wasit Prompt Studio',
        command,
        platform: state.platform,
        language: state.promptLang,
        sections: parts,
      },
      null,
      2
    );
  }

  return parts.join('\n\n');
}

export function auditPrompt(state, files = []) {
  const issues = [];
  const group = getTaskGroup(state);
  const v = state.specialized?.[group] || {};
  const isAr = state.locale === 'ar';

  if (!state.idea || !state.idea.trim()) {
    issues.push({
      id: 'idea',
      text: isAr ? 'اكتب الفكرة أو المهمة أولاً لتفعيل البرومبت.' : 'Write your idea or task before using the prompt.',
      severity: 'warning',
    });
  } else if (state.idea.trim().length < 15) {
    issues.push({
      id: 'short',
      text: isAr
        ? 'الفكرة قصيرة ومقتضبة؛ أضف الهدف أو الفئة المستهدفة لنتائج أدق.'
        : 'The idea is very short; consider expanding on the context or goal.',
      severity: 'info',
    });
  }

  if (group === 'comic' && (!v.heroName || !v.heroName.trim())) {
    issues.push({
      id: 'hero',
      text: isAr
        ? 'لم تحدد اسم البطل في الإعدادات الذكية؛ قد يصعب الحفاظ على هويته.'
        : 'No hero name specified; character continuity across panels might be affected.',
      severity: 'warning',
    });
  }

  if (group === 'comic' && v.heroName?.trim() && (!v.heroIdentity?.trim() || !v.heroOutfit?.trim())) {
    issues.push({
      id: 'identity',
      text: isAr
        ? 'أضف ملامح البطل وملابسه لضمان ثبات رسمه بين اللوحات.'
        : 'Specify visual identity and outfit to ensure panel-to-panel consistency.',
      severity: 'info',
    });
  }

  if (group === 'comic' && state.quantity === 'auto') {
    issues.push({
      id: 'panels',
      text: isAr
        ? 'يُفضّل تحديد عدد لوحات محدد للقصة المصورة (مثلاً 6 لوحات).'
        : 'We recommend specifying an exact panel count (e.g. 6 panels) for comics.',
      severity: 'info',
      fix: 'panels-6',
    });
  }

  if ((group === 'comic' && v.targetGrade?.trim()) || (group === 'education' && v.grade?.trim())) {
    if (state.audience === 'general') {
      issues.push({
        id: 'audience',
        text: isAr
          ? 'حددت صفًا دراسيًا لكن الجمهور ما زال "عام"؛ انقر لإصلاحها إلى "طلاب".'
          : 'You set a school grade but audience is still "General". Click fix to change to "Students".',
        severity: 'warning',
        fix: 'audience-students',
      });
    }
  }

  if (state.footerEnabled && (!state.footerText || !state.footerText.trim())) {
    issues.push({
      id: 'footer',
      text: isAr
        ? 'فعّلت تذييل التوثيق المستقل لكن خانة نص التذييل فارغة.'
        : 'The documentation footer is enabled but its text is currently blank.',
      severity: 'warning',
    });
  }

  if (
    state.avoid?.trim() &&
    /^(ركز|احرص|حافظ|أضف|اجعل|استخدم|يجب|ينبغي|keep|ensure|include|use|focus)/i.test(state.avoid.trim())
  ) {
    issues.push({
      id: 'avoid-positive',
      text: isAr
        ? 'خانة "ما يجب تجنبه" تحتوي على توجيهات إيجابية، الأفضل نقلها للشروط.'
        : 'The "Avoid" field contains positive instructions. Moving them to constraints is recommended.',
      severity: 'info',
      fix: 'move-avoid',
    });
  }

  if (files.some((f) => !f.content)) {
    issues.push({
      id: 'files-ref',
      text: isAr
        ? 'بعض الملفات المرفقة مذكورة بالاسم فقط؛ تأكد من إرفاقها يدويًا في نافذة الدردشة مع البرومبت.'
        : 'Some files are referenced by name only; remember to attach the actual file alongside the prompt.',
      severity: 'info',
    });
  }

  return issues;
}
