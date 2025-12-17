import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { allAuthors } from 'contentlayer/generated'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const author = allAuthors.find((p) => p.slug === 'default')

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Author Profile Section */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 md:items-center">
            {author?.avatar && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={120}
                height={120}
                className="h-24 w-24 md:h-32 md:w-32 rounded-full"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
                {author?.name || 'Ajeet Kumar Singh'}
              </h1>
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 mt-2">
                {siteMetadata.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Latest Posts Section */}
        <div className="pt-6">
          <h2 className="text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">
            Latest Posts
          </h2>
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
      {/* Netlify Newsletter Form with Original Styling */}
      <div className="flex items-center justify-center pt-4">
        <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
          <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Subscribe to the newsletter
          </div>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="flex flex-col sm:flex-row"
          >
            {/* Hidden input for Netlify */}
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

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
      </div>
    </>
  )
}
