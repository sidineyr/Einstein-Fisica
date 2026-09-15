'use client';

import { useEffect } from 'react';

declare global { interface Window { google?: { translate?: { TranslateElement: new (options: Record<string, unknown>, elementId: string) => unknown } }; googleTranslateElementInit?: () => void } }

export function LanguageSelector() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate && !document.querySelector('#google_translate_element select')) {
        new window.google.translate.TranslateElement({ pageLanguage: 'pt', includedLanguages: 'pt,en', autoDisplay: false }, 'google_translate_element');
      }
    };
    if (window.google?.translate) window.googleTranslateElementInit();
    else if (!document.querySelector('script[data-project-translate]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.dataset.projectTranslate = 'true';
      document.head.appendChild(script);
    }
  }, []);
  return <aside aria-label="Language / Idioma" className="fixed right-3 top-3 z-50 rounded-full border border-white/15 bg-slate-950/90 px-3 py-2 shadow-xl backdrop-blur"><span className="mr-2 text-xs font-bold text-white">PT / EN</span><span id="google_translate_element" /></aside>;
}
