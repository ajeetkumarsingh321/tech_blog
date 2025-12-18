import Link from '@/components/Link'

import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>

                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* Mailchimp Newsletter Form - Static Export Safe */}
      <div className="flex items-center justify-center pt-4">
        <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
          <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Subscribe to the newsletter
          </div>
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
      </div>
    </>
  )
}
