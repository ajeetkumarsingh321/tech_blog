import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'

const Logo = () => {
  return (
    <div className="h-8 w-8">
      <Image
        src={`${process.env.BASE_PATH || ''}/static/images/profile.png`}
        alt="Ajeet Kumar Singh"
        width={32}
        height={32}
        className="h-8 w-8 rounded-full object-cover"
        priority
      />
    </div>
  )
}

export default Logo
