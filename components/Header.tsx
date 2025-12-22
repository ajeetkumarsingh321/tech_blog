import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from './Image'
import InlineTranslationWidget from './InlineTranslationWidget'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between" suppressHydrationWarning>
          <div className="flex items-center space-x-3">
            <Image
              src="/static/images/profile.png"
              alt="Ajeet Kumar Singh"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="h-6 text-2xl font-semibold">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-6 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              link.disabled ? (
                <span
                  key={link.title}
                  className="mx-2 font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed whitespace-nowrap"
                  title="Coming Soon"
                >
                  {link.title}
                </span>
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 mx-2 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                >
                  {link.title}
                </Link>
              )
            ))}
        </div>
        <SearchButton />
        <InlineTranslationWidget />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
