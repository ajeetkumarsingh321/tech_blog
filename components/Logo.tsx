import Image from '@/components/Image'

const Logo = () => {
  return (
    <div className="h-8 w-8">
      <Image
        src="/static/images/profile.png"
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
