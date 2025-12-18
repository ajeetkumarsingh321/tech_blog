'use client'

import { useState, useEffect } from 'react'

const ImprovedTranslationWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [showInstructions, setShowInstructions] = useState(false)

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
    const savedLang = localStorage.getItem('preferred-language')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const handleTranslate = (languageCode: string) => {
    if (languageCode === 'en') {
      localStorage.setItem('preferred-language', 'en')
      setCurrentLang('en')
      window.location.reload()
      setIsOpen(false)
      return
    }

    localStorage.setItem('preferred-language', languageCode)
    setCurrentLang(languageCode)

    // Multiple methods for better compatibility
    const currentUrl = window.location.href
    const methods = [
      // Method 1: Standard Google Translate
      `https://translate.google.com/translate?hl=en&sl=en&tl=${languageCode}&u=${encodeURIComponent(currentUrl)}`,
      
      // Method 2: Alternative Google Translate format
      `https://translate.google.com/?sl=en&tl=${languageCode}&u=${encodeURIComponent(currentUrl)}`,
      
      // Method 3: Direct translation page
      `https://translate.google.com/translate?sl=en&tl=${languageCode}&js=y&prev=_t&hl=en&ie=UTF-8&u=${encodeURIComponent(currentUrl)}&edit-text=&act=url`
    ]

    // Try first method
    try {
      window.location.href = methods[0]
    } catch (error) {
      // If that fails, show instructions
      setShowInstructions(true)
    }

    setIsOpen(false)
  }

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0]
  }

  const copyUrlToClipboard = async (languageCode: string) => {
    const currentUrl = window.location.href
    const translateUrl = `https://translate.google.com/translate?sl=en&tl=${languageCode}&u=${encodeURIComponent(currentUrl)}`
    
    try {
      await navigator.clipboard.writeText(translateUrl)
      alert('Translation URL copied to clipboard! Paste it in a new tab.')
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = translateUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Translation URL copied to clipboard! Paste it in a new tab.')
    }
  }

  if (showInstructions) {
    return (
      <div className="relative inline-block">
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Translation Help
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If translation doesn't work automatically, try these alternatives:
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  window.open(`https://translate.google.com/translate?sl=en&tl=${currentLang}&u=${encodeURIComponent(window.location.href)}`, '_blank')
                }}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                🌐 Open in New Tab
              </button>
              <button
                onClick={() => copyUrlToClipboard(currentLang)}
                className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                📋 Copy Translation URL
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <strong>Manual method:</strong><br/>
                1. Go to translate.google.com<br/>
                2. Paste: {window.location.href}<br/>
                3. Select your language
              </div>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-4 w-full p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 border border-gray-300 dark:border-gray-600 rounded-md hover:border-gray-400 dark:hover:border-gray-500"
        aria-label="Site translation options"
      >
        <span className="text-lg">{getCurrentLanguage().flag}</span>
        <span className="hidden sm:inline">{getCurrentLanguage().code.toUpperCase()}</span>
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
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Site Language
            </div>
            {languages.map((lang) => (
              <div key={lang.code} className="flex">
                <button
                  onClick={() => handleTranslate(lang.code)}
                  className={`flex-1 text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 ${
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
                {lang.code !== 'en' && (
                  <button
                    onClick={() => copyUrlToClipboard(lang.code)}
                    className="px-2 py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title="Copy translation URL"
                  >
                    📋
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Translate entire site • Multiple methods available
            </p>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default ImprovedTranslationWidget
