"use client";

import type { LanguageId, LanguageOption } from "@/types/tutorial";

type LanguageTabsProps = {
  languages: LanguageOption[];
  selectedLanguage: LanguageId;
  onSelectLanguage: (language: LanguageId) => void;
};

export function LanguageTabs({
  languages,
  selectedLanguage,
  onSelectLanguage,
}: LanguageTabsProps) {
  return (
    <div className="languageTabs" role="tablist" aria-label="Programming languages">
      {languages.map((language) => (
        <button
          aria-selected={language.id === selectedLanguage}
          className={language.id === selectedLanguage ? "active" : ""}
          key={language.id}
          onClick={() => onSelectLanguage(language.id)}
          role="tab"
          type="button"
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}
