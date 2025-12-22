'use client'

import { useState, useEffect } from 'react'

const InlineTranslationWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)
  const [originalContent, setOriginalContent] = useState<Map<Element, string>>(new Map())

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ]

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language')
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  // Function to get all translatable text elements
  const getTranslatableElements = (): Element[] => {
    const elements: Element[] = []
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div', 'li', 'td', 'th',
      'blockquote', 'figcaption', 'summary',
      '[data-translatable]'
    ]

    selectors.forEach(selector => {
      const nodeList = document.querySelectorAll(selector)
      nodeList.forEach(element => {
        // Skip elements that are likely navigation, code, or structural
        if (
          element.textContent && 
          element.textContent.trim().length > 0 &&
          !element.closest('nav') &&
          !element.closest('code') &&
          !element.closest('pre') &&
          !element.closest('.translation-widget') &&
          !element.closest('[role="navigation"]') &&
          !element.closest('script') &&
          !element.closest('style') &&
          !element.querySelector('svg') &&
          !element.classList.contains('no-translate')
        ) {
          // Only include elements with meaningful text content
          const text = element.textContent.trim()
          if (text.length > 3 && !/^[\d\s\-_.,!?]+$/.test(text)) {
            elements.push(element)
          }
        }
      })
    })

    return elements
  }

  // Simple translation function using Google Translate (free tier)
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    try {
      // Using Google Translate API via a CORS proxy
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      )
      
      const data = await response.json()
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText
      }
      
      // Fallback to LibreTranslate if MyMemory fails
      const libreResponse = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: targetLang,
          format: 'text'
        })
      })
      
      const libreData = await libreResponse.json()
      return libreData.translatedText || text
      
    } catch (error) {
      console.error('Translation error:', error)
      return text // Return original text if translation fails
    }
  }

  // Function to translate page content
  const translatePage = async (targetLang: string) => {
    if (targetLang === 'en') {
      restoreOriginalContent()
      return
    }

    setIsTranslating(true)
    
    try {
      const elements = getTranslatableElements()
      const batchSize = 5 // Translate in small batches to avoid rate limits
      
      for (let i = 0; i < elements.length; i += batchSize) {
        const batch = elements.slice(i, i + batchSize)
        
        await Promise.all(
          batch.map(async (element) => {
            const originalText = element.textContent?.trim()
            if (!originalText) return

            // Store original content if not already stored
            if (!originalContent.has(element)) {
              setOriginalContent(prev => new Map(prev.set(element, originalText)))
            }

            try {
              const translatedText = await translateText(originalText, targetLang)
              if (translatedText && translatedText !== originalText) {
                element.textContent = translatedText
              }
            } catch (error) {
              console.error('Failed to translate element:', error)
            }
          })
        )
        
        // Small delay between batches to respect rate limits
        if (i + batchSize < elements.length) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    } catch (error) {
      console.error('Translation failed:', error)
      showNotification('Translation failed. Please try again.', 'error')
    } finally {
      setIsTranslating(false)
    }
  }

  // Function to restore original content
  const restoreOriginalContent = () => {
    originalContent.forEach((originalText, element) => {
      if (element && element.textContent !== originalText) {
        element.textContent = originalText
      }
    })
  }

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  const handleTranslate = async (languageCode: string) => {
    localStorage.setItem('preferred-language', languageCode)
    setCurrentLang(languageCode)
    setIsOpen(false)

    if (languageCode === 'en') {
      restoreOriginalContent()
      showNotification('Restored to original English', 'success')
    } else {
      const selectedLang = languages.find(lang => lang.code === languageCode)
      showNotification(`Translating to ${selectedLang?.name}...`, 'success')
      await translatePage(languageCode)
    }
  }

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0]
  }

  return (
    <div className="relative inline-block translation-widget">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title={isTranslating ? 'Translating...' : 'Translate page'}
      >
        {isTranslating ? (
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span className="text-lg">{getCurrentLanguage().flag}</span>
        )}
        <span className="hidden sm:block">
          {isTranslating ? 'Translating...' : getCurrentLanguage().name}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Translate Page
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select language to translate page content
            </p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleTranslate(lang.code)}
                disabled={isTranslating}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed ${
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
              {isTranslating ? 'Translation in progress...' : 'Page content will be translated inline'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default InlineTranslationWidget
