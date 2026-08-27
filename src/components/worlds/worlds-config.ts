import type { WorldId } from "./WorldCanvas";

export interface WorldConfig {
  id: WorldId;
  label: string;
  labelAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  bg: string; // CSS class for background
  accentColor: string; // Tailwind text color class
  accentBorder: string;
  accentBg: string;
  stats: { value: string; labelEn: string; labelAr: string }[];
  capabilities: { en: string; ar: string }[];
  cursorLabel: string;
}

export const WORLD_CONFIGS: Record<WorldId, WorldConfig> = {
  uiux: {
    id: "uiux",
    label: "UI / UX DESIGN",
    labelAr: "تصميم الواجهات وتجربة المستخدم",
    tagline: "Inside the Interface",
    taglineAr: "داخل واجهة التصميم",
    description:
      "Ultra-premium interfaces engineered around user psychology. Every micro-interaction, animation, and layout decision is intentional — built to convert and to captivate.",
    descriptionAr:
      "واجهات فائقة الجودة مصممة حول علم النفس البشري — كل تفاصيل التفاعل والتخطيط مدروسة لتحويل الزوار وإبهارهم.",
    bg: "bg-[#0A0810]",
    accentColor: "text-violet-400",
    accentBorder: "border-violet-500/40",
    accentBg: "bg-violet-500/10",
    stats: [
      { value: "3×", labelEn: "Conversion Rate Lift", labelAr: "رفع معدل التحويل" },
      { value: "0.2s", labelEn: "Interaction Response", labelAr: "سرعة الاستجابة" },
      { value: "AAA", labelEn: "Accessibility Grade", labelAr: "مستوى الوصول" },
    ],
    capabilities: [
      { en: "Information Architecture", ar: "هيكلة المعلومات" },
      { en: "User Journey Mapping", ar: "خريطة رحلة المستخدم" },
      { en: "Component Design Systems", ar: "أنظمة تصميم المكونات" },
      { en: "Micro-interaction Design", ar: "تصميم التفاعلات الدقيقة" },
      { en: "Prototype & User Testing", ar: "النماذج الأولية والاختبار" },
    ],
    cursorLabel: "DESIGN",
  },
  engineering: {
    id: "engineering",
    label: "SOFTWARE ENGINEERING",
    labelAr: "الهندسة والبرمجيات",
    tagline: "Inside the System",
    taglineAr: "داخل البنية التحتية",
    description:
      "Cloud-distributed systems engineered for zero-downtime, horizontal scale, and sub-100ms response. From SaaS multi-tenancy to real-time AI pipelines.",
    descriptionAr:
      "أنظمة سحابية موزعة مبنية للتوسع الأفقي واستجابة أقل من 100ms — من منصات SaaS متعددة المستأجرين إلى خطوط بيانات AI الفورية.",
    bg: "bg-[#030810]",
    accentColor: "text-sky-400",
    accentBorder: "border-sky-500/40",
    accentBg: "bg-sky-500/10",
    stats: [
      { value: "99.9%", labelEn: "Uptime SLA", labelAr: "ضمان التشغيل" },
      { value: "<80ms", labelEn: "API Response", labelAr: "استجابة API" },
      { value: "∞", labelEn: "Horizontal Scale", labelAr: "قابلية التوسع" },
    ],
    capabilities: [
      { en: "Cloud & Serverless Architecture", ar: "بنية سحابية بلا خوادم" },
      { en: "API Gateway Design", ar: "تصميم بوابات API" },
      { en: "Real-time WebSocket Systems", ar: "أنظمة WebSocket الفورية" },
      { en: "Database Sharding & Caching", ar: "توزيع قواعد البيانات والتخزين المؤقت" },
      { en: "CI/CD & DevOps Pipelines", ar: "خطوط CI/CD والعمليات" },
    ],
    cursorLabel: "BUILD",
  },
  branding: {
    id: "branding",
    label: "BRAND IDENTITY",
    labelAr: "الهوية البصرية والعلامة التجارية",
    tagline: "Inside the Canvas",
    taglineAr: "داخل القماش الإبداعي",
    description:
      "Brand systems that command rooms. Strategic positioning, proprietary typography, and identity architecture that makes premium brands impossible to ignore.",
    descriptionAr:
      "أنظمة هوية تُهيمن على المشهد. تموضع استراتيجي وتصميم طباعي مخصص يجعل علامتك التجارية لا تُنسى.",
    bg: "bg-[#100A02]",
    accentColor: "text-amber-400",
    accentBorder: "border-amber-500/40",
    accentBg: "bg-amber-500/10",
    stats: [
      { value: "360°", labelEn: "Identity Coverage", labelAr: "تغطية الهوية" },
      { value: "100+", labelEn: "Touchpoints Mapped", labelAr: "نقطة تواصل" },
      { value: "12mo", labelEn: "Brand Longevity Plan", labelAr: "خطة الاستدامة" },
    ],
    capabilities: [
      { en: "Brand Strategy & Positioning", ar: "استراتيجية التموضع" },
      { en: "Logo & Mark System", ar: "نظام الشعار والرمز" },
      { en: "Typography & Color Architecture", ar: "الطباعة وبنية الألوان" },
      { en: "Brand Voice & Tone", ar: "صوت العلامة ونبرتها" },
      { en: "Brand Guidelines System", ar: "دليل الهوية الشامل" },
    ],
    cursorLabel: "CREATE",
  },
  ai: {
    id: "ai",
    label: "AI & AUTOMATION",
    labelAr: "الذكاء الاصطناعي والأتمتة",
    tagline: "Inside the Neural Network",
    taglineAr: "داخل الشبكة العصبية",
    description:
      "Custom LLM pipelines, autonomous agents, and intelligent workflow engines. We integrate AI where it creates measurable impact — not hype.",
    descriptionAr:
      "خطوط معالجة LLM مخصصة، وكلاء ذاتيون، ومحركات سير عمل ذكية. نُدمج الذكاء الاصطناعي حيث يُحدث أثراً حقيقياً.",
    bg: "bg-[#080412]",
    accentColor: "text-purple-400",
    accentBorder: "border-purple-500/40",
    accentBg: "bg-purple-500/10",
    stats: [
      { value: "10×", labelEn: "Workflow Acceleration", labelAr: "تسريع سير العمل" },
      { value: "GPT-4", labelEn: "LLM Integration", labelAr: "تكامل نماذج اللغة" },
      { value: "24/7", labelEn: "Autonomous Operation", labelAr: "عمل ذاتي مستمر" },
    ],
    capabilities: [
      { en: "Custom LLM Fine-tuning", ar: "ضبط نماذج اللغة المخصصة" },
      { en: "AI Agent Orchestration", ar: "تنسيق وكلاء الذكاء الاصطناعي" },
      { en: "Semantic Search Systems", ar: "محركات البحث الدلالية" },
      { en: "Predictive Analytics", ar: "التحليلات التنبؤية" },
      { en: "Computer Vision Pipelines", ar: "خطوط الرؤية الحاسوبية" },
    ],
    cursorLabel: "COMPUTE",
  },
  motion: {
    id: "motion",
    label: "MOTION & 3D",
    labelAr: "الموشن جرافيكس والرسوم ثلاثية الأبعاد",
    tagline: "Inside the Timeline",
    taglineAr: "داخل شريط الزمن",
    description:
      "Cinematic brand films, 3D product renders, and spatial interactive experiences. Motion that tells stories brands cannot tell with static images alone.",
    descriptionAr:
      "أفلام علامات تجارية سينمائية، ونماذج ثلاثية الأبعاد، وتجارب تفاعلية مكانية. حركة تروي قصصاً لا تستطيع الصور الثابتة وحدها أن تحكيها.",
    bg: "bg-[#0E0510]",
    accentColor: "text-rose-400",
    accentBorder: "border-rose-500/40",
    accentBg: "bg-rose-500/10",
    stats: [
      { value: "60fps", labelEn: "Render Output", labelAr: "جودة الإخراج" },
      { value: "4K", labelEn: "Max Resolution", labelAr: "أعلى دقة" },
      { value: "8s", labelEn: "Avg. Attention Gain", labelAr: "متوسط وقت الانتباه" },
    ],
    capabilities: [
      { en: "Cinematic Brand Films", ar: "أفلام العلامة التجارية السينمائية" },
      { en: "3D Product Visualization", ar: "التصور ثلاثي الأبعاد للمنتجات" },
      { en: "Character & Logo Animation", ar: "أنيميشن الشخصيات والشعارات" },
      { en: "Particle & Shader Systems", ar: "أنظمة الجسيمات والتظليل" },
      { en: "WebGL Interactive Experiences", ar: "تجارب WebGL التفاعلية" },
    ],
    cursorLabel: "ANIMATE",
  },
  marketing: {
    id: "marketing",
    label: "DIGITAL MARKETING",
    labelAr: "التسويق الرقمي",
    tagline: "Inside the Campaign",
    taglineAr: "داخل الحملة التسويقية",
    description:
      "Data-intelligence meets creative storytelling. Full-funnel marketing strategies that build brand equity, drive qualified traffic, and compound growth.",
    descriptionAr:
      "ذكاء البيانات يلتقي بسرد القصص الإبداعي. استراتيجيات تسويق متكاملة تبني قيمة العلامة وتُنمّي العائد بصورة مستدامة.",
    bg: "bg-[#021008]",
    accentColor: "text-emerald-400",
    accentBorder: "border-emerald-500/40",
    accentBg: "bg-emerald-500/10",
    stats: [
      { value: "+340%", labelEn: "Avg. Conversion Growth", labelAr: "نمو التحويل" },
      { value: "8.4×", labelEn: "Average ROAS", labelAr: "عائد الإنفاق الإعلاني" },
      { value: "−62%", labelEn: "CAC Reduction", labelAr: "تخفيض تكلفة الاكتساب" },
    ],
    capabilities: [
      { en: "Digital Marketing Strategy", ar: "استراتيجية التسويق الرقمي" },
      { en: "SEO & Organic Growth", ar: "تحسين محركات البحث" },
      { en: "Paid Media Management", ar: "إدارة الإعلانات المدفوعة" },
      { en: "Social Media & Content", ar: "محتوى التواصل الاجتماعي" },
      { en: "Analytics & CRO", ar: "التحليلات وتحسين التحويل" },
    ],
    cursorLabel: "GROW",
  },
  saas: {
    id: "saas",
    label: "SaaS PLATFORM",
    labelAr: "منصة SaaS السحابية",
    tagline: "Inside the Cloud",
    taglineAr: "داخل السحابة",
    description:
      "Multi-tenant SaaS platforms built for scale from day one. Billing, auth, analytics, and API infrastructure designed to support thousands of concurrent users.",
    descriptionAr:
      "منصات SaaS متعددة المستأجرين مُهيأة للتوسع من اليوم الأول — فوترة، مصادقة، تحليلات، وبنية API تدعم آلاف المستخدمين المتزامنين.",
    bg: "bg-[#030810]",
    accentColor: "text-sky-400",
    accentBorder: "border-sky-500/40",
    accentBg: "bg-sky-500/10",
    stats: [
      { value: "99.9%", labelEn: "Uptime SLA", labelAr: "ضمان التشغيل" },
      { value: "10K+", labelEn: "Concurrent Users", labelAr: "مستخدم متزامن" },
      { value: "<80ms", labelEn: "API Response", labelAr: "استجابة API" },
    ],
    capabilities: [
      { en: "Multi-tenant Architecture", ar: "بنية متعددة المستأجرين" },
      { en: "Subscription & Billing Systems", ar: "أنظمة الاشتراك والفوترة" },
      { en: "Role-based Access Control", ar: "التحكم في الوصول القائم على الأدوار" },
      { en: "Usage Analytics Dashboard", ar: "لوحة تحليلات الاستخدام" },
      { en: "API Documentation & SDKs", ar: "توثيق API والأدوات" },
    ],
    cursorLabel: "SCALE",
  },
  ecommerce: {
    id: "ecommerce",
    label: "E-COMMERCE",
    labelAr: "التجارة الإلكترونية",
    tagline: "Inside the Store",
    taglineAr: "داخل المتجر",
    description:
      "Headless commerce architectures that separate the shopping experience from the backend — giving full creative freedom with enterprise-grade performance.",
    descriptionAr:
      "بنية تجارة مفصولة الرأس تفصل تجربة التسوق عن الخلفية — حرية إبداعية كاملة مع أداء على مستوى المؤسسات.",
    bg: "bg-[#021008]",
    accentColor: "text-emerald-400",
    accentBorder: "border-emerald-500/40",
    accentBg: "bg-emerald-500/10",
    stats: [
      { value: "+85%", labelEn: "Avg. Conversion Lift", labelAr: "رفع معدل التحويل" },
      { value: "<1s", labelEn: "Page Load Speed", labelAr: "سرعة تحميل الصفحة" },
      { value: "Global", labelEn: "CDN Distribution", labelAr: "توزيع CDN عالمي" },
    ],
    capabilities: [
      { en: "Headless Shopify / Commerce", ar: "التجارة الإلكترونية المفصولة" },
      { en: "Product Catalog Architecture", ar: "هيكلة كتالوج المنتجات" },
      { en: "Checkout & Payment Flows", ar: "مسارات الدفع والسداد" },
      { en: "Inventory & Order Management", ar: "إدارة المخزون والطلبات" },
      { en: "Personalisation Engine", ar: "محرك التخصيص" },
    ],
    cursorLabel: "SHOP",
  },
  packaging: {
    id: "packaging",
    label: "PACKAGING & 3D",
    labelAr: "تصميم التغليف والمجسمات",
    tagline: "Inside the Craft",
    taglineAr: "داخل الحرفية",
    description:
      "Tactile unboxing experiences, structural packaging, and 3D product visualization that make physical products extraordinary at first touch.",
    descriptionAr:
      "تجارب فتح العبوة اللمسية، التغليف الهيكلي، والتصور ثلاثي الأبعاد للمنتجات — يجعل منتجاتك استثنائية منذ اللمسة الأولى.",
    bg: "bg-[#100A02]",
    accentColor: "text-amber-400",
    accentBorder: "border-amber-500/40",
    accentBg: "bg-amber-500/10",
    stats: [
      { value: "12+", labelEn: "Print Finishes", labelAr: "تقنية طباعة" },
      { value: "4K", labelEn: "3D Render Resolution", labelAr: "دقة التصيير" },
      { value: "100%", labelEn: "Print-ready Output", labelAr: "جاهز للطباعة" },
    ],
    capabilities: [
      { en: "Structural Package Design", ar: "تصميم التغليف الهيكلي" },
      { en: "3D Product Rendering", ar: "التصيير ثلاثي الأبعاد" },
      { en: "Print Specification & Prep", ar: "مواصفات وتحضير الطباعة" },
      { en: "Material & Finish Curation", ar: "اختيار المواد والتشطيبات" },
      { en: "Unboxing Experience Design", ar: "تصميم تجربة فتح العبوة" },
    ],
    cursorLabel: "CRAFT",
  },
};
