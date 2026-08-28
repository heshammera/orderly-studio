"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type Locale = "en" | "ar";

interface LocaleContextValue {
  locale: Locale;
  isAr: boolean;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  isAr: false,
  toggleLocale: () => {},
  setLocale: () => {},
});

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore saved preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orderly_locale") as Locale | null;
      if (saved === "ar" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      /* localStorage may be unavailable in SSR / private browsing */
    }
  }, []);

  // Apply dir + lang to <html> whenever locale changes
  useEffect(() => {
    const html = document.documentElement;
    if (locale === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("orderly_locale", l);
    } catch {}
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en");
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider
      value={{ locale, isAr: locale === "ar", toggleLocale, setLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

/** Use inside any Client Component anywhere in the app */
export const useLocale = () => useContext(LocaleContext);
