"use client";
import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: any;
      };
    };
    __gtInit: () => void;
  }
}


const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];

const includedLanguages = languages.map((lang) => lang.value).join(",");

export function GoogleTranslate() {
  const [langCookie, setLangCookie] = React.useState("/auto/en");

  // ✅ Read googtrans cookie from the client
  React.useEffect(() => {
    const match = document.cookie.match(/(^| )googtrans=([^;]+)/);
    const cookieVal = match ? decodeURIComponent(match[2]) : "/auto/en";
    setLangCookie(cookieVal);
  }, []);

  const initTranslate = () => {
    if (typeof window !== "undefined" && window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    } else {
      setTimeout(initTranslate, 300);
    }
  };

  const applyTranslation = (lang: string) => {
    const interval = setInterval(() => {
      const element = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (element) {
        element.value = lang;
        element.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 100);
  };

  const onChange = (value: string) => {
    const cookieVal = `/auto/${value}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    setLangCookie(cookieVal);
    window.location.reload(); // force translation to re-run
  };

  React.useEffect(() => {
    const lang = langCookie.split("/")[2];
    if (lang) applyTranslation(lang);
  }, [langCookie]);

  return (
    <div>
      <div
        id="google_translate_element"
        style={{ visibility: "hidden", width: "1px", height: "1px" }}
      />
      <LanguageSelector onChange={onChange} value={langCookie} />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=__gtInit"
        strategy="afterInteractive"
        onLoad={() => {
          window.__gtInit = initTranslate;
        }}
      />
    </div>
  );
}

function LanguageSelector({
  onChange,
  value,
}: {
  onChange: (val: string) => void;
  value: string;
}) {
  const currentLang = value.split("/")[2] || "en";
  return (
    <select onChange={(e) => onChange(e.target.value)} value={currentLang}>
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
