import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (...args: any[]) => void;
      };
    };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );
    };
  }, []);

  return <div id="google_translate_element"></div>;
}
