interface NavLink {
  href: string
  title: string
  disabled?: boolean
}

const headerNavLinks: NavLink[] = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/projects', title: 'Projects', disabled: true },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
