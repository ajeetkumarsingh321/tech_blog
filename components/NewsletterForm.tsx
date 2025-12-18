import React from 'react'

interface NewsletterFormProps {
  title?: string
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  title = 'Subscribe to the newsletter'
}) => {
  return (
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </div>
      {/* Mailchimp Embedded Form - Static Export Safe */}
      <form
        action="https://gmail.us4.list-manage.com/subscribe/post?u=49d2e5ede6ef1014c37881031&id=cd2121fa0b&f_id=00ffd7e8f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate flex flex-col sm:flex-row"
        target="_blank"
      >
        <div>
          <label htmlFor="mce-EMAIL">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="EMAIL"
              className="focus:ring-primary-600 required email w-72 rounded-md px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black dark:text-white"
              id="mce-EMAIL"
              placeholder="Enter your email"
              required
            />
          </label>
        </div>
        
        {/* Mailchimp bot protection - required */}
        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
          <input 
            type="text" 
            name="b_49d2e5ede6ef1014c37881031_cd2121fa0b" 
            tabIndex={-1} 
            defaultValue="" 
          />
        </div>
        
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0">
          <button
            type="submit"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="hover:bg-primary-700 focus:ring-primary-500 w-full bg-primary-500 px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black sm:w-auto rounded-md"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
