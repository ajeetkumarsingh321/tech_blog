'use client'

import { useState, useEffect } from 'react'

const TranslationWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  ]

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const translationServices = [
    {
      name: 'Microsoft Translator',
      getUrl: (url: string, lang: string) => 
        `https://www.bing.com/translator?text=${encodeURIComponent(url)}&from=en&to=${lang}`,
      reliable: true
    },
    {
      name: 'Google Translate',
      getUrl: (url: string, lang: string) => 
        `https://translate.google.com/translate?sl=en&tl=${lang}&u=${encodeURIComponent(url)}`,
      reliable: false
    },
    {
      name: 'DeepL (Copy URL)',
      getUrl: (url: string, lang: string) => 
        `https://www.deepl.com/translator#en/${lang}/${encodeURIComponent(url)}`,
      reliable: true
    },
    {
      name: 'Yandex Translate',
      getUrl: (url: string, lang: string) => 
        `https://translate.yandex.com/translate?url=${encodeURIComponent(url)}&lang=en-${lang}`,
      reliable: true
    }
  ]

  const handleTranslate = (languageCode: string) => {
    if (languageCode === 'en') {
      localStorage.setItem('preferred-language', 'en')
      setCurrentLang('en')
      setIsOpen(false)
      return
    }

    localStorage.setItem('preferred-language', languageCode)
    setCurrentLang(languageCode)

    const currentUrl = window.location.href
    
    // Show translation options modal
    showTranslationOptions(currentUrl, languageCode)
    setIsOpen(false)
  }

  const showTranslationOptions = (url: string, lang: string) => {
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'
    modal.style.zIndex = '9999'

    const selectedLang = languages.find(l => l.code === lang)
    
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Translate to ${selectedLang?.flag} ${selectedLang?.name}
          </h3>
          <button id="closeModal" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl">
            ×
          </button>
        </div>
        
        <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">
          Choose a translation service:
        </p>
        
        <div class="space-y-2">
          ${translationServices.map((service, index) => `
            <button 
              class="translation-btn w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${service.reliable ? 'border-green-200 dark:border-green-700' : 'border-yellow-200 dark:border-yellow-700'}"
              data-service="${index}"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900 dark:text-gray-100">${service.name}</span>
                ${service.reliable ? '<span class="text-xs text-green-600 dark:text-green-400">✓ Reliable</span>' : '<span class="text-xs text-yellow-600 dark:text-yellow-400">⚠ May have issues</span>'}
              </div>
            </button>
          `).join('')}
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p class="text-xs text-blue-700 dark:text-blue-300">
            💡 <strong>Tip:</strong> Microsoft Translator and Yandex are currently most reliable. DeepL provides highest quality translations.
          </p>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Add event listeners
    modal.querySelector('#closeModal')?.addEventListener('click', () => {
      document.body.removeChild(modal)
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal)
      }
    })

    modal.querySelectorAll('.translation-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const service = translationServices[index]
        const translationUrl = service.getUrl(url, lang)
        window.open(translationUrl, '_blank')
        document.body.removeChild(modal)
      })
    })
  }

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0]
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        title="Translate page"
      >
        <span className="text-lg">{getCurrentLanguage().flag}</span>
        <span className="hidden sm:block">{getCurrentLanguage().name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Select Language
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose your preferred language for translation
            </p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleTranslate(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 ${
                  currentLang === lang.code 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
                {currentLang === lang.code && (
                  <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Translation powered by multiple services for better reliability
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TranslationWidget
