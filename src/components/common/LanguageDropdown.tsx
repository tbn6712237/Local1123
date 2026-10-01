import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { Language } from '../../i18n/translations';

interface LanguageDropdownProps {
  variant?: 'light' | 'dark' | 'minimal';
  showLabel?: boolean;
  className?: string;
}

const LANGUAGES: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English (US)', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' }
];

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  variant = 'light',
  showLabel = false,
  className = ''
}) => {
  const { lang, setLang } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (code: Language) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Airbnb-style Globe Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 p-2.5 rounded-full text-[14px] font-semibold transition-colors cursor-pointer ${
          variant === 'dark'
            ? 'text-white hover:bg-white/10'
            : 'text-[#222222] hover:bg-[#F7F7F7]'
        }`}
        title="Choose a language"
      >
        <Globe className="w-4 h-4 text-inherit" />
        {showLabel && (
          <span className="text-[13px] font-semibold">{currentLang.nativeName}</span>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] border border-[#EBEBEB] p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
          role="menu"
        >
          <div className="px-3 py-2 text-[12px] font-semibold text-[#717171] border-b border-[#EBEBEB] mb-1 flex items-center justify-between">
            <span>Language & Region</span>
            <Globe className="w-3.5 h-3.5 text-[#717171]" />
          </div>

          <div className="space-y-1">
            {LANGUAGES.map((l) => {
              const isSelected = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleSelect(l.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] text-left transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-[#F7F7F7] text-[#222222] font-semibold' 
                      : 'text-[#222222] hover:bg-[#F7F7F7]'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{l.flag}</span>
                    <div>
                      <span className="block text-[13px] leading-tight font-medium">{l.nativeName}</span>
                      <span className="text-[11px] text-[#717171] font-normal leading-tight">{l.name}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
