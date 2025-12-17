import {
  Mail,
  Facebook,
  Linkedin,
  Twitter,
} from './icons'

const components = {
  mail: Mail,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  // Disable Twitter icon temporarily
  if (kind === 'twitter') {
    return (
      <div className="text-sm text-gray-300 cursor-not-allowed opacity-50">
        <span className="sr-only">{kind} (disabled)</span>
        <SocialSvg
          className={`fill-current text-gray-400 dark:text-gray-600 h-${size} w-${size}`}
        />
      </div>
    )
  }

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`hover:text-primary-500 dark:hover:text-primary-400 fill-current text-gray-700 dark:text-gray-200 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
