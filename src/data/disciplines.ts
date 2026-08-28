export type DisciplineId =
  | "uiux"
  | "engineering"
  | "branding"
  | "ai"
  | "motion"
  | "marketing";

export interface DeliverableItem {
  icon: string; // Icon identifier
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  featuresEn: string[];
  featuresAr: string[];
}

export interface ProcessStep {
  number: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface DisciplineData {
  id: DisciplineId;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  overviewEn: string;
  overviewAr: string;
  timelineEn: string;
  timelineAr: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  deliverables: DeliverableItem[];
  process: ProcessStep[];
  includedGuaranteesEn: string[];
  includedGuaranteesAr: string[];
}

export const DISCIPLINES: Record<DisciplineId, DisciplineData> = {
  /* ──────────────────────────────────────────────────────────
     01 — UI / UX & PRODUCT DESIGN
  ────────────────────────────────────────────────────────── */
  uiux: {
    id: "uiux",
    nameEn: "UI / UX & Product Design",
    nameAr: "تصميم الواجهات وتجربة المستخدم",
    taglineEn: "World-Class Interfaces That Convert Visitors Into Loyal Customers",
    taglineAr: "واجهات وتطبيقات عالمية المستوى تُبهر المستخدمين وتضاعف المبيعات",
    overviewEn:
      "We design intuitive, high-conversion digital experiences built around user psychology and modern aesthetic standards.",
    overviewAr:
      "نصمم تجارب رقمية فائقة السلاسة مبنية على علم النفس السلوكي وأعلى المعايير البصرية العالمية.",
    timelineEn: "3 – 5 Weeks",
    timelineAr: "3 – 5 أسابيع",
    accentColor: "text-violet-400",
    badgeBg: "bg-violet-500/10",
    badgeBorder: "border-violet-500/30",
    badgeText: "text-violet-400",
    glowColor: "rgba(139, 92, 246, 0.15)",
    deliverables: [
      {
        icon: "layout",
        titleEn: "Complete Web & Mobile Screens",
        titleAr: "شاشات التطبيق والموقع الكاملة",
        descEn: "Pixel-perfect screens tailored for mobile, tablet, and ultra-wide desktops.",
        descAr: "تصاميم متكاملة بدقة بكسل متناهية لكل أحجام الشاشات والموبايل.",
        featuresEn: ["Figma Source Files", "Dark & Light Themes", "Responsive Layouts"],
        featuresAr: ["ملفات Figma الأصلية", "وضع النهار والليل", "متجاوب مع كل الأجهزة"],
      },
      {
        icon: "layers",
        titleEn: "Comprehensive Design System",
        titleAr: "نظام التصميم الشامل (Design System)",
        descEn: "A scalable library of typography, colors, components, and interactive states.",
        descAr: "مكتبة معيارية شاملة للألوان والخطوط والمكونات والأزرار لتسريع التطوير.",
        featuresEn: ["UI Component Library", "Design Tokens", "Developer Handover Guide"],
        featuresAr: ["مكتبة عناصر متكاملة", "رموز التصميم الموحدة", "دليل تسليم المطورين"],
      },
      {
        icon: "smartphone",
        titleEn: "Interactive Clickable Prototype",
        titleAr: "نموذج تفاعلي قابل للتجربة الحية",
        descEn: "A live clickable prototype to test user journeys and animations before coding.",
        descAr: "نموذج حي لتجربة التطبيق والتفاعل مع الشاشات والأنيميشن قبل بدء البرمجة.",
        featuresEn: ["Micro-interactions", "User Flow Testing", "Stakeholder Preview"],
        featuresAr: ["تفاعلات دقيقة وسلسة", "اختبار رحلة العميل", "جاهز للعرض على المستثمرين"],
      },
    ],
    process: [
      {
        number: "01",
        titleEn: "Discovery & User Journey",
        titleAr: "الاستكشاف ورسم الرحلة",
        descEn: "We analyze your audience, competitors, and map the optimal user flow.",
        descAr: "ندرس جمهورك والمنافسين ونرسم مسار المستخدم الأسهل لتحقيق أعلى تحويل.",
      },
      {
        number: "02",
        titleEn: "Wireframing & Visual Craft",
        titleAr: "التصميم البصري المتقن",
        descEn: "We craft custom wireframes and elevate them to luxury interactive interfaces.",
        descAr: "نحول الأفكار إلى تصاميم بصرية فاخرة مع مراجعات دورية ومستمرة معك.",
      },
      {
        number: "03",
        titleEn: "Prototype & Handover",
        titleAr: "النموذج النهائي والتسليم",
        descEn: "Full Figma files, interactive prototype, and developer guidelines delivered.",
        descAr: "تسليم ملفات Figma المنظمة ونظام التصميم الجاهز للتنفيذ البرمجي فوراً.",
      },
    ],
    includedGuaranteesEn: [
      "100% Full Commercial IP Rights",
      "Organized Figma Files with Auto-Layout",
      "14 Days Post-Handover Design Support",
    ],
    includedGuaranteesAr: [
      "ملكية فكرية وتجارية كاملة 100%",
      "ملفات Figma منظمة بأحدث تقنيات Auto-Layout",
      "دعم ومتابعة مجانية لمدة 14 يوماً بعد التسليم",
    ],
  },

  /* ──────────────────────────────────────────────────────────
     02 — SOFTWARE ENGINEERING & SAAS
  ────────────────────────────────────────────────────────── */
  engineering: {
    id: "engineering",
    nameEn: "Software Engineering & SaaS",
    nameAr: "الهندسة والبرمجيات السحابية",
    taglineEn: "High-Performance Web Platforms Built for Infinite Scale and Speed",
    taglineAr: "منصات وتطبيقات ويب فائقة السرعة مبنية للتوسع والتشغيل بلا انقطاع",
    overviewEn:
      "Modern full-stack cloud engineering using Next.js, TypeScript, secure APIs, and scalable databases.",
    overviewAr:
      "تطوير برمجي متكامل بأحدث التقنيات السحابية (Next.js, TypeScript, PostgreSQL) لضمان سرعة خيالية وأمان تام.",
    timelineEn: "4 – 8 Weeks",
    timelineAr: "4 – 8 أسابيع",
    accentColor: "text-sky-400",
    badgeBg: "bg-sky-500/10",
    badgeBorder: "border-sky-500/30",
    badgeText: "text-sky-400",
    glowColor: "rgba(56, 189, 248, 0.15)",
    deliverables: [
      {
        icon: "globe",
        titleEn: "Full-Stack Next.js Platform",
        titleAr: "منصة ويب متكاملة فائقة السرعة",
        descEn: "Blazing-fast responsive frontend with server-side rendering and edge caching.",
        descAr: "موقع وتطبيق ويب سريع كالصاروخ بأعلى معايير الـ SEO والتجاوب.",
        featuresEn: ["Next.js 14 App Router", "Sub-100ms Page Loads", "SEO & Performance 95+"],
        featuresAr: ["أحدث إصدارات Next.js", "تحميل في أجزاء من الثانية", "أعلى تقييم SEO وأداء"],
      },
      {
        icon: "database",
        titleEn: "Secure Database & APIs",
        titleAr: "قاعدة بيانات آمنة وواجهات برمجية APIs",
        descEn: "PostgreSQL / Supabase architecture with authenticated REST / GraphQL endpoints.",
        descAr: "قواعد بيانات سحابية منظمة ومحمية مع واجهات ربط سريعة وموثوقة.",
        featuresEn: ["Prisma / PostgreSQL", "User Authentication", "Role-Based Access"],
        featuresAr: ["قواعد بيانات PostgreSQL", "نظام تسجيل دخول وصلاحيات", "تشفير كامل وحماية"],
      },
      {
        icon: "shield",
        titleEn: "Custom Admin Dashboard",
        titleAr: "لوحة تحكم إدارية مخصصة للعميل",
        descEn: "An intuitive control panel to manage orders, content, users, and business analytics.",
        descAr: "لوحة تحكم سهلة وسريعة لإدارة المحتوى والطلبات والعملاء ومتابعة الإحصائيات.",
        featuresEn: ["Content Management", "Lead Tracking & CRM", "Data Export & Reports"],
        featuresAr: ["إدارة محتوى مرنة", "متابعة الطلبات وحالاتها", "تقارير وتصدير البيانات"],
      },
    ],
    process: [
      {
        number: "01",
        titleEn: "System Architecture",
        titleAr: "التخطيط وهندسة النظام",
        descEn: "We define the database schema, API contracts, and technology stack.",
        descAr: "نحدد معمارية قاعدة البيانات وهيكل الـ APIs وخريطة تدفق البيانات.",
      },
      {
        number: "02",
        titleEn: "Agile Development",
        titleAr: "البرمجة والتطوير المستمر",
        descEn: "Clean, documented code with weekly progress staging environments for testing.",
        descAr: "كتابة كود نظيف ومعياري مع توفير رابط تجربة حي ومباشر أثناء العمل.",
      },
      {
        number: "03",
        titleEn: "QA & Cloud Deployment",
        titleAr: "الفحص الشامل والنشر السحابي",
        descEn: "End-to-end security audits, automated testing, and zero-downtime deployment.",
        descAr: "فحص الأمان والسرعة ورفع المشروع على خوادم سحابية عالمية (Vercel/AWS).",
      },
    ],
    includedGuaranteesEn: [
      "100% Clean Clean Code & Full Git Repo Handover",
      "99.9% Uptime Ready Cloud Setup",
      "30 Days Free Technical Bug Warranty",
    ],
    includedGuaranteesAr: [
      "تسليم كامل الكود المصدري ومستودع GitHub",
      "إعدادات استضافة سحابية جاهزة للعمل 24/7",
      "ضمان فني مجاني لمدة 30 يوماً بعد الإطلاق",
    ],
  },

  /* ──────────────────────────────────────────────────────────
     03 — BRAND IDENTITY & SYSTEMS
  ────────────────────────────────────────────────────────── */
  branding: {
    id: "branding",
    nameEn: "Brand Identity & Systems",
    nameAr: "الهوية البصرية والعلامة التجارية",
    taglineEn: "Commanding Brand Identities That Make You Impossible to Ignore",
    taglineAr: "هويات بصرية ملكية واستراتيجيات تموضع تجعل علامتك أيقونة لا تُنسى",
    overviewEn:
      "Strategic brand positioning, proprietary mark design, typography systems, and tactile packaging for luxury brands.",
    overviewAr:
      "بناء استراتيجية التموضع، تصميم الشعار والرمز، اختيار وتنسيق الخطوط، وتصميم التغليف الفاخر.",
    timelineEn: "3 – 6 Weeks",
    timelineAr: "3 – 6 أسابيع",
    accentColor: "text-amber-400",
    badgeBg: "bg-amber-500/10",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-400",
    glowColor: "rgba(245, 158, 11, 0.15)",
    deliverables: [
      {
        icon: "sparkles",
        titleEn: "Primary Logo & Mark System",
        titleAr: "الشعار والرمز الملكي المتكامل",
        descEn: "A distinct, timeless mark crafted with full horizontal, vertical, and icon variants.",
        descAr: "شعار مميز واستثنائي بمقاسات واستخدامات متعددة (أفقي، عمودي، أيقونة مصغرة).",
        featuresEn: ["Vector Vector Files (SVG/AI)", "Monogram Symbol", "Favicon & App Icon"],
        featuresAr: ["ملفات فيكتور أصلية قابلة للتكبير", "رمز مونوغرام أيقوني", "أيقونات الموقع والتطبيق"],
      },
      {
        icon: "palette",
        titleEn: "Color & Typography Architecture",
        titleAr: "بنية الألوان والخطوط المخصصة",
        descEn: "A signature luxury color palette with curated Arabic and Latin typography pairings.",
        descAr: "لوحة ألوان متناسقة مع خطوط عربية وإنجليزية راقية تبرز فخامة علامتك.",
        featuresEn: ["Arabic & English Type Specs", "Digital & Print Color Codes", "Contrast Guidelines"],
        featuresAr: ["تناسق الخطوط العربية والإنجليزية", "أكواد ألوان للويب والطباعة CMYK", "إرشادات التباين والوضوح"],
      },
      {
        icon: "book",
        titleEn: "Brand Guidelines & Mockup Suite",
        titleAr: "دليل الهوية الشامل والموك أب الفاخر",
        descEn: "A comprehensive brand book documenting usage rules, stationery, and packaging.",
        descAr: "كتاب إرشادات شامل يوضح كيفية استخدام الهوية مع تصاميم المطبوعات والعلب.",
        featuresEn: ["Brand Style Guide PDF", "Social Media Templates", "Stationery & Packaging Mockups"],
        featuresAr: ["كتاب دليل الهوية Brand Book", "قوالب السوشيال ميديا", "موك أب العلب وبطاقات الأعمال"],
      },
    ],
    process: [
      {
        number: "01",
        titleEn: "Brand Strategy & Moodboard",
        titleAr: "الاستراتيجية والمزاج البصري",
        descEn: "We define your core archetype, positioning, and visual mood directions.",
        descAr: "نحدد شخصية العلامة وتموضعها في السوق ونقدم اتجاهات بصرية مقترحة.",
      },
      {
        number: "02",
        titleEn: "Identity Design & Refining",
        titleAr: "تصميم وتطوير الخيارات",
        descEn: "We present bespoke logo directions and refine your chosen concept to perfection.",
        descAr: "نبتكر مفاهيم شعار متميزة ونطور الخيار المفضل لديك حتى الوصول للكمال.",
      },
      {
        number: "03",
        titleEn: "Master Asset Package",
        titleAr: "حزمة الملفات والتسليم النهائي",
        descEn: "Full vector export for web, mobile, social, and industrial printing.",
        descAr: "تسليم جميع الملفات المصدرية الجاهزة للنشر الرقمي والطباعة الفاخرة فوراً.",
      },
    ],
    includedGuaranteesEn: [
      "Full Commercial Trademark Ownership",
      "Vector Master Files (AI, SVG, EPS, PNG, PDF)",
      "Ready-to-Print Stationery Guidelines",
    ],
    includedGuaranteesAr: [
      "ملكية تجارية وقانونية كاملة للشعار",
      "جميع الصيغ المصدرية عالية الدقة للطباعة والويب",
      "ملفات جاهزة للمطابع بدون أي تعديل إضافي",
    ],
  },

  /* ──────────────────────────────────────────────────────────
     04 — AI & NEURAL AUTOMATION
  ────────────────────────────────────────────────────────── */
  ai: {
    id: "ai",
    nameEn: "AI & Neural Automation",
    nameAr: "الذكاء الاصطناعي والأتمتة الذكية",
    taglineEn: "Custom AI Engines & Autonomous Agents That Save Thousands of Work Hours",
    taglineAr: "حلول ذكاء اصطناعي وأتمتة ذكية توفر آلاف الساعات التشغيلية وتضاعف الإنتاجية",
    overviewEn:
      "Enterprise AI integration, custom LLM fine-tuning, automated customer concierge, and intelligent data pipelines.",
    overviewAr:
      "دمج نماذج الذكاء الاصطناعي التوليدي، بناء روبوتات خدمة عملاء ذكية، وأتمتة سير العمل بالكامل.",
    timelineEn: "3 – 6 Weeks",
    timelineAr: "3 – 6 أسابيع",
    accentColor: "text-purple-400",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.15)",
    deliverables: [
      {
        icon: "bot",
        titleEn: "Custom AI Assistant & Agent",
        titleAr: "مساعد ذكاء اصطناعي مخصص لشركتك",
        descEn: "An intelligent agent trained on your business data to answer inquiries and execute tasks.",
        descAr: "وكيل ذكي مدرب على بيانات ومنتجات شركتك للرد الفوري على العملاء وإتمام المهام.",
        featuresEn: ["Contextual Memory (RAG)", "Multi-Channel Integration", "Human-Like Quality"],
        featuresAr: ["ذاكرة دلالية ببيانات الشركة", "ربط مع الواتساب والموقع", "إجابات دقيقة واحترافية"],
      },
      {
        icon: "zap",
        titleEn: "End-to-End Workflow Automation",
        titleAr: "محرك أتمتة العمليات (Automations)",
        descEn: "Connecting your CRM, billing, email, and database to eliminate repetitive manual work.",
        descAr: "ربط أنظمة الفواتير والمبيعات والإيميل وقاعدة البيانات لتعمل تلقائياً بدون تدخل بشري.",
        featuresEn: ["Webhook Pipelines", "Zero-Manual Data Entry", "Real-Time Sync"],
        featuresAr: ["ربط فوري بين كل البرامج", "إلغاء الإدخال اليدوي تماماً", "تزامن لحظي للبيانات"],
      },
      {
        icon: "cpu",
        titleEn: "Smart Analytics & Prediction",
        titleAr: "تحليلات ذكية وتنبؤ بالبيانات",
        descEn: "Predictive dashboards that forecast customer trends, revenue, and inventory needs.",
        descAr: "لوحات تحكم ذكية تتنبأ بسلوك العملاء والمبيعات وتقدم توصيات فورية لزيادة الأرباح.",
        featuresEn: ["Predictive Scoring", "Automated Weekly Insights", "Custom Dashboards"],
        featuresAr: ["توقعات دقيقة للنمو", "تقارير أسبوعية تلقائية", "واجهة تحليلات مخصصة"],
      },
    ],
    process: [
      {
        number: "01",
        titleEn: "Workflow Audit",
        titleAr: "دراسة وتحديد نقاط الأتمتة",
        descEn: "We audit your manual workflows and identify the highest ROI automation targets.",
        descAr: "ندرس مسار عمل فريقك ونحدد العمليات الأكثر استهلاكاً للوقت لأتمتتها فوراً.",
      },
      {
        number: "02",
        titleEn: "Model Training & Integration",
        titleAr: "تدريب النماذج والربط البرمجي",
        descEn: "We connect LLM models to your private vector database with strict security guards.",
        descAr: "ندرب النموذج على وثائقك ونربطه بالأنظمة مع أعلى معايير الخصوصية والأمان.",
      },
      {
        number: "03",
        titleEn: "Testing & Live Activation",
        titleAr: "الاختبار والإطلاق التشغيلي",
        descEn: "Rigorous accuracy testing and live deployment with ongoing monitoring.",
        descAr: "اختبار دقة الإجابات وسرعة التنفيذ ثم الإطلاق الحي مع لوحة مراقبة للأداء.",
      },
    ],
    includedGuaranteesEn: [
      "100% Data Privacy & Enterprise Encryption",
      "Zero-Downtime Agent Uptime SLA",
      "Full Staff Training & Documentation Included",
    ],
    includedGuaranteesAr: [
      "تشفير كامل وحماية لبيانات الشركة 100%",
      "ضمان استمرارية عمل الروبوت دون انقطاع",
      "تدريب كامل لفريقك مع دليل استخدام مفصل",
    ],
  },

  /* ──────────────────────────────────────────────────────────
     05 — MOTION DESIGN & 3D CRAFT
  ────────────────────────────────────────────────────────── */
  motion: {
    id: "motion",
    nameEn: "Motion Design & 3D Craft",
    nameAr: "الموشن جرافيكس والرسوم ثلاثية الأبعاد",
    taglineEn: "Cinematic 3D Visuals & Product Videos That Captivate Audiences",
    taglineAr: "فيديوهات سينمائية وتجسيد ثلاثي الأبعاد 3D يخطف الأنظار ويرفع قيمة منتجك",
    overviewEn:
      "High-end 3D product visualizations, cinematic brand launch films, and fluid UI motion choreography.",
    overviewAr:
      "إخراج وإنتاج فيديوهات المنتجات ثلاثية الأبعاد، إعلانات الإطلاق السينمائية، وتحريك الشعارات والواجهات.",
    timelineEn: "3 – 6 Weeks",
    timelineAr: "3 – 6 أسابيع",
    accentColor: "text-rose-400",
    badgeBg: "bg-rose-500/10",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-400",
    glowColor: "rgba(244, 63, 94, 0.15)",
    deliverables: [
      {
        icon: "film",
        titleEn: "Cinematic 3D Product Video",
        titleAr: "فيديو إعلاني سينمائي ثلاثي الأبعاد 3D",
        descEn: "Photorealistic 3D product animation showcasing materials, features, and elegance.",
        descAr: "فيديو ثلاثي الأبعاد فائق الواقعية يبرز تفاصيل وخامات ومميزات منتجك بأسلوب مبهر.",
        featuresEn: ["4K Resolution Export", "Custom Sound Design", "Multiple Social Formats"],
        featuresAr: ["جودة 4K فائقة الوضوح", "مؤثرات صوتية وموسيقى مخصصة", "مقاسات جاهزة لكل المنصات"],
      },
      {
        icon: "play",
        titleEn: "Logo & UI Motion Package",
        titleAr: "حزمة تحريك الشعار والواجهات",
        descEn: "Dynamic animated logo stings and silky-smooth micro-animations for your website and app.",
        descAr: "تحريك احترافي للشعار ومؤثرات حركية انسيابية لموقعك وتطبيقك ومقدمات الفيديو.",
        featuresEn: ["Lottie / SVG Code Export", "Transparent Video (ProRes)", "Brand Intro & Outro"],
        featuresAr: ["ملفات كود Lottie سريعة للويب", "فيديو مفرغ بخلفية شفافة", "مقدمة وخاتمة احترافية"],
      },
      {
        icon: "box",
        titleEn: "3D Digital Asset Library",
        titleAr: "مكتبة المجسمات ثلاثية الأبعاد 3D",
        descEn: "Ready-to-use 3D models and high-res render stills for marketing and web.",
        descAr: "مجسمات 3D وصور ثابتة فائقة الدقة لاستخدامها في الحملات التسويقية والموقع.",
        featuresEn: ["GLB / GLTF 3D Models", "Ultra High-Res Renders", "Studio Lighting Setups"],
        featuresAr: ["مجسمات جاهزة للويب GLB", "صور ريندر بدقة فائقة", "إضاءات استوديو احترافية"],
      },
    ],
    process: [
      {
        number: "01",
        titleEn: "Concept & Storyboard",
        titleAr: "الفكرة والسيناريو البصري",
        descEn: "We create the narrative, visual references, and frame-by-frame storyboard.",
        descAr: "نبتكر فكرة الفيديو والسيناريو ونرسم المشاهد الرئيسية قبل بدء التنفيذ.",
      },
      {
        number: "02",
        titleEn: "3D Modeling & Animation",
        titleAr: "النمذجة والتحريك ثلاثي الأبعاد",
        descEn: "We build 3D geometry, apply luxury materials, and choreograph fluid camera movements.",
        descAr: "نبني المجسمات ونضيف الخامات الواقعية ونحرك الكاميرا بأسلوب سينمائي جذاب.",
      },
      {
        number: "03",
        titleEn: "Audio & Final Master",
        titleAr: "المؤثرات الصوتية والتسليم النهائي",
        descEn: "Color grading, sound design, and master rendering in full 4K delivery.",
        descAr: "إضافة المؤثرات الصوتية والموسيقى والريندر النهائي بجميع الصيغ المطلوبة.",
      },
    ],
    includedGuaranteesEn: [
      "Full Commercial Broadcast License",
      "Full 4K ProRes Master Files Included",
      "Multiple Aspect Ratios (16:9, 9:16, 1:1)",
    ],
    includedGuaranteesAr: [
      "حقوق النشر والإعلانات التجارية كاملة",
      "تسليم الملفات الأصلية بدقة 4K ProRes",
      "مقاسات متعددة لليوتيوب وإنستغرام وتيك توك",
    ],
  },

  /* ──────────────────────────────────────────────────────────
     06 — DIGITAL MARKETING & GROWTH
  ────────────────────────────────────────────────────────── */
  marketing: {
    id: "marketing",
    nameEn: "Digital Marketing & Growth",
    nameAr: "التسويق الرقمي ونمو المبيعات",
    taglineEn: "Data-Driven Marketing Engines That Maximize ROAS and Scale Revenue",
    taglineAr: "استراتيجيات وحملات تسويقية مبنية على البيانات تحقق أعلى عائد استثماري (ROAS)",
    overviewEn:
      "Multi-channel paid ads, organic search dominance (SEO), high-converting funnels, and retention CRM.",
    overviewAr:
      "إدارة الإعلانات الممولة، تصدر نتائج البحث (SEO)، تحسين معدل التحويل، والتسويق عبر البريد.",
    timelineEn: "Ongoing / Monthly",
    timelineAr: "حملات شهرية مستمرة",
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.15)",
    deliverables: [
      {
        icon: "trending-up",
        titleEn: "High-ROAS Paid Ads Engine",
        titleAr: "إدارة الحملات الإعلانية الممولة (Paid Ads)",
        descEn: "Targeted campaigns across Google, Meta, TikTok, and LinkedIn optimized for conversions.",
        descAr: "إطلاق وإدارة الحملات الإعلانية على جوجل وإنستغرام وتيك توك ولينكد إن بأعلى كفاءة.",
        featuresEn: ["Ad Creatives & Copywriting", "Audience Retargeting", "Daily Budget Optimization"],
        featuresAr: ["تصميم الإعلانات وكتابة المحتوى", "إعادة استهداف المهتمين", "تحسين الميزانيات يومياً"],
      },
      {
        icon: "search",
        titleEn: "Search Engine Dominance (SEO)",
        titleAr: "تصدر نتائج محركات البحث (SEO)",
        descEn: "Technical SEO, content strategy, and authority building to capture high-intent searchers.",
        descAr: "تهيئة الموقع لمحركات البحث وبناء سلطة النطاق لجذب عملاء يبحثون عن خدماتك مجاناً.",
        featuresEn: ["Keyword Research", "Technical Core Web Vitals", "Monthly Ranking Growth"],
        featuresAr: ["استهداف الكلمات الأكثر بحثاً", "تحسين سرعة الموقع الفنية", "تقارير تصدر النتائج الأولى"],
      },
      {
        icon: "mail",
        titleEn: "Conversion Funnel & CRM Flow",
        titleAr: "قمع المبيعات والتسويق الآلي (CRM)",
        descEn: "Automated email sequences and landing page optimization to convert visitors into buyers.",
        descAr: "صفحات هبوط عالية التحويل ورسائل بريد إلكتروني تلقائية تضاعف مشتريات العملاء.",
        featuresEn: ["Landing Page A/B Testing", "Automated Email Sequences", "Real-Time ROI Dashboard"],
        featuresAr: ["اختبار صفحات الهبوط A/B", "رسائل تسويقية مؤتمتة", "لوحة تحكم مباشرة بالأرباح"],
      },
    ],
    process: [
      {
        number: "01",
        titleEn: "Audit & Growth Blueprint",
        titleAr: "التحليل ووضع خطة النمو",
        descEn: "We analyze your audience, CAC, and map out the highest-performing channel mix.",
        descAr: "ندرس وضعك الحالي والمنافسين ونضع خطة إعلانية واضحة لتحقيق أفضل عائد.",
      },
      {
        number: "02",
        titleEn: "Creative Production & Launch",
        titleAr: "صناعة المحتوى والإطلاق",
        descEn: "We produce high-converting ad creatives and launch optimized campaigns.",
        descAr: "نصمم الإعلانات الاحترافية ونطلق الحملات مع ربط بكسل التتبع الدقيق.",
      },
      {
        number: "03",
        titleEn: "Scaling & Real-Time Reporting",
        titleAr: "التوسع ومضاعفة الأرباح",
        descEn: "We scale winning ad sets, lower acquisition costs, and provide transparent live reports.",
        descAr: "نضاعف الميزانية على الإعلانات الأكثر ربحية ونقدم لك تقارير شفافة بالأرقام.",
      },
    ],
    includedGuaranteesEn: [
      "100% Transparent Ad Accounts in Your Name",
      "Weekly Strategic Review & Live Dashboard",
      "Dedicated Senior Growth Strategist",
    ],
    includedGuaranteesAr: [
      "الحسابات الإعلانية ملك لك بالكامل 100%",
      "لوحة تحكم حية وتقارير أداء أسبوعية واضحة",
      "مدير تسويق مخصص لمتابعة وتطوير حسابك",
    ],
  },
};
