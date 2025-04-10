"use client";
import React from "react";
import Script from "next/script";
import Head from "next/head";

// Define your languages array.
const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Chinese (Simplified)", value: "zh-CN" },
];

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const includedLanguages = languages.map((lang) => lang.value).join(",");

// Declare global types so TypeScript knows about our custom window properties.
declare global {
  interface Window {
    __gtInit?: () => void;
    google?: any;
  }
}

export function GoogleTranslate({ prefLangCookie }: { prefLangCookie: string }) {
  // Decode the cookie value or default to "/auto/en"
  const [langCookie, setLangCookie] = React.useState(() =>
    decodeURIComponent(prefLangCookie ?? "/auto/en")
  );
  React.useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("googtrans="))
      ?.split("=")[1];
    if (cookieValue) {
      const decodedCookie = decodeURIComponent(cookieValue);
      if (decodedCookie !== langCookie) {
        setLangCookie(decodedCookie);
      }
    }
  }, []); // run only once on mount

  // Initializes the Google Translate widget.
  const initTranslate = () => {
    if (
      typeof window !== "undefined" &&
      window.google?.translate?.TranslateElement
    ) {
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
      // Try again in 300ms if the script hasn't finished loading.
      setTimeout(initTranslate, 300);
    }
  };

  const removeTranslateBanner = () => {
    const frame = document.querySelector("iframe.goog-te-banner-frame");
    if (frame) {
      frame.remove();
    }
    document.body.style.top = "0px";
  };

  const onChange = (value: string) => {
    const cookieVal = `/auto/${value}`;
    setLangCookie(cookieVal);
    document.cookie = `googtrans=${cookieVal}; path=/`;

    if (window.location.hash.includes("googtrans")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

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

    const interval = setInterval(removeTranslateBanner, 300);
    setTimeout(() => clearInterval(interval), 5000);
  }, [langCookie]);

  return (
    <>
      <Head>
        <style>{`
          .goog-tooltip,
          .goog-tooltip:hover {
            display: none !important;
          }
          .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
          }
        `}</style>
      </Head>
      <div>
        <div
          id="google_translate_element"
          className="invisible w-0 h-0"
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
    <Select onValueChange={onChange} value={currentLang}>
      <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <span>{lang.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

