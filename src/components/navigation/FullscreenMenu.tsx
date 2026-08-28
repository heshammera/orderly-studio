"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
import { Symbol } from "../brand/Symbol";
import { useLocale } from "@/context/LocaleContext";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectBuilder: () => void;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  onOpenProjectBuilder,
}) => {
  const { isAr } = useLocale();

  if (!isOpen) return null;

  const columnOne = [
    {
      title: isAr ? "الأعمال ودراسات الحالة" : "Selected Work",
      href: "/work",
      sub: isAr ? "المنصات السحابية ومشاريع الإنتاج الحية" : "Live production platforms & blueprints",
    },
    {
      title: isAr ? "الخدمات والقدرات" : "Services",
      href: "/services",
      sub: isAr ? "الهندسة السحابية، الذكاء الاصطناعي، والهوية" : "Cloud engineering, AI & brand systems",
    },
    {
      title: isAr ? "هندسة النمو والتسويق" : "Growth Marketing",
      href: "/marketing",
      sub: isAr ? "تتبع CAPI، إعلانات ممولة، ومضاعفة ROAS" : "Paid media, CAPI tracking & ROAS scaling",
    },
    {
      title: isAr ? "حاسبة نطاق التكلفة" : "Scope Estimator",
      href: "/estimator",
      sub: isAr ? "احسب أسابيع السبرنت والميزانية فورياً" : "Real-time sprint weeks & budget calculator",
      accentEmerald: true,
    },
  ];

  const columnTwo = [
    {
      title: isAr ? "مختبر الأبحاث (LABS)" : "ORDERLY LABS",
      href: "/labs",
      sub: isAr ? "أبحاث الذكاء الاصطناعي والـ WebGL" : "Proprietary tools, R&D & open source",
      accentPurple: true,
    },
    {
      title: isAr ? "بوابة العميل (OS)" : "ORDERLY OS",
      href: "/orderly-os",
      sub: isAr ? "بوابة إدارة المشاريع ومساعد الذكاء الاصطناعي" : "Client operating system & AI concierge",
      accentSky: true,
    },
    {
      title: isAr ? "فلسفة الاستوديو" : "Studio Philosophy",
      href: "/studio",
      sub: isAr ? "نموذج الفريق القيادي وشبكة المتخصصين" : "Senior collective model & craft standards",
    },
    {
      title: isAr ? "المقالات والأبحاث" : "Insights",
      href: "/insights",
      sub: isAr ? "رؤى تحريرية في التكنولوجيا والتصميم" : "Engineering, AI & Design perspectives",
    },
    {
      title: isAr ? "تواصل معنا مباشرة" : "Contact Us",
      href: "/contact",
      sub: isAr ? "واتساب، إيميل، وجلسات استكشاف فورية" : "Direct WhatsApp, email & briefings",
      accentEmerald: true,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#06070A]/98 backdrop-blur-3xl p-6 md:p-12 overflow-y-auto animate-in fade-in duration-300"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <Symbol size={28} variant="engineering" />
          <span className="font-display font-black tracking-widest text-lg uppercase text-white">ORDERLY</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30"
          data-cursor="CLOSE"
        >
          <span>{isAr ? "إغلاق" : "CLOSE"}</span>
          <X size={16} />
        </button>
      </div>

      {/* Nav Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto max-w-7xl w-full mx-auto py-8">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2 block">
            {isAr ? "01 // القدرات والحلول" : "01 // CAPABILITIES & PLATFORMS"}
          </span>
          {columnOne.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={onClose}
              className="group flex flex-col py-2.5 border-b border-white/5 hover:border-white/20 transition-all duration-300"
              data-cursor="GO"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xl sm:text-2xl font-display font-bold tracking-tight transition-colors ${
                    (link as any).accentEmerald
                      ? "text-emerald-400 group-hover:text-emerald-300"
                      : "text-white group-hover:text-emerald-400"
                  }`}
                >
                  {link.title}
                </span>
                <ArrowUpRight
                  size={18}
                  className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ${
                    (link as any).accentEmerald
                      ? "text-emerald-400"
                      : "text-white/20 group-hover:text-emerald-400"
                  }`}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 mt-1 tracking-wide">
                {link.sub}
              </span>
            </Link>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2 block">
            {isAr ? "02 // الابتكار والتواصل" : "02 // INNOVATION & CONTACT"}
          </span>
          {columnTwo.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={onClose}
              className="group flex flex-col py-2.5 border-b border-white/5 hover:border-white/20 transition-all duration-300"
              data-cursor="GO"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xl sm:text-2xl font-display font-bold tracking-tight transition-colors ${
                    (link as any).accentPurple
                      ? "text-purple-400 group-hover:text-purple-300"
                      : (link as any).accentSky
                      ? "text-sky-400 group-hover:text-sky-300"
                      : (link as any).accentEmerald
                      ? "text-emerald-400 group-hover:text-emerald-300"
                      : "text-white group-hover:text-emerald-400"
                  }`}
                >
                  {link.title}
                </span>
                <ArrowUpRight
                  size={18}
                  className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ${
                    (link as any).accentPurple
                      ? "text-purple-400"
                      : (link as any).accentSky
                      ? "text-sky-400"
                      : (link as any).accentEmerald
                      ? "text-emerald-400"
                      : "text-white/20 group-hover:text-emerald-400"
                  }`}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 mt-1 tracking-wide">
                {link.sub}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Bar CTA */}
      <div className="border-t border-white/10 pt-5 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isAr ? "جاهزون لاستقبال مشاريع جديدة" : "Ready for Q3/Q4 Deployments"}</span>
        </div>
        <button
          onClick={() => {
            onClose();
            onOpenProjectBuilder();
          }}
          className="px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg"
          data-cursor="START"
        >
          <span>{isAr ? "ابدأ استكشاف مشروعك" : "START A PROJECT"}</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};
