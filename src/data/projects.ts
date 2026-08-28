export interface ProjectMetric {
  labelEn: string;
  labelAr: string;
  value: string;
}

export interface ProjectData {
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  category: "ENGINEERING" | "CREATIVE" | "MARKETING" | "HYBRID";
  clientEn: string;
  clientAr: string;
  locationEn: string;
  locationAr: string;
  year: string;
  timelineEn: string;
  timelineAr: string;
  descEn: string;
  descAr: string;
  challengeEn: string;
  challengeAr: string;
  solutionEn: string;
  solutionAr: string;
  stack: string[];
  metrics: ProjectMetric[];
  accentGradient: string;
  accentColor: string;
  featured: boolean;
}

export const REAL_PROJECTS: Record<string, ProjectData> = {
  /* ──────────────────────────────────────────────────────────
     01 — Faalek PropTech (Engineering & SaaS)
  ────────────────────────────────────────────────────────── */
  "faalek-proptech": {
    slug: "faalek-proptech",
    titleEn: "Faalek Real Estate Investment Platform",
    titleAr: "منصة فالك للاستثمار العقاري وإدارة الأصول",
    subtitleEn: "High-Throughput PropTech SaaS & Automated Portfolio Engine",
    subtitleAr: "منصة سحابية لإدارة المحافظ العقارية وعقود الاستثمار الفورية",
    category: "ENGINEERING",
    clientEn: "Faalek Capital Holding",
    clientAr: "شركة فالك كابيتال القابضة",
    locationEn: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    year: "2025",
    timelineEn: "3 Months // Production Deployment",
    timelineAr: "3 أشهر // الإطلاق في بيئة العمل الحية",
    descEn:
      "A high-security cloud investment portal handling automated real-estate contracts, multi-tier KYC verification, and live asset valuation dashboards.",
    descAr:
      "بناء منصة استثمارية سحابية متكاملة تدير عقود التمويل الجماعي والاستثمار العقاري، مع نظام تحقق آلي ولوحات مؤشرات مالية حية.",
    challengeEn:
      "The client required sub-100ms contract generation, real-time banking gateway integration, and a compliant enterprise architecture capable of serving 200,000+ investors simultaneously during public fund launches.",
    challengeAr:
      "احتاج العميل لمنظومة سريعة للغاية قادرة على توليد العقود القانونية المعتمدة فوراً، والربط مع بوابات الدفع البنكية، مع تحمل ضغط يتجاوز 200,000 مستثمر في نفس اللحظة أثناء إطلاق الصناديق العقارية.",
    solutionEn:
      "Engineered an edge-deployed Next.js App Router architecture backed by PostgreSQL on Supabase with Redis caching layers and serverless microservices for instant PDF contract sealing.",
    solutionAr:
      "تم بناء وتطوير معمارية سحابية على Next.js مع قواعد بيانات PostgreSQL عالية الأمان وذاكرة تخزين مؤقت Redis، بالإضافة إلى خدمات مصغرة لمعالجة وتوثيق العقود في أقل من 40 ميلي ثانية.",
    stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Supabase", "Redis", "Tailwind CSS", "REST APIs"],
    metrics: [
      { labelEn: "Load Time", labelAr: "سرعة التحميل", value: "< 55ms" },
      { labelEn: "Active Users", labelAr: "المستثمرون النشطون", value: "185K+" },
      { labelEn: "Transactions Value", labelAr: "حجم الصفقات المدارة", value: "SAR 140M+" },
      { labelEn: "Uptime SLA", labelAr: "استمرارية التشغيل", value: "99.99%" },
    ],
    accentGradient: "from-sky-600/30 to-blue-600/10",
    accentColor: "text-sky-400",
    featured: true,
  },

  /* ──────────────────────────────────────────────────────────
     02 — Cadi Haute Parfumerie (Branding & 3D Packaging)
  ────────────────────────────────────────────────────────── */
  "cadi-parfumerie": {
    slug: "cadi-parfumerie",
    titleEn: "Cadi Luxury Niche Parfumerie",
    titleAr: "دار كادي للعطور الفاخرة والنادرة",
    subtitleEn: "Royal Brand Identity, Custom Typography & 3D Tactile Packaging",
    subtitleAr: "تصميم هوية بصرية ملكية، خطوط مخصصة، وتغليف 3D فاخر",
    category: "CREATIVE",
    clientEn: "Cadi Fragrance Group",
    clientAr: "مجموعة كادي العالمية للعطور",
    locationEn: "Dubai, UAE & London, UK",
    locationAr: "دبي، الإمارات & لندن، بريطانيا",
    year: "2025",
    timelineEn: "2.5 Months // Global Identity Launch",
    timelineAr: "شهران ونصف // إطلاق الهوية والمنتجات",
    descEn:
      "An art-directed royal brand identity system, proprietary bilingual typography pairing, and bespoke 3D luxury bottle packaging for an elite fragrance house.",
    descAr:
      "ابتكار هوية بصرية ملكية فاخرة، مع تصميم خطوط عربية ولاتينية متناغمة، وتجسيد ثلاثي الأبعاد لزجاجات العطر وعلب التغليف الفاخرة للطباعة والإنتاج الملموس.",
    challengeEn:
      "Elevating the brand to compete directly with tier-1 international luxury perfume houses while preserving Middle Eastern artisanal heritage in both physical packaging and digital presence.",
    challengeAr:
      "بناء هوية تنافس كبرى دور العطور العالمية في باريس ولندن مع الحفاظ على روح العراقة والتميز الشرقي في الملمس والعلب والموقع الإلكتروني.",
    solutionEn:
      "Designed a timeless monogram icon, custom geometric letterforms, hot-stamped gold foil packaging specifications, and a curated 3D digital unboxing experience.",
    solutionAr:
      "تصميم رمز مونوغرام ملكي، خطوط هندسية راقية، مواصفات طباعة دقيقة للمطابع بتقنيات الـ Gold Foil والورق المخملي، وتجربة فتح علبة تفاعلية ثلاثية الأبعاد للمتجر الإلكتروني.",
    stack: ["Brand Strategy", "Bilingual Typography", "3D Blender / GLB", "Luxury Packaging", "Art Direction"],
    metrics: [
      { labelEn: "Online Sales Growth", labelAr: "نمو المبيعات الرقمية", value: "+240%" },
      { labelEn: "Packaging Award", labelAr: "جوائز التميز البصري", value: "2 Wins" },
      { labelEn: "First Season Orders", labelAr: "طلبات الموسم الأول", value: "32,000+" },
      { labelEn: "Brand Index Score", labelAr: "معدل الرضا والولاء", value: "98.4%" },
    ],
    accentGradient: "from-amber-600/30 to-rose-600/10",
    accentColor: "text-amber-400",
    featured: true,
  },

  /* ──────────────────────────────────────────────────────────
     03 — Maksab Commerce & Growth (Marketing & ROAS)
  ────────────────────────────────────────────────────────── */
  "maksab-growth": {
    slug: "maksab-growth",
    titleEn: "Maksab Digital Retail Scale & Ads",
    titleAr: "حملة توسع ونمو مبيعات منصة مكسب",
    subtitleEn: "Multi-Channel Paid Media, High-ROAS Funnels & SEO Dominance",
    subtitleAr: "إدارة الحملات الإعلانية الممولة، تصدر نتائج البحث، وقمع مبيعات ذكي",
    category: "MARKETING",
    clientEn: "Maksab Retail Network",
    clientAr: "شبكة متاجر مكسب للتجزئة",
    locationEn: "Saudi Arabia & GCC",
    locationAr: "السعودية ودول الخليج العربي",
    year: "2025",
    timelineEn: "Ongoing Scale // Month 4 Results",
    timelineAr: "حملات مستمرة // نتائج الشهر الرابع",
    descEn:
      "Data-driven paid media execution across Meta, TikTok, and Google Ads combined with conversion rate optimization and technical SEO for a rapid GCC retail rollout.",
    descAr:
      "إدارة إعلانية متقدمة على منصات جوجل وتيك توك وإنستغرام مدعومة بصفحات هبوط عالية التحويل وتحسين الـ SEO لمضاعفة مبيعات المتجر في المملكة والخليج.",
    challengeEn:
      "Lowering customer acquisition cost (CAC) in a highly saturated e-commerce segment while increasing repeat order frequency and organic high-intent search visibility.",
    challengeAr:
      "تخفيض تكلفة اكتساب العميل الجديد (CAC) في سوق شديد التنافسية مع رفع معدل الشراء المتكرر وتصدر الكلمات البحثية الأكثر ربحية في جوجل.",
    solutionEn:
      "Deployed dynamic creative testing on TikTok/Meta, built automated retention email flows for cart abandonment, and restructured technical product schemas for Google Shopping dominance.",
    solutionAr:
      "إطلاق حملات باختبارات فيديو مستمرة، وتفعيل أتمتة البريد لاسترداد السلات المتروكة بنسبة 32%، وتهيئة صفحات المنتجات لمحركات البحث بجداول بيانات Schema.",
    stack: ["Google Ads (Search & PMax)", "Meta Ads Manager", "TikTok Spark Ads", "Klaviyo CRM", "Technical SEO"],
    metrics: [
      { labelEn: "Average ROAS", labelAr: "متوسط العائد الإعلاني ROAS", value: "6.8×" },
      { labelEn: "Monthly Revenue Lift", labelAr: "زيادة الإيرادات الشهرية", value: "+380%" },
      { labelEn: "CAC Reduction", labelAr: "انخفاض تكلفة الاكتساب", value: "−44%" },
      { labelEn: "Cart Recovery Rate", labelAr: "استرداد السلات المتروكة", value: "32.6%" },
    ],
    accentGradient: "from-emerald-600/30 to-teal-600/10",
    accentColor: "text-emerald-400",
    featured: true,
  },

  /* ──────────────────────────────────────────────────────────
     04 — Quantum Logistics (Hybrid SaaS & Fleet AI)
  ────────────────────────────────────────────────────────── */
  "quantum-logistics": {
    slug: "quantum-logistics",
    titleEn: "Quantum Fleet & Logistics Platform",
    titleAr: "منصة كوانتم لإدارة العمليات اللوجستية والأساطيل",
    subtitleEn: "Real-Time Telemetry, Automated Dispatch & Dispatcher Portal",
    subtitleAr: "نظام تتبع الأساطيل اللحظي وخوارزميات توزيع الشحنات بالذكاء الاصطناعي",
    category: "HYBRID",
    clientEn: "Quantum Express Cargo",
    clientAr: "شركة كوانتم إكسبريس للشحن السريع",
    locationEn: "Jeddah & Dammam, KSA",
    locationAr: "جدة والدمام، المملكة العربية السعودية",
    year: "2024",
    timelineEn: "4 Months // Enterprise Integration",
    timelineAr: "4 أشهر // الربط والتشغيل المؤسسي",
    descEn:
      "An end-to-end enterprise logistics operating system integrating driver mobile apps, live GPS fleet tracking, and automated dispatch algorithms.",
    descAr:
      "تطوير نظام تشغيل لوجستي متكامل يربط بين تطبيق السائقين ولوحة تحكم المراقبة المركزية، مع خوارزميات توجيه وتوزيع المسارات تلقائياً.",
    challengeEn:
      "Managing peak delivery windows across multiple regional hubs with zero dispatch latency and reliable offline-first mobile sync in remote transport routes.",
    challengeAr:
      "إدارة آلاف الشحنات اليومية بين المستودعات المركزية في أوقات الذروة دون أي بطء في النظام، مع ضمان عمل تطبيق السائق حتى في حالات انقطاع شبكة الجوال.",
    solutionEn:
      "Created a robust Next.js dispatcher console with WebSockets real-time map rendering and an offline-first SQLite synchronization engine on mobile.",
    solutionAr:
      "بناء لوحة تحكم فورية تعتمد على تقنية WebSockets لتحديث حركة المركبات على الخرائط الحية لحظياً، مع دعم المزامنة التلقائية فور عودة الاتصال بالإنترنت.",
    stack: ["Next.js", "React Native", "WebSockets", "Node.js", "PostgreSQL", "Google Maps APIs"],
    metrics: [
      { labelEn: "Daily Deliveries", labelAr: "الشحنات المعالجة يومياً", value: "48,000+" },
      { labelEn: "Fuel Cost Savings", labelAr: "توفير تكاليف المسارات", value: "−32%" },
      { labelEn: "Dispatch Latency", labelAr: "سرعة إسناد الطلب", value: "< 1.2s" },
      { labelEn: "Fleet Drivers", labelAr: "السائقون النشطون", value: "2,400+" },
    ],
    accentGradient: "from-purple-600/30 to-sky-600/10",
    accentColor: "text-purple-400",
    featured: true,
  },
};

export const PROJECTS_LIST = Object.values(REAL_PROJECTS);
