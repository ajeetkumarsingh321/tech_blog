interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Sample Project',
    description: `A sample project demonstrating modern web development techniques using React, Next.js, and TypeScript. This project showcases best practices in software architecture and clean code principles.`,
    imgSrc: '/tech_blog/static/images/profile.png',
    href: '#',
  },
]

export default projectsData
