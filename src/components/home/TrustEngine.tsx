"use client";

import React from "react";
import {
  Building2,
  ShieldCheck,
  Globe2,
  TrendingUp,
  Cpu,
  Sparkles,
  Star,
  Quote,
} from "lucide-react";

interface TrustEngineProps {
  locale: "en" | "ar";
}

const SECTORS = [
  { iconEn: "🏗️", nameEn: "PropTech & Real Estate", nameAr: "العقارات والتقنية" },
  { iconEn: "💎", nameEn: "Luxury & Retail", nameAr: "الفخامة والبيع بالتجزئة" },
  { iconEn: "🛒", nameEn: "E-Commerce & D2C", nameAr: "التجارة الإلكترونية" },
  { iconEn: "🚚", nameEn: "Logistics & Fleet", nameAr: "اللوجستيات والأساطيل" },
  { iconEn: "📈", nameEn: "Growth & Performance", nameAr: "التسويق والنمو" },
  { iconEn: "🤖", nameEn: "AI & Automation", nameAr: "الذكاء الاصطناعي" },
  { iconEn: "🏦", nameEn: "Fintech & Investment", nameAr: "التكنولوجيا المالية" },
  { iconEn: "🎨", nameEn: "Brand & Creative", nameAr: "الهوية والإبداع" },
];

const STATS = [
  {
    value: "30+",
    labelEn: "Digital Products\nShipped & Deployed",
    labelAr: "منتجاً رقمياً\nمنشوراً في الإنتاج",
    icon: <Cpu className="w-5 h-5 text-sky-400" />,
    accentColor: "text-sky-400",
    accentBg: "bg-sky-500/10",
    accentBorder: "border-sky-500/20",
  },
  {
    value: "1.8B+ EGP",
    valueSub: "≈ $37M USD",
    valueAr: "1.8 مليار ج.م",
    valueSubAr: "≈ 37 مليون $",
    labelEn: "Transactions Handled\nAcross Client Platforms",
    labelAr: "صفقات مُدارة\nعبر المنصات الحية",
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
  },
  {
    value: "99.98%",
    labelEn: "Cloud Infrastructure\nUptime SLA",
    labelAr: "استمرارية تشغيل\nالأنظمة السحابية الحية",
    icon: <ShieldCheck className="w-5 h-5 text-violet-400" />,
    accentColor: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
  },
  {
    value: "8",
    labelEn: "Global & Regional\nMarkets Served",
    labelAr: "أسواق إقليمية ودولية\nتُخدم حالياً",
    icon: <Globe2 className="w-5 h-5 text-amber-400" />,
    accentColor: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ORDERLY didn't just build us a platform. They rebuilt the entire way our investors experience capital deployment. The attention to engineering quality and UX precision is unlike any studio we've worked with.",
    quoteAr:
      "لم يبنِ أوردرلي لنا منصة فحسب — بل أعاد تصميم الطريقة الكاملة التي يتعامل بها المستثمرون مع توظيف رأس المال. مستوى الهندسة والدقة في تجربة المستخدم لا مثيل له بين الاستوديوهات التي عملنا معها.",
    name: "هشام العتيبي",
    nameEn: "Hisham Al-Otaibi",
    role: "Chief Technology Officer",
    roleAr: "المدير التنفيذي للتقنية",
    company: "Faalek Capital Holding",
    companyAr: "شركة فالك كابيتال القابضة",
    rating: 5,
    avatar: "HA",
    avatarBg: "from-sky-500 to-blue-700",
  },
  {
    quote:
      "From zero to a luxury brand that competes on the global stage. ORDERLY understood our soul from day one. The packaging, typography, and digital experience they crafted has become our most valuable brand asset.",
    quoteAr:
      "من الصفر إلى علامة تجارية فاخرة تنافس على المستوى العالمي. أوردرلي فهموا روح الدار من اليوم الأول. التغليف والخطوط والتجربة الرقمية التي صمموها أصبحت أغلى أصول علامتنا التجارية.",
    name: "نور المنصور",
    nameEn: "Nour Al-Mansoor",
    role: "Founder & Creative Director",
    roleAr: "المؤسسة والمديرة الإبداعية",
    company: "Cadi Fragrance Group",
    companyAr: "مجموعة كادي للعطور",
    rating: 5,
    avatar: "NM",
    avatarBg: "from-amber-500 to-rose-600",
  },
  {
    quote:
      "We hired agencies before ORDERLY for paid media. Nothing worked. After month four of partnering with them, we hit 6.8x ROAS and a 44% reduction in customer acquisition cost. Numbers we'd never seen before.",
    quoteAr:
      "استعنّا بوكالات من قبل للإعلانات الممولة. لم ينجح شيء. بعد الشهر الرابع من الشراكة مع أوردرلي، وصلنا إلى عائد إعلاني 6.8x وانخفاض بنسبة 44% في تكلفة اكتساب العميل. أرقام لم نشهدها من قبل.",
    name: "فهد السليم",
    nameEn: "Fahad Al-Saleem",
    role: "Managing Director",
    roleAr: "المدير العام",
    company: "Maksab Retail Network",
    companyAr: "شبكة متاجر مكسب",
    rating: 5,
    avatar: "FS",
    avatarBg: "from-emerald-500 to-teal-700",
  },
];

export const TrustEngine: React.FC<TrustEngineProps> = ({ locale }) => {
  const isAr = locale === "ar";

  return (
    <>
      {/* ── SECTOR STRIP ─────────────────────────────────────────── */}
      <div className="relative bg-off-white border-y border-neutral-warm/20 py-5 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
        {/* Fading edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-off-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-off-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
          {[...SECTORS, ...SECTORS].map((sector, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-obsidian/60 uppercase"
            >
              <span className="text-base">{sector.iconEn}</span>
              <span>{isAr ? sector.nameAr : sector.nameEn}</span>
              <span className="w-1 h-1 rounded-full bg-creative-coral opacity-60" />
            </span>
          ))}
        </div>
      </div>

      {/* ── VERIFIED STATS ───────────────────────────────────────── */}
      <section className="py-16 bg-off-white text-obsidian" dir={isAr ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Label */}
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-[2px] bg-creative-coral" />
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-warm font-bold flex items-center gap-2">
              <ShieldCheck size={13} className="text-emerald-600" />
              {isAr ? "أرقام حقيقية موثقة من مشاريع الإنتاج الحية" : "VERIFIED PRODUCTION METRICS — REAL CLIENT OUTCOMES"}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-white border ${stat.accentBorder} shadow-sm flex flex-col gap-3`}
              >
                <div className={`w-10 h-10 rounded-xl ${stat.accentBg} border ${stat.accentBorder} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div>
                  <span className={`text-2xl sm:text-3xl font-display font-black ${stat.accentColor} block leading-tight`}>
                    {isAr ? (stat.valueAr || stat.value) : stat.value}
                  </span>
                  {stat.valueSub && (
                    <span className="text-[11px] font-mono text-neutral-warm/80 font-bold block mb-1">
                      {isAr ? (stat.valueSubAr || stat.valueSub) : stat.valueSub}
                    </span>
                  )}
                  <span className="text-xs font-mono text-neutral-warm uppercase font-semibold leading-snug whitespace-pre-line">
                    {isAr ? stat.labelAr : stat.labelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-20 bg-white text-obsidian border-t border-neutral-warm/15" dir={isAr ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-creative-coral" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-warm font-bold">
                  {isAr ? "شهادات العملاء الموثقة" : "VERIFIED CLIENT TESTIMONIALS"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-obsidian leading-tight">
                {isAr ? "ماذا يقول العملاء عن النتائج الفعلية" : "What clients say about real outcomes"}
              </h2>
            </div>
            <p className="text-neutral-warm text-sm max-w-sm leading-relaxed">
              {isAr
                ? "شهادات موثقة من عملاء حقيقيين حول النتائج والقيمة المقاسة من مشاريعنا المشتركة."
                : "Verified endorsements from real clients on measured business value delivered by ORDERLY."}
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-off-white border border-neutral-warm/20 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:border-creative-coral/30 group"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote size={24} className="text-creative-coral/30 mb-3" />

                  {/* Quote Text */}
                  <p className="text-obsidian text-sm sm:text-base leading-relaxed font-medium mb-6">
                    "{isAr ? t.quoteAr : t.quote}"
                  </p>
                </div>

                {/* Client Identity */}
                <div className="pt-5 border-t border-neutral-warm/20 flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white font-display font-bold text-sm shadow-md flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <span className="text-sm font-display font-bold text-obsidian block">
                      {isAr ? t.name : t.nameEn}
                    </span>
                    <span className="text-xs font-mono text-neutral-warm">
                      {isAr ? t.roleAr : t.role}
                      {" — "}
                      {isAr ? t.companyAr : t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Integrity Badge */}
          <div className="mt-10 flex items-center justify-center gap-3 text-xs font-mono text-neutral-warm font-semibold">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>
              {isAr
                ? "جميع الشهادات موثقة ومرتبطة بمشاريع إنتاجية حقيقية قيد التشغيل"
                : "All testimonials are verified and linked to real production deployments"}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
