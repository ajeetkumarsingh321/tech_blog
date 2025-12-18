import React from 'react'

interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  title = 'Subscribe to the newsletter',
  apiUrl = 'https://formspree.io/f/xanybgdo' // Default Formspree endpoint
}) => {
  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </div>
      <form
        action={apiUrl}
        method="POST"
        className="flex flex-col sm:flex-row"
      >
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              autoComplete="email"
              className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
              id="email-input"
              name="email"
              placeholder="Enter your email"
              required
              type="email"
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0">
          <button
            className="hover:bg-primary-700 focus:ring-primary-500 w-full bg-primary-500 px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black sm:w-auto"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
