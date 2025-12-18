'use client'

import React from 'react'
import { useNewsletter } from '../hooks/useNewsletter'

interface NewsletterFormProps {
  title?: string
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  title = 'Subscribe to the newsletter'
}) => {
  const { email, setEmail, status, message, handleSubmit, reset } = useNewsletter()

  if (status === 'success') {
    return (
      <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
        <div className="text-center">
          <div className="pb-2 text-lg font-semibold text-green-600 dark:text-green-400">
            ✅ Successfully Subscribed!
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {message}
          </p>
          <button
            onClick={reset}
            className="mt-4 text-primary-500 hover:text-primary-700 underline"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </div>
      
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <div>
          <label htmlFor="mce-EMAIL">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="EMAIL"
              className="focus:ring-primary-600 w-72 rounded-md px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black dark:text-white"
              id="mce-EMAIL"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
          </label>
        </div>
        
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0">
          <button
            type="submit"
            className={`w-full px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black sm:w-auto rounded-md ${
              status === 'loading' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-500 hover:bg-primary-700 focus:ring-primary-500'
            }`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
