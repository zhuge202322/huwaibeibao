"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getLanguageMeta, LanguageCode, SUPPORTED_LANGUAGES, translateText } from "./translations";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const messages = {
  EN: {},
  DE: {},
  ES: {},
} satisfies Record<LanguageCode, Record<string, string>>;

function preserveSpacing(original: string, translated: string) {
  const prefix = original.match(/^\s*/)?.[0] || "";
  const suffix = original.match(/\s*$/)?.[0] || "";
  return `${prefix}${translated}${suffix}`;
}

function shouldSkipElement(element: Element | null) {
  if (!element) return true;
  return Boolean(element.closest("script, style, textarea, code, pre, [data-no-translate]"));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("EN");
  const languageRef = useRef<LanguageCode>("EN");
  const originalText = useRef(new WeakMap<Text, string>());
  const originalAttributes = useRef(new WeakMap<Element, Record<string, string>>());

  const applyLanguage = (nextLanguage: LanguageCode) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode as Text);
    }

    for (const node of textNodes) {
      if (shouldSkipElement(node.parentElement)) continue;
      const currentOriginal = originalText.current.get(node) || node.nodeValue || "";
      if (!originalText.current.has(node)) {
        originalText.current.set(node, currentOriginal);
      }

      const translated = translateText(currentOriginal.trim(), nextLanguage);
      const nextValue = preserveSpacing(currentOriginal, translated);
      if (node.nodeValue !== nextValue) {
        node.nodeValue = nextValue;
      }
    }

    const attributeElements = Array.from(document.querySelectorAll<HTMLElement>("[placeholder], [title], [aria-label]"));
    for (const element of attributeElements) {
      if (shouldSkipElement(element)) continue;
      const stored = originalAttributes.current.get(element) || {};
      const nextStored = { ...stored };

      for (const attribute of ["placeholder", "title", "aria-label"]) {
        const value = element.getAttribute(attribute);
        if (!value) continue;
        if (!nextStored[attribute]) nextStored[attribute] = value;
        const translatedAttribute = translateText(nextStored[attribute], nextLanguage);
        if (element.getAttribute(attribute) !== translatedAttribute) {
          element.setAttribute(attribute, translatedAttribute);
        }
      }

      originalAttributes.current.set(element, nextStored);
    }
  };

  const setLanguage = (nextLanguage: LanguageCode) => {
    const meta = getLanguageMeta(nextLanguage);
    languageRef.current = nextLanguage;
    setLanguageState(nextLanguage);
    window.localStorage.setItem("preferred-language", nextLanguage);
    document.documentElement.lang = meta.locale;
    requestAnimationFrame(() => applyLanguage(nextLanguage));
  };

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("preferred-language") as LanguageCode | null;
    const matchedLanguage = SUPPORTED_LANGUAGES.find((item) => item.code === savedLanguage)?.code || "EN";
    setLanguage(matchedLanguage);

    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => applyLanguage(languageRef.current));
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => applyLanguage(language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  const meta = getLanguageMeta(language);

  return (
    <LanguageContext.Provider value={value}>
      <NextIntlClientProvider locale={meta.locale} messages={messages[language]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
