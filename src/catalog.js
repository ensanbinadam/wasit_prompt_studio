// CATALOG of 136 commands, categories, modifiers, and digital product profiles
export const CATALOG = [
  // Creative
  ['Comic', 'creative', 'قصة مصوّرة', 'Comic', 'مشاهد ولوحات مع حوار وبناء بصري', 'Panels, scenes and dialogue'],
  ['Story', 'creative', 'قصة أدبية', 'Story', 'حبكة وشخصيات وعقدة ونهاية', 'Plot, characters and ending'],
  ['Manga', 'creative', 'مانغا', 'Manga', 'قصة مرئية بأسلوب المانغا الياباني', 'Manga-style narrative'],
  ['Storyboard', 'creative', 'لوحة قصصية', 'Storyboard', 'تسلسل لقطات بصري للمخرجين', 'Shot-by-shot visual sequence'],
  ['Script', 'creative', 'سيناريو', 'Script', 'مشاهد وحركة وحوار درامي', 'Scenes, action and dialogue'],
  ['Dialogue', 'creative', 'حوار درامي', 'Dialogue', 'حوار طبيعي بين شخصيات متنوعة', 'Natural character dialogue'],
  ['Character', 'creative', 'بناء شخصية', 'Character', 'ملف مفصل للشخصية ودوافعها', 'Detailed character profile'],
  ['Novel', 'creative', 'رواية', 'Novel', 'تصور فصول وحبكات رئيسية وفرعية', 'Chapters and story arcs'],
  ['Poem', 'creative', 'قصيدة', 'Poem', 'نص شعري موزون بحسب الفكرة', 'Poetry from an idea'],
  ['GameStory', 'creative', 'قصة لعبة', 'Game narrative', 'عوالم ومهام وتفرعات ألعاب', 'Game world and quests'],
  ['MicroStory', 'creative', 'قصة قصيرة جدًا', 'Micro fiction', 'قصة مكثفة ومؤثرة في بضعة أسطر', 'A compact complete story'],
  ['PlotTwist', 'creative', 'مفاجأة سردية', 'Plot twist', 'نهاية غير متوقعة تقلب الموازين', 'A surprising narrative turn'],
  ['WorldBuilding', 'creative', 'بناء عالم', 'Worldbuilding', 'جغرافيا وقوانين وثقافة وتاريخ العالم', 'Setting, rules and culture'],
  ['ChooseAdventure', 'creative', 'مغامرة اختيارية', 'Choose-your-adventure', 'قصة تفاعلية بمسارات وقرارات', 'Branching narrative'],
  ['BedtimeStory', 'creative', 'قصة قبل النوم', 'Bedtime story', 'حكاية مطمئنة وهادئة للأطفال', 'A calming story for children'],
  ['Rhyme', 'creative', 'نص مقفّى', 'Rhyming text', 'أهازيج وقوافٍ سهلة وجذابة', 'Accessible rhymed writing'],

  // Education
  ['Teach', 'education', 'علّمني', 'Teach', 'تعليم تدريجي مع تطبيقات عملية', 'Progressive teaching'],
  ['Lesson', 'education', 'خطة درس', 'Lesson plan', 'أهداف وأنشطة وتمايز وتقييم', 'Goals, activities and assessment'],
  ['Quiz', 'education', 'اختبار', 'Quiz', 'أسئلة وإجابات وتغذية راجعة', 'Questions, answers and feedback'],
  ['MCQ', 'education', 'اختيار من متعدد', 'Multiple choice', 'أسئلة بخيارات ومشتتات دقيقة', 'Multiple-choice questions'],
  ['Flashcards', 'education', 'بطاقات تعليمية', 'Flashcards', 'سؤال وجواب للمراجعة السريعة', 'Review cards'],
  ['Mindmap', 'education', 'خريطة ذهنية', 'Mind map', 'هيكلة الأفكار والعلاقات المنطقية', 'Map ideas and connections'],
  ['ELI5', 'education', 'تبسيط شديد', 'Explain simply', 'شرح مفاهيم معقدة لطفل في الخامسة', 'Very simple explanation'],
  ['Bloom', 'education', 'تصنيف بلوم', 'Bloom taxonomy', 'أنشطة تصاعدية وفق مستويات التفكير', 'Cognitive levels of learning'],
  ['Rubric', 'education', 'معايير تقييم', 'Rubric', 'سلم تقدير لفظي لمستويات الأداء', 'Scoring criteria and rubrics'],
  ['Workshop', 'education', 'ورشة عمل', 'Workshop', 'أنشطة تطبيقية بجدول زمني وتفاعل', 'Timed hands-on activities'],
  ['LearningPath', 'education', 'مسار تعلّم', 'Learning path', 'مستويات ومهارات ومعالم إنجاز', 'Skills and milestones'],
  ['CaseStudy', 'education', 'دراسة حالة', 'Case study', 'موقف واقعي وتحليل نقدي لحلوله', 'Real-world scenario analysis'],
  ['Socratic', 'education', 'حوار سقراطي', 'Socratic tutor', 'توجيه التفكير عبر طرح الأسئلة', 'Learn through questions'],
  ['ExitTicket', 'education', 'بطاقة خروج', 'Exit ticket', 'تقويم ختامي سريع لقياس الفهم', 'Quick end-of-lesson check'],
  ['Differentiation', 'education', 'تعليم متمايز', 'Differentiation', 'أنشطة مخصصة لمستويات وقدرات متعددة', 'Activities for different levels'],
  ['ActiveRecall', 'education', 'استرجاع نشط', 'Active recall', 'تمارين استدعاء المعلومات من الذاكرة', 'Retrieve knowledge from memory'],
  ['SpacedReview', 'education', 'مراجعة متباعدة', 'Spaced review', 'جدول مراجعات ذكي على فترات متباعدة', 'Revisit material over time'],
  ['Misconceptions', 'education', 'تصحيح مفاهيم', 'Misconceptions', 'رصد الأخطاء الشائعة وطرق تصحيحها', 'Common errors and corrections'],

  // Analysis
  ['Compare', 'analysis', 'مقارنة شاملة', 'Compare', 'فروق وجوه المقارنة والمزايا والعيوب', 'Differences and tradeoffs'],
  ['SWOT', 'analysis', 'تحليل SWOT', 'SWOT analysis', 'نقاط القوة والضعف والفرص والتهديدات', 'Strengths, weaknesses, opportunities, threats'],
  ['FiveWhys', 'analysis', 'لماذا خمس مرات', 'Five Whys', 'الوصول إلى الأسباب الجذرية للمشكلات', 'Root cause investigation'],
  ['ProsCons', 'analysis', 'إيجابيات وسلبيات', 'Pros & cons', 'موازنة موضوعية دقيقة بين الخيارات', 'Balanced pros and cons'],
  ['Critique', 'analysis', 'نقد بنّاء', 'Critique', 'فحص الافتراضات ونقاط الضعف والتحسين', 'Challenge assumptions'],
  ['Plan', 'analysis', 'خطة تنفيذية', 'Action plan', 'مراحل وخطوات ومؤشرات أداء واضحة', 'Steps, phases and metrics'],
  ['Decision', 'analysis', 'دعم القرار', 'Decision aid', 'معايير موضوعية لترجيح البدائل', 'Criteria and options'],
  ['FirstPrinciples', 'analysis', 'مبادئ أولى', 'First principles', 'تفكيك المسألة لحقائقها الأولية الأساسية', 'Reason from fundamentals'],
  ['Brainstorm', 'analysis', 'عصف ذهني', 'Brainstorm', 'توليد أفكار وبدائل خارج المألوف', 'Generate diverse ideas'],
  ['Roadmap', 'analysis', 'خارطة طريق', 'Roadmap', 'أولويات ومحطات زمنية للتنفيذ', 'Milestones and priorities'],
  ['Pareto', 'analysis', 'تحليل 80/20', 'Pareto analysis', 'تحديد العوامل الأكثر تأثيرًا وقيمة', 'Highest-impact factors'],
  ['RiskMatrix', 'analysis', 'مصفوفة مخاطر', 'Risk matrix', 'تقييم الاحتمال والأثر وخطط التخفيف', 'Likelihood, impact, mitigation'],
  ['Scenario', 'analysis', 'تحليل سيناريوهات', 'Scenario planning', 'احتمالات مستقبلية وبدائل الاستجابة', 'Possible futures and responses'],
  ['RootCause', 'analysis', 'سبب جذري', 'Root cause', 'تشخيص دقيق وحلول وقائية دائمة', 'Underlying causes and fixes'],
  ['Tradeoffs', 'analysis', 'المفاضلات', 'Tradeoffs', 'تحديد ما نكسبه وما نضحي به لكل خيار', 'Benefits and sacrifices'],
  ['MECE', 'analysis', 'تقسيم شامل مانع', 'MECE breakdown', 'فئات شاملة دون تداخل أو فجوات', 'Mutually exclusive, collectively exhaustive'],
  ['Steelman', 'analysis', 'أقوى حجة مضادة', 'Steelman', 'بناء أفضل وأقوى نسخة للرأي المخالف', 'Strongest opposing argument'],

  // Writing
  ['Rewrite', 'writing', 'إعادة صياغة', 'Rewrite', 'تحسين الصياغة مع حفظ المعنى الأصلي', 'Rephrase without changing meaning'],
  ['Summarize', 'writing', 'تلخيص ذكي', 'Summarize', 'استخلاص الجواهر والأفكار المحورية', 'Concise key points'],
  ['Humanize', 'writing', 'أسلوب إنساني طبيعي', 'Humanize', 'صياغة انسيابية دافئة بعيدة عن الركاكة', 'Natural, readable style'],
  ['Email', 'writing', 'بريد رسمي', 'Email', 'عنوان جذاب ورسالة واضحة ودعوة لإجراء', 'Subject and clear message'],
  ['Article', 'writing', 'مقال متكامل', 'Article', 'مقدمة وعناوين فرعية وخاتمة مقنعة', 'Introduction, body and conclusion'],
  ['Speech', 'writing', 'خطاب مؤثر', 'Speech', 'نص إلقاء حماسي مدروس الإيقاع', 'Engaging spoken address'],
  ['Translate', 'writing', 'ترجمة سياقية', 'Translate', 'ترجمة احترافية تحترم روح الثقافة والسياق', 'Context-sensitive translation'],
  ['Proofread', 'writing', 'تدقيق لغوي', 'Proofread', 'تصحيح نحوي وإملائي مع تعليل الفروق', 'Spelling and grammar correction'],
  ['SocialPost', 'writing', 'منشور تواصل', 'Social post', 'محتوى تفاعلي جذاب مع وسوم مناسبة', 'Engaging social content'],
  ['FAQ', 'writing', 'أسئلة شائعة', 'FAQ', 'استفسارات متكررة بإجابات نموذجية', 'Organized Q&A'],
  ['ExecutiveSummary', 'writing', 'ملخص تنفيذي', 'Executive summary', 'خلاصة مكثفة لأصحاب القرار والمشغولين', 'Key outcomes for decision-makers'],
  ['Newsletter', 'writing', 'نشرة بريدية', 'Newsletter', 'محتوى دوري مشوق بروابط وقيم مضافة', 'Email newsletter structure'],
  ['PressRelease', 'writing', 'بيان صحفي', 'Press release', 'صياغة إعلامية مطابقة للمعايير الصحفية', 'Media-ready announcement'],
  ['ProductDescription', 'writing', 'وصف منتج بيعي', 'Product description', 'إبراز القيمة والفوائد بأسلوب جاذب', 'Clear product benefits'],
  ['CV', 'writing', 'سيرة ذاتية', 'Résumé', 'إبراز الخبرات والإنجازات بلغة الأرقام', 'Concise career profile'],
  ['CoverLetter', 'writing', 'خطاب تقديم وظيفة', 'Cover letter', 'رسالة إقناع مخصصة لمتطلبات المنصب', 'Tailored job application letter'],

  // Coding
  ['App', 'coding', 'إنشاء تطبيق', 'Build app', 'تطبيق ويب كامل وتفاعلي قابل للتشغيل', 'Usable working application'],
  ['Game', 'coding', 'إنشاء لعبة', 'Build game', 'لعبة ممتعة بقواعد تحكم وحفظ نتيجة', 'Interactive playable game'],
  ['Code', 'coding', 'كتابة كود', 'Write code', 'تنفيذ برمجي نظيف وموثق للمطلوب', 'Functional implementation'],
  ['Debug', 'coding', 'تصحيح أخطاء', 'Debug', 'اكتشاف العلل البرمجية وحلها مع الشرح', 'Find and fix defects'],
  ['Refactor', 'coding', 'إعادة هيكلة', 'Refactor', 'تحسين كفاءة وجودة الكود مع حفظ السلوك', 'Improve code while preserving behavior'],
  ['CodeReview', 'coding', 'مراجعة كود', 'Code review', 'تقييم شامل للأمان والجودة والأداء', 'Quality and security review'],
  ['UI', 'coding', 'تصميم واجهة UI', 'UI design', 'مكونات واجهة متناسقة وتفاعلية وسريعة', 'Layout and interactions'],
  ['Prototype', 'coding', 'نموذج أولي', 'Prototype', 'أسرع نموذج عملي لاختبار الفكرة مع المستخدم', 'Testable first version'],
  ['ExplainCode', 'coding', 'شرح الكود', 'Explain code', 'شرح منطق السطور والخوارزميات بوضوح', 'Explain logic and concepts'],
  ['TestCases', 'coding', 'حالات اختبار', 'Test cases', 'اختبارات وحدة وحالات استثنائية وحدية', 'Tests and expected outcomes'],
  ['Accessibility', 'coding', 'إتاحة رقمية (a11y)', 'Accessibility review', 'فحص إمكانية الوصول لذوي الاحتياجات', 'Inclusive interface improvements'],
  ['Algorithm', 'coding', 'خوارزمية برمجية', 'Algorithm', 'حل منطقي متدرج عالي الكفاءة', 'Stepwise technical solution'],
  ['API', 'coding', 'تصميم واجهة API', 'API design', 'مسارات REST وتوثيق الحمولات', 'Routes, requests and responses'],
  ['Database', 'coding', 'مخطط قاعدة بيانات', 'Database schema', 'جداول وعلاقات وفهارس وقيود تكاملية', 'Entities and relationships'],
  ['Regex', 'coding', 'تعبير نمطي (Regex)', 'Regex', 'أنماط مطابقة النصوص وفلترتها مع الشرح', 'Text matching pattern'],
  ['SecurityReview', 'coding', 'مراجعة أمنية', 'Security review', 'كشف الثغرات وسبل الحماية والتشفير', 'Security risk and mitigation'],
  ['Documentation', 'coding', 'توثيق تقني', 'Documentation', 'ملف README ودليل مطور وتعليمات تشغيل', 'Project setup and usage'],
  ['Migration', 'coding', 'خطة ترحيل تقني', 'Migration plan', 'ترقية أو نقل البنية التقنية بأمان', 'Safe stepwise migration'],

  // Research
  ['Research', 'research', 'بحث موثق', 'Research', 'بحث منهجي رصين مع إسناد للمراجع', 'Structured sourced research'],
  ['Verify', 'research', 'تدقيق وتحقق', 'Fact-check', 'فحص صحة الادعاءات والأدلة التاريخية والعلمية', 'Verify claims and sources'],
  ['LiteratureReview', 'research', 'مراجعة أدبيات', 'Literature review', 'مسح شامل للدراسات السابقة ونقدها', 'Synthesize existing studies'],
  ['Report', 'research', 'تقرير شامل', 'Report', 'هيكلة منظمة بالنتائج والتوصيات الملموسة', 'Structured report'],
  ['Survey', 'research', 'استبيان واستطلاع', 'Survey', 'صياغة أسئلة محكمة لجمع البيانات', 'Data collection questions'],
  ['DataAnalysis', 'research', 'تحليل بيانات', 'Data analysis', 'استخلاص الأنماط والاتجاهات والمقاييس', 'Patterns and insights'],
  ['Timeline', 'research', 'خط زمني', 'Timeline', 'تسلسل تاريخي للأحداث مع أهميتها', 'Chronological events'],
  ['Citation', 'research', 'توثيق مراجع', 'Citations', 'تنسيق المصادر بأنظمة APA أو MLA أو شيكاغو', 'Source attribution'],
  ['Hypothesis', 'research', 'فرضية بحثية', 'Hypothesis', 'صياغة فرضيات علمية قابلة للاختبار والقياس', 'Testable research statement'],
  ['Methodology', 'research', 'منهجية بحث', 'Methodology', 'تصميم أدوات وعينة وإجراءات البحث', 'Sample, instruments and procedure'],
  ['InterviewQuestions', 'research', 'دليل مقابلة بحثية', 'Interview guide', 'أسئلة سبرية واستكشافية نوعية', 'Structured interview questions'],
  ['Bibliography', 'research', 'ببليوغرافيا منظمة', 'Bibliography', 'تنظيم وتصنيف المراجع بحسب الموضوع', 'Organize verifiable references'],
  ['EvidenceMap', 'research', 'خريطة أدلة', 'Evidence map', 'رسم بياني لتوزيع الأدلة والفجوات المعرفية', 'Evidence and research gaps'],

  // Business
  ['Presentation', 'business', 'عرض تقديمي', 'Presentation', 'شرائح متناسقة مع ملاحظات المتحدث', 'Slides and speaker notes'],
  ['Marketing', 'business', 'خطة تسويق', 'Marketing plan', 'قنوات ورسائل وحملات تستهدف العميل المثالي', 'Audience, channels and messages'],
  ['BusinessPlan', 'business', 'خطة مشروع', 'Business plan', 'نموذج العمل والعمليات والمؤشرات المالية', 'Business model and costs'],
  ['AIDA', 'business', 'صياغة AIDA', 'AIDA copy', 'انتباه، اهتمام، رغبة، ثم اتخاذ إجراء', 'Attention, interest, desire, action'],
  ['PAS', 'business', 'صياغة PAS', 'PAS copy', 'طرح المشكلة، إثارة الألم، ثم تقديم الحل', 'Problem, agitation, solution'],
  ['Pitch', 'business', 'عرض للمستثمرين', 'Pitch', 'طرح مقنع وموجز يبرز الفرصة والميزة التنافسية', 'Persuasive concise pitch'],
  ['OKR', 'business', 'أهداف ونتائج (OKRs)', 'OKRs', 'أهداف طموحة ونتائج رئيسية قابلة للقياس', 'Measurable objectives'],
  ['Meeting', 'business', 'محضر اجتماع', 'Meeting notes', 'قرارات ومسؤوليات ومواعيد تسليم محددة', 'Decisions and action items'],
  ['CustomerPersona', 'business', 'شخصية العميل', 'Customer persona', 'دوافع العميل وسلوكه ونقاط ألمه وتفضيلاته', 'Needs, motivations, pain points'],
  ['ValueProposition', 'business', 'القيمة المقترحة', 'Value proposition', 'صياغة الفارق الحاسم الذي يقنع العميل بالشراء', 'Why a product is valuable'],
  ['LaunchPlan', 'business', 'خطة إطلاق منتج', 'Launch plan', 'مراحل ما قبل وأثناء وبعد إطلاق المنتج', 'Launch phases and follow-up'],
  ['Budget', 'business', 'ميزانية تقديرية', 'Budget', 'بنود التكاليف والإيرادات وهوامش الأمان', 'Cost categories and estimates'],
  ['Negotiation', 'business', 'استراتيجية تفاوض', 'Negotiation', 'تحديد المصالح والبدائل ونقاط الالتقاء', 'Positions, alternatives, options'],

  // Visual
  ['ImagePrompt', 'visual', 'وصف صورة احترافي', 'Image prompt', 'وصف دقيق للإضاءة والزوايا والألوان للمولدات', 'Detailed image generation prompt'],
  ['Infographic', 'visual', 'إنفوجرافيك بصري', 'Infographic', 'تبسيط البيانات المعقدة في رسوم مرئية جاذبة', 'Visual information layout'],
  ['Logo', 'visual', 'هوية وشعار', 'Logo brief', 'فلسفة الشعار والألوان والرمزية البصرية', 'Logo and identity brief'],
  ['VideoScript', 'visual', 'سيناريو فيديو', 'Video script', 'مشاهد بصرية وتوقيتات وتعليق صوتي مصاحب', 'Scenes, narration and timing'],
  ['Podcast', 'visual', 'حلقة بودكاست', 'Podcast', 'هيكل فقرات وأسئلة حوارية وعناصر تشويق', 'Segments and conversation'],
  ['Diagram', 'visual', 'رسم توضيحي', 'Diagram', 'مخطط يوضح العلاقات والتدفقات والمكونات', 'Clear components and relationships'],
  ['Slides', 'visual', 'تصميم شرائح', 'Slide design', 'هندسة بصرية للشرائح تركز على تقليل الكلام', 'Effective slide structure'],
  ['Animation', 'visual', 'تصميم حركة (Motion)', 'Animation concept', 'حركات وانتقالات ومؤثرات بصرية سينمائية', 'Motion and transitions'],
  ['UserJourney', 'visual', 'رحلة مستخدم (UX)', 'User journey', 'مراحل تفاعل العميل ونقاط الصعوبة والرضا', 'Journey stages and friction'],
  ['Wireframe', 'visual', 'مخطط هيكلي للواجهة', 'Wireframe', 'توزيع العناصر الوظيفية قبل التصميم الجمالي', 'Page layout blueprint'],
  ['ColorPalette', 'visual', 'لوحة ألوان متناسقة', 'Color palette', 'رموز ألوان HEX وتوزيعها بنسبة 60-30-10', 'Coordinated colors and roles'],
  ['Poster', 'visual', 'ملصق إعلاني / بوستر', 'Poster brief', 'تسلسل بصري وعنوان خاطف ومحتوى مقتضب', 'Poster content and composition'],
  ['Thumbnail', 'visual', 'صورة مصغرة (Thumbnail)', 'Thumbnail concept', 'فكرة بصرية مثيرة للنقر والفضول لليوتيوب', 'Attention-grabbing visual concept'],

  // Personal
  ['Coach', 'personal', 'مدرب شخصي وتطوير', 'Coach', 'إرشاد عملي لتجاوز العقبات وتحقيق الأهداف', 'Practical coaching steps'],
  ['Checklist', 'personal', 'قائمة تحقق إنجاز', 'Checklist', 'بنود تنفيذية محكمة تضمن عدم نسيان أي تفصيل', 'Actionable check items'],
  ['Schedule', 'personal', 'جدول زمني', 'Schedule', 'تنظيم الوقت ومصفوفة الأولويات اليومية', 'Time and tasks'],
  ['Recipe', 'personal', 'وصفة طهي متقنة', 'Recipe', 'مقادير دقيقة وخطوات إعداد ونصائح احترافية', 'Ingredients and method'],
  ['Travel', 'personal', 'خطة سفر ورحلة', 'Travel plan', 'جدول يومي متكامل للمعالم والتجارب والميزانية', 'Destinations and activities'],
  ['Interview', 'personal', 'محاكاة مقابلة شخصية', 'Interview', 'تدريب على أصعب الأسئلة وطرق الإجابة الذكية', 'Interview preparation'],
  ['DecisionMatrix', 'personal', 'مصفوفة قرار شخصي', 'Decision matrix', 'أوزان ومعايير لتقييم الخيارات الحياتية', 'Score alternatives by criteria'],
  ['Habit', 'personal', 'بناء عادة مستدامة', 'Habit plan', 'عادات ذرية ومحفزات وسجل متابعة يومي', 'Trackable habits'],
  ['Mindfulness', 'personal', 'تأمل وسلام ذهني', 'Mindfulness', 'تمارين تنفس واستعادة التركيز وتفريغ الذهن', 'Gentle reflective exercise'],
  ['DailyPlan', 'personal', 'خطة اليوم المثمر', 'Daily plan', 'تركيز الصباح وإنجاز الظهيرة واستراحة المساء', 'Priorities and breaks'],
  ['GoalSetting', 'personal', 'صياغة هدف SMART', 'Goal setting', 'أهداف ذكية محددة وقابلة للقياس والتحقيق', 'Specific trackable goal'],
  ['ReadingGuide', 'personal', 'دليل قراءة كتاب', 'Reading guide', 'أسئلة تأملية وخريطة استيعاب لأي كتاب', 'Book discussion and notes']
];

export const CATEGORIES = [
  { id: 'all', nameAr: 'جميع الأوامر', nameEn: 'All Commands' },
  { id: 'creative', nameAr: 'القصص والإبداع', nameEn: 'Creative & Stories' },
  { id: 'education', nameAr: 'التعليم والتدريب', nameEn: 'Education & Learning' },
  { id: 'analysis', nameAr: 'التحليل والقرار', nameEn: 'Analysis & Strategy' },
  { id: 'writing', nameAr: 'الكتابة والتحرير', nameEn: 'Writing & Content' },
  { id: 'coding', nameAr: 'البرمجة والأنظمة', nameEn: 'Coding & Systems' },
  { id: 'research', nameAr: 'البحث والمصادر', nameEn: 'Research & Evidence' },
  { id: 'business', nameAr: 'الأعمال والتسويق', nameEn: 'Business & Growth' },
  { id: 'visual', nameAr: 'المرئيات والتصميم', nameEn: 'Visual & Media' },
  { id: 'personal', nameAr: 'الحياة والإنتاجية', nameEn: 'Personal & Habits' },
];

export const MODIFIERS = [
  ['Kids', 'للأطفال', 'For kids'],
  ['Saudi', 'سياق سعودي ومحلي', 'Saudi context'],
  ['Educational', 'تعليمي وهادف', 'Educational'],
  ['Interactive', 'تفاعلي وحركي', 'Interactive'],
  ['Simple', 'مبسط للغاية', 'Very simple'],
  ['Expert', 'مستوى خبير رفيع', 'Expert level'],
  ['StepByStep', 'خطوة بخطوة', 'Step by step'],
  ['Examples', 'أمثلة عملية واقعية', 'Practical examples'],
  ['Visual', 'تركيز بصري مرئي', 'Visual emphasis'],
  ['Creative', 'ابتكاري وخيالي', 'Creative & novel'],
  ['Short', 'موجز ومكثف', 'Short & concise'],
  ['Detailed', 'مفصل ودقيق', 'Deep & thorough'],
  ['Checklist', 'قائمة تحقق ختامية', 'With checklist'],
  ['Verify', 'تدقيق صارم', 'Strict verification'],
  ['Sources', 'توثيق بالمصادر', 'Cite credible sources'],
  ['Questions', 'طرح أسئلة ذكية', 'Clarifying questions'],
  ['NoJargon', 'بلا مصطلحات معقدة', 'Zero jargon'],
  ['Actionable', 'قابل للتطبيق الفوري', 'Actionable output'],
  ['Bilingual', 'عربي وإنجليزي معًا', 'Bilingual delivery'],
  ['Beginner', 'مناسب للمبتدئين', 'Beginner friendly'],
  ['Advanced', 'متقدم وتخصصي', 'Advanced domain'],
  ['DataDriven', 'مبني على بيانات', 'Data-driven'],
  ['Critique', 'نقد ومراجعة صريحة', 'Constructive critique'],
  ['Ethical', 'اعتبارات أخلاقية', 'Ethical considerations'],
  ['Accessible', 'سهل الوصول للجميع', 'Accessible (a11y)'],
  ['Funny', 'فكاهي وخفيف الظل', 'Lighthearted & funny'],
  ['RTL', 'تنسيق يمين لليسار', 'RTL layout focus'],
  ['LTR', 'تنسيق يسار لليمين', 'LTR layout focus'],
  ['Concise', 'دقيق بدون حشو', 'Crisp & no filler'],
  ['Iterative', 'تطوير تدريجي تكراري', 'Iterative build'],
  ['Framework', 'أطر عمل معتمدة', 'Proven frameworks']
];

export const TEMPLATES = [
  {
    id: 't-comic',
    icon: '🎨',
    labelAr: 'قصة مصورة للأطفال',
    labelEn: 'Educational Kids Comic',
    cmd: 'Comic',
    ideaAr: 'قصة مصورة من 6 لوحات عن طفل فضولي يتعلم أساسيات لغة البرمجة بمساعدة روبوت أليف ذكي في حديقة المنزل.',
    ideaEn: 'A 6-panel educational comic about a curious child learning basic coding logic with a friendly robot in the backyard.',
    format: 'storyboard',
    quantity: '6',
    mods: ['Kids', 'Educational', 'Visual'],
  },
  {
    id: 't-lesson',
    icon: '🎓',
    labelAr: 'درس تفاعلي متمايز',
    labelEn: 'Interactive Lesson Plan',
    cmd: 'Lesson',
    ideaAr: 'خطة درس رياضيات للصف الرابع الابتدائي عن الكسور المتكافئة، مع نشاط ملموس باستخدام البيتزا وأنشطة متمايزة لثلاثة مستويات.',
    ideaEn: 'A 4th-grade math lesson plan on equivalent fractions featuring a hands-on pizza model and differentiated tier activities.',
    format: 'steps',
    quantity: 'auto',
    mods: ['Interactive', 'Examples', 'Educational'],
  },
  {
    id: 't-app',
    icon: '💻',
    labelAr: 'تطبيق ويب تعليمي',
    labelEn: 'Interactive Web App',
    cmd: 'App',
    ideaAr: 'تطبيق ويب تفاعلي باللغة العربية لتدريب الطلاب على جدول الضرب بطريقة الألعاب، مع مؤقت ونقاط ورسوم بيانية لتقدم الطفل.',
    ideaEn: 'An interactive Arabic web application for practicing multiplication tables through gamified rounds, timers, and progress charts.',
    format: 'code',
    quantity: '1',
    mods: ['Interactive', 'Simple', 'Kids'],
  },
  {
    id: 't-research',
    icon: '🔬',
    labelAr: 'بحث منهجي موثق',
    labelEn: 'Sourced Academic Research',
    cmd: 'Research',
    ideaAr: 'بحث موثق حول أثر استخدام تطبيقات الذكاء الاصطناعي التوليدي على جودة الأداء الأكاديمي لدى طلبة المرحلة الجامعية، مع رصد الفجوات البحثية.',
    ideaEn: 'A rigorous sourced research report on the impact of generative AI tools on undergraduate academic achievement, highlighting key evidence gaps.',
    format: 'structured',
    quantity: 'auto',
    mods: ['Verify', 'Sources', 'DataDriven'],
  },
  {
    id: 't-quiz',
    icon: '📝',
    labelAr: 'اختبار تقويمي إلكتروني',
    labelEn: 'Automated Diagnostic Quiz',
    cmd: 'Quiz',
    ideaAr: 'اختبار تشخيصي من 10 أسئلة في أساسيات الأمن السيبراني والأمان الرقمي للطلاب والمبتدئين، مع تغذية راجعة وتبرير لكل إجابة.',
    ideaEn: 'A 10-question diagnostic quiz covering personal cybersecurity and digital hygiene with explanatory rationale for each choice.',
    format: 'steps',
    quantity: '10',
    mods: ['Educational', 'Questions', 'Actionable'],
  },
  {
    id: 't-swot',
    icon: '📊',
    labelAr: 'تحليل SWOT لمشروع',
    labelEn: 'Startup SWOT Analysis',
    cmd: 'SWOT',
    ideaAr: 'تحليل استراتيجي متعمق لفكرة إطلاق منصة عربية لربط المزارعين بالمطاعم والمتاجر مباشرة لتقليل الهدر وسلسلة الإمداد.',
    ideaEn: 'An in-depth SWOT analysis of a direct farm-to-table digital logistics platform connecting local growers with restaurants.',
    format: 'table',
    quantity: 'auto',
    mods: ['Expert', 'Verify', 'Actionable'],
  },
  {
    id: 't-adventure',
    icon: '🗺️',
    labelAr: 'قصة متفرعة تفاعلية',
    labelEn: 'Branching Adventure Game',
    cmd: 'ChooseAdventure',
    ideaAr: 'قصة مغامرة مشوقة داخل مكتبة قديمة مهجورة، يواجه فيها البطل ألغازًا علمية ويتخذ قرارات تقود إلى 3 نهايات مختلفة.',
    ideaEn: 'A branching adventure set in a mysterious ancient library where scientific riddles decide between three distinct endings.',
    format: 'storyboard',
    quantity: '8',
    mods: ['Interactive', 'Creative'],
  },
  {
    id: 't-ui',
    icon: '🖥️',
    labelAr: 'تصميم واجهة لوحة تحكم',
    labelEn: 'SaaS Dashboard UI',
    cmd: 'UI',
    ideaAr: 'تصميم واجهة مستخدم حديثة للوحة تحكم إدارة المدارس الخاصة، تعرض تقارير الحضور والرسوم البيانية ومتابعة الطلاب مع دعم كامل للهواتف.',
    ideaEn: 'Modern UI layout for a school management analytics dashboard tracking attendance, tuition status, and grade health across mobile/desktop.',
    format: 'structured',
    quantity: 'auto',
    mods: ['RTL', 'Accessible', 'Expert'],
  },
  {
    id: 't-roadmap',
    icon: '🚀',
    labelAr: 'خارطة طريق إطلاق منتج',
    labelEn: 'Product Launch Roadmap',
    cmd: 'Roadmap',
    ideaAr: 'خطة عمل زمنية لمدة 90 يومًا لإطلاق منتج رقمي في السوق السعودي، موزعة على 3 مراحل (البناء، التجربة المغلقة، والإطلاق الرسمي).',
    ideaEn: 'A 90-day execution roadmap for launching a digital product in Saudi Arabia across Alpha, Closed Beta, and Public Launch phases.',
    format: 'steps',
    quantity: 'auto',
    mods: ['Saudi', 'Actionable', 'Checklist'],
  },
  {
    id: 't-article',
    icon: '✍️',
    labelAr: 'مقال احترافي محفز',
    labelEn: 'Thought Leadership Article',
    cmd: 'Article',
    ideaAr: 'مقال شيق ومقنع للمعلمين وأولياء الأمور يشرح كيف يمكن توظيف الذكاء الاصطناعي كمساعد تعليمي دون قتل التفكير النقدي لدى الأطفال.',
    ideaEn: 'An insightful thought-leadership article explaining how educators can leverage AI as a cognitive scaffold without undermining independent thinking.',
    format: 'structured',
    quantity: 'auto',
    mods: ['Simple', 'Examples', 'Humanize'],
  },
  {
    id: 't-security',
    icon: '🛡️',
    labelAr: 'مراجعة أمنية لنظام',
    labelEn: 'Security Audit & Review',
    cmd: 'SecurityReview',
    ideaAr: 'مراجعة أمنية شاملة لمنصة تتيح رفع المستندات الحساسة ومعالجتها، مع رصد ثغرات OWASP ووضع إرشادات التشفير وإدارة الجلسات.',
    ideaEn: 'A comprehensive security review of a multi-tenant file-processing service analyzing OWASP Top 10 risks, encryption, and session boundaries.',
    format: 'table',
    quantity: 'auto',
    mods: ['Expert', 'Checklist', 'Verify'],
  },
];

export const PRODUCT_PROFILES = {
  document: { files: ['PDF', 'DOCX'], editable: ['DOCX'], ar: 'وثيقة منسقة مكتملة وجاهزة للاستخدام والطباعة', en: 'Complete, formatted document ready to use and print', arGuide: 'أنشئ المستند بمحتواه النهائي وعناوينه وتنسيقه كاملاً، وتجنب الاكتفاء بمسودة أو خطة لإنشائه.', enGuide: 'Write and format the complete document with all final sections, not an outline or plan.' },
  story: { files: ['PDF', 'DOCX'], editable: ['DOCX'], ar: 'قصة كاملة بنصوصها وصفحاتها وغلافها', en: 'Complete story with readable layout and cover', arGuide: 'أنشئ القصة بنصها الكامل وفصولها أو مشاهدها المناسبة، مع غلاف بصري إذا توفرت أدوات الصور.', enGuide: 'Deliver the full story in readable pages, with a cover image if image tools are available.' },
  comic: { files: ['PNG', 'PDF'], editable: ['DOCX'], ar: 'لوحات قصة مصورة فعلية وملف قراءة مجمّع', en: 'Illustrated comic panels and a complete compiled reading file', arGuide: 'أنشئ الرسوم الفعلية للوحات، والحوار العربي المقروء، واجمعها في صفحة أو صفحات PDF. ثبّت وجوه الشخصيات وأزياءها بين جميع اللوحات؛ لا تسلّم وصف اللوحات وحده.', enGuide: 'Actually create the illustrated panels and legible dialogue, compile a PDF, and preserve character design across every panel. Do not stop at panel descriptions.' },
  infographic: { files: ['PNG', 'PDF'], editable: ['SVG'], ar: 'إنفوجرافيك بصري مكتمل جاهز للمشاركة والطباعة', en: 'Finished visual infographic for sharing and printing', arGuide: 'صمّم إنفوجرافيك مرئيًا حقيقيًا من المعلومات، بعناوين وعناصر بصرية وتسلسل هرمي واضح للمعلومات.', enGuide: 'Design the actual visual infographic with accurate content, visual hierarchy, and crisp typography.' },
  image: { files: ['PNG'], editable: ['SVG'], ar: 'تصميم أو صورة نهائية عالية الدقة', en: 'Finished high-resolution image or artwork', arGuide: 'ولّد الصورة أو التصميم النهائي فعليًا؛ لا تتوقف عند وصف الصورة أو إعطاء برومبت إضافي.', enGuide: 'Generate the actual final image or design; do not return only another image prompt.' },
  palette: { files: ['HTML', 'PNG'], editable: ['HTML'], ar: 'لوحة ألوان مرئية مع أكواد HEX واستخداماتها', en: 'Visual color palette with hex codes and usage roles', arGuide: 'اعرض عينات الألوان وأكوادها وتوزيع 60-30-10 وتوظيفها داخل لوحة بصرية قابلة للتجربة.', enGuide: 'Render the swatches, codes and usage guidance as a usable visual palette.' },
  diagram: { files: ['SVG', 'PDF'], editable: ['SVG'], ar: 'مخطط ورسم توضيحي دقيق قابل للتكبير والطباعة', en: 'Scalable vector diagram suitable for printing', arGuide: 'ارسم العلاقات والعناصر في مخطط هيكلي حقيقي وواضح، لا مجرد قائمة تصف المخطط بالكلمات.', enGuide: 'Create an actual coherent visual diagram, not a list describing it.' },
  quiz: { files: ['HTML', 'PDF'], editable: ['HTML'], ar: 'اختبار تفاعلي يعمل بالمتصفح مع نسخة PDF للطباعة', en: 'Working interactive quiz and printable PDF version', arGuide: 'ابنِ اختبارًا تفاعليًا يعمل بالمتصفح مع الإجابات والتصحيح الفوري والتغذية الراجعة، وأضف نسخة PDF للطباعة.', enGuide: 'Build a working browser quiz with answers, instant scoring and feedback, plus a printable PDF.' },
  flashcards: { files: ['HTML', 'PDF'], editable: ['HTML'], ar: 'بطاقات تفاعلية قابلة للتقليب ونسخة طباعة', en: 'Interactive flippable cards and printable cards', arGuide: 'اصنع بطاقات وجه وظهر قابلة للتقليب رقميًا مع تنسيق جاهز للطباعة والقص.', enGuide: 'Produce genuinely flippable digital cards and a printable front/back cut-out layout.' },
  survey: { files: ['HTML', 'PDF'], editable: ['HTML'], ar: 'استبيان قابل للتعبئة إلكترونيًا ونسخة للطباعة', en: 'Fillable digital survey and printable questionnaire', arGuide: 'أنشئ نموذج استبيان تفاعلي قابل للتعبئة مع التحقق من الإدخالات ونسخة ورقية منظمة.', enGuide: 'Create a fillable, clearly organized survey and printable version.' },
  checklist: { files: ['HTML', 'PDF'], editable: ['HTML'], ar: 'قائمة تحقق تفاعلية قابلة للتأشير والحفظ', en: 'Interactive checkable list and printable copy', arGuide: 'أنشئ قائمة بنود قابلة للتأشير إلكترونيًا وحفظ الحالة، مع نسخة أنيقة للطباعة.', enGuide: 'Build checkable items in a usable interface and provide a printable clean version.' },
  presentation: { files: ['PPTX', 'PDF'], editable: ['PPTX'], ar: 'عرض شرائح متكامل بصريًا وجاهز للتقديم', en: 'Fully designed presentation deck ready to deliver', arGuide: 'صمّم الشرائح فعليًا بمحتواها وعناصرها البصرية وملاحظات المتحدث، وتجنب الاكتفاء بسرد نصوص الشرائح.', enGuide: 'Create the actual designed slides with visual hierarchy and speaker notes where useful.' },
  spreadsheet: { files: ['XLSX', 'PDF'], editable: ['XLSX'], ar: 'جدول بيانات تفاعلي بصيغ وحسابات قابلة للعمل', en: 'Usable spreadsheet with tables, formulas and charts', arGuide: 'أنشئ جداول البيانات والصيغ الحسابية والتحليلات المطلوبة، مع ملخص قابل للطباعة.', enGuide: 'Create functional tables, formulas and analysis with a printable summary.' },
  webapp: { files: ['HTML', 'ZIP'], editable: ['HTML', 'ZIP'], ar: 'تطبيق أو لعبة كاملة قابلة للتشغيل مع ملفات المصدر', en: 'Runnable interactive app with full source files', arGuide: 'ابنِ التطبيق أو اللعبة كاملاً وقابلاً للتشغيل مباشرة في المتصفح مع الواجهة وعناصر التفاعل الحية.', enGuide: 'Implement a complete runnable app or game with working interactions, not a conceptual mockup.' },
  code: { files: ['ZIP'], editable: ['ZIP'], ar: 'ملفات مصدر برمجية كاملة قابلة للتشغيل والاختبار', en: 'Testable production source-code deliverable', arGuide: 'قدّم الملفات البرمجية كاملة مع README واختبار مناسب وأوامر التثبيت والتشغيل.', enGuide: 'Deliver complete source files, setup instructions and tests; distinguish verified results from assumptions.' },
  codeAudit: { files: ['PDF', 'MD'], editable: ['MD'], ar: 'تقرير فني تنفيذي مع تصحيحات برمجية مقترحة', en: 'Actionable technical report and proposed patches', arGuide: 'أنشئ تقريرًا هندسيًا مرتبًا بالأدلة ودرجة الخطورة، وأرفق التصحيحات الفعلية للكود.', enGuide: 'Deliver a prioritized evidence-based report and real patches when source files are provided.' },
  social: { files: ['PNG', 'TXT'], editable: ['TXT'], ar: 'تصميم للمنشور مع نص جاهز للنشر الفوري', en: 'Shareable social visual and publication copy', arGuide: 'اصنع تصميم المنشور والنص المناسب للمنصة، مع فصل النص القابل للنسخ عن التصميم.', enGuide: 'Create the post artwork and publish-ready text, separately copyable.' },
  email: { files: ['HTML', 'PDF'], editable: ['HTML'], ar: 'رسالة بريد مصممة جاهزة للإرسال أو النسخ', en: 'Ready-to-send styled email layout and content', arGuide: 'أنشئ الرسالة كاملة بعنوانها ومتنها وتنسيقها القابل للنسخ أو الإرسال المباشر.', enGuide: 'Deliver the complete subject, body and usable responsive email layout.' },
  videoScript: { files: ['PDF'], editable: ['DOCX'], ar: 'سيناريو تصوير ومشاهد احترافي جاهز للإنتاج', en: 'Production-ready shooting script and shot list', arGuide: 'أنشئ سيناريو التصوير النهائي بمشاهد ومدد وحوار وتعليقات صوتية وتعليمات إنتاجية.', enGuide: 'Deliver a complete shooting script with scenes, timing, narration and production notes.' },
  audio: { files: ['MP3'], editable: ['DOCX'], ar: 'ملف صوتي كامل مع نص قابل للتحرير', en: 'Finished audio file with editable transcript', arGuide: 'أنتج الملف الصوتي النهائي إن توفرت أدوات الصوت، مع النص الكامل للحلقة.', enGuide: 'Generate the finished audio with audio tools when available, alongside the full transcript.' },
  animation: { files: ['MP4'], editable: ['DOCX'], ar: 'فيديو متحرك نهائي مع لوحة مشاهد الإنتاج', en: 'Finished animated video and production storyboard', arGuide: 'أنشئ فيديو الحركة النهائي إن توفرت أدوات الفيديو، مع نص ومشاهد إنتاج موثقة.', enGuide: 'Generate the finished animation if video tools are available, with the production storyboard.' },
};

export const PRODUCT_COMMAND_GROUPS = {
  story: 'Story Novel MicroStory BedtimeStory PlotTwist Rhyme Poem Script Dialogue',
  comic: 'Comic Manga Storyboard',
  infographic: 'Infographic',
  image: 'ImagePrompt Logo Poster Thumbnail',
  palette: 'ColorPalette',
  diagram: 'Mindmap Diagram UserJourney Wireframe EvidenceMap Timeline',
  quiz: 'Quiz MCQ ExitTicket ActiveRecall',
  flashcards: 'Flashcards SpacedReview',
  survey: 'Survey',
  checklist: 'Checklist',
  presentation: 'Presentation Slides Pitch',
  spreadsheet: 'DataAnalysis Budget Schedule DecisionMatrix RiskMatrix OKR Habit DailyPlan Rubric',
  webapp: 'App Game UI Prototype ChooseAdventure',
  code: 'Code Debug Refactor Algorithm TestCases API Database Regex Documentation',
  codeAudit: 'CodeReview Accessibility SecurityReview',
  social: 'SocialPost',
  email: 'Email Newsletter',
  videoScript: 'VideoScript',
  audio: 'Podcast',
  animation: 'Animation',
};

export const PRODUCT_BY_COMMAND = (() => {
  const map = {};
  for (const item of CATALOG) map[item[0]] = 'document';
  for (const [group, commands] of Object.entries(PRODUCT_COMMAND_GROUPS)) {
    for (const cmd of commands.split(' ')) {
      map[cmd] = group;
    }
  }
  return map;
})();

export const OPTIONS = {
  promptLang: [
    ['ar', 'العربية الفصحى', 'Arabic'],
    ['en', 'English (الإنجليزية)', 'English'],
    ['both', 'العربية والإنجليزية معاً', 'Arabic and English']
  ],
  audience: [
    ['general', 'جمهور عام', 'General'],
    ['kids', 'أطفال وناشئة', 'Children & Kids'],
    ['beginners', 'مبتدئون', 'Beginners'],
    ['students', 'طلاب مدارس وجامعات', 'Students'],
    ['teachers', 'معلمون وتربويون', 'Teachers & Educators'],
    ['professionals', 'متخصصون وخبراء', 'Professionals & Experts']
  ],
  tone: [
    ['friendly', 'ودودة ومحفزة وواضحة', 'Friendly and clear'],
    ['formal', 'رسمية ومؤسسية', 'Formal'],
    ['creative', 'إبداعية ومشوقة', 'Creative & engaging'],
    ['humorous', 'مرحة وخفيفة الظل', 'Humorous & lighthearted'],
    ['academic', 'أكاديمية ومنهجية رصينة', 'Academic & rigorous'],
    ['persuasive', 'إقناعية ومؤثرة', 'Persuasive']
  ],
  depth: [
    ['balanced', 'متوازن وعملي', 'Balanced'],
    ['brief', 'مختصر ومكثف', 'Brief & concise'],
    ['deep', 'مفصل وشامل', 'Detailed & deep'],
    ['step', 'خطوة بخطوة تفصيلياً', 'Step by step']
  ],
  format: [
    ['structured', 'فقرات بعناوين واضحة', 'Headed sections'],
    ['table', 'جدول مقارن', 'Table'],
    ['bullets', 'نقاط مركزة', 'Bullet points'],
    ['steps', 'خطوات مرقمة متسلسلة', 'Numbered steps'],
    ['json', 'بيانات JSON صالحة', 'Valid JSON'],
    ['dialogue', 'حوار بين شخصيات', 'Dialogue'],
    ['storyboard', 'لوحات ومشاهد مصورة', 'Scenes and panels'],
    ['code', 'كود برمجي قابل للتجربة', 'Runnable code']
  ],
  quantity: [
    ['auto', 'تلقائي حسب الموضوع', 'Automatic'],
    ['1', '1 ناتج / لوحة', '1 item'],
    ['3', '3 نواتج', '3 items'],
    ['4', '4 لوحات / خيارات', '4 items'],
    ['6', '6 لوحات / عناصر', '6 items'],
    ['8', '8 عناصر', '8 items'],
    ['10', '10 عناصر / أسئلة', '10 items'],
    ['12', '12 عنصرًا', '12 items']
  ],
  numerals: [
    ['western', '0 1 2 3 (أرقام عربية غربية)', '0 1 2 3 (Western)'],
    ['arabic', '٠ ١ ٢ ٣ (أرقام مشرقية هندية)', '٠ ١ ٢ ٣ (Arabic-Indic)']
  ],
  resultAlign: [
    ['natural', 'تلقائي حسب اللغة', 'Language default'],
    ['right', 'يمين', 'Right'],
    ['left', 'يسار', 'Left'],
    ['center', 'وسط', 'Center']
  ],
  resultDir: [
    ['auto', 'تلقائي حسب اللغة', 'Language default'],
    ['rtl', 'من اليمين لليسار (RTL)', 'Right to left'],
    ['ltr', 'من اليسار لليمين (LTR)', 'Left to right']
  ],
  outputOrder: [
    ['logical', 'ترتيب طبيعي ومنطقي', 'Natural order'],
    ['rtl', 'يمين ← يسار', 'Right to left'],
    ['ltr', 'يسار ← يمين', 'Left to right']
  ],
  platform: [
    ['general', 'أي مساعد ذكي عام (محايد)', 'Any AI assistant (Neutral)'],
    ['chatgpt', 'ChatGPT (OpenAI - GPT-4o / o1 / o3)', 'ChatGPT (OpenAI)'],
    ['claude', 'Claude (Anthropic - 3.7 Sonnet)', 'Claude (Anthropic)'],
    ['gemini', 'Gemini (Google - Flash / Pro)', 'Gemini (Google)'],
    ['deepseek', 'DeepSeek (ديب سيك - V3 / R1)', 'DeepSeek (V3 / R1)'],
    ['copilot', 'Microsoft Copilot', 'Microsoft Copilot'],
    ['perplexity', 'Perplexity AI (محرك بحث ذكي)', 'Perplexity AI'],
    ['grok', 'xAI Grok (إكس آي جروك)', 'xAI Grok']
  ],
  promptMode: [
    ['structured', 'منظم بعناوين واضحة', 'Headed sections'],
    ['compact', 'موجز ومباشر', 'Compact & direct'],
    ['xml', 'وسوم XML دقيقة', 'XML tags'],
    ['json', 'بنية كائن JSON', 'JSON structure']
  ],
  sourcePolicy: [
    ['balanced', 'تحقق وتوثيق عند الضرورة', 'Verify when needed'],
    ['strict', 'توثيق أكاديمي صارم وممنوع التخمين', 'Strict sourcing'],
    ['creative', 'حرية خيالية وإبداعية', 'Creative freedom']
  ],
  maxWords: [
    ['auto', 'بدون حد ثابت (حسب اكتمال المهمة)', 'No set limit'],
    ['100', 'في حدود 100 كلمة', '~100 words'],
    ['250', 'في حدود 250 كلمة', '~250 words'],
    ['500', 'في حدود 500 كلمة', '~500 words'],
    ['1000', 'في حدود 1000 كلمة', '~1000 words'],
    ['2000', 'في حدود 2000 كلمة', '~2000 words']
  ],
  artifactFormat: [
    ['auto', 'تلقائي حسب نوع الأمر المختار', 'Automatic for task'],
    ['pdf', 'PDF — مستند جاهز للطباعة', 'PDF — document'],
    ['docx', 'DOCX — ملف Word قابل للتعديل', 'DOCX — Word'],
    ['png', 'PNG — صورة عالية الدقة', 'PNG — image'],
    ['html', 'HTML — تطبيق ويب تفاعلي', 'HTML — interactive'],
    ['svg', 'SVG — رسم متجهي دقيق', 'SVG — vector'],
    ['pptx', 'PPTX — شرائح PowerPoint', 'PPTX — slides'],
    ['xlsx', 'XLSX — جدول بيانات Excel', 'XLSX — spreadsheet'],
    ['zip', 'ZIP — حزمة ملفات المشروع', 'ZIP — project bundle'],
    ['mp3', 'MP3 — ملف صوتي', 'MP3 — audio'],
    ['mp4', 'MP4 — ملف فيديو', 'MP4 — video'],
    ['csv', 'CSV — جدول بيانات خام', 'CSV — data table'],
    ['json', 'JSON — كائن برمجي منظم', 'JSON — structured'],
    ['md', 'MD — Markdown منسق', 'MD — Markdown']
  ],
  footerAlign: [
    ['right', 'يمين', 'Right'],
    ['center', 'وسط', 'Center'],
    ['left', 'يسار', 'Left']
  ],
  footerScope: [
    ['all', 'أسفل كل صفحة / شريحة', 'Every page / slide'],
    ['last', 'الصفحة الأخيرة فقط', 'Final page only']
  ],
  footerSize: [
    ['small', 'صغير وهادئ (9-11 نقطة)', 'Small (9-11 pt)'],
    ['medium', 'متوسط وواضح (12-14 نقطة)', 'Medium (12-14 pt)']
  ]
};

export const SMART_GROUPS = {
  comic: {
    ar: 'القصص المصورة والمانغا',
    en: 'Comics & Storyboarding',
    fields: [
      ['heroName', 'اسم البطل / الشخصية', 'Character Name', 'text', 'مثال: سالم', 'e.g. Salem'],
      ['targetGrade', 'الفئة العمرية أو الصف', 'Age group or grade', 'text', 'الصف الثالث الابتدائي', 'Grade 3'],
      ['heroIdentity', 'الملامح والهوية البصرية الثابتة', 'Facial & Visual Identity', 'textarea', 'العمر، لون البشرة، الشعر، العينان، شكل الوجه...', 'Age, hair, eyes, facial features...', true],
      ['heroOutfit', 'الملابس الثابتة في كل اللوحات', 'Consistent Outfit Across Panels', 'textarea', 'الثوب، الحذاء، تفاصيل القميص، الألوان...', 'Clothing, shoes, accessories, colors...', true],
      ['visualStyle', 'الأسلوب البصري', 'Visual Art Style', 'select', [
        ['cartoon', 'كرتوني ثنائي الأبعاد (2D Cartoon)', '2D Cartoon'],
        ['watercolor', 'ألوان مائية دافئة (Watercolor)', 'Warm Watercolor'],
        ['manga', 'مانغا يابانية خطية (Manga)', 'Manga Line Art'],
        ['clean', 'رسوم تعليمية نظيفة ومبسطة', 'Clean Educational Art'],
        ['pixar', 'ثلاثي أبعاد لطيف (3D Stylized)', '3D Stylized Animation']
      ]],
      ['delivery', 'المخرج النهائي المطلوب', 'Desired Deliverable', 'select', [
        ['both', 'لوحات مصورة كاملة + سيناريو تفصيلي', 'Illustrated Panels + Storyboard'],
        ['image', 'صفحة قصة مصورة فعلية جاهزة للقراءة', 'Finished Comic Page Image'],
        ['panels', 'سيناريو لوحات مكتوب بدون صور', 'Written Panel Storyboard Only']
      ]],
      ['storyArc', 'حبكة وتطور القصة (بداية - عقدة - حل)', 'Story Arc (Beginning, Conflict, Resolution)', 'textarea', 'اللوحات 1-2: الاكتشاف، 3-4: التحدي والمفارقة، 5-6: الخاتمة والدرس المستفاد.', 'Panels 1-2: Discovery, 3-4: Complication, 5-6: Resolution & takeaway.', true]
    ]
  },
  education: {
    ar: 'التعليم والتقويم',
    en: 'Teaching & Assessment',
    fields: [
      ['grade', 'الصف أو المرحلة الدراسية', 'Grade or Level', 'text', 'الصف الرابع الابتدائي', 'Grade 4'],
      ['subject', 'المادة الدراسية', 'Subject', 'text', 'رياضيات، علوم، لغة عربية...', 'Math, science, language...'],
      ['duration', 'المدة المتاحة', 'Duration', 'text', '٤٥ دقيقة', '45 minutes'],
      ['objectives', 'نواتج التعلم القابلة للقياس (وفق بلوم)', 'Measurable Learning Outcomes', 'textarea', 'ما الذي سيتمكن الطالب من فعله بدقة؟', 'What should students be able to do?', true],
      ['activities', 'الأنشطة والتعليم المتمايز', 'Differentiated Activities', 'textarea', 'أنشطة ملموسة لمستويات الطلاب المختلفة...', 'Tiered hands-on activities for multiple levels...', true],
      ['assessment', 'التقويم التكويني وبطاقة الخروج', 'Assessment & Exit Ticket', 'textarea', 'سؤال ختامي محدد يقيس تحقق الهدف...', 'A quick diagnostic question measuring mastery...', true]
    ]
  },
  coding: {
    ar: 'البرمجة والتطبيقات',
    en: 'Coding & Systems',
    fields: [
      ['target', 'البيئة أو الجهاز المستهدف', 'Target Platform', 'text', 'متصفح ويب (HTML5)، Node.js...', 'Web browser, Node.js, Mobile...'],
      ['stack', 'اللغات والتقنيات المفضلة', 'Preferred Tech Stack', 'text', 'HTML, CSS, JavaScript, Canvas...', 'HTML, CSS, JavaScript, Canvas...'],
      ['features', 'الوظائف الأساسية ومسار التفاعل', 'Required Features & Interaction', 'textarea', 'حدد ما يجب أن يفعله التطبيق ومسار المستخدم...', 'Core functionality, user events and flow...', true],
      ['constraints', 'قيود التشغيل والمعمارية', 'Runtime Constraints', 'textarea', 'يعمل بدون خادم، بدون اتصال، زمن استجابة سريع...', 'Offline capable, serverless, fast response...', true],
      ['tests', 'معايير القبول والاختبار', 'Acceptance Tests & Edge Cases', 'textarea', 'حالات اختبار واضحة للتحقق من سلامة العمل...', 'Verifiable test cases and boundary conditions...', true]
    ]
  },
  research: {
    ar: 'البحث والتحليل',
    en: 'Research & Evidence',
    fields: [
      ['question', 'السؤال البحثي المحوري', 'Core Research Question', 'text', 'ما السؤال الذي يسعى البحث للإجابة عنه؟', 'What central question must be answered?'],
      ['scope', 'نطاق وحدود البحث', 'Research Scope', 'text', 'الفترة الزمنية، الجغرافيا، العينة...', 'Time period, geography, population...'],
      ['evidence', 'نوع الأدلة المطلوبة', 'Evidence Standards', 'select', [
        ['primary', 'دراسات أولية ومحكمة موثوقة', 'Peer-reviewed primary sources'],
        ['mixed', 'مصادر أولية وتقارير قطاعية ثانوية', 'Primary and secondary reports'],
        ['provided', 'تحليل المراجع المرفقة فقط', 'Strictly analyze supplied files']
      ]],
      ['method', 'المنهج أو طريقة التحليل', 'Methodology', 'text', 'مقارنة، مراجعة أدبيات، تحليل بيانات...', 'Comparison, literature review, data analysis...'],
      ['limitations', 'الحدود والشكوك العلمية', 'Limitations & Uncertainties', 'textarea', 'حدد ما لا يمكن إثباته أو الثغرات المعروفة...', 'State known limitations or uncertainties...', true]
    ]
  },
  visual: {
    ar: 'المرئيات والتصميم',
    en: 'Visual Design & Media',
    fields: [
      ['subject', 'الموضوع البصري والعناصر المركزية', 'Visual Subject', 'text', 'رسم توضيحي، منتج، شخصية، مشهد...', 'Product, character, diagram, scene...'],
      ['style', 'الأسلوب والهوية البصرية', 'Style & Lighting', 'text', 'ألوان، إضاءة استوديو، خطوط نظيفة...', 'Colors, studio lighting, textures...'],
      ['composition', 'التكوين والمقاس (Aspect Ratio)', 'Composition & Framing', 'text', '16:9, 4:3, 1:1, أفقي، رأسي...', '16:9, 4:3, 1:1, landscape, portrait...'],
      ['visibleText', 'النص الظاهر بالحرف على التصميم', 'Exact Visible Text', 'textarea', 'النصوص والعبارات التي ينبغي أن تظهر بالضبط...', 'Exact words and copy that must appear...', true]
    ]
  },
  general: {
    ar: 'تفاصيل المهمة العامة',
    en: 'General Task Specifications',
    fields: [
      ['deliverable', 'الناتج النهائي المرغوب', 'Final Deliverable', 'text', 'مسودة، تقرير، خطة عمل، ملخص...', 'Draft, report, action plan, summary...'],
      ['measure', 'معيار قياس نجاح النتيجة', 'Success Metric', 'textarea', 'معايير واضحة للتأكد من جودة النتيجة...', 'Verifiable criteria for success...', true]
    ]
  }
};
