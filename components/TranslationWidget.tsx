'use client'

import { useState, useEffect } from 'react'

const TranslationWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ]

  useEffect(() => {
    // Detect current language from various sources
    const detectCurrentLanguage = () => {
      // Check if we're on a Google Translate page
      const url = window.location.href
      if (url.includes('translate.google.com')) {
        const urlParams = new URLSearchParams(window.location.search)
        const targetLang = urlParams.get('tl')
        if (targetLang) {
          setCurrentLang(targetLang)
          localStorage.setItem('preferred-language', targetLang)
          return
        }
      }
      
      // Check localStorage
      const savedLang = localStorage.getItem('preferred-language')
      if (savedLang) {
        setCurrentLang(savedLang)
      }
    }

    detectCurrentLanguage()
  }, [])

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0]
  }

  const handleTranslate = (languageCode: string) => {
    try {
      if (languageCode === 'en') {
        // Reset to original page
        localStorage.setItem('preferred-language', 'en')
        setCurrentLang('en')
        // Remove any translation cookies
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        // Reload to show original content
        window.location.reload()
      } else {
        // Save language preference
        localStorage.setItem('preferred-language', languageCode)
        setCurrentLang(languageCode)
        
        // Try different Google Translate methods
        const currentUrl = window.location.href
        
        // Method 1: Direct translate.google.com approach (most reliable)
        const translateUrl = `https://translate.google.com/translate?hl=en&sl=en&tl=${languageCode}&u=${encodeURIComponent(currentUrl)}`
        
        // Method 2: If that fails, try the widget approach with a timeout
        const tryTranslation = () => {
          try {
            window.location.href = translateUrl
          } catch (err) {
            // Fallback: Open in new tab if same-window fails
            console.log('Opening in new tab as fallback')
            window.open(translateUrl, '_blank')
          }
        }
        
        // Add small delay to ensure state is saved
        setTimeout(tryTranslation, 100)
      }
      
      setIsOpen(false)
    } catch (error) {
      console.error('Translation error:', error)
      // Ultimate fallback - open Google Translate in new tab with different URL structure
      const currentUrl = window.location.href
      const fallbackUrl = `https://translate.google.com/?sl=en&tl=${languageCode}&text=${encodeURIComponent(currentUrl)}&op=translate`
      window.open(fallbackUrl, '_blank')
      setIsOpen(false)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 border border-gray-300 dark:border-gray-600 rounded-md hover:border-gray-400 dark:hover:border-gray-500"
        aria-label="Translation options"
      >
        <span className="text-lg">{getCurrentLanguage().flag}</span>
        <span>Translate ({getCurrentLanguage().code.toUpperCase()})</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Select Language
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleTranslate(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 ${
                  currentLang === lang.code 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLang === lang.code && (
                  <span className="ml-auto text-xs text-gray-500">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Powered by Google Translate
            </p>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default TranslationWidget
