"use client";
import React from "react";
import Script from "next/script";
import Head from "next/head";

const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];

const includedLanguages = languages.map((lang) => lang.value).join(",");

export function GoogleTranslate({ prefLangCookie }: { prefLangCookie: string }) {
  const [langCookie, setLangCookie] = React.useState(() =>
    decodeURIComponent(prefLangCookie ?? "/auto/en")
  );

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

  const removeTranslateBanner = () => {
    const frame = document.querySelector("iframe.goog-te-banner-frame");
    if (frame?.parentNode) {
      frame.parentNode.removeChild(frame);
    }
    document.body.style.top = "0px";
  };

  const onChange = (value: string) => {
    const cookieVal = `/auto/${value}`;
    setLangCookie(cookieVal);
    document.cookie = `googtrans=${cookieVal}; path=/`;

    // Optional: clean the hash if present
    if (window.location.hash.includes("googtrans")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // Force refresh to apply language properly
    window.location.reload();
  };

  React.useEffect(() => {
    const lang = langCookie.split("/")[2];
    if (lang && lang !== "en") {
      setTimeout(() => {
        const element = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (element) {
          element.value = lang;
          element.dispatchEvent(new Event("change"));
        }
      }, 500);
    }

    // Remove banner repeatedly in case it reappears
    const interval = setInterval(removeTranslateBanner, 300);
    setTimeout(() => clearInterval(interval), 5000);
  }, [langCookie]);

  return (
    <>
      <Head>
        <style>
          {`
            .goog-tooltip,
            .goog-tooltip:hover {
              display: none !important;
            }
            .goog-text-highlight {
              background-color: transparent !important;
              box-shadow: none !important;
            }
          `}
        </style>
      </Head>

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
    </>
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
