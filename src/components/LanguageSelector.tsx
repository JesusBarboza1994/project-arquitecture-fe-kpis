import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
      title={i18n.language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      <Languages className="w-6 h-6" />
    </button>
  );
};