import { GoogleTranslate } from "@/components/GoogleTranslate";
import { getPrefLangCookie } from "@/lib/getPrefLangCookie";
import Head from "next/head";


export default async function TestPage() {
  const prefLangCookie = getPrefLangCookie(); 

  return (
    
    <div className="px-16">
      <h1 className="text-2xl font-semibold mb-4">Google Translate Test</h1>
      <p>This is a sample paragraph to verify translation works.</p>

      <GoogleTranslate prefLangCookie={prefLangCookie} />
    </div>
  );
}